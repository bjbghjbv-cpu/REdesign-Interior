import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  CheckCircle,
  CaretDown,
} from "@phosphor-icons/react";
import { siteMeta, projectCategories } from "../data/content.js";
import GoldCircle from "./ui/GoldCircle.jsx";
import SplitTextReveal from "./ui/SplitTextReveal.jsx";
import RollingText from "./ui/RollingText.jsx";

const photoMosaic = [
  { src: "/images/gallery-grid/kitchen-bar.jpg", alt: "Kitchen bar", className: "md:row-span-2 md:col-span-2" },
  { src: "/images/dining-room.jpg", alt: "Dining room", className: "" },
  { src: "/images/hero-living.jpg", alt: "Living area", className: "" },
  { src: "/images/gallery-grid/marble-tv.jpg", alt: "Custom TV console", className: "md:col-span-2" },
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    area: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      area: "",
      message: "",
    });
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg-parchment)] py-32 md:py-48 overflow-hidden"
    >
      <GoldCircle className="w-56 h-56 md:w-96 md:h-96 -bottom-24 -right-20 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-mono-telemetry text-[var(--text-muted)] mb-4">Contact</p>
            <div className="relative inline-block">
              <SplitTextReveal
                variant="heading"
                as="h2"
                className="font-display text-5xl md:text-7xl text-[var(--text-ink)] leading-[1.02] tracking-tight"
              >
                LET’S WORK TOGETHER !
              </SplitTextReveal>
              <span className="absolute -z-10 -top-4 -left-6 w-24 h-24 rounded-full bg-[var(--accent-gold)] opacity-60 scale-125" />
            </div>

            <div className="mt-12 space-y-8">
              <a
                href={`tel:${siteMeta.phone.replace(/\s/g, "")}`}
                className="group flex items-start gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] transition-colors group-hover:bg-[var(--text-ink)] group-hover:text-[var(--text-bone)]">
                  <Phone size={20} weight="regular" />
                </span>
                <div>
                  <p className="font-mono-telemetry text-[var(--text-muted)]">Phone / WhatsApp</p>
                  <p className="text-lg font-semibold text-[var(--text-ink)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {siteMeta.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteMeta.email}`}
                className="group flex items-start gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] transition-colors group-hover:bg-[var(--text-ink)] group-hover:text-[var(--text-bone)]">
                  <EnvelopeSimple size={20} weight="regular" />
                </span>
                <div>
                  <p className="font-mono-telemetry text-[var(--text-muted)]">Email</p>
                  <p className="text-lg font-semibold text-[var(--text-ink)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {siteMeta.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)]">
                  <MapPin size={20} weight="regular" />
                </span>
                <div>
                  <p className="font-mono-telemetry text-[var(--text-muted)]">Workshop &amp; Office</p>
                  <p className="text-base font-medium text-[var(--text-ink)] mt-1 leading-relaxed max-w-[40ch]">
                    {siteMeta.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-7">
            <div className="rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] p-8 md:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="flex flex-col items-center text-center py-16"
                  >
                    <CheckCircle size={64} weight="regular" className="text-[var(--accent-gold)]" />
                    <h3 className="mt-6 font-display text-3xl text-[var(--text-ink)] leading-tight">
                      We&rsquo;ve received your request.
                    </h3>
                    <p className="mt-4 text-[var(--text-muted)] max-w-[40ch]">
                      Our design team will respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-10 rounded-full bg-[var(--text-ink)] text-[var(--text-bone)] pl-6 pr-6 py-3 text-sm font-semibold transition-all duration-500 hover:opacity-90 active:scale-[0.98]"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-[var(--text-ink)]">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-[var(--text-ink)]">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-[var(--text-ink)]">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+62 812 3456 7890"
                          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-sm font-semibold text-[var(--text-ink)]">
                          Project Category
                        </label>
                        <div className="relative">
                          <select
                            id="category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                          >
                            <option value="" disabled>
                              Select category
                            </option>
                            {projectCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <CaretDown
                            size={16}
                            weight="regular"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="area" className="text-sm font-semibold text-[var(--text-ink)]">
                        Estimated Area (m²)
                      </label>
                      <input
                        id="area"
                        name="area"
                        type="number"
                        min="1"
                        required
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g. 120"
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-semibold text-[var(--text-ink)]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, timeline, and vision..."
                        className="resize-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-4 py-3 text-[var(--text-ink)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] transition-shadow"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full overflow-hidden rounded-full bg-[var(--text-ink)] text-[var(--text-bone)] py-4 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-wait"
                    >
                      {status === "loading" ? (
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Processing...
                        </span>
                      ) : (
                        <RollingText text="Request a Call" className="relative z-10 font-semibold" hoverColor="text-[var(--text-ink)]" />
                      )}
                      <span className="absolute inset-0 -translate-x-full bg-[var(--accent-gold)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoMosaic.map((photo) => (
                  <div
                    key={photo.src}
                    className={`group relative overflow-hidden rounded-2xl ${photo.className}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full min-h-[140px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}