import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/store";

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts?: ShortcutConfig[]) {
  const navigate = useNavigate();

  const defaultShortcuts: ShortcutConfig[] = [
    {
      key: "k",
      ctrl: true,
      action: () => store.toggleCommandPalette(),
      description: "Open command palette",
    },
    {
      key: "d",
      ctrl: true,
      action: () => navigate("/dashboard"),
      description: "Go to dashboard",
    },
    {
      key: "s",
      ctrl: true,
      action: () => navigate("/services"),
      description: "Go to services",
    },
    {
      key: "r",
      ctrl: true,
      action: () => navigate("/requests"),
      description: "Go to requests",
    },
    {
      key: "w",
      ctrl: true,
      action: () => navigate("/wallet"),
      description: "Go to wallet",
    },
    {
      key: "[",
      ctrl: true,
      action: () => store.toggleSidebarCollapsed(),
      description: "Toggle sidebar",
    },
    {
      key: "Escape",
      action: () => {
        store.closeSidebar();
        store.closeCommandPalette();
      },
      description: "Close modals",
    },
  ];

  const allShortcuts = [...defaultShortcuts, ...(shortcuts || [])];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of allShortcuts) {
        const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !(event.ctrlKey || event.metaKey);
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    },
    [allShortcuts]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export function useHotkey(key: string, callback: () => void, deps: { ctrl?: boolean; shift?: boolean } = {}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlMatch = deps.ctrl ? (event.ctrlKey || event.metaKey) : !(event.ctrlKey || event.metaKey);
      const shiftMatch = deps.shift ? event.shiftKey : !event.shiftKey;

      if (event.key.toLowerCase() === key.toLowerCase() && ctrlMatch && shiftMatch) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, deps.ctrl, deps.shift]);
}
