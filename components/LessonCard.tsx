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

const badgePalette = ['bg-maroon text-white', 'bg-blue-600 text-white', 'bg-emerald-600 text-white'];

export function LessonCard({
  lesson,
  layout = 'grid',
  badges = [],
  isSaved = false,
  onToggleSave,
  showActions = false
}: LessonCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

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
    <>
      <article className={containerClasses}>
        <div className="relative">
          <Link href={`/?id=${lesson.id}`}>
            <img src={lesson.imageUrl} alt={lesson.headline} className={imageClasses} loading="lazy" />
          </Link>
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {badges.slice(0, 3).map((badge, idx) => (
              <span
                key={badge}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgePalette[idx % badgePalette.length]}`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-maroon">{lesson.category}</p>

          <Link href={`/?id=${lesson.id}`}>
            <h3 className="text-lg font-medium leading-snug text-ink">{lesson.headline}</h3>
          </Link>

          <p className="text-sm text-ink/60">{lesson.readTimeSeconds} sec read</p>

          {showActions && (
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setPreviewOpen(true)}
                className="rounded-full bg-maroon px-3 py-1.5 text-xs text-white"
              >
                Preview
              </button>
              <button
                onClick={() => onToggleSave?.(lesson.id)}
                className="rounded-full bg-blue-600 px-3 py-1.5 text-xs text-white"
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <a
                href={lesson.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-3 py-1.5 text-xs text-white"
              >
                Read full ↗
              </a>
            </div>
          )}
        </div>
      </article>

      {previewOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-medium">Lesson preview</h4>
              <button onClick={() => setPreviewOpen(false)} className="rounded-full border border-black/15 px-3 py-1 text-xs">
                Close
              </button>
            </div>
            <p className="text-sm uppercase tracking-[0.12em] text-maroon">{lesson.category}</p>
            <h5 className="mt-2 text-xl font-medium leading-snug">{lesson.headline}</h5>
            <p className="mt-4 text-sm leading-7 text-ink/80">{lesson.paragraph1}</p>
            <p className="mt-3 text-sm leading-7 text-ink/80">{lesson.paragraph2}</p>
          </div>
        </div>
      )}
    </>
  );
}
