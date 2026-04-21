import Link from 'next/link';
import { Lesson } from '@/data/lessons';

type LessonCardProps = {
  lesson: Lesson;
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      href={`/?id=${lesson.id}`}
      className="overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-maroon/40"
    >
      <img src={lesson.imageUrl} alt={lesson.headline} className="h-44 w-full object-cover" loading="lazy" />
      <div className="space-y-2 p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-maroon">{lesson.category}</p>
        <h3 className="text-lg font-medium leading-snug text-ink">{lesson.headline}</h3>
        <p className="text-sm text-ink/60">{lesson.readTimeSeconds} sec read</p>
      </div>
    </Link>
  );
}
