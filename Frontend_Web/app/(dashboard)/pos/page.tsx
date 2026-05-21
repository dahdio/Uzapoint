"use client"

import { useState, useCallback } from "react"
import { AppHeader } from "@/components/app-header"
import { ProductGrid, type Product } from "@/components/pos/product-grid"
import { CartPanel, type CartItem } from "@/components/pos/cart-panel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"

export default function POSPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastSale, setLastSale] = useState<CartItem[]>([])

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCartItems((prev) =>
          prev.filter((item) => item.product.id !== productId)
        )
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        )
      }
    },
    []
  )

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    )
  }, [])

  const handleClearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const handleCheckout = useCallback(() => {
    setLastSale(cartItems)
    setCartItems([])
    setShowReceipt(true)
  }, [cartItems])

  const saleSubtotal = lastSale.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const saleTax = Math.round(saleSubtotal * 0.16)
  const saleTotal = saleSubtotal + saleTax

  return (
    <>
      <AppHeader title="Point of Sale" description="Process sales and manage transactions" />
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        <div className="flex-1 overflow-auto p-4">
          <ProductGrid onAddToCart={handleAddToCart} />
        </div>
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l shrink-0 h-80 lg:h-auto">
          <CartPanel
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="size-4" />
              </div>
              Sale Complete
            </DialogTitle>
            <DialogDescription>
              Transaction processed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-4">
            <div className="text-center mb-3">
              <p className="font-bold text-sm">Uzapoint</p>
              <p className="text-[10px] text-muted-foreground">
                Receipt #{String(Date.now()).slice(-6)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {new Date().toLocaleString()}
              </p>
            </div>
            <Separator className="my-2" />
            {lastSale.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-xs py-1"
              >
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span className="font-medium">
                  KES{" "}
                  {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between text-xs">
              <span>Subtotal</span>
              <span>KES {saleSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>VAT (16%)</span>
              <span>KES {saleTax.toLocaleString()}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span>KES {saleTotal.toLocaleString()}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowReceipt(false)}>
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
