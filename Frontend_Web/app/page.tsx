"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingCart,
  Package,
  BarChart3,
  CreditCard,
  Users,
  Shield,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: ShoppingCart,
    title: "Point of Sale",
    description:
      "Fast, intuitive POS system with barcode scanning, cash and M-Pesa payments, and digital receipts.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Track stock levels in real-time, get low stock alerts, and manage product variants with ease.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Gain insights with sales trends, category breakdowns, top products, and exportable reports.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Accept cash, M-Pesa, and card payments. View transaction history and reconcile effortlessly.",
  },
  {
    icon: Users,
    title: "Reseller Network",
    description:
      "Manage agents and resellers, track commissions, and scale your distribution channel.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with role-based access, data encryption, and automatic backups.",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individuals just getting started",
    features: [
      "1 user account",
      "Up to 50 products",
      "Basic POS features",
      "Daily sales summary",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Business",
    price: "KES 2,500",
    period: "/month",
    description: "For growing small businesses",
    features: [
      "Up to 5 users",
      "Unlimited products",
      "Full POS + Inventory",
      "Analytics & Reports",
      "M-Pesa integration",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "KES 7,500",
    period: "/month",
    description: "For established businesses at scale",
    features: [
      "Unlimited users",
      "Multi-store management",
      "Advanced analytics",
      "Reseller management",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background font-bold text-sm">
            U
          </div>
          <span className="text-lg font-bold tracking-tight">Uzapoint</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">
              Register
              <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#features"
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-32 pb-20 lg:pt-40 lg:pb-28 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-foreground" />
          </span>
          Now available for businesses across East Africa
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          The complete platform to run your business
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground leading-relaxed lg:text-lg">
          Manage sales, inventory, payments, and analytics from one powerful
          dashboard. Built for SMEs that move fast.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/signup">
              Get Started for Free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/login">Sign In to Your Account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { value: "2,500+", label: "Active Businesses" },
    { value: "KES 1.2B", label: "Transactions Processed" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ]

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold tracking-tight lg:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your business
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            From point-of-sale to analytics, Uzapoint gives you the tools to
            grow with confidence.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border bg-card transition-colors hover:bg-muted/50"
            >
              <CardContent className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t bg-muted/30 px-4 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Start free and scale as your business grows. No hidden fees.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col border ${plan.highlighted ? "border-foreground ring-1 ring-foreground" : ""}`}
            >
              <CardContent className="flex flex-1 flex-col p-6">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            About Uzapoint
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Built for businesses that mean business
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Uzapoint was created to solve the real challenges faced by small and
            medium enterprises across East Africa. We understand that managing a
            business shouldn&apos;t require a dozen different tools.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our platform brings together point-of-sale, inventory management,
            payments, and analytics into one seamless experience -- so you can
            focus on growing your business, not wrestling with software.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/signup">
                Start Your Free Account
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-2xl font-bold">2022</p>
            <p className="mt-1 text-sm text-muted-foreground">Founded</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-2xl font-bold">15+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Team Members
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-2xl font-bold">5</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Countries
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-2xl font-bold">2,500+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Happy Businesses
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background font-bold text-xs">
                U
              </div>
              <span className="font-bold">Uzapoint</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The complete business management platform for SMEs across East
              Africa.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Uzapoint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
