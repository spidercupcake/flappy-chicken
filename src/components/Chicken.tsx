"use client";
import { useEffect, useState } from "react";

export default function Chicken() {
  const [position, setPosition] = useState(0);
  const [IsJumping, setIsJumping] = useState(false);

  const speed = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!IsJumping) {
        setPosition((prevPosition) => {
          if (prevPosition < window.innerHeight - 80)
            return prevPosition + speed;
          return prevPosition;
        });
      } else {
        setPosition((prevPosition) => {
          return prevPosition - 500;
        });
        setIsJumping(false);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [IsJumping]);

  return (
    <div
      onClick={() => setIsJumping(true)}
      className="absolute h-20 w-20"
      style={{
        top: `${position}px`,
      }}
    >
      <img src="/assets/cojiro.svg" alt="CHICKEN" />
    </div>
  );
}
