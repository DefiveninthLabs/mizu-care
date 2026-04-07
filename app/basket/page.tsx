"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BasketItem, clearBasket, readBasket, removeFromBasket } from "@/lib/basket"

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>([])

  useEffect(() => {
    setItems(readBasket())
  }, [])

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price), 0),
    [items]
  )

  const handleClear = () => {
    clearBasket()
    setItems([])
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/products">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="text-lg font-bold text-foreground">Basket</span>
          </div>
          <span className="text-sm text-muted-foreground">{items.length} item(s)</span>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your basket is empty</h2>
            <p className="text-muted-foreground mb-6">Add products from any product details page.</p>
            <Link href="/products">
              <Button className="rounded-full">Browse products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-border/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground/40">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary font-medium">{item.brand}</p>
                    <p className="font-semibold text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{Number(item.price).toLocaleString("ru-KZ")} ₸</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setItems(removeFromBasket(item.id))}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{total.toLocaleString("ru-KZ")} ₸</p>
                </div>
                <Button variant="outline" className="rounded-full" onClick={handleClear}>
                  Clear basket
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
