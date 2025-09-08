"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Products } from "~/generated/prisma";
import { useCartStore } from "~/lib/stores";
import { formatPrice } from "~/lib/utils";

export const ProductCard: React.FC<{ product: Products }> = ({
  product: item,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const { addItem, removeItem, items } = useCartStore((state) => state);

  const inCart = React.useMemo(
    () => items.some((cartItem) => cartItem.id === item.id),
    [items, item.id]
  );

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(item.id);
      setJustAdded(false);
      return;
    }
    setIsProcessing(true);
    addItem(item);
    setIsProcessing(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <Card className="flex flex-row items-center gap-6 p-4 hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow min-w-0">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {item.description}
        </p>
        <div className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
          {formatPrice(item.price)}
        </div>
      </div>

      {/* Action */}
      <CardFooter className="p-0 flex justify-end flex-shrink-0 w-40">
        <Button
          onClick={handleAddToCart}
          disabled={isProcessing}
          variant={justAdded ? "secondary" : "default"}
          className="w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Plus className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : justAdded ? (
            <>
              <ShoppingCart className="h-5 w-5" />
              Added!
            </>
          ) : inCart ? (
            "Remove"
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
