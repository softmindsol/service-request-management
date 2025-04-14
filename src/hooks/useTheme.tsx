// src/hooks/useThemeMode.ts

import { useState } from "react";

export type ThemeMode = "light" | "dark";

export default function useThemeMode(defaultTheme: ThemeMode = "light") {
    const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

    return {
        theme,
        setTheme,
        toggleTheme: () => setTheme(prev => (prev === "light" ? "dark" : "light")),
    };
}
