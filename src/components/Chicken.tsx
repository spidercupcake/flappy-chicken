"use client";
import { useEffect, useState } from "react";

export default function Chicken() {
  const [position, setPosition] = useState(1);
  const speed = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition < window.innerHeight - 80) return prevPosition + speed;
        return prevPosition;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute h-20 w-20"
      style={{
        top: `${position}px`,
      }}
    >
      <img src="/assets/chicken.svg" alt="CHICKEN" />
    </div>
  );
}
