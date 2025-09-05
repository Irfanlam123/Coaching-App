import { useEffect, useState } from "react";

export default function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => {
      const size = Math.random() * 6 + 3;
      return {
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10, // 10s - 30s
        delay: Math.random() * 10,
        dx: Math.random() * 100 - 50, // horizontal move (-50px to +50px)
        dy: Math.random() * 100 - 50, // vertical move (-50px to +50px)
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${
          Math.floor(Math.random() * 100 + 155)
        }, ${Math.floor(Math.random() * 100 + 155)}, 0.7)`
      };
    });

    setParticles(initialParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px ${p.color}`,
            animation: `float-${p.id} ${p.duration}s ease-in-out ${p.delay}s infinite alternate`
          }}
        />
      ))}

      {/* Unique animations for each particle */}
      <style>
        {particles
          .map(
            (p) => `
          @keyframes float-${p.id} {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(${p.dx}px, ${p.dy}px) scale(1.2); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `
          )
          .join("\n")}
      </style>
    </div>
  );
}

