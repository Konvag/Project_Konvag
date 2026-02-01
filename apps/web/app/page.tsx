"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Toast = { open: boolean; title: string; message?: string };

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<Toast>({ open: false, title: "" });
  const toastTimer = useRef<number | null>(null);

  const sections = useMemo(
    () => [
      { id: "services", label: "Services" },
      { id: "how", label: "How it works" },
      { id: "features", label: "Why Konvag" },
    ],
    [],
  );

  // Keep list short (landing page shouldn't feel like a directory)
  const topServices = useMemo(
    () => [
      { title: "Plumbing", icon: "droplet" },
      { title: "Electrician", icon: "bolt" },
      { title: "Cleaning", icon: "sparkles" },
      { title: "AC Repair", icon: "snow" },
      { title: "Generator Repair", icon: "engine" },
      { title: "Laptop Repair", icon: "laptop" },
      { title: "Phone Repair", icon: "phone" },
      { title: "CCTV & Security", icon: "shield" },
      { title: "Hair Dressing", icon: "scissors" },
      { title: "Barbing", icon: "clipper" },
      { title: "Makeup", icon: "palette" },
      { title: "Logistics", icon: "truck" },
    ],
    [],
  );

  const popular = useMemo(
    () => [
      "Electrician",
      "Plumbing",
      "Cleaning",
      "Barbing",
      "AC Repair",
      "Laptop Repair",
      "CCTV",
    ],
    [],
  );

  const comingSoon = (title = "Coming soon", message?: string) => {
    setToast({ open: true, title, message });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(
      () => setToast((t) => ({ ...t, open: false })),
      2600,
    );
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    document.title = "Konvag — Book trusted services (Under Construction)";

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const saved = window.localStorage.getItem("konvag_theme");
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    )?.matches;
    const shouldBeDark = saved ? saved === "dark" : !!prefersDark;

    setDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("konvag_theme", next ? "dark" : "light");
  };

  const Header = () => (
    <header
      className={[
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10"
          : "bg-transparent",
      ].join(" ")}
      aria-label="Konvag Header"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="group inline-flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          aria-label="Go to top"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-black tracking-tight">K</span>
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/25 dark:ring-white/10" />
          </span>

          <div className="text-left leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-black dark:text-white">
              KONVAG
            </div>
            <div className="text-xs text-black/55 dark:text-white/55">
              Premium services marketplace
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
            >
              {s.label}
            </button>
          ))}

          <span className="mx-1 h-7 w-px bg-black/10 dark:bg-white/10" />

          <button
            type="button"
            onClick={() =>
              comingSoon(
                "Waitlist",
                "Waitlist opens soon. This is a premium preview.",
              )
            }
            className="rounded-full px-4 py-2 text-sm font-extrabold bg-primary text-primary-foreground hover:opacity-95 transition shadow-sm"
          >
            Join waitlist
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 rounded-full px-3 py-2 text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full px-3 py-2 text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full px-3 py-2 text-sm font-extrabold bg-black/5 hover:bg-black/10 transition dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
            aria-label="Open menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-[340px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <div className="rounded-3xl border border-border bg-white/90 dark:bg-black/70 backdrop-blur-xl p-3">
            <div className="grid gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm font-extrabold text-black/85 hover:bg-black/5 transition dark:text-white/85 dark:hover:bg-white/10"
                >
                  {s.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => comingSoon("Waitlist", "Waitlist opens soon.")}
                className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-extrabold bg-primary text-primary-foreground hover:opacity-95 transition"
              >
                Join waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div
      id="top"
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      <GlobalStyles />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-white dark:bg-black shadow-sm">
            {/* subtle background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(22,163,74,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.6)_1px,transparent_1px)] bg-[size:28px_28px] dark:opacity-[0.08]" />
            </div>

            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 dark:bg-black/40 px-4 py-2 text-xs font-extrabold text-black/70 dark:text-white/70 backdrop-blur">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  Under construction • Premium preview
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-black dark:text-white sm:text-5xl">
                  Book trusted services —{" "}
                  <span className="text-shine">fast</span>, clean, and secure.
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-black/70 dark:text-white/70 sm:text-lg">
                  Konvag connects you to vetted service providers for home
                  repairs, beauty, tech fixes, and logistics — with tracking and
                  secure payments (coming soon).
                </p>

                {/* Search */}
                <div className="mt-6 rounded-2xl border border-border bg-white/70 dark:bg-black/35 backdrop-blur p-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <label className="sr-only" htmlFor="search">
                        Search services
                      </label>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-white dark:bg-black px-4 py-3">
                        <span className="text-black/40 dark:text-white/40">
                          ⌕
                        </span>
                        <input
                          id="search"
                          disabled
                          placeholder="Search for a service (disabled)"
                          className="w-full bg-transparent text-sm font-semibold text-black/70 dark:text-white/70 placeholder:text-black/35 dark:placeholder:text-white/35 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        comingSoon(
                          "Search",
                          "Search will be enabled at launch.",
                        )
                      }
                      className="h-12 rounded-2xl bg-primary px-6 text-sm font-extrabold text-primary-foreground hover:opacity-95 transition"
                    >
                      Search
                    </button>
                  </div>

                  {/* Popular */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-extrabold text-black/55 dark:text-white/55">
                      Popular:
                    </span>
                    {popular.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          comingSoon(
                            "Popular service",
                            `${t} page opens at launch.`,
                          )
                        }
                        className="rounded-full border border-border bg-white/70 dark:bg-black/30 px-3 py-1 font-extrabold text-black/65 dark:text-white/65 hover:bg-white transition"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() =>
                      comingSoon("Waitlist", "Waitlist opens soon.")
                    }
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-black px-6 text-sm font-extrabold text-white hover:bg-black/90 transition dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    Get notified
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollTo("services")}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-white/70 dark:bg-black/35 px-6 text-sm font-extrabold text-black/75 dark:text-white/75 hover:bg-white transition"
                  >
                    Browse services
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      comingSoon("Vendors", "Vendor onboarding opens soon.")
                    }
                    className="inline-flex h-12 items-center justify-center rounded-2xl px-4 text-sm font-extrabold text-primary hover:bg-primary/10 transition"
                  >
                    Become a vendor →
                  </button>
                </div>

                {/* Trust row */}
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <TrustPill
                    title="Verified pros"
                    desc="Identity & quality checks"
                  />
                  <TrustPill
                    title="Clear tracking"
                    desc="Every job documented"
                  />
                  <TrustPill title="Secure payments" desc="Pay on completion" />
                </div>
              </div>

              {/* Right */}
              <div className="relative">
                <div className="rounded-[28px] border border-border bg-white/70 dark:bg-black/35 backdrop-blur p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-black text-black/80 dark:text-white/80">
                      Preview flow
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                      Coming soon
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <MockRow
                      n="01"
                      title="Request a service"
                      desc="Tell us what you need + location"
                    />
                    <MockRow
                      n="02"
                      title="Get matched"
                      desc="We show the best providers nearby"
                    />
                    <MockRow
                      n="03"
                      title="Track + pay"
                      desc="Progress updates + secure payment"
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-border bg-white dark:bg-black p-4">
                    <div className="text-xs font-extrabold text-black/55 dark:text-white/55">
                      Top categories
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {topServices.slice(0, 6).map((s) => (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() =>
                            comingSoon(
                              "Category",
                              `${s.title} opens at launch.`,
                            )
                          }
                          className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 dark:bg-black/35 px-3 py-3 text-left hover:bg-white transition"
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <Icon name={s.icon} />
                          </span>
                          <span className="text-sm font-extrabold text-black/75 dark:text-white/75">
                            {s.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      comingSoon(
                        "Download",
                        "Apps will be available at launch.",
                      )
                    }
                    className="mt-4 w-full rounded-2xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground hover:opacity-95 transition"
                  >
                    Get the app (disabled)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-black dark:text-white sm:text-3xl">
                Browse top services
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                Clean categories — no clutter. More services will be added at
                launch.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                comingSoon(
                  "All services",
                  "Full services directory opens at launch.",
                )
              }
              className="hidden sm:inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-white/70 dark:bg-black/35 px-5 text-sm font-extrabold text-black/75 dark:text-white/75 hover:bg-white transition"
            >
              View all
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topServices.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() =>
                  comingSoon("Service", `${s.title} opens at launch.`)
                }
                className="group flex items-center gap-4 rounded-3xl border border-border bg-white/70 dark:bg-black/35 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name={s.icon} />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-extrabold tracking-tight text-black/85 dark:text-white/85">
                    {s.title}
                  </div>
                  <div className="mt-1 text-xs text-black/55 dark:text-white/55">
                    Book • Track • Pay (coming soon)
                  </div>
                </div>

                <div className="text-black/25 dark:text-white/25">→</div>
              </button>
            ))}
          </div>
        </section>

        {/* HOW */}
        <section id="how" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <div className="rounded-[32px] border border-border bg-white dark:bg-black p-7 sm:p-10 shadow-sm">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black tracking-tight text-black dark:text-white sm:text-3xl">
                How it works
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                Simple, modern, and built for trust.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <StepCard
                n="01"
                title="Request"
                desc="Choose a service, add details, and your location."
                onClick={() =>
                  comingSoon("Request", "Request flow opens at launch.")
                }
              />
              <StepCard
                n="02"
                title="Match"
                desc="We connect you to suitable providers with clear quotes."
                onClick={() => comingSoon("Match", "Matching opens at launch.")}
              />
              <StepCard
                n="03"
                title="Complete"
                desc="Track progress, confirm delivery, then pay securely."
                onClick={() =>
                  comingSoon("Complete", "Tracking & payments open at launch.")
                }
              />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <FeatureCard
              title="Verified providers"
              desc="Identity checks, skill screening, and service standards (coming soon)."
              onClick={() =>
                comingSoon("Verification", "Verification launches soon.")
              }
            />
            <FeatureCard
              title="Records & receipts"
              desc="Every job documented for clarity, proof, and accountability."
              onClick={() =>
                comingSoon("Records", "Records dashboard launches soon.")
              }
            />
            <FeatureCard
              title="Safe payments"
              desc="Payment only when the job is confirmed (escrow-style)."
              onClick={() =>
                comingSoon("Payments", "Payment integration launches soon.")
              }
            />
          </div>

          <div className="mt-6 rounded-[28px] border border-border bg-white dark:bg-black p-7 sm:p-9 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-xl font-black tracking-tight text-black dark:text-white">
                  Want launch updates?
                </div>
                <div className="mt-1 text-sm text-black/65 dark:text-white/65">
                  Join the waitlist — we’ll notify you when booking goes live.
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Email (disabled)"
                  disabled
                  className="h-12 w-full sm:w-80 rounded-2xl border border-border bg-white dark:bg-black px-4 text-sm font-semibold text-black/70 dark:text-white/70 placeholder:text-black/35 dark:placeholder:text-white/35 outline-none"
                />
                <button
                  type="button"
                  onClick={() => comingSoon("Waitlist", "Waitlist opens soon.")}
                  className="h-12 rounded-2xl bg-primary px-6 text-sm font-extrabold text-primary-foreground hover:opacity-95 transition"
                >
                  Notify me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border bg-white dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-md">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <span className="font-black">K</span>
                  </div>
                  <div>
                    <div className="text-sm font-black tracking-tight text-black dark:text-white">
                      KONVAG
                    </div>
                    <div className="text-xs text-black/55 dark:text-white/55">
                      All services at your fingertips
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-black/65 dark:text-white/65">
                  Premium marketplace for everyday services in Nigeria — under
                  construction.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Nigeria-first", "Clean UX", "Trust-focused"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/70 dark:bg-black/35 px-3 py-1 text-xs font-extrabold text-black/65 dark:text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <FooterCol
                  title="Product"
                  items={["Services", "How it works", "Vendors", "Security"]}
                  onItem={(it) =>
                    comingSoon(it, "This link will work at launch.")
                  }
                />
                <FooterCol
                  title="Company"
                  items={["About", "Contact", "Terms", "Privacy"]}
                  onItem={(it) =>
                    comingSoon(it, "This link will work at launch.")
                  }
                />
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-6 text-xs text-black/55 dark:text-white/55">
              © {new Date().getFullYear()} Konvag. Premium preview.
            </div>
          </div>
        </footer>

        {/* TOAST */}
        <div
          className={[
            "fixed bottom-5 left-1/2 z-[60] w-[min(520px,calc(100%-24px))] -translate-x-1/2 transition-all duration-300",
            toast.open
              ? "opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-2",
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          <div className="rounded-2xl border border-border bg-white/90 dark:bg-black/75 p-4 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold text-black/85 dark:text-white/85">
                  {toast.title}
                </div>
                {toast.message ? (
                  <div className="mt-1 text-xs leading-5 text-black/60 dark:text-white/60">
                    {toast.message}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setToast((t) => ({ ...t, open: false }))}
                className="rounded-xl px-2 py-1 text-xs font-extrabold text-black/55 hover:bg-black/5 transition dark:text-white/55 dark:hover:bg-white/10"
                aria-label="Close toast"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------- Small components -------------------- */

function TrustPill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white/70 dark:bg-black/35 p-4">
      <div className="text-sm font-extrabold text-black/80 dark:text-white/80">
        {title}
      </div>
      <div className="mt-1 text-xs text-black/60 dark:text-white/60">
        {desc}
      </div>
    </div>
  );
}

function MockRow({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/70 dark:bg-black/35 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-black tracking-widest text-black/40 dark:text-white/40">
          {n}
        </div>
        <span className="text-black/25 dark:text-white/25">→</span>
      </div>
      <div className="mt-2 text-sm font-extrabold text-black/80 dark:text-white/80">
        {title}
      </div>
      <div className="mt-1 text-xs text-black/60 dark:text-white/60">
        {desc}
      </div>
    </div>
  );
}

function StepCard({
  n,
  title,
  desc,
  onClick,
}: {
  n: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-3xl border border-border bg-white dark:bg-black p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-black tracking-widest text-black/40 dark:text-white/40">
          {n}
        </div>
        <div className="text-black/25 dark:text-white/25">→</div>
      </div>
      <div className="mt-2 text-base font-black tracking-tight text-black dark:text-white">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
        {desc}
      </div>
    </button>
  );
}

function FeatureCard({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-3xl border border-border bg-white dark:bg-black p-7 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring"
    >
      <div className="inline-flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-primary" />
        <div className="text-base font-black text-black dark:text-white">
          {title}
        </div>
      </div>
      <div className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
        {desc}
      </div>
      <div className="mt-4 text-xs font-extrabold text-primary">Preview →</div>
    </button>
  );
}

function FooterCol({
  title,
  items,
  onItem,
}: {
  title: string;
  items: string[];
  onItem: (item: string) => void;
}) {
  return (
    <div>
      <div className="text-sm font-black tracking-tight text-black dark:text-white">
        {title}
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((it) => (
          <button
            key={it}
            type="button"
            onClick={() => onItem(it)}
            className="text-left text-sm font-extrabold text-black/65 hover:text-black hover:bg-black/5 rounded-xl px-3 py-2 transition dark:text-white/65 dark:hover:text-white dark:hover:bg-white/10"
          >
            {it}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Icons (tiny inline set) -------------------- */

function Icon({ name }: { name: string }) {
  const common = "stroke-current";
  switch (name) {
    case "bolt":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "droplet":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2s7 7.3 7 13a7 7 0 1 1-14 0c0-5.7 7-13 7-13Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sparkles":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2l1.2 5.1L18 8.3l-4.8 1.2L12 14l-1.2-4.5L6 8.3l4.8-1.2L12 2Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M19 13l.7 3 3 1-3 1-.7 3-.7-3-3-1 3-1 .7-3Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "snow":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2v20" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 6l16 12" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M20 6L4 18" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "engine":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M7 7h10v10H7V7Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M4 10h3M17 10h3M4 14h3M17 14h3"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 7V4h6v3" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "laptop":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M4 5h16v10H4V5Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M2 19h20" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "phone":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M8 2h8v20H8V2Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M11 19h2" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2l8 4v7c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-5" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "scissors":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M20 4L8.5 15.5" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8.5 8.5 20 20" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M7.2 12.2a3 3 0 1 1-4.2 4.2 3 3 0 0 1 4.2-4.2Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clipper":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M7 3h10v6H7V3Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 9V6M12 9V6M15 9V6"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "palette":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3a9 9 0 1 0 0 18h2a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h2a3 3 0 0 0 0-6h-3Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M7.5 10.5h0" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M9.5 7.5h0" strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      );
    case "truck":
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 7h12v10H3V7Z" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M15 10h4l2 2v5h-6v-7Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 19a1.6 1.6 0 1 0 0 .01"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M18 19a1.6 1.6 0 1 0 0 .01"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg
          className={common}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2v20" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M2 12h20" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* -------------------- Styles -------------------- */

function GlobalStyles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }

      /* Premium shine using GREEN brand */
      .text-shine {
        background: linear-gradient(
          90deg,
          rgba(22, 163, 74, 1),
          rgba(34, 197, 94, 0.7),
          rgba(22, 163, 74, 1)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 200% 100%;
        animation: shine 3.2s ease-in-out infinite;
      }
      @keyframes shine {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}</style>
  );
}
