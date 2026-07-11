import type { Locale, Theme, User } from "@/types";

type Subscriber = () => void;

class Store {
  private state: {
    user: User | null;
    isAuthenticated: boolean;
    locale: Locale;
    direction: "ltr" | "rtl";
    theme: Theme;
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;
    commandPaletteOpen: boolean;
    notifications: number;
  };
  private subscribers: Set<Subscriber> = new Set();

  constructor() {
    this.state = {
      user: null,
      isAuthenticated: false,
      locale: (localStorage.getItem("locale") as Locale) || "en",
      direction: (localStorage.getItem("locale") as Locale) === "ar" ? "rtl" : "ltr",
      theme: (localStorage.getItem("theme") as Theme) || "light",
      sidebarOpen: false,
      sidebarCollapsed: localStorage.getItem("sidebarCollapsed") === "true",
      commandPaletteOpen: false,
      notifications: 3,
    };
  }

  getState() {
    return { ...this.state };
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  private notify() {
    this.subscribers.forEach((s) => s());
  }

  setUser(user: User | null) {
    this.state.user = user;
    this.state.isAuthenticated = !!user;
    this.notify();
  }

  setLocale(locale: Locale) {
    this.state.locale = locale;
    this.state.direction = locale === "ar" ? "rtl" : "ltr";
    localStorage.setItem("locale", locale);
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    this.notify();
  }

  setTheme(theme: Theme) {
    this.state.theme = theme;
    localStorage.setItem("theme", theme);
    this.notify();
  }

  toggleSidebar() {
    this.state.sidebarOpen = !this.state.sidebarOpen;
    this.notify();
  }

  closeSidebar() {
    this.state.sidebarOpen = false;
    this.notify();
  }

  toggleSidebarCollapsed() {
    this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
    localStorage.setItem("sidebarCollapsed", String(this.state.sidebarCollapsed));
    this.notify();
  }

  toggleCommandPalette() {
    this.state.commandPaletteOpen = !this.state.commandPaletteOpen;
    this.notify();
  }

  closeCommandPalette() {
    this.state.commandPaletteOpen = false;
    this.notify();
  }

  setNotifications(count: number) {
    this.state.notifications = count;
    this.notify();
  }

  logout() {
    this.state.user = null;
    this.state.isAuthenticated = false;
    localStorage.removeItem("auth_token");
    this.notify();
  }

  login(user: User) {
    this.state.user = user;
    this.state.isAuthenticated = true;
    localStorage.setItem("auth_token", "mock_token_" + user.id);
    this.notify();
  }
}

export const store = new Store();

export function useStore() {
  return store.getState();
}

export function useStoreSubscribe(callback: () => void) {
  return store.subscribe(callback);
}
