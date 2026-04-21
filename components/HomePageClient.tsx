'use client';


import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { categories, lessons } from '@/data/lessons';

const SAVED_IDS_KEY = 'sparknotes_saved_ids';
const SAVED_META_KEY = 'sparknotes_saved_meta';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedMeta, setSavedMeta] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_IDS_KEY);
    const storedMeta = localStorage.getItem(SAVED_META_KEY);
    if (stored) setSavedIds(JSON.parse(stored));
    if (storedMeta) setSavedMeta(JSON.parse(storedMeta));
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(savedIds));
    localStorage.setItem(SAVED_META_KEY, JSON.stringify(savedMeta));
  }, [savedIds, savedMeta]);

  useEffect(() => {
    if (!id) return;
    const index = lessons.findIndex((lesson) => lesson.id === id);
    if (index >= 0) setCurrentIndex(index);
  }, [id]);

  const lesson = lessons[currentIndex];

  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    lessons.flatMap((item) => item.tags).forEach((tag) => map.set(tag, (map.get(tag) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const categoryStats = useMemo(
    () =>
      categories.map((category) => {
        const group = lessons.filter((lessonItem) => lessonItem.category === category);
        const newToday = group.filter(
          (lessonItem) => lessonItem.publishedAgo.includes('h') || lessonItem.publishedAgo.includes('today')
        ).length;
        return { category, total: group.length, newToday };
      }),
    []
  );

  const savedLessons = lessons.filter((item) => savedIds.includes(item.id));

  const toggleSave = (lessonId: string) => {
    const isSaved = savedIds.includes(lessonId);
    if (isSaved) {
      setSavedIds((prev) => prev.filter((idItem) => idItem !== lessonId));
      setSavedMeta((prev) => {
        const next = { ...prev };
        delete next[lessonId];
        return next;
      });
      return;
    }

    setSavedIds((prev) => [...prev, lessonId]);
    setSavedMeta((prev) => ({ ...prev, [lessonId]: Date.now() }));
  };

  const nextLesson = () => {
    const nextIndex = (currentIndex + 1) % lessons.length;
    setCurrentIndex(nextIndex);
    router.replace(`/?id=${lessons[nextIndex].id}`);
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header savedCount={savedIds.length} />

      <main className="mx-auto max-w-[640px] px-4 py-12">
        <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-ink/60">
          {lesson.category} · {lesson.readTimeSeconds} sec read · {lesson.publishedAgo}
        </p>
        <h1 className="mb-6 text-[32px] font-medium leading-tight tracking-[-0.02em]">{lesson.headline}</h1>

        <img src={lesson.imageUrl} alt={lesson.headline} className="h-[240px] w-full rounded-xl border border-black/10 object-cover" />
        <p className="mt-2 text-[11px] text-ink/50">Image: {lesson.imageCredit}</p>

        <div className="mt-8 space-y-5 text-base leading-[1.75] text-ink/90">
          <p>{lesson.paragraph1}</p>
          <p>{lesson.paragraph2}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {lesson.tags.map((tag) => (
            <Link
              key={tag}
              href={`/topics?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-ink/70"
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={nextLesson}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-5"
          >
            Next ↓
          </button>
          <button
            onClick={() => toggleSave(lesson.id)}
            className="rounded-full border border-black/20 px-3 py-2 text-sm text-ink/75 sm:px-4"
          >
            {savedIds.includes(lesson.id) ? 'Saved' : 'Save'}
          </button>
          <a
            href={lesson.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-black/20 px-3 py-2 text-sm text-ink/75 sm:px-4"
          >
            Read full ↗
          </a>
          <p className="w-full text-right text-sm text-ink/50 sm:ml-auto sm:w-auto">
            {currentIndex + 1} / {lessons.length}
          </p>
        </div>
      </main>

      <section className="border-y border-black/10 bg-[#fbfbfc] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-6 text-[11px] uppercase tracking-[0.12em] text-ink/55">Trending tags on ASU</p>
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            {tagCounts.map(([tag, count], idx) => {
              const max = tagCounts[0]?.[1] ?? 1;
              const min = tagCounts[tagCounts.length - 1]?.[1] ?? 1;
              const normalized = max === min ? 0.55 : (count - min) / (max - min);
              const fontSize = Math.round(14 + normalized * 22);
              const topColor = ['text-maroon', 'text-blue-600', 'text-purple-600', 'text-green-600'][idx] ?? 'text-ink/60';
              return (
                <Link
                  key={tag}
                  href={`/topics?tag=${encodeURIComponent(tag)}`}
                  className={`${topColor} px-1 font-medium leading-none transition-colors hover:text-maroon`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-6 text-[11px] uppercase tracking-[0.12em] text-ink/55">Topics</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryStats.map((stat) => (
              <Link
                key={stat.category}
                href={`/topics?category=${encodeURIComponent(stat.category)}`}
                className="rounded-xl border border-black/10 bg-white p-5 transition-colors hover:border-maroon/40"
              >
                <div className="mb-4 h-1.5 w-14 rounded-full bg-maroon/80" />
                <h3 className="text-xl font-medium">{stat.category}</h3>
                <p className="mt-2 text-sm text-ink/60">{stat.total} lessons</p>
                <p className="mt-1 text-sm text-ink/50">{stat.newToday} new today</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fbfbfc] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-6 text-[11px] uppercase tracking-[0.12em] text-ink/55">Saved for later · {savedLessons.length}</p>
          <div className="space-y-3">
            {savedLessons.length === 0 ? (
              <p className="text-sm text-ink/50">Nothing saved yet. Tap Save on any lesson.</p>
            ) : (
              savedLessons.map((savedLesson) => {
                const savedTime = savedMeta[savedLesson.id];
                const minutesAgo = savedTime ? Math.max(1, Math.round((Date.now() - savedTime) / 60000)) : null;

                return (
                  <div key={savedLesson.id} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
                    <div className="h-4 w-4 rounded-sm bg-maroon" />
                    <p className="text-xs text-ink/60">{savedLesson.category}</p>
                    <p className="truncate text-sm font-medium">{savedLesson.headline}</p>
                    <p className="ml-auto text-xs text-ink/45">
                      Saved {minutesAgo ? `${minutesAgo}m ago` : 'just now'} · {savedLesson.readTimeSeconds} sec
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl justify-between px-4 py-6 text-xs text-ink/50">
        <p>Auto-summarized from news.asu.edu</p>
        <p>Streak · 3 days 🔥</p>
      </footer>
    </div>
  );
}
