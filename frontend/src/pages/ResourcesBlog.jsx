// src/pages/ResourcesGallery.jsx
import React from "react";

export default function ResourcesGallery() {
  const gallery = [
    "./src/assets/contact.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 11.18.05 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 11.18.06 pm (1).jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 11.18.06 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 11.19.33 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.09.53 pm (1).jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.09.53 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.09.54 pm.jpeg",
    "./src/assets/EFC30EF2-EEC9-46F0-BD99-800F47677992.jpeg",
    "./src/assets/C66854B9-8B6A-4C26-89FF-373F8EAF26A2.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.10.07 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.10.15 pm.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.09.55 pm.jpeg",
    "./src/assets/AB59D788-C364-4614-9D38-B096D9E26F14.jpeg",
    "./src/assets/WhatsApp Image 2025-09-06 at 12.10.24 pm.jpeg",
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-[#043D3B]">
             Student Gallery
          </h1>
          <p className="text-gray-600 text-xl mt-4 max-w-2xl mx-auto">
          A showcase of creativity, achievements, and memories that reflect passion and progress.

          </p>
        </div>

        {/* Fixed 3-column Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-xl group"
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-white font-semibold text-lg">
                Photo {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
