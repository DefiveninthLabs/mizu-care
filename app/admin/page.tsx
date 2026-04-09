"use client"

import { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Package, ArrowLeft, LayoutGrid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n"

interface Product {
  id: number
  name: string
  description: string | null
  usage_tip: string | null
  price: number
  brand: string
  type: string
  image_url: string | null
  created_at: string
  updated_at: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

type ProductsViewMode = "list" | "cards"
const PRODUCTS_VIEW_MODE_KEY = "admin-products-view-mode"

const productTypes = [
  "Spray",
  "Cream",
  "Serum",
  "Cleanser",
  "Toner",
  "Mask",
  "Oil",
  "Sunscreen",
  "Enzyme PCT",
  "Toner Pads",
  "Spot Treatments",
  "Eye Care",
  "Hydrophilic Products",
  "Dietary Supplements",
  "SPF"
  ]

export default function AdminPage() {
  const { t } = useI18n()
  const { data: products, error, isLoading } = useSWR<Product[]>('/api/products', fetcher)
  const { data: brands } = useSWR<string[]>('/api/products/brands', fetcher)
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewMode, setViewMode] = useState<ProductsViewMode>("list")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    usage_tip: "",
    price: "",
    brand: "",
    type: "",
    image_url: ""
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      usage_tip: "",
      price: "",
      brand: "",
      type: "",
      image_url: ""
    })
    setEditingProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      usage_tip: product.usage_tip || "",
      price: product.price.toString(),
      brand: product.brand,
      type: product.type,
      image_url: product.image_url || ""
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      name: formData.name,
      description: formData.description || null,
      usage_tip: formData.usage_tip || null,
      price: parseFloat(formData.price),
      brand: formData.brand,
      type: formData.type,
      image_url: formData.image_url || null
    }

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
      }
      
      mutate('/api/products')
      mutate('/api/products/brands')
      mutate('/api/products/types')
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      mutate('/api/products')
      mutate('/api/products/brands')
      mutate('/api/products/types')
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PRODUCTS_VIEW_MODE_KEY)
      if (raw === "list" || raw === "cards") setViewMode(raw)
    } catch {
      // ignore
    }
  }, [])

  const setAndPersistViewMode = (mode: ProductsViewMode) => {
    setViewMode(mode)
    try {
      window.localStorage.setItem(PRODUCTS_VIEW_MODE_KEY, mode)
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-display">{t('admin.title')}</h1>
              <p className="text-muted-foreground">{t('admin.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="select" showNativeName />

            <div className="hidden sm:flex items-center rounded-full border border-border/60 bg-background p-1">
              <Button
                type="button"
                size="sm"
                variant={viewMode === "list" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setAndPersistViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                {t('admin.view.list')}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={viewMode === "cards" ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setAndPersistViewMode("cards")}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                {t('admin.view.cards')}
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}>
              <DialogTrigger asChild>
                <Button className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.addProduct')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? t('admin.editProduct') : t('admin.addProduct')}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Hydrating Facial Mist"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usage_tip">Usage Tip</Label>
                    <Textarea
                      id="usage_tip"
                      value={formData.usage_tip}
                      onChange={(e) => setFormData({ ...formData, usage_tip: e.target.value })}
                      placeholder="e.g., For oily skin, stick to the skin. Apply a pea-sized amount..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Short how-to tip shown on the product card and detail page.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₸)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="12 990"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g., MizuCaire"
                        required
                        list="brands"
                      />
                      <datalist id="brands">
                        {brands?.map(brand => (
                          <option key={brand} value={brand} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Product Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL (optional)</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">{t('common.cancel')}</Button>
                    </DialogClose>
                    <Button type="submit">
                      {editingProduct ? t('common.save') : t('admin.addProduct')}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('admin.totalProducts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('admin.totalBrands')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brands?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Products
              </CardTitle>
              <div className="flex sm:hidden items-center rounded-full border border-border/60 bg-background p-1">
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  className="rounded-full"
                  onClick={() => setAndPersistViewMode("list")}
                >
                  <List className="h-4 w-4 mr-2" />
                  {t('admin.view.list')}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  className="rounded-full"
                  onClick={() => setAndPersistViewMode("cards")}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  {t('admin.view.cards')}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">{t('common.loading')}</div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">{t('common.error')}</div>
            ) : products && products.length > 0 ? (
              viewMode === "list" ? (
                <div className="overflow-x-auto">
                  <Table className="table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[360px]">Name</TableHead>
                        <TableHead className="w-[140px]">Brand</TableHead>
                        <TableHead className="w-[160px]">Type</TableHead>
                        <TableHead className="w-[260px]">Usage Tip</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="whitespace-normal align-top">
                            <div>
                              <div className="font-medium wrap-break-word line-clamp-2">{product.name}</div>
                              {product.description && (
                                <div className="text-sm text-muted-foreground line-clamp-2 wrap-break-word">
                                  {product.description}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {product.type}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-[260px] whitespace-normal align-top">
                            {product.usage_tip ? (
                              <span className="text-sm text-muted-foreground line-clamp-3 wrap-break-word">
                                {product.usage_tip}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground/50 italic">No tip set</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {Number(product.price).toLocaleString('ru-KZ')} ₸
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(product)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      {t('admin.deleteConfirm', { name: product.name })}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(product.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="p-0 group overflow-hidden border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="relative h-64 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted-foreground/50">
                            <Package className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-primary mb-1">{product.brand}</p>
                          <div className="font-semibold text-foreground mb-2 line-clamp-2 wrap-break-word group-hover:text-primary transition-colors">
                            {product.name}
                          </div>
                          {product.description && (
                            <div className="text-sm text-muted-foreground line-clamp-2 wrap-break-word mb-3">
                              {product.description}
                            </div>
                          )}
                          {product.usage_tip ? (
                            <div className="text-xs text-muted-foreground line-clamp-3 wrap-break-word">
                              {product.usage_tip}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {product.type}
                            </span>
                            <div className="font-bold text-foreground">
                              {Number(product.price).toLocaleString('ru-KZ')} ₸
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                              onClick={() => openEditDialog(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full text-destructive border-destructive/30 hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {t('admin.deleteConfirm', { name: product.name })}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No products yet</p>
                <p className="text-sm text-muted-foreground mt-1">Click "Add Product" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
