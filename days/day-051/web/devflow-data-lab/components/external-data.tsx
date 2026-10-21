import { fetchExternal } from '@/lib/fetch-projects';
export default async function ExternalData({ mode }: { mode: 'fresh' | 'cached' }) {
  try {
    const data = await fetchExternal(mode);
    return <div className="card"><p>Public API sample: <strong>{data.sampleTitle}</strong></p><p>Rendered at: <code>{data.fetchedAt}</code></p><p className="muted">Note: renderedAt changes on new server renders even when the underlying fetch result is cached.</p></div>;
  } catch (error) {
    return <div role="alert" className="card"><strong>Data source unavailable</strong><p>{error instanceof Error ? error.message : 'Unknown error'}</p><p>Check internet access and retry.</p></div>;
  }
}
