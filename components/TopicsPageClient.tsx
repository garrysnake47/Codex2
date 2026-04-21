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
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_IDS_KEY);
    setSavedCount(stored ? JSON.parse(stored).length : 0);
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

  return (
    <div className="min-h-screen bg-[#fbfbfc] text-ink">
      <Header savedCount={savedCount} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-6 rounded-xl border border-black/10 bg-white p-5">
          <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-ink/55">Filter topics</p>
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
          {tagFilter && (
            <p className="mt-4 text-sm text-ink/60">
              Active tag: <span className="font-medium text-maroon">{tagFilter}</span>
            </p>
          )}
        </section>

        <section>
          <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-ink/55">
            {filteredLessons.length} lessons available
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
