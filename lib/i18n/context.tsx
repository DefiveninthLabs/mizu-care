"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, TranslationKeys } from './translations'

export type Locale = 'en' | 'ru' | 'kz'

export interface LocaleInfo {
  code: Locale
  name: string
  nativeName: string
  flag: string
}

export const locales: LocaleInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'kz', name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿' },
]

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  locales: LocaleInfo[]
  currentLocaleInfo: LocaleInfo
  t: (key: keyof TranslationKeys, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'app-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && locales.some(l => l.code === stored)) {
      setLocaleState(stored)
    }
    setIsHydrated(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  const currentLocaleInfo = locales.find(l => l.code === locale) || locales[0]

  const t = (key: keyof TranslationKeys, params?: Record<string, string>): string => {
    let result: string = translations[locale][key] ?? translations['en'][key] ?? key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, v)
      })
    }
    return result
  }

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
