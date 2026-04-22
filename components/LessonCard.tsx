'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Lesson } from '@/data/lessons';

type LessonCardProps = {
  lesson: Lesson;
  layout?: 'grid' | 'list';
  badges?: string[];
  isSaved?: boolean;
  onToggleSave?: (lessonId: string) => void;
  showActions?: boolean;
};

export function LessonCard({
  lesson,
  layout = 'grid',
  badges = [],
  isSaved = false,
  onToggleSave,
  showActions = false
}: LessonCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const containerClasses = useMemo(
    () =>
      layout === 'grid'
        ? 'overflow-hidden rounded-xl border border-black/10 bg-white'
        : 'overflow-hidden rounded-xl border border-black/10 bg-white md:flex',
    [layout]
  );

  const imageClasses =
    layout === 'grid'
      ? 'h-44 w-full object-cover'
      : 'h-48 w-full object-cover md:h-auto md:w-72 md:min-w-72';

  return (
    <article className={containerClasses}>
      <Link href={`/?id=${lesson.id}`}>
        <img src={lesson.imageUrl} alt={lesson.headline} className={imageClasses} loading="lazy" />
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.12em] text-maroon">{lesson.category}</p>
          {badges.map((badge) => (
            <span key={badge} className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-ink/70">
              {badge}
            </span>
          ))}
        </div>

        <Link href={`/?id=${lesson.id}`}>
          <h3 className="text-lg font-medium leading-snug text-ink">{lesson.headline}</h3>
        </Link>

        <p className="text-sm text-ink/60">{lesson.readTimeSeconds} sec read</p>

        {showPreview && <p className="text-sm leading-7 text-ink/75">{lesson.paragraph1}</p>}

        {showActions && (
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setShowPreview((prev) => !prev)}
              className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-ink/70"
            >
              {showPreview ? 'Hide preview' : 'Preview'}
            </button>
            <button
              onClick={() => onToggleSave?.(lesson.id)}
              className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-ink/70"
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <a
              href={lesson.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-ink/70"
            >
              Read full ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
