import { Suspense } from 'react';
import ExternalData from '@/components/external-data';
export default function CachedPage() { return <><h1>Cached fetch</h1><p><code>next: {'{ revalidate: 60 }'}</code> requests can reuse a response for 60 seconds.</p><Suspense fallback={<p>Loading cached data…</p>}><ExternalData mode="cached" /></Suspense></>; }
