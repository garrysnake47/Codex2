'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { LessonCard } from '@/components/LessonCard';
import { categories, lessons, LessonCategory } from '@/data/lessons';

const SAVED_IDS_KEY = 'sparknotes_saved_ids';

export default function TopicsPage() {
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag');
  const categoryFilter = searchParams.get('category') as LessonCategory | null;

  const [activeCategory, setActiveCategory] = useState<LessonCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_IDS_KEY);
    setSavedIds(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    if (categoryFilter && categories.includes(categoryFilter)) {
      setActiveCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const filteredLessons = useMemo(() => {
    let filtered = lessons;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((lesson) => lesson.category === activeCategory);
    }

    if (tagFilter) {
      filtered = filtered.filter((lesson) => lesson.tags.includes(tagFilter));
    }

    return filtered;
  }, [activeCategory, tagFilter]);

  const toggleSave = (lessonId: string) => {
    const next = savedIds.includes(lessonId)
      ? savedIds.filter((id) => id !== lessonId)
      : [...savedIds, lessonId];

    setSavedIds(next);
    localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] text-ink">
      <Header savedCount={savedIds.length} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-6 space-y-4 rounded-xl border border-black/10 bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-ink/55">Filters and view</p>

          <div className="flex flex-wrap gap-2">
            {(['All', ...categories] as const).map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveCategory(chip)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeCategory === chip
                    ? 'border-maroon bg-maroon text-white'
                    : 'border-black/15 bg-white text-ink/70 hover:border-maroon/30'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60">{filteredLessons.length} lessons available</p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  viewMode === 'grid' ? 'border-maroon text-maroon' : 'border-black/15 text-ink/60'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  viewMode === 'list' ? 'border-maroon text-maroon' : 'border-black/15 text-ink/60'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {tagFilter && (
            <p className="text-sm text-ink/60">
              Active tag: <span className="font-medium text-maroon">{tagFilter}</span>
            </p>
          )}
        </section>

        <section>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                layout={viewMode}
                badges={lesson.tags}
                isSaved={savedIds.includes(lesson.id)}
                onToggleSave={toggleSave}
                showActions
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
