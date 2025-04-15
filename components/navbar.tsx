"use client"

// rwr

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Film, Bookmark, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <Film className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            MoodFlix
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("relative", isActive && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          <div className="flex md:hidden items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="icon"
                    className={cn("relative", isActive && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="h-4 w-4" />
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator-mobile"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
