'use client';

import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { LessonCard } from '@/components/LessonCard';
import { lessons } from '@/data/lessons';

const SAVED_IDS_KEY = 'sparknotes_saved_ids';

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_IDS_KEY);
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  const savedLessons = useMemo(() => lessons.filter((lesson) => savedIds.includes(lesson.id)), [savedIds]);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header savedCount={savedIds.length} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        {savedLessons.length === 0 ? (
          <p className="text-sm text-ink/55">Nothing saved yet. Tap Save on any lesson.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {savedLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
