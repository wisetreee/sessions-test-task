export interface SessionStats {
  jsErrors?: number;
  consoleErrors?: number;
  failedRequests?: number;
  pendingRequests?: number;
  p95RequestMs?: number;
  rageClicks?: number;
  deadClicks?: number;
}

export interface SessionFlags {
  corrupted?: boolean;
}

export interface SessionListItem {
  id: string;
  startedAt?: number;
  durationMs?: number;
  entryUrl?: string;
  lastRoute?: string;
  eventCount?: number;
  stats?: SessionStats;
  flags?: SessionFlags;
}

export interface SessionUser {
  id?: string;
  locale?: string;
}

export interface SessionDevice {
  ua?: string;
  viewport?: string;
  os?: string;
}

export interface SessionDetails {
  id: string;
  startedAt?: number;
  endedAt?: number;
  user?: SessionUser;
  device?: SessionDevice;
  events?: Event[];
}
