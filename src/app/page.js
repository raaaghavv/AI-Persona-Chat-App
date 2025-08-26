"use client";
import { personas } from "@/lib/personas.js";
import Link from "next/link";
import PersonaCard from "@/components/ui/PersonaCard";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF6EE] text-gray-900 max-w-[1920px] mx-auto">
      <Header />
      {/* Hero */}
      <section className="flex flex-col items-center justify-center mx-8 px-8 py-16 text-center bg-[#F7F0E8] h-screen lg:h-[75vh] rounded-4xl">
        <p className="inline-block bg-transparent text-xs font-medium px-3 py-1 border border-[#e3dcd3] rounded-full mb-4">
          🌱 Your growth journey —{" "}
          <span className="text-[#FF5E04]">Weekly Reflections</span>
        </p>
        <h1 className="text-4xl md:text-6xl text-[#2B180A] font-bold leading-tight mb-4">
          Your AI Companion.
          <br /> Here to Listen & Guide.
        </h1>

        <p className="text-lg text-[#796758] max-w-2xl mx-auto mb-6">
          Instantly access the wisdom of your favorite mentors, experts, and
          guides. AI-powered conversations designed to inspire.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={"#personas"}
            className="bg-[#3E2407] text-white rounded-4xl px-6 py-3 text-sm"
          >
            Explore Experts
          </Link>
          <button
            className="relative bg-[#E8DED3]/60 text-gray-900 rounded-4xl px-6 py-3 text-sm
                  hover:after:content-['Beta'] 
                  hover:after:absolute hover:after:-top-2 hover:after:right-2 
                  hover:after:bg-[#FF5E04] hover:after:text-white 
                  hover:after:text-xs hover:after:px-1 hover:after:py-[1px] 
                  hover:after:rounded"
          >
            Create My Persona
          </button>
        </div>
      </section>

      {/* Personas Grid */}
      <section id="personas" className="px-8 py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 item-center justify-center">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} {...persona} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
