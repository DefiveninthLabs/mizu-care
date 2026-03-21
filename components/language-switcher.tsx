"use client"

import { useI18n } from '@/lib/i18n'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  variant?: 'select' | 'dropdown' | 'minimal'
  showFlag?: boolean
  showNativeName?: boolean
  className?: string
}

export function LanguageSwitcher({
  variant = 'dropdown',
  showFlag = true,
  showNativeName = false,
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, locales, currentLocaleInfo } = useI18n()

  if (variant === 'select') {
    return (
      <Select value={locale} onValueChange={(value) => setLocale(value as typeof locale)}>
        <SelectTrigger className={className || "w-[140px]"}>
          <SelectValue>
            {showFlag && <span className="mr-2">{currentLocaleInfo.flag}</span>}
            {showNativeName ? currentLocaleInfo.nativeName : currentLocaleInfo.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((loc) => (
            <SelectItem key={loc.code} value={loc.code}>
              {showFlag && <span className="mr-2">{loc.flag}</span>}
              {showNativeName ? loc.nativeName : loc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={className}>
            <Globe className="h-4 w-4 mr-1" />
            <span className="uppercase text-xs">{locale}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {locales.map((loc) => (
            <DropdownMenuItem
              key={loc.code}
              onClick={() => setLocale(loc.code)}
              className={locale === loc.code ? 'bg-accent' : ''}
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
          {showNativeName ? currentLocaleInfo.nativeName : currentLocaleInfo.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => setLocale(loc.code)}
            className={locale === loc.code ? 'bg-accent' : ''}
          >
            {showFlag && <span className="mr-2">{loc.flag}</span>}
            {loc.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
