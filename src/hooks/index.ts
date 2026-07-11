import { useState, useCallback, useEffect } from "react";
import { store } from "@/store";

export function useAuth() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const login = useCallback((email: string, _password: string) => {
    const user = email.includes("admin") ? {
      id: "usr_002",
      email: "admin@shareky.com",
      name: "Sara Ibrahim",
      nameAr: "سارة إبراهيم",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sara",
      role: "admin" as const,
      employeeId: "ADM-2024-001",
      department: "Administration",
      departmentAr: "الإدارة",
      position: "Platform Administrator",
      positionAr: "مدير المنصة",
      company: "Egyptian Petroleum Corp",
      companyAr: "شركة البترول المصرية",
      phone: "+20 10 9876 5432",
      joinDate: "2021-01-10",
      status: "active" as const,
    } : {
      id: "usr_001",
      email: "ahmed.hassan@shareky.com",
      name: "Ahmed Hassan",
      nameAr: "أحمد حسن",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ahmed",
      role: "employee" as const,
      employeeId: "EMP-2024-001",
      department: "Engineering",
      departmentAr: "الهندسة",
      position: "Senior Software Engineer",
      positionAr: "مهندس برمجيات أول",
      company: "Egyptian Petroleum Corp",
      companyAr: "شركة البترول المصرية",
      phone: "+20 10 1234 5678",
      joinDate: "2022-03-15",
      status: "active" as const,
    };

    store.login(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    store.logout();
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };
}

export function useLocale() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const setLocale = useCallback((locale: "en" | "ar") => {
    store.setLocale(locale);
  }, []);

  return {
    locale: state.locale,
    direction: state.direction,
    setLocale,
    isRTL: state.direction === "rtl",
  };
}

export function useTheme() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const setTheme = useCallback((theme: "light" | "dark" | "system") => {
    store.setTheme(theme);
  }, []);

  return {
    theme: state.theme,
    setTheme,
  };
}

export function useSidebar() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    store.toggleSidebar();
  }, []);

  const closeSidebar = useCallback(() => {
    store.closeSidebar();
  }, []);

  const toggleCollapsed = useCallback(() => {
    store.toggleSidebarCollapsed();
  }, []);

  return {
    isOpen: state.sidebarOpen,
    isCollapsed: state.sidebarCollapsed,
    toggleSidebar,
    closeSidebar,
    toggleCollapsed,
  };
}

export function useCommandPalette() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const toggle = useCallback(() => {
    store.toggleCommandPalette();
  }, []);

  const close = useCallback(() => {
    store.closeCommandPalette();
  }, []);

  return {
    isOpen: state.commandPaletteOpen,
    toggle,
    close,
  };
}
