"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SignUpFormReact from "@/components/custom/email-waitlist"
import { ModeToggle } from "@/components/custom/mode-toggle"
import Link from "next/link"

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
                <GithubIcon className="h-5 w-5" />
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

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      role="img"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-foreground"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}