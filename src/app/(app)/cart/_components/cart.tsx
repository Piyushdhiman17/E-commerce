"use client";

import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useCartStore } from "~/lib/stores";
import { formatPrice } from "~/lib/utils";
import { CartItem } from "./product-cart";
import { Separator } from "~/components/ui/separator";

export const Cart = () => {
  const { items } = useCartStore();

  const cart = {
    items,
    count: items.reduce((acc, item) => acc + item.quantity, 0),
    total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-7xl">
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" aria-label="Continue Shopping">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          {cart.count > 0
            ? `${cart.count} item${cart.count !== 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </section>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-gray-300 dark:text-gray-600" />
          <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-base max-w-md mx-auto">
            Add some products to get started!
          </p>
          <Link href="/">
            <Button size="lg" className="px-8">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cart.items.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-1 sticky top-20 self-start rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md p-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.count} items)</span>
                  <span className="font-semibold">
                    {formatPrice(cart.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">
                    {formatPrice(cart.total * 0.08)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-extrabold text-indigo-800 dark:text-indigo-300">
                <span>Total</span>
                <span>{formatPrice(cart.total * 1.08)}</span>
              </div>

              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                Secure checkout powered by industry-standard encryption
              </p>
            </CardContent>
          </aside>
        </div>
      )}
    </main>
  );
};
