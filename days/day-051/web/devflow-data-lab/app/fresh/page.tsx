import { Suspense } from 'react';
import ExternalData from '@/components/external-data';
export const dynamic = 'force-dynamic';
export default function FreshPage() {
  return (
    <>
      <h1>Fresh fetch</h1>
      <p>
        <code>cache: 'no-store'</code> requests fresh data for each server render.
      </p>
      <Suspense fallback={<p>Loading fresh data…</p>}>
        <ExternalData mode="fresh" />
      </Suspense>
    </>
  );
}
