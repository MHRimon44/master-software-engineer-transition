import type { Project } from './data';
export type ProjectResponse = { projects: Project[]; generatedAt: string };
const endpoint = 'https://jsonplaceholder.typicode.com/todos/1';
// A public external API keeps server-side fetch independent from the local server URL.
// Its content is intentionally not displayed as our project data; we use it as a live data source.
export async function fetchExternal(
  mode: 'fresh' | 'cached',
): Promise<{ fetchedAt: string; sampleTitle: string }> {
  const response = await fetch(
    endpoint,
    mode === 'fresh' ? { cache: 'no-store' } : { next: { revalidate: 60 } },
  );
  if (!response.ok) throw new Error(`External API returned ${response.status}`);
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('title' in data) || typeof data.title !== 'string') {
    throw new Error('Unexpected API response');
  }
  return { fetchedAt: new Date().toISOString(), sampleTitle: data.title };
}
