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
      { id: "faq", label: "FAQ" },
    ],
    []
  );

  const services = useMemo(
    () => [
      { title: "Plumbing", icon: "droplet" },
      { title: "Electrician", icon: "bolt" },
      { title: "Carpentry", icon: "hammer" },
      { title: "Painting", icon: "brush" },
      { title: "AC Repair", icon: "snow" },
      { title: "Cleaning", icon: "sparkles" },
      { title: "Laundry", icon: "wash" },
      { title: "Generator Repair", icon: "engine" },
      { title: "Phone Repair", icon: "phone" },
      { title: "Laptop Repair", icon: "laptop" },
      { title: "TV Repair", icon: "tv" },
      { title: "CCTV & Security", icon: "shield" },
      { title: "Hair Dressing", icon: "scissors" },
      { title: "Barbing", icon: "clipper" },
      { title: "Makeup", icon: "palette" },
      { title: "Nails & Spa", icon: "lotus" },
      { title: "Tailoring", icon: "thread" },
      { title: "Photography", icon: "camera" },
      { title: "Catering", icon: "chef" },
      { title: "Event Decor", icon: "confetti" },
      { title: "Auto Mechanic", icon: "car" },
      { title: "Car Wash", icon: "spray" },
      { title: "Logistics", icon: "truck" },
      { title: "Tutoring", icon: "book" },
      { title: "Fitness Coach", icon: "dumbbell" },
      { title: "Web & Design", icon: "code" },
    ],
    []
  );

  const comingSoon = (title = "Coming soon", message?: string) => {
    setToast({ open: true, title, message });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 2600);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    // Title
    document.title = "Konvag — All services at your fingertips (Under Construction)";

    // Scroll listener
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Dark mode (system + saved)
    const saved = window.localStorage.getItem("konvag_theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const shouldBeDark = saved ? saved === "dark" : !!prefersDark;
    setDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("konvag_theme", next ? "dark" : "light");
  };

  const Icon = ({ name }: { name: string }) => {
    // Tiny inline icon set (no extra libs)
    const common = "stroke-current";
    switch (name) {
      case "bolt":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "droplet":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2s7 7.3 7 13a7 7 0 1 1-14 0c0-5.7 7-13 7-13Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "shield":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l8 4v7c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M9 12l2 2 4-5" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "sparkles":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l1.2 5.1L18 8.3l-4.8 1.2L12 14l-1.2-4.5L6 8.3l4.8-1.2L12 2Z" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M19 13l.7 3 3 1-3 1-.7 3-.7-3-3-1 3-1 .7-3Z" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4.5 13l.6 2.3 2.4.8-2.4.8-.6 2.3-.6-2.3-2.4-.8 2.4-.8.6-2.3Z" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        );
      case "scissors":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20 4L8.5 15.5" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8.5 8.5 20 20" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7.2 12.2a3 3 0 1 1-4.2 4.2 3 3 0 0 1 4.2-4.2Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7.2 3.6a3 3 0 1 1-4.2 4.2 3 3 0 0 1 4.2-4.2Z" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "hammer":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 7l2-2 4 4-2 2" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M14 8l-9 9 2 2 9-9" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 6l3 3" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "brush":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 2l4 4-9 9-4-4 9-9Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 12l-5 5c-1 1-1 3 0 4 1 1 3 1 4 0l5-5" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "snow":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M4 6l16 12" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M20 6L4 18" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "wash":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 3h12v18H6V3Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 7h6" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 11a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "engine":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 7h10v10H7V7Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M4 10h3M17 10h3M4 14h3M17 14h3" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 7V4h6v3" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "phone":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 2h8v20H8V2Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M11 19h2" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "laptop":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 5h16v10H4V5Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 19h20" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "tv":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16v10H4V6Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 20h6" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "clipper":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 3h10v6H7V3Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 9V6M12 9V6M15 9V6" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        );
      case "palette":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3a9 9 0 1 0 0 18h2a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h2a3 3 0 0 0 0-6h-3Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M7.5 10.5h0" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M9.5 7.5h0" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M14.5 7.5h0" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M16.5 10.5h0" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        );
      case "lotus":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s7-4 7-10c-4 0-7 2-7 5 0-3-3-5-7-5 0 6 7 10 7 10Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 17V2" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        );
      case "thread":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 3h10v6H7V3Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 9v12" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 21h6" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "camera":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h4l2-2h4l2 2h4v12H4V7Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "chef":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 10c-2 0-3-1-3-3s2-4 8-4 8 2 8 4-1 3-3 3" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7 10h10v11H7V10Z" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "confetti":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 20l7-7" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M3 14l7 7" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M14 3l7 7-9 3 2-10Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 12l4 4" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "car":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 16l-1-4 2-5h10l2 5-1 4H6Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7 16v3M17 16v3" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 12h8" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "spray":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 3h6v4H9V3Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 7h8v14H8V7Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M18 9h3" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M18 12h3" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M18 15h3" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "truck":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 7h12v10H3V7Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15 10h4l2 2v5h-6v-7Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7 19a1.6 1.6 0 1 0 0 .01" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M18 19a1.6 1.6 0 1 0 0 .01" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        );
      case "book":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2V4Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M6 4v16" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "dumbbell":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M7 10v4M17 10v4" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 9v6M15 9v6" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12h6" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M5 9v6M19 9v6" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      case "code":
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l-6-6 6-6" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15 6l6 6-6 6" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M13 4l-2 16" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className={common} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 12h20" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const Header = () => (
    <header
      className={[
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          : "bg-transparent",
      ].join(" ")}
      aria-label="Konvag Header"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="group inline-flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
          aria-label="Go to top"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-sm">
            <span className="font-black tracking-tight">K</span>
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 dark:ring-black/10" />
          </span>
          <div className="text-left leading-tight">
            <div className="text-sm font-semibold tracking-tight text-black dark:text-white">
              KONVAG
            </div>
            <div className="text-xs text-black/60 dark:text-white/60">
              All services at your fingertips
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition"
            >
              {s.label}
            </button>
          ))}
          <span className="mx-1 h-7 w-px bg-black/10 dark:bg-white/10" />
          <button
            type="button"
            onClick={() => comingSoon("Get notified", "Waitlist opens soon. This project is under construction.")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition shadow-sm"
          >
            Join waitlist
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 rounded-full px-3 py-2 text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition"
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
            className="rounded-full px-3 py-2 text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full px-3 py-2 text-sm font-semibold text-black bg-black/5 hover:bg-black/10 dark:text-white dark:bg-white/10 dark:hover:bg-white/15 transition"
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
          menuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-xl p-3">
            <div className="grid gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10 transition"
                >
                  {s.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => comingSoon("Join waitlist", "Waitlist opens soon.")}
                className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition"
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
    <div id="top" className="min-h-screen bg-zinc-50 text-black dark:bg-black dark:text-white">
      <GlobalStyles />

      <Header />

      {/* HERO */}
      <main className="relative">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-black/[0.02] to-zinc-50 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-black" />
          <div className="absolute inset-0 opacity-60 dark:opacity-45">
            <img
              alt="Konvag hero background"
              src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=2000&q=70"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/70 to-transparent dark:from-black dark:via-black/70 dark:to-transparent" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-32 right-[-140px] h-[520px] w-[520px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_60%)]" />
        </div>

        <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 sm:px-6 sm:pt-32 lg:pt-36">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-black/80 backdrop-blur dark:border-white/12 dark:bg-black/40 dark:text-white/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                PROJECT IS SERIOUSLY UNDER CONSTRUCTION
                <span className="ml-2 rounded-full bg-black/5 px-2 py-1 text-[11px] dark:bg-white/10">Preview</span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Welcome to <span className="text-shine">Konvag</span> —
                <span className="block mt-2 text-black/80 dark:text-white/85">
                  all services at your fingertip.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-black/70 dark:text-white/70 sm:text-lg">
                Plumbing, hair dressing, barbing, electrician, cleaning, repairs, logistics, tutoring, events —
                one sleek platform to find trusted service providers, track requests, and pay securely.
                <span className="font-semibold"> We’re building it properly.</span>
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => comingSoon("App not live yet", "We’re still building. You’ll be able to book services here soon.")}
                  className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Get started
                  <span className="text-white/70 dark:text-black/60">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo("services")}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 text-sm font-semibold text-black/80 backdrop-blur transition hover:bg-white dark:border-white/12 dark:bg-black/40 dark:text-white/80 dark:hover:bg-black/55"
                >
                  Explore services
                </button>

                <button
                  type="button"
                  onClick={() => comingSoon("Business partners", "Vendor onboarding opens soon.")}
                  className="inline-flex h-12 items-center justify-center rounded-full px-4 text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
                >
                  Become a vendor
                </button>
              </div>

              {/* Progress */}
              <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/12 dark:bg-black/40">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-black/80 dark:text-white/80">
                    Build status
                  </div>
                  <div className="text-xs font-semibold text-black/60 dark:text-white/60">
                    Phase 1 • Core platform
                  </div>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-black dark:bg-white progress-shimmer" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-black/60 dark:text-white/60">
                  <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">UI/UX ✓</span>
                  <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">Services catalog ✓</span>
                  <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">Bookings ⏳</span>
                  <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">Payments ⏳</span>
                  <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">Vendor onboarding ⏳</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-[28px] border border-black/10 bg-white/60 backdrop-blur-xl dark:border-white/12 dark:bg-black/35 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="relative">
                  <img
                    alt="Services collage"
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=70"
                    className="h-56 w-full object-cover sm:h-64"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">Smart booking • Clean UI • Verified pros</div>
                        <div className="text-xs text-white/70">Designed to feel premium on every device.</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => comingSoon("Demo", "Product demo video will be available soon.")}
                        className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition"
                      >
                        Watch demo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <MiniCard
                      title="One request, many options"
                      desc="Konvag matches you with the best providers nearby."
                      badge="Matching"
                      onClick={() => comingSoon("Matching", "Provider matching is in development.")}
                    />
                    <MiniCard
                      title="Transparent pricing"
                      desc="Clear quotes, no surprises (coming soon)."
                      badge="Pricing"
                      onClick={() => comingSoon("Pricing", "Quotes and pricing engine is coming soon.")}
                    />
                    <MiniCard
                      title="Track every job"
                      desc="Progress updates from start to finish."
                      badge="Tracking"
                      onClick={() => comingSoon("Tracking", "Job tracking is coming soon.")}
                    />
                    <MiniCard
                      title="Secure payments"
                      desc="Pay safely when the job is delivered."
                      badge="Payments"
                      onClick={() => comingSoon("Payments", "Payment integration is coming soon.")}
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-black/10 dark:border-white/12 bg-gradient-to-b from-white/70 to-white/40 dark:from-black/40 dark:to-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-black/80 dark:text-white/80">Service spotlight</div>
                      <div className="text-xs text-black/60 dark:text-white/60">Today</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Plumbing", "Hair Dressing", "Barbing", "Cleaning", "Electrician", "AC Repair"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 dark:border-white/12 bg-white/70 dark:bg-black/30 px-3 py-1 text-xs font-semibold text-black/70 dark:text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => comingSoon("Bookings", "Bookings will be enabled soon.")}
                      className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition"
                    >
                      Book a service (disabled)
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating note */}
              <div className="mt-4 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-black/70 backdrop-blur dark:border-white/12 dark:bg-black/35 dark:text-white/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                  Links won’t redirect — everything is locked to this preview.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                All services in one place
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                From home repairs to beauty and lifestyle — Konvag is designed to become your everyday services hub.
              </p>
            </div>
            <button
              type="button"
              onClick={() => comingSoon("Search", "Search will be enabled soon.")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-black/80 shadow-sm hover:bg-zinc-50 transition dark:border-white/12 dark:bg-black/30 dark:text-white/80 dark:hover:bg-black/45"
            >
              Search services (disabled)
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => comingSoon("Service page", `${s.title} page is coming soon.`)}
                className="group flex items-center gap-4 rounded-3xl border border-black/10 bg-white/70 p-5 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/12 dark:bg-black/35"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-black/5 text-black/80 group-hover:bg-black/8 transition dark:bg-white/10 dark:text-white/85">
                  <Icon name={s.icon} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold tracking-tight text-black/85 dark:text-white/85">
                    {s.title}
                  </div>
                  <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                    Book • Track • Pay (coming soon)
                  </div>
                </div>
                <div className="text-black/30 dark:text-white/25">→</div>
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/12 dark:bg-black/35">
            <div className="grid gap-6 lg:grid-cols-3">
              <Stat title="Smart matching" value="Nearby pros" desc="Find verified providers in your area." />
              <Stat title="Modern experience" value="Fast & sleek" desc="Built to feel premium on every screen." />
              <Stat title="Trust & safety" value="Protected" desc="Clear records, reviews, and secure payments." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="rounded-[32px] border border-black/10 bg-gradient-to-b from-white/80 to-white/50 p-7 backdrop-blur dark:border-white/12 dark:from-black/45 dark:to-black/25 sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">How Konvag will work</h2>
              <p className="max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                Simple flow. Clean UI. Serious delivery.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <Step
                n="01"
                title="Tell us what you need"
                desc="Choose a service, add details, location and preferred time."
                onClick={() => comingSoon("Requests", "Request flow is coming soon.")}
              />
              <Step
                n="02"
                title="Get matched & quoted"
                desc="We connect you with providers and show transparent quotes."
                onClick={() => comingSoon("Quotes", "Quotes will be enabled soon.")}
              />
              <Step
                n="03"
                title="Track & complete safely"
                desc="Follow progress, confirm delivery, and pay securely."
                onClick={() => comingSoon("Tracking & payments", "Tracking and payment release is coming soon.")}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-black/65 dark:text-white/65">
                Vendor onboarding will include verification, skills screening, and service standards.
              </div>
              <button
                type="button"
                onClick={() => comingSoon("Vendor onboarding", "Vendor onboarding is coming soon.")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 transition dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Vendor onboarding (disabled)
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Built to feel premium — not messy
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                Konvag is designed as a modern services marketplace: clean design, fast booking, transparent records,
                and a strong trust layer for both clients and providers.
              </p>

              <div className="mt-6 grid gap-3">
                <FeatureRow
                  title="Verified providers"
                  desc="Identity, skills, and quality checks (coming soon)."
                  onClick={() => comingSoon("Verification", "Provider verification is coming soon.")}
                />
                <FeatureRow
                  title="Job history & receipts"
                  desc="Everything documented for clarity and accountability."
                  onClick={() => comingSoon("Records", "Receipts and job records are coming soon.")}
                />
                <FeatureRow
                  title="Ratings you can trust"
                  desc="Real reviews tied to completed jobs only."
                  onClick={() => comingSoon("Reviews", "Reviews system is coming soon.")}
                />
                <FeatureRow
                  title="Secure payments"
                  desc="Pay safely with confirmation at completion."
                  onClick={() => comingSoon("Payments", "Payment integration is coming soon.")}
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => comingSoon("Mobile apps", "Android/iOS apps are coming soon.")}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 transition dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Mobile app (coming soon)
                </button>
                <button
                  type="button"
                  onClick={() => comingSoon("Web platform", "Full web platform is coming soon.")}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 text-sm font-semibold text-black/80 backdrop-blur hover:bg-white transition dark:border-white/12 dark:bg-black/35 dark:text-white/80 dark:hover:bg-black/55"
                >
                  Web platform (coming soon)
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[30px] border border-black/10 bg-white/70 backdrop-blur dark:border-white/12 dark:bg-black/35 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <div className="relative">
                  <img
                    alt="Modern workspace"
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70"
                    className="h-60 w-full object-cover sm:h-72"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="text-sm font-semibold text-white">A platform you’ll be proud to share.</div>
                      <div className="mt-1 text-xs text-white/70">
                        Clean visuals • Fast UX • Responsive • Built for trust
                      </div>
                      <button
                        type="button"
                        onClick={() => comingSoon("Preview pages", "More pages will be added soon.")}
                        className="mt-3 inline-flex h-10 items-center justify-center rounded-xl bg-white/15 px-4 text-xs font-semibold text-white hover:bg-white/20 transition"
                      >
                        View preview pages
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <GlassPill label="Request" />
                    <GlassPill label="Match" />
                    <GlassPill label="Schedule" />
                    <GlassPill label="Track" />
                    <GlassPill label="Complete" />
                    <GlassPill label="Pay" />
                  </div>

                  <div className="mt-5 rounded-2xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-black/25 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-black/85 dark:text-white/85">Under construction notice</div>
                        <div className="mt-1 text-xs leading-5 text-black/60 dark:text-white/60">
                          This page is a premium placeholder. Real booking flows, dashboards, and vendor profiles are in development.
                        </div>
                      </div>
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                        Building
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating scroll-to-top */}
              <ScrollTopFab scrolled={scrolled} onClick={() => scrollTo("top")} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="rounded-[32px] border border-black/10 bg-white/70 backdrop-blur p-7 dark:border-white/12 dark:bg-black/35 sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Quick FAQ</h2>
              <p className="max-w-2xl text-sm leading-6 text-black/65 dark:text-white/65 sm:text-base">
                Short answers while we build the full product.
              </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <FAQ
                q="Is Konvag live?"
                a="Not yet. This is a premium under-construction landing page preview."
                onClick={() => comingSoon("Status", "Konvag is still under construction.")}
              />
              <FAQ
                q="What services will be available?"
                a="Home repairs, beauty, events, tech repairs, logistics, tutoring, and many more."
                onClick={() => comingSoon("Services", "More services will be added soon.")}
              />
              <FAQ
                q="Will providers be verified?"
                a="Yes. Verification and quality standards are part of the plan (coming soon)."
                onClick={() => comingSoon("Verification", "Verification flow is coming soon.")}
              />
              <FAQ
                q="Can I join as a vendor?"
                a="Vendor onboarding will open soon. For now, everything is disabled."
                onClick={() => comingSoon("Vendor onboarding", "Vendor onboarding opens soon.")}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-black/65 dark:text-white/65">
                Want updates when launch is near?
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Email (disabled)"
                  disabled
                  className="h-12 w-full sm:w-72 rounded-2xl border border-black/10 bg-white/70 px-4 text-sm text-black/70 placeholder:text-black/40 shadow-sm outline-none dark:border-white/12 dark:bg-black/25 dark:text-white/75 dark:placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={() => comingSoon("Waitlist", "Waitlist will be enabled soon.")}
                  className="h-12 rounded-2xl bg-black px-6 text-sm font-semibold text-white hover:bg-black/90 transition dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Notify me (disabled)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                    <span className="font-black">K</span>
                  </div>
                  <div>
                    <div className="text-sm font-black tracking-tight">KONVAG</div>
                    <div className="text-xs text-black/60 dark:text-white/60">
                      All services at your fingertips
                    </div>
                  </div>
                </div>

                <p className="mt-4 max-w-sm text-sm leading-6 text-black/65 dark:text-white/65">
                  This project is under construction. The platform will offer booking, tracking, and secure payments
                  for everyday services — delivered with a premium experience.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Nigeria-first", "Mobile-ready", "Responsive UI", "Trust-focused"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 dark:border-white/12 bg-white/70 dark:bg-black/25 px-3 py-1 text-xs font-semibold text-black/70 dark:text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                <FooterCol
                  title="Product"
                  items={["How it works", "Services", "Vendors", "Pricing", "Security"]}
                  onItem={() => comingSoon("Footer link", "This is disabled for now.")}
                />
                <FooterCol
                  title="Company"
                  items={["About", "Careers", "Press", "Contact", "Terms"]}
                  onItem={() => comingSoon("Footer link", "This is disabled for now.")}
                />
                <FooterCol
                  title="Resources"
                  items={["Help center", "FAQ", "Community", "Status", "Guides"]}
                  onItem={() => comingSoon("Footer link", "This is disabled for now.")}
                />
                <FooterCol
                  title="Social"
                  items={["Instagram", "X (Twitter)", "LinkedIn", "TikTok", "YouTube"]}
                  onItem={() => comingSoon("Social", "Social links will be connected at launch.")}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-black/10 dark:border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-black/60 dark:text-white/60">
                © {new Date().getFullYear()} Konvag. Under Construction — Premium Preview.
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => comingSoon("Legal", "Legal pages will be available soon.")}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 transition"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => comingSoon("Legal", "Legal pages will be available soon.")}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 transition"
                >
                  Terms
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* TOAST */}
      <div
        className={[
          "fixed bottom-5 left-1/2 z-[60] w-[min(520px,calc(100%-24px))] -translate-x-1/2 transition-all duration-300",
          toast.open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:border-white/12 dark:bg-black/60">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-black/85 dark:text-white/85">{toast.title}</div>
              {toast.message ? (
                <div className="mt-1 text-xs leading-5 text-black/60 dark:text-white/60">
                  {toast.message}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setToast((t) => ({ ...t, open: false }))}
              className="rounded-xl px-2 py-1 text-xs font-semibold text-black/55 hover:bg-black/5 dark:text-white/55 dark:hover:bg-white/10 transition"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Small UI Helpers -------------------- */

function MiniCard({
  title,
  desc,
  badge,
  onClick,
}: {
  title: string;
  desc: string;
  badge: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-black/10 bg-white/70 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/12 dark:bg-black/25"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-bold text-black/85 dark:text-white/85">{title}</div>
        <span className="rounded-full bg-black/5 px-2 py-1 text-[11px] font-bold text-black/60 dark:bg-white/10 dark:text-white/60">
          {badge}
        </span>
      </div>
      <div className="mt-1 text-xs leading-5 text-black/60 dark:text-white/60">{desc}</div>
      <div className="mt-3 text-xs font-semibold text-black/40 dark:text-white/35">Preview →</div>
    </button>
  );
}

function Stat({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/12 bg-white/60 dark:bg-black/25 p-5">
      <div className="text-xs font-semibold text-black/60 dark:text-white/60">{title}</div>
      <div className="mt-1 text-lg font-black tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-black/65 dark:text-white/65">{desc}</div>
    </div>
  );
}

function Step({
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
      className="group rounded-3xl border border-black/10 bg-white/70 p-6 text-left backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/12 dark:bg-black/25"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-black tracking-widest text-black/40 dark:text-white/40">{n}</div>
        <div className="text-black/30 dark:text-white/25">→</div>
      </div>
      <div className="mt-2 text-base font-black tracking-tight">{title}</div>
      <div className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">{desc}</div>
    </button>
  );
}

function FeatureRow({
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
      className="group flex w-full items-start gap-3 rounded-3xl border border-black/10 bg-white/70 p-5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/12 dark:bg-black/25"
    >
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
      <div className="flex-1">
        <div className="text-sm font-black tracking-tight">{title}</div>
        <div className="mt-1 text-sm leading-6 text-black/65 dark:text-white/65">{desc}</div>
      </div>
      <div className="text-black/30 dark:text-white/25">→</div>
    </button>
  );
}

function GlassPill({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-black/25 px-4 py-3 text-center text-xs font-bold text-black/70 dark:text-white/70">
      {label}
    </div>
  );
}

function FAQ({ q, a, onClick }: { q: string; a: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-3xl border border-black/10 bg-white/70 p-6 text-left backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/12 dark:bg-black/25"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-black tracking-tight">{q}</div>
        <div className="text-black/30 dark:text-white/25">→</div>
      </div>
      <div className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">{a}</div>
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
      <div className="text-sm font-black tracking-tight">{title}</div>
      <div className="mt-4 grid gap-2">
        {items.map((it) => (
          <button
            key={it}
            type="button"
            onClick={() => onItem(it)}
            className="text-left text-sm font-semibold text-black/65 hover:text-black hover:bg-black/5 rounded-xl px-3 py-2 transition dark:text-white/65 dark:hover:text-white dark:hover:bg-white/10"
          >
            {it}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScrollTopFab({ scrolled, onClick }: { scrolled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "fixed right-4 bottom-20 sm:right-6 sm:bottom-8 z-40 rounded-full border border-black/10 bg-white/80 backdrop-blur px-4 py-3 text-sm font-bold text-black/75 shadow-md transition-all duration-300 dark:border-white/12 dark:bg-black/55 dark:text-white/75",
        scrolled ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ↑ Top
    </button>
  );
}

function GlobalStyles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }
      /* Subtle premium shine on "Konvag" */
      .text-shine {
        background: linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0.55), rgba(0,0,0,0.92));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 200% 100%;
        animation: shine 3.5s ease-in-out infinite;
      }
      .dark .text-shine {
        background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.60), rgba(255,255,255,0.95));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 200% 100%;
      }
      @keyframes shine {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Progress shimmer */
      .progress-shimmer {
        position: relative;
        overflow: hidden;
      }
      .progress-shimmer::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-60%);
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.22) 50%,
          rgba(255,255,255,0) 100%
        );
        animation: shimmer 1.6s linear infinite;
        mix-blend-mode: overlay;
      }
      .dark .progress-shimmer::after {
        background: linear-gradient(
          90deg,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.35) 50%,
          rgba(0,0,0,0) 100%
        );
        mix-blend-mode: multiply;
      }
      @keyframes shimmer {
        0% { transform: translateX(-60%); }
        100% { transform: translateX(60%); }
      }
    `}</style>
  );
}
