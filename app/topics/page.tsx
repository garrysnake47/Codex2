import { Suspense } from 'react';
import TopicsPageClient from '@/components/TopicsPageClient';

export default function TopicsPage() {
  return (
    <Suspense>
      <TopicsPageClient />
    </Suspense>
  );
}
