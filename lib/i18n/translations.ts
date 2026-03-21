import { Locale } from './context'

// Placeholder translations structure - will be filled in later
// Keys are organized by page/section for easy maintenance

export type TranslationKeys = {
  // Common
  'common.loading': string
  'common.error': string
  'common.save': string
  'common.cancel': string
  'common.delete': string
  'common.edit': string
  'common.add': string
  'common.search': string
  'common.filter': string
  'common.all': string
  
  // Navigation
  'nav.home': string
  'nav.products': string
  'nav.science': string
  'nav.reviews': string
  'nav.admin': string
  
  // Products page
  'products.title': string
  'products.searchPlaceholder': string
  'products.allBrands': string
  'products.allTypes': string
  'products.noProducts': string
  'products.clearFilters': string
  
  // Admin page
  'admin.title': string
  'admin.addProduct': string
  'admin.editProduct': string
  'admin.deleteConfirm': string
  'admin.totalProducts': string
  'admin.totalBrands': string
  'admin.avgPrice': string
  
  // Product fields
  'product.name': string
  'product.description': string
  'product.price': string
  'product.brand': string
  'product.type': string
  'product.imageUrl': string
}

// Empty translations object - will be populated when implementing i18n
export const translations: Record<Locale, Partial<TranslationKeys>> = {
  en: {},
  uk: {},
  es: {},
  fr: {},
  de: {},
}
