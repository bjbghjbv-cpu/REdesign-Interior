import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Phone, EnvelopeSimple, MapPin, Calendar, CaretDown } from "@phosphor-icons/react";
import { siteMeta, projectCategories } from "../data/content.js";

export default function BookCallModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    area: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      area: "",
      date: "",
      message: "",
    });
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c1217]/80 backdrop-blur-md"
          />

          {/* Modal Container with ERA Residence 3D Unfold Perspective */}
          <div className="perspective-[1200px] w-full max-w-xl z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotateX: -32, y: -40, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 25, y: 30, rotate: 1.5 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full rounded-3xl bg-[#172026] text-[#EFEFEC] border border-white/15 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto transform-gpu"
            >
            {/* Architectural Corner Vectors */}
            <div className="absolute top-4 left-4 font-mono-telemetry text-[10px] text-[var(--accent-gold)] tracking-widest opacity-60">
              +
            </div>
            <div className="absolute top-4 right-14 font-mono-telemetry text-[10px] text-[var(--accent-gold)] tracking-widest opacity-60">
              +
            </div>

            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                  <span className="font-mono-telemetry text-[10px] tracking-[0.22em] text-[var(--accent-gold)] uppercase">
                    CONSULTATION REQUEST
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl text-white font-normal tracking-tight"
                  style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', serif" }}
                >
                  Book a Call
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  Discuss your spatial vision with our senior interior and furniture architects.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <div className="pt-6">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <CheckCircle size={56} weight="duotone" className="text-[var(--accent-gold)] animate-pulse" />
                  <h4
                    className="mt-4 text-2xl text-white font-normal"
                    style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', serif" }}
                  >
                    Consultation Requested
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
                    Thank you, {formData.name || "client"}. Our design studio in Gading Serpong has received your brief and will connect with you via WhatsApp/Email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 px-6 py-2.5 rounded-full bg-[var(--accent-gold)] text-white font-mono-telemetry text-xs tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Christopher"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+62 8..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Project Category
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full appearance-none px-4 py-2.5 rounded-xl bg-[#20292E] border border-white/15 text-sm text-white focus:border-[var(--accent-gold)] focus:outline-none transition-colors pr-10"
                        >
                          <option value="">Select scope</option>
                          {projectCategories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Estimated Area (m²)
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g. 120"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                        Preferred Date / Time
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="e.g. Next Tuesday morning"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-telemetry text-[10px] text-white/70 tracking-wider uppercase mb-1.5">
                      Project Notes / Vision
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your residence, room typology, or commercial space..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-white/30 focus:border-[var(--accent-gold)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 rounded-full bg-[var(--accent-gold)] text-white font-mono-telemetry text-xs tracking-[0.2em] uppercase font-semibold hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SENDING BRIEF...</span>
                        </>
                      ) : (
                        <span>SUBMIT CONSULTATION BRIEF &rarr;</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Direct studio line */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono-telemetry text-white/60">
                <span className="text-[var(--accent-gold)]">OFFICE &amp; WORKSHOP:</span>
                <span>{siteMeta.phone} &bull; {siteMeta.email}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
}
