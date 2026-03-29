"use client"

import { useI18n } from '@/lib/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'minimal'
  showFlag?: boolean
  className?: string
}

export function LanguageSwitcher({
  variant = 'dropdown',
  showFlag = true,
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, locales, currentLocaleInfo } = useI18n()

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={className}>
            <Globe className="h-4 w-4 mr-1" />
            <span className="uppercase text-xs font-semibold">{locale}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {locales.map((loc) => (
            <DropdownMenuItem
              key={loc.code}
              onClick={() => setLocale(loc.code)}
              className={locale === loc.code ? 'bg-accent font-medium' : ''}
            >
              {showFlag && <span className="mr-2">{loc.flag}</span>}
              {loc.nativeName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Default: dropdown variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          {showFlag && <span className="mr-2">{currentLocaleInfo.flag}</span>}
          {currentLocaleInfo.nativeName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => setLocale(loc.code)}
            className={locale === loc.code ? 'bg-accent font-medium' : ''}
          >
            {showFlag && <span className="mr-2">{loc.flag}</span>}
            {loc.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
