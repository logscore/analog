"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SignUpFormReact from "@/components/common/email-waitlist"
import { ModeToggle } from "@/components/common/mode-toggle"
import Link from "next/link"
import { GitHub } from "@/components/icons/github"
import { CalendarIcon } from "@/components/icons/calendar"

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              <span className="font-semibold font-serif italic text-xl">Analog</span>
            </div>
            <Button variant="outline" size="sm" className="text-sm" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="space-y-4 sm:space-y-6 max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              The calendar that changes{' '}
              <span className="font-serif italic">everything</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              <span className="font-serif italic font-bold">Analog</span> is an open source Google Calendar alternative
            </p>

            <div className="pt-4 w-full max-w-md mx-auto">
              <Card className="p-6 w-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Join the waitlist</h3>
                  <SignUpFormReact />
                </div>
              </Card>
              {/* Will implement a counter in db
              <div className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">3,742</span> people have already signed up
              </div>
              */}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 sm:py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="https://github.com/JeanMeijer/analog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <GitHub />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
              <a 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a 
                href="https://github.com/JeanMeijer" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <ModeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
