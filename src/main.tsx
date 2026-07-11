import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app";
import "@/index.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashScreen } from "@/components/shared/splash-screen";

// Initialize theme and direction from localStorage
function initializeApp() {
  const locale = localStorage.getItem("locale") || "en";
  const theme = localStorage.getItem("theme") || "light";

  // Set direction
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = locale;

  // Set theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

initializeApp();

function Root() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <TooltipProvider>
        <App />
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "rounded-xl",
          }}
        />
      </TooltipProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
