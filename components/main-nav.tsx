"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NAVIGATION_LINKS } from "@/lib/constants"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rudzz2-kW10vPBxBMsWLPgY2Be1WUV1RH2wvz.svg"
              alt="Rudzz Logo"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="text-xl font-bold text-rudzz-blue">Rudzz</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            {NAVIGATION_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rudzz-blue",
                  pathname === item.href ? "text-rudzz-blue" : "text-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:gap-4">
            <Button variant="outline" asChild className="border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-rudzz-blue text-white hover:bg-rudzz-blue/90">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-rudzz-blue"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <div className="flex flex-col space-y-3 pb-4">
            {NAVIGATION_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rudzz-blue",
                  pathname === item.href ? "text-rudzz-blue" : "text-foreground/60",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild className="border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-rudzz-blue text-white hover:bg-rudzz-blue/90">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

