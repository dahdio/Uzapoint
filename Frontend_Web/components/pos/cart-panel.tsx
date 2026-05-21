"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import type { Product } from "./product-grid"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartPanelProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
  onCheckout: () => void
}

export function CartPanel({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartPanelProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const tax = Math.round(subtotal * 0.16)
  const total = subtotal + tax

  return (
    <Card className="border flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShoppingCart className="size-4" />
            Cart ({items.length})
          </CardTitle>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-7"
              onClick={onClearCart}
            >
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pb-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ShoppingCart className="size-8 mb-2" />
            <p className="text-xs">Cart is empty</p>
            <p className="text-[10px]">Tap products to add them</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    KES {item.product.price.toLocaleString()} each
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-6"
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <Minus className="size-3" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="text-xs font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-6"
                    onClick={() =>
                      onUpdateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <Plus className="size-3" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-muted-foreground"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    <Trash2 className="size-3" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
                <p className="text-xs font-bold w-16 text-right shrink-0">
                  KES {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {items.length > 0 && (
        <div className="p-4 mt-auto">
          <Separator className="mb-3" />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">VAT (16%)</span>
              <span>KES {tax.toLocaleString()}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button variant="outline" size="sm" className="text-xs">
              Cash
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              M-Pesa
            </Button>
          </div>
          <Button className="w-full mt-2" onClick={onCheckout}>
            Complete Sale
          </Button>
        </div>
      )}
    </Card>
  )
}
