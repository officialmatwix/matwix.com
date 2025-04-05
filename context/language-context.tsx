"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

type Translations = {
  [key: string]: {
    en: string
    es: string
  }
}

// Common translations used across the application
const translations: Translations = {
  dashboard: {
    en: "Dashboard",
    es: "Panel de Control",
  },
  network: {
    en: "My Network",
    es: "Mi Red",
  },
  team: {
    en: "Team",
    es: "Equipo",
  },
  commissions: {
    en: "Commissions",
    es: "Comisiones",
  },
  products: {
    en: "Products",
    es: "Productos",
  },
  recruitment: {
    en: "Recruitment",
    es: "Reclutamiento",
  },
  achievements: {
    en: "Achievements",
    es: "Logros",
  },
  terminal: {
    en: "Terminal",
    es: "Terminal",
  },
  settings: {
    en: "Settings",
    es: "Configuración",
  },
  academy: {
    en: "Academy",
    es: "Academia",
  },
  ai: {
    en: "AI Assistant",
    es: "Asistente IA",
  },
  back: {
    en: "Back",
    es: "Volver",
  },
  search: {
    en: "Search",
    es: "Buscar",
  },
  notifications: {
    en: "Notifications",
    es: "Notificaciones",
  },
  profile: {
    en: "Profile",
    es: "Perfil",
  },
  logout: {
    en: "Logout",
    es: "Cerrar Sesión",
  },
  courses: {
    en: "Courses",
    es: "Cursos",
  },
  myCourses: {
    en: "My Courses",
    es: "Mis Cursos",
  },
  progress: {
    en: "Progress",
    es: "Progreso",
  },
  certificates: {
    en: "Certificates",
    es: "Certificados",
  },
  instructors: {
    en: "Instructors",
    es: "Instructores",
  },
  resources: {
    en: "Resources",
    es: "Recursos",
  },
  chat: {
    en: "Chat",
    es: "Chat",
  },
  askAi: {
    en: "Ask AI",
    es: "Preguntar a IA",
  },
  networkStatus: {
    en: "NETWORK STATUS",
    es: "ESTADO DE LA RED",
  },
  networkGrowth: {
    en: "Network Growth",
    es: "Crecimiento de Red",
  },
  rankProgress: {
    en: "Rank Progress",
    es: "Progreso de Rango",
  },
  recruitment: {
    en: "Recruitment",
    es: "Reclutamiento",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let current = translations
    let translationObj = null

    // Navigate through nested keys
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        translationObj = current[keys[i]]
      } else {
        current = current[keys[i]] as unknown as Translations
        if (!current) break
      }
    }

    if (translationObj && translationObj[language]) {
      return translationObj[language]
    }

    // Fallback to the key if translation not found
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

