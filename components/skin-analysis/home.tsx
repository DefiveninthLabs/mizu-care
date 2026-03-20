import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Droplets,
  Zap,
  Eye,
  Layers,
  TrendingUp,
  Clock,
  ShieldCheck,
  ChevronDown,
  Scan,
  FlaskConical,
  Heart,
  Users,
  CheckCircle2,
} from "lucide-react"
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const skinMetrics = [
  { label: "Hydration", value: 78, color: "hsl(var(--primary))" },
  { label: "Elasticity", value: 85, color: "hsl(200 45% 50%)" },
  { label: "Texture", value: 62, color: "hsl(180 40% 45%)" },
  { label: "Clarity", value: 91, color: "hsl(160 45% 50%)" },
]

const testimonials = [
  {
    name: "Amira K.",
    text: "Finally found products that actually work for my combination skin. My breakouts cleared up in 3 weeks!",
    skinType: "Combination",
    avatar: "AK",
  },
  {
    name: "Sarah L.",
    text: "The AI nailed my skin type. I've been using the wrong products for years — MizuCaire changed everything.",
    skinType: "Sensitive",
    avatar: "SL",
  },
  {
    name: "Priya M.",
    text: "Love that it takes 2 minutes. Got my whole morning and evening routine sorted. My skin is glowing!",
    skinType: "Dry",
    avatar: "PM",
  },
]

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0
        const duration = 1500
        const stepTime = duration / value
        const timer = setInterval(() => {
          start += 1
          setCount(start)
          if (start >= value) clearInterval(timer)
        }, stepTime)
      }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

function MetricBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" as const }}
        />
      </div>
    </motion.div>
  )
}

