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

const statusBadgeClass = (badge: string) => {
  if (badge.includes('Trending')) return 'bg-rose-600 text-white';
  if (badge.includes('Popular')) return 'bg-blue-600 text-white';
  if (badge.includes('New')) return 'bg-emerald-600 text-white';
  return 'bg-amber-500 text-white';
};

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
            {badges.slice(0, 1).map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-3 py-1 text-[11px] font-medium ${statusBadgeClass(badge)}`}
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
                className="rounded-full border border-maroon px-4 py-1.5 text-xs font-medium text-maroon"
              >
                Preview
              </button>
              <button
                onClick={() => onToggleSave?.(lesson.id)}
                className="rounded-full border border-blue-600 px-4 py-1.5 text-xs font-medium text-blue-600"
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <a
                href={lesson.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink px-4 py-1.5 text-xs font-medium text-ink"
              >
                Read full ↗
              </a>
            </div>
          )}
        </div>
      </article>

      {previewOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/45 p-4" role="dialog" aria-modal="true">
          <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.12em] text-ink/60">
                {lesson.category} · {lesson.readTimeSeconds} sec read · {lesson.publishedAgo}
              </p>
              <button
                onClick={() => setPreviewOpen(false)}
                className="rounded-full border border-black/20 px-3 py-1 text-xs"
              >
                Close
              </button>
            </div>

            <h4 className="mb-6 text-[32px] font-medium leading-tight tracking-[-0.02em]">{lesson.headline}</h4>

            <img
              src={lesson.imageUrl}
              alt={lesson.headline}
              className="h-[300px] w-full rounded-xl border border-black/10 object-cover"
            />
            <p className="mt-2 text-[11px] text-ink/50">Image: {lesson.imageCredit}</p>

            <div className="mt-7 space-y-5 text-base leading-[1.75] text-ink/90">
              <p>{lesson.paragraph1}</p>
              <p>{lesson.paragraph2}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {lesson.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-black/15 px-3 py-1 text-sm text-ink/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
