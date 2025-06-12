"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const { theme, setTheme } = React.useContext(
    React.createContext<{
      theme: string
      setTheme: (theme: string) => void
    }>({
      theme: "dark",
      setTheme: () => null,
    }),
  )

  return { theme, setTheme }
}
