'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { HomeSlide } from '@/lib/directus';

type HomeSliderProps = {
  slides: HomeSlide[];
};

export default function HomeSlider({ slides }: HomeSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[currentSlide];

  function showPreviousSlide() {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  }

  function showNextSlide() {
    setCurrentSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[60vh] w-full md:h-[70vh]">
        <Image
          src={activeSlide.image}
          alt={activeSlide.title ?? 'Gallery image'}
          fill
          unoptimized
          priority
          className="object-cover"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPreviousSlide}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-stone-950 hover:bg-white"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={showNextSlide}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-stone-950 hover:bg-white"
              aria-label="Next image"
            >
              ›
            </button>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}