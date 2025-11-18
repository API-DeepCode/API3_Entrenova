"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export default function TestimonialsCarousel() {
  const logos = useMemo(
    () => [
      "/logos/logo-1.svg",
      "/logos/logo-2.svg",
      "/logos/logo-3.svg",
      "/logos/logo-4.svg",
      "/logos/logo-5.svg",
    ],
    []
  );

  const testimonials: Testimonial[] = [
    {
      quote:
        "Conseguimos mapear rapidamente nossos gargalos e priorizar planos de ação realistas.",
      name: "Camila Souza",
      role: "People Manager, TechNova",
      avatar: "/avatars/avatar-1.svg",
    },
    {
      quote:
        "Os relatórios foram decisivos para alinhar diretoria e líderes em torno das metas.",
      name: "Rafael Lima",
      role: "Head de Operações, AlphaCorp",
      avatar: "/avatars/avatar-2.svg",
    },
    {
      quote:
        "A qualidade das trilhas personalizadas elevou o engajamento do time.",
      name: "Bianca Santos",
      role: "L&D, GlobalEdu",
      avatar: "/avatars/avatar-3.svg",
    },
  ];

  // Slider de depoimentos (auto-play, pausa no hover)
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused, total]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Logos - marquee leve com pausa no hover */}
      <div className="group relative overflow-hidden py-3 mb-8 border-t border-b border-white/10">
        <div
          className="flex items-center gap-10 animate-[scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
          aria-label="Logos de empresas parceiras"
        >
          {[...logos, ...logos].map((src, i) => (
            <div key={i} className="opacity-80 hover:opacity-100 transition-opacity">
              <Image src={src} alt="Logo" width={160} height={48} priority={i < 5} />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Depoimentos - slider simples */}
      <div
        className="relative bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)`, width: `${total * 100}%` }}
            role="list"
          >
            {testimonials.map((t, i) => (
              <figure key={i} className="w-full shrink-0 px-1" role="listitem">
                <blockquote className="text-lg text-gray-200 leading-relaxed mb-5">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-white/70 text-sm">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir ao depoimento ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === i ? "w-6 bg-gradient-to-r from-[#ff4687] to-[#4d2cc4]" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
