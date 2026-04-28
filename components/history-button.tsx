"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { History, Clock, ArrowRight, ExternalLink } from "lucide-react"
import { readStoredScans, StoredScan } from "@/lib/scan-storage"
import { useI18n } from "@/lib/i18n"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ru, enGB } from 'date-fns/locale'

export function HistoryButton({ className }: { className?: string }) {
  const { t, locale } = useI18n()
  const [history, setHistory] = useState<StoredScan[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setHistory(readStoredScans().reverse()) // Show newest first
    setIsHydrated(true)
    
    // Listen for storage changes to update history
    const handleStorage = () => {
      setHistory(readStoredScans().reverse())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  if (!isHydrated) return null

  const dateLocale = locale === 'ru' ? ru : enGB

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`rounded-full relative ${className}`}>
          <History className="h-5 w-5" />
          {history.length > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="flex items-center justify-between px-2 py-2 mb-1">
          <span className="text-sm font-semibold">{t('history.title')}</span>
          <Link href="/results" className="text-xs text-primary hover:underline flex items-center">
             {t('history.viewHistory')} <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <DropdownMenuSeparator />
        
        {history.length === 0 ? (
          <div className="py-6 px-4 text-center">
            <Clock className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">{t('history.emptyTitle')}</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {history.slice(0, 5).map((scan) => (
              <DropdownMenuItem key={scan.id} asChild className="p-0 mb-1 last:mb-0">
                <Link 
                  href={`/results/${scan.id}`}
                  className="flex flex-col items-start p-3 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex w-full justify-between items-center mb-1">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {scan.skinData.skinType}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      {formatDistanceToNow(new Date(scan.savedAt), { addSuffix: true, locale: dateLocale })}
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {scan.skinData.concerns.join(', ')}
                    </p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
