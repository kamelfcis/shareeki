import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const RELOAD_KEY = "shareeki-chunk-reload";

function reloadOnceOnChunkFailure(): never {
  if (!sessionStorage.getItem(RELOAD_KEY)) {
    sessionStorage.setItem(RELOAD_KEY, "1");
    window.location.reload();
  }
  throw new Error("Chunk load failed");
}

export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await factory();
    } catch {
      reloadOnceOnChunkFailure();
    }
  });
}
