"use client";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";

function StreamingText({ text, delay = 0 }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let i = 0;
    let intervalId;

    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        if (i < text.length) {
          setVisibleText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 40);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return (
    <motion.span
      className="inline-block"
      initial={{ filter: "blur(4px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 0.4 }}
    >
      {visibleText}
    </motion.span>
  );
}

export default function PersonaCard({ id, name, role, image, sampleA }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/chat/${id}`}
      className="relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img src={image} alt={name} className="w-full h-full object-cover" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>

      {/* Name & role */}
      <div className="absolute top-4 left-4 text-white">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm opacity-80">{role}</p>
      </div>

      {/* Hover Q&A Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-4 inset-x-0 flex flex-col justify-center items-center px-4 text-center text-white bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-sm self-start bg-white/10 px-3 py-2 rounded-lg max-w-[80%] text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StreamingText text={sampleA} delay={0} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
