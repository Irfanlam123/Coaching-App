import React from "react";

export default function FounderStory() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center py-20 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Founder Image */}
        <div className="relative group flex justify-center">
          <div className="absolute w-80 h-80 bg-gradient-to-r from-[#043D3B] via-emerald-600 to-teal-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="./src/assets/ceo.jpg"
              alt="Founder"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        {/* Founder Story */}
        <div className="space-y-6">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#043D3B] via-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Meet Our Founder
          </h2>
          <p className="text-lg font-semibold text-[#043D3B]">
            MD Adil — Founder & CEO | Viraam Vaani
          </p>

          <p className="text-black text-xl leading-relaxed">
            Every great dream begins with a small step. The journey of MD Adil is a
            living example of this belief. Coming from a modest background, he faced
            challenges that could have easily discouraged anyone. Yet, instead of
            stopping him, these struggles made him stronger and more determined.
          </p>

          <p className="text-black text-xl leading-relaxed">
            With limited resources and countless obstacles, his vision remained
            unshaken. What started as small efforts gradually transformed into a
            powerful journey that gave birth to{" "}
            <span className="font-semibold text-[#043D3B]">Viraam Vaani</span> — a
            platform that is not just about learning, but about inspiring students to
            turn their dreams into reality.
          </p>

          <p className="text-black text-xl leading-relaxed">
            Adil firmly believes that{" "}
            <span className="font-semibold text-[#043D3B]">
              “True success lies in making others’ lives better through your hard work.”
            </span>{" "}
            With this vision, he continues to create opportunities, guidance, and a
            brighter future for students across the community.
          </p>
          <div className="mt-6">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#043D3B] via-emerald-600 to-teal-500 text-white font-semibold shadow-xl hover:scale-105 transition-transform duration-300">
              🚀 Connect with Founder
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
