"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ShoppingCart, UserIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import React from "react";
import { User } from "next-auth";
import { useCartStore } from "~/lib/stores";
import { handleLogout } from "./actions";

export const Header: React.FC<{ user: User | undefined }> = ({ user }) => {
  const { items } = useCartStore();
  const cartCount = items.length;

  return (
    <nav className="border-b bg-white/90 backdrop-blur-md dark:bg-gray-900/90 transition-colors sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
        >
          e-commerce
        </Link>

        <div className="flex items-center space-x-5">
          {/* Cart Button */}
          <Link href="/cart" aria-label={`Cart with ${cartCount} items`}>
            <Button
              variant="outline"
              size="sm"
              className="relative flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="User menu"
                  className="flex items-center gap-2"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="max-w-[8rem] truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-[180px]">
                <DropdownMenuLabel className="text-sm truncate">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
