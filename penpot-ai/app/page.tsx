import Link from "next/link";
import { Sparkles, ArrowRight, Smartphone, Zap, Shield, Code } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">PenpotAI</span>
          </div>
          <Link
            href="/(app)"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Powered by Gemini AI
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Transform Words Into
          <br />
          <span className="text-primary">Beautiful UI Designs</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Describe your design in plain English and watch AI create production-ready,
          accessible UI mockups in seconds. Mobile-first. WCAG compliant.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/(app)"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Start Creating
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why PenpotAI?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Mobile-First</h3>
            <p className="text-muted-foreground">
              Designs optimized for touch devices with proper touch targets and thumb-friendly layouts.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant Generation</h3>
            <p className="text-muted-foreground">
              Get complete UI designs in seconds, not hours. From prompt to pixel-perfect mockup.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">WCAG Compliant</h3>
            <p className="text-muted-foreground">
              Every design follows accessibility best practices with proper contrast and semantics.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Export Ready</h3>
            <p className="text-muted-foreground">
              Export to Penpot, JSON, or get Tailwind CSS code ready for implementation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Design with AI?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of designers using PenpotAI to accelerate their workflow.
            Free to use with your own API key.
          </p>
          <Link
            href="/(app)"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>Built with Next.js, Tailwind CSS, and Google Gemini AI</p>
          <p className="mt-2 text-sm">Open source • Mobile-first • Accessible</p>
        </div>
      </footer>
    </div>
  );
}
