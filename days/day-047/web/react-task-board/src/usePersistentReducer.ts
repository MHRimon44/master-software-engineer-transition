import { useEffect, useReducer } from 'react';
import type { Reducer } from 'react';
// Custom hook: reducer owns transitions; effect only synchronizes browser storage.
export function usePersistentReducer<S, A>(key: string, reducer: Reducer<S, A>, initialState: S) {
  const [state, dispatch] = useReducer(reducer, initialState, (fallback) => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as S) : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Storage unavailable:', error);
    }
  }, [key, state]);
  return [state, dispatch] as const;
}