const HomeScreen = ({ onStart }: { onStart: () => void }) => {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Image src="/icon-white.png" alt="MizuCaire" className="w-6 h-6 object-contain" width={24} height={24} />
            </div>
            <span className="text-xl font-bold text-foreground font-display">MizuCaire</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#science" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              Science
            </a>
            <a href="#reviews" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="/products" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
              <Button onClick={onStart} size="sm" className="rounded-full">
                Try Scan <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section — Full screen immersive */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-150 h-150 rounded-full border border-border/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/3 -left-1/4 w-125 h-125 rounded-full border border-primary/10"
          />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/30 animate-pulse-soft" />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-accent animate-float" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" animate="visible" className="space-y-8 max-w-xl">
                <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  2-Minute AI Skin Analysis
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-display leading-[1.05]"
                >
                  Your Skin,{" "}
                  <span className="text-gradient">Decoded.</span>
                </motion.h1>

                <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Stop guessing. MizuCaire uses computer vision to map your skin's unique profile and build a routine that actually works.
                </motion.p>

                <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button onClick={onStart} size="lg" className="rounded-full px-10 py-7 text-lg font-medium w-full sm:w-auto shadow-elevated hover:shadow-card transition-shadow">
                      Analyze My Skin
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  <a href="#science">
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-7 text-lg w-full sm:w-auto">
                      See the Science
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </motion.div>

                {/* Stats row */}
                <motion.div variants={fadeUp} custom={4} className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground font-display">
                      <AnimatedCounter value={50} suffix="K+" />
                    </p>
                    <p className="text-xs text-muted-foreground">Scans completed</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground font-display">
                      <AnimatedCounter value={4} suffix=".8★" />
                    </p>
                    <p className="text-xs text-muted-foreground">User rating</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground font-display">
                      <AnimatedCounter value={98} suffix="%" />
                    </p>
                    <p className="text-xs text-muted-foreground">Accuracy rate</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero visual — App mockup with floating metrics */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" as const }}
                className="relative hidden lg:flex justify-center"
              >
                <div className="relative">
                  <Image
                    src={'/assets/hero-app-mockup.jpg'}
                    alt="MizuCaire AI skin analysis app"
                    className="rounded-[2.5rem] shadow-elevated"
                    width={340}
                    height={680}
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                  />

                  {/* Floating metric cards */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-20 top-16 bg-card rounded-2xl px-4 py-3 shadow-elevated border border-border/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Droplets className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Hydration</p>
                        <p className="text-sm font-bold text-foreground">78%</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-16 top-40 bg-card rounded-2xl px-4 py-3 shadow-elevated border border-border/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                        <Eye className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pore Size</p>
                        <p className="text-sm font-bold text-foreground">Small</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -left-12 bottom-24 bg-card rounded-2xl px-4 py-3 shadow-elevated border border-border/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Skin Score</p>
                        <p className="text-sm font-bold text-foreground">85/100</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skin Science Section */}
      <section id="science" className="py-24 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Science visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden h-[400px]">
                <Image src={'/assets/skin-science.jpg'} alt="Skin layer analysis visualization" fill className="object-cover" />
              </div>
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md rounded-2xl p-5 border border-border/50">
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">Live Analysis Preview</p>
                <div className="space-y-3">
                  {skinMetrics.map((m, i) => (
                    <MetricBar key={m.label} {...m} delay={i * 0.15} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Science content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">The Science</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-foreground font-display leading-tight">
                We Analyze What Your Eyes Can't See
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed">
                Our AI examines over 14 skin markers across multiple dimensions — from surface texture
                and pore density to hydration patterns and melanin distribution — to build a complete
                picture of your skin's health.
              </motion.p>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Scan, label: "Texture Mapping", desc: "Surface roughness analysis" },
                  { icon: Droplets, label: "Hydration Index", desc: "Moisture level detection" },
                  { icon: Layers, label: "Pore Analysis", desc: "Size & density mapping" },
                  { icon: FlaskConical, label: "Oil Balance", desc: "Sebum production levels" },
                ].map((item) => (
                  <motion.div key={item.label} variants={fadeUp} custom={0}>
                    <Card className="p-4 border-none shadow-card bg-background hover:shadow-elevated transition-all duration-300 group cursor-default">
                      <item.icon className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why MizuCaire — Unique value props */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-foreground font-display">
              Why People Love MizuCaire
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Built for real people who want real results — not generic advice.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Clock, title: "2 Minutes", desc: "From selfie to a full personalized routine. No lengthy questionnaires.", accent: "bg-primary/10" },
              { icon: ShieldCheck, title: "100% Private", desc: "Your photos never leave your device. Zero data stored on our servers.", accent: "bg-accent" },
              { icon: Heart, title: "Dermatologist-Level", desc: "Recommendations backed by clinical skincare research and real science.", accent: "bg-secondary" },
              { icon: Users, title: "All Skin Types", desc: "From oily to sensitive, from teen to mature — we've got you covered.", accent: "bg-primary/10" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Card className="p-6 border-none shadow-card bg-card hover:shadow-elevated transition-all duration-300 h-full group">
                  <div className={`h-12 w-12 rounded-2xl ${item.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-display mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-foreground font-display">
              Real Results, Real People
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-4 text-muted-foreground max-w-md mx-auto">
              See what our community says about their skin transformation
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Card className="p-6 border-none shadow-card bg-background hover:shadow-elevated transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <div key={si} className="w-4 h-4 rounded-full bg-primary/80" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed flex-1 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.skinType} Skin</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold text-foreground font-display leading-tight">
                Everything You Get — Completely Free
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed">
                No subscriptions, no hidden fees. Just real results.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              {[
                "AI-powered skin type detection (Oily, Dry, Combination, Sensitive)",
                "Personalized AM & PM skincare routines",
                "Product recommendations from trusted brands",
                "Key concern identification (acne, aging, dark spots, etc.)",
                "Instant results — no waiting, no emails",
                "Privacy-first — photos processed locally on your device",
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-4xl bg-hero-gradient px-8 py-16 sm:p-20 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-black font-display leading-tight max-w-2xl mx-auto">
                Your perfect skincare routine is 2 minutes away
              </h2>
              <p className="mt-6 text-black max-w-md mx-auto text-lg">
                No sign-up required. Take a selfie, answer a few questions, and let our AI do the rest.
              </p>
              <div className="mt-10">
                  <Button onClick={onStart} size="lg" variant="secondary" className="rounded-full px-10 py-7 text-lg font-medium shadow-elevated hover:scale-105 transition-transform">
                    Start My Free Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Image src="/icon-white.png" alt="MizuCaire" width={16} height={16} className="w-4 h-4 object-contain" />
            </div>
            <span className="font-semibold text-foreground font-  display">MizuCaire</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#science" className="hover:text-foreground transition-colors">Science</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
            <Button onClick={onStart} className="hover:text-foreground transition-colors">Get Started</Button>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MizuCaire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomeScreen
