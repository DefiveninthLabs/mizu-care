"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'uk' | 'es' | 'fr' | 'de'

export interface LocaleInfo {
  code: Locale
  name: string
  nativeName: string
  flag: string
}

export const locales: LocaleInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
]

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  locales: LocaleInfo[]
  currentLocaleInfo: LocaleInfo
  // Translation function placeholder - will be implemented later
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'app-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  // Load locale from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && locales.some(l => l.code === stored)) {
      setLocaleState(stored)
    }
    setIsHydrated(true)
  }, [])

  // Save locale to localStorage when it changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  const currentLocaleInfo = locales.find(l => l.code === locale) || locales[0]

  // Placeholder translation function - returns the key for now
  const t = (key: string, params?: Record<string, string>): string => {
    let result = key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, v)
      })
    }
    return result
  }

  // Prevent hydration mismatch by not rendering until client-side hydration is complete
  if (!isHydrated) {
    return null
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        locales,
        currentLocaleInfo,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
