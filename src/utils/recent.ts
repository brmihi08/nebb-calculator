import AsyncStorage from '@react-native-async-storage/async-storage';

export type RecentRouteEntry = {
  /** e.g. ['TAB', 'AirflowVolumetricFlowRate'] */
  path: string[];
  /** Best-effort human label */
  title?: string;
  /** Unix ms */
  ts: number;
};

const KEY = 'nebb.recentRoutes.v1';
const MAX = 25;

export async function loadRecentRoutes(): Promise<RecentRouteEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && Array.isArray(x.path) && typeof x.ts === 'number')
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export async function saveRecentRoutes(entries: RecentRouteEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
  } catch {
    // ignore
  }
}

export async function addRecentRoute(entry: Omit<RecentRouteEntry, 'ts'> & { ts?: number }): Promise<void> {
  const ts = entry.ts ?? Date.now();
  const existing = await loadRecentRoutes();

  const next: RecentRouteEntry[] = [
    { ...entry, ts },
    ...existing.filter((e) => e.path.join('>') !== entry.path.join('>')),
  ].slice(0, MAX);

  await saveRecentRoutes(next);
}

export async function clearRecentRoutes(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
