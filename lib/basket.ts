export interface BasketItem {
  id: number
  name: string
  price: number
  brand: string
  type: string
  image_url: string | null
}

const BASKET_STORAGE_KEY = "skin-app-basket"

function isBrowser() {
  return typeof window !== "undefined"
}

export function readBasket(): BasketItem[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(BASKET_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeBasket(items: BasketItem[]) {
  if (!isBrowser()) return
  window.localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(items))
}

export function addToBasket(item: BasketItem) {
  const items = readBasket()
  const exists = items.some((basketItem) => basketItem.id === item.id)
  if (exists) return items

  const nextItems = [...items, item]
  writeBasket(nextItems)
  return nextItems
}

export function removeFromBasket(id: number) {
  const nextItems = readBasket().filter((item) => item.id !== id)
  writeBasket(nextItems)
  return nextItems
}

export function clearBasket() {
  writeBasket([])
}
