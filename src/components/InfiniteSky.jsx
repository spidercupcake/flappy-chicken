"use client";

import React, { useEffect, useState, useRef } from "react";
import "./InfiniteSky.css";

function generateWavePath(baseY, amplitude, width, height, startY = null) {
  const points = [];
  const segments = 8;
  const segmentWidth = width / segments;

  const firstY =
    startY !== null
      ? startY
      : baseY + (Math.random() * amplitude * 2 - amplitude);
  points.push({ x: 0, y: firstY });

  for (let i = 1; i <= segments; i++) {
    points.push({
      x: i * segmentWidth,
      y: baseY + (Math.random() * amplitude * 2 - amplitude),
    });
  }

  let path = `M${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midX = (p0.x + p1.x) / 2;
    path += ` C${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  path += ` L${width} ${height} L0 ${height} Z`;

  return { path, endY: points[points.length - 1].y };
}

function generateWavePaths(width, height, startYPoints = null) {
  const paths = [];
  const colors = ["#e6ffe6", "#d6fcd6", "#c5f8c6", "#b4f5b6", "#a2f1a7"];
  const baseHeights = [180, 240, 300, 360, 420];
  const endYPoints = [];

  colors.forEach((color, index) => {
    const startY = startYPoints ? startYPoints[index] : null;
    const { path, endY } = generateWavePath(
      baseHeights[index],
      30,
      width,
      height,
      startY
    );
    paths.push({ d: path, fill: color });
    endYPoints.push(endY);
  });

  return { paths, endYPoints };
}

export default function InfiniteSky() {
  const [svgSets, setSvgSets] = useState([]);
  const [nextId, setNextId] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const width = 960;
    const height = 540;
    const firstSet = generateWavePaths(width, height);
    const secondSet = generateWavePaths(width, height, firstSet.endYPoints);

    setSvgSets([
      { id: nextId, ...firstSet },
      { id: nextId + 1, ...secondSet },
    ]);
    setNextId(nextId + 2);
  }, []);

  const handleAnimationEnd = (id) => {
    const width = 960;
    const height = 540;
    setSvgSets((prev) => {
      const otherSet = prev.find((set) => set.id !== id);
      const newSet = generateWavePaths(width, height, otherSet.endYPoints);
      return [otherSet, { id: nextId, ...newSet }];
    });
    setNextId((prev) => prev + 1);
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="ball" />

      <div className="svgContainer">
        {svgSets.map(({ id, paths }) => (
          <svg
            key={id}
            className="wave"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            onAnimationEnd={() => handleAnimationEnd(id)}
          >
            {paths.map((path, pathIndex) => (
              <path key={pathIndex} d={path.d} fill={path.fill} />
            ))}
          </svg>
        ))}
      </div>
    </div>
  );
}
