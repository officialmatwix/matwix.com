"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translateWithCache } from "@/lib/translation-service"

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
  banking: {
    en: "Banking",
    es: "Banca",
  },
  visualization: {
    en: "Visualization",
    es: "Visualización",
  },
  quantum: {
    en: "Quantum Assistant",
    es: "Asistente Cuántico",
  },
  insights: {
    en: "Quantum Insights",
    es: "Perspectivas Cuánticas",
  },
  compensation: {
    en: "Compensation",
    es: "Compensación",
  },
  markAllRead: {
    en: "Mark all read",
    es: "Marcar todo como leído",
  },
  viewAllNotifications: {
    en: "View all notifications",
    es: "Ver todas las notificaciones",
  },
  typeYourMessage: {
    en: "Type your message...",
    es: "Escribe tu mensaje...",
  },
  security: {
    en: "Security",
    es: "Seguridad",
  },
  account: {
    en: "Account",
    es: "Cuenta",
  },
  notifications: {
    en: "Notifications",
    es: "Notificaciones",
  },
  language: {
    en: "Language",
    es: "Idioma",
  },
  networkSettings: {
    en: "Network Settings",
    es: "Configuración de Red",
  },
  networkStructure: {
    en: "Network Structure",
    es: "Estructura de Red",
  },
  directReferrals: {
    en: "Direct Referrals",
    es: "Referencias Directas",
  },
  teamMembers: {
    en: "Team Members",
    es: "Miembros del Equipo",
  },
  networkVisualization: {
    en: "Network Visualization",
    es: "Visualización de Red",
  },
  networkStatistics: {
    en: "Network Statistics",
    es: "Estadísticas de Red",
  },
  totalMembers: {
    en: "Total Members",
    es: "Total de Miembros",
  },
  activeMembers: {
    en: "Active Members",
    es: "Miembros Activos",
  },
  newMembers: {
    en: "New Members",
    es: "Nuevos Miembros",
  },
  networkVolume: {
    en: "Network Volume",
    es: "Volumen de Red",
  },
  personalVolume: {
    en: "Personal Volume",
    es: "Volumen Personal",
  },
  groupVolume: {
    en: "Group Volume",
    es: "Volumen de Grupo",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translateDynamic: (text: string) => Promise<string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, Record<string, string>>>({})

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

  // Translation function for static content
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

    // Check dynamic translations
    const dynamicKey = keys.join(".")
    if (dynamicTranslations[dynamicKey] && dynamicTranslations[dynamicKey][language]) {
      return dynamicTranslations[dynamicKey][language]
    }

    // Fallback to the key if translation not found
    return key
  }

  // Function to translate dynamic content using DeepL API
  const translateDynamic = async (text: string): Promise<string> => {
    if (language === "en") return text

    // Check if we already have this translation cached
    const cacheKey = `dynamic_${text}`
    if (dynamicTranslations[cacheKey] && dynamicTranslations[cacheKey][language]) {
      return dynamicTranslations[cacheKey][language]
    }

    try {
      const translated = await translateWithCache(text, language === "es" ? "ES" : "EN")

      // Cache the translation
      setDynamicTranslations((prev) => ({
        ...prev,
        [cacheKey]: {
          ...prev[cacheKey],
          [language]: translated,
        },
      }))

      return translated
    } catch (error) {
      console.error("Translation error:", error)
      return text
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDynamic }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
