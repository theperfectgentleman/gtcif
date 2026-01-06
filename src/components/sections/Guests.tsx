"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ChevronLeft = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const guests = [
  {
    name: "H.E. John Dramani Mahama",
    title: "President of the Republic of Ghana",
    badge: "Special Guest Speaker",
    description: "Leading the \"Resetting Agenda\" for Ghana's agricultural economic transformation and delivering the keynote address on Day 1.",
    session: "Opening Ceremony -- February 17, 2026",
    sessionLabel: "Session Date",
    image: "/images/guests/president.png",
    color: "bg-tcda-green" 
  },
  {
    name: "H.R.M. Otumfuo Osei Tutu (II)",
    title: "Asantehene",
    badge: "Special Guest of Honour",
    description: "Gracing the summit as the Special Guest of Honour and officiating the grand opening of the exhibition at the AICC.",
    session: "Official Opening Ceremony -- February 17, 2026",
    sessionLabel: "Presence",
    image: "/images/guests/otumfour.png",
    bgBadge: "bg-yellow-600"
  },
  {
    name: "Hon. Dr. Cassiel Ato Baah Forson",
    title: "Minister for Finance",
    badge: "Keynote Speaker",
    description: "Discussing fiscal strategies and funding mechanisms to drive USD 100M investment into each of the six tree crop value chains.",
    session: "Closing Ceremony/Gala Night -- February 20, 2026",
    sessionLabel: "Gala Address",
    image: "/images/guests/forson.png"
  },
  {
    name: "Hon. Dr. Eric Opoku",
    title: "Minister for Food and Agriculture",
    badge: "Keynote Speaker",
    description: "Addressing the modernization of agriculture and promoting agri-business to ensure food security and export growth.",
    session: "Value Chain Keynote -- February 18, 2026",
    sessionLabel: "Keynote",
    image: "/images/guests/eric opoku.png"
  },
  {
    name: "Hon. Elizabeth Ofosu-Adjare",
    title: "Minister for Trade, Agribusiness & Industry",
    badge: "Keynote Speaker",
    description: "Highlighting trade opportunities and industrial processing potential within Ghana's diversified tree crop sector.",
    session: "Closing Ceremony/Gala Night -- February 20, 2026",
    sessionLabel: "Gala Address",
    image: "/images/guests/elizabeth.png"
  },
  {
    name: "Prof. William Oduro",
    title: "Chairman, Tree Crops Development Authority",
    badge: "TCDA Leadership",
    description: "Providing strategic oversight for the sustainable development of Ghana's oil palm, cashew, mango, shea, rubber, and coconut industries.",
    session: "Opening Remarks -- February 20, 2026",
    sessionLabel: "Speaking",
    image: "/images/guests/william.png"
  },
  {
    name: "Dr. Andy Osei Okrah",
    title: "C.E.O., Tree Crops Development Authority",
    badge: "TCDA Leadership",
    description: "Driving the Authority's mission to achieve long-term commercial productivity and global competitiveness for Ghanaian tree crops.",
    session: "Purpose of Gathering -- February 17, 2026",
    sessionLabel: "Presentation",
    image: "/images/guests/andy.png"
  }
];

export default function Guests() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const changeSlide = (n: number) => {
    setDirection(n);
    setCurrentSlide((prev) => {
      let next = prev + n;
      if (next >= guests.length) return 0;
      if (next < 0) return guests.length - 1;
      return next;
    });
  };

  const goToSlide = (n: number) => {
    setDirection(n > currentSlide ? 1 : -1);
    setCurrentSlide(n);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-10 text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Summit Leadership & Distinguished Speakers</h2>
          <div className="w-24 h-1 bg-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Join us at GTCIS 2026 as we host Ghana&apos;s key decision-makers and industry leaders driving the tree crop transformation agenda.
          </p>
        </motion.div>
      </div>

      {/* Wide Carousel */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] md:min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 flex flex-col md:flex-row h-full w-full"
            >
              <div className="md:w-2/5 relative h-64 md:h-auto bg-gray-200">
                <Image
                  src={guests[currentSlide].image}
                  alt={guests[currentSlide].name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  className="w-full h-full"
                />
                <div className={`absolute bottom-4 left-4 ${guests[currentSlide].bgBadge || 'bg-green-700'} text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded shadow-md border-0`}>
                  {guests[currentSlide].badge}
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white h-auto md:h-full relative overflow-y-auto">
                <span className="text-green-700 font-semibold tracking-wider uppercase text-sm mb-2">
                   {/* Fallback title category mapping or static text */}
                   {guests[currentSlide].badge === "TCDA Leadership" ? "Leadership" : "Distinguished Speaker"}
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
                  {guests[currentSlide].name}
                </h3>
                <p className="text-gray-500 font-medium mb-4 italic">
                    {guests[currentSlide].title}
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8">
                  {guests[currentSlide].description}
                </p>
                <div className="flex items-center space-x-4 mt-auto md:mt-0">
                  <div className="flex flex-col border-l-4 border-green-700 pl-4">
                    <span className="text-gray-500 text-sm italic">{guests[currentSlide].sessionLabel || "Session Date"}</span>
                    <span className="font-bold text-gray-800">{guests[currentSlide].session}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Buttons - Hidden on very small screens, visible on md+ inside the card or floating */}
          <button 
            onClick={() => changeSlide(-1)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20 text-green-700 hidden md:flex items-center justify-center hover:scale-110 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => changeSlide(1)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-20 text-green-700 hidden md:flex items-center justify-center hover:scale-110 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {guests.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx 
                    ? 'bg-green-700 w-6 h-2' 
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
