// src/components/Contact.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    try {
      const response = await fetch("https://formspree.io/f/mblnzewd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const letters = containerRef.current.querySelectorAll(
      ".anim-letter-contact"
    );
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
      letters.forEach((letter) => {
        gsap.set(letter, { color: "transparent", opacity: 1 });
        gsap.to(letter, {
          color: "white",
          duration: Math.random() * 0.5 + 0.5,
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
          repeatDelay: Math.random() * 3 + 1,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full text-white animate-in fade-in duration-700 pb-20"
    >
      {/* Animated Header */}
      <div className="mb-12 md:mb-20">
        {["ENTRE EM", "CONTATO"].map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="anim-letter-contact font-[Archivo Black] text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[11rem] uppercase tracking-tighter leading-[0.85] text-outline-white select-none mr-2 md:mr-4"
                style={{ fontFamily: '"Archivo Black", sans-serif' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-12 contact-item order-2 lg:order-1">
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase mb-6 text-white/70">
              Meus Contatos
            </h3>
            <div className="flex flex-col gap-8">
              <div className="group">
                <p className="text-sm opacity-60 mb-2">Email</p>
                <a
                  href="mailto:felipe@felipempadula.com"
                  className="text-lg md:text-2xl font-light hover:underline decoration-1 underline-offset-4 break-all"
                >
                  felipe@felipempadula.com
                </a>
              </div>
              <div className="group">
                <p className="text-sm opacity-60 mb-2">WhatsApp</p>
                <a
                  href="https://wa.me/5513991188903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-2xl font-light hover:underline decoration-1 underline-offset-4"
                >
                  +55 13 99118 8903
                </a>
              </div>
            </div>
          </div>
          <div className="contact-item">
            <h3 className="font-bold text-xs tracking-widest uppercase mb-6 text-white/70">
              Localização
            </h3>
            <p className="text-xl font-light">São Paulo-SP, Brasil</p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7 contact-item order-1 lg:order-2">
          {status === "success" && (
            <div className="mb-6 p-4 border border-green-500 bg-green-500/10 text-green-400">
              <p className="font-bold">Obrigado</p>
              <p>Sua mensagem foi enviada com sucesso. Em breve retornarei.</p>
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-400">
              <p className="font-bold">Oops!</p>
              <p>
                Alguma coisa deu errado. Verifique sua conexão com a internet e
                tente novamente.
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-bold text-xs tracking-widest uppercase text-white/70"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20 disabled:opacity-50"
                placeholder="Nome"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-bold text-xs tracking-widest uppercase text-white/70"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/20 disabled:opacity-50"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-bold text-xs tracking-widest uppercase text-white/70"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/20 disabled:opacity-50"
                placeholder="Descreva seu projeto..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 self-start px-10 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 uppercase font-bold tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
