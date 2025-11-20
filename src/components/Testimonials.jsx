"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "HireMe AI transformed our hiring process. We found an exceptional developer from Nigeria who has become one of our top performers. The 48-hour promise was delivered exactly as advertised.",
      name: "Sarah Johnson",
      role: "CTO, TechCorp Inc.",
      company: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    },
    {
      quote:
        "The quality of talent we've accessed through HireMe AI is outstanding. Our designer from Kenya brought fresh perspectives and exceptional skills that elevated our entire brand strategy.",
      name: "Michael Chen",
      role: "Marketing Director",
      company: "StartupX, Austin TX",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    },
    {
      quote:
        "We've hired 5 professionals through HireMe AI over the past year. Each hire has been exceptional, and the support throughout the process has been world-class. Highly recommend!",
      name: "Emily Rodriguez",
      role: "CEO, GrowthLabs",
      company: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Trusted by Companies Worldwide
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            See how businesses are scaling their teams with exceptional African
            talent through HireMe AI.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-8 left-8 text-blue-100">
              <Quote size={64} />
            </div>

            <div className="relative">
              {/* Testimonial content */}
              <div className="max-w-4xl mx-auto text-center">
                <blockquote
                  className="text-xl md:text-2xl lg:text-3xl text-gray-900 font-medium leading-relaxed mb-12"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4 shadow-lg"
                  />
                  <div className="text-center">
                    <div
                      className="font-bold text-lg text-gray-900 mb-1"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {testimonials[currentIndex].name}
                    </div>
                    <div
                      className="text-gray-600 font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {testimonials[currentIndex].role}
                    </div>
                    <div
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 gap-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Company logos */}
        <div className="mt-16 text-center">
          <p
            className="text-sm text-gray-500 mb-8 font-medium"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Trusted by companies of all sizes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            <img
              src="https://logo.clearbit.com/techcrunch.com"
              alt="TechCrunch"
              className="h-8 object-contain filter grayscale"
            />
            <img
              src="https://logo.clearbit.com/salesforce.com"
              alt="Salesforce"
              className="h-8 object-contain filter grayscale"
            />
            <img
              src="https://logo.clearbit.com/shopify.com"
              alt="Shopify"
              className="h-8 object-contain filter grayscale"
            />
            <img
              src="https://logo.clearbit.com/stripe.com"
              alt="Stripe"
              className="h-8 object-contain filter grayscale"
            />
            <img
              src="https://logo.clearbit.com/mailchimp.com"
              alt="Mailchimp"
              className="h-8 object-contain filter grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
