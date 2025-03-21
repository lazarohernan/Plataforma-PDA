"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface BackgroundBoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  rows?: number;
  colorScheme?: "primary" | "secondary" | "custom";
  customColors?: string[];
  className?: string;
  containerClassName?: string;
}

export const BackgroundBoxes = ({
  columns = 6,
  rows = 6,
  colorScheme = "primary",
  customColors,
  className,
  containerClassName,
  ...props
}: BackgroundBoxesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Define color schemes
  const colorSchemes = {
    primary: [
      "#4f46e5", // Indigo
      "#6366f1", // Lighter indigo
      "#4338ca", // Darker indigo
      "#3730a3", // Deep indigo
      "#312e81", // Very deep indigo
    ],
    secondary: [
      "#8b5cf6", // Violet
      "#a78bfa", // Lighter violet
      "#7c3aed", // Darker violet
      "#6d28d9", // Deep violet
      "#5b21b6", // Very deep violet
    ],
    custom: customColors || [
      "#4f46e5", // Default if no custom colors provided
      "#8b5cf6",
      "#ec4899",
      "#10b981",
      "#3b82f6",
    ],
  };

  // Select the color array based on the colorScheme prop
  const colors = colorSchemes[colorScheme];

  // Generate grid cells
  const generateGridCells = () => {
    const cells = [];
    const totalCells = columns * rows;

    for (let i = 0; i < totalCells; i++) {
      const row = Math.floor(i / columns);
      const col = i % columns;
      
      // Calculate position as percentage
      const x = (col / columns) * 100;
      const y = (row / rows) * 100;
      
      // Calculate size (slightly random for organic feel)
      const baseSize = Math.min(100 / columns, 100 / rows);
      const size = baseSize * (0.8 + Math.random() * 0.4); // 80-120% of base size
      
      // Select color (with some variation)
      const colorIndex = (row + col) % colors.length;
      const color = colors[colorIndex];
      
      cells.push({
        id: i,
        x,
        y,
        size,
        color,
      });
    }
    
    return cells;
  };

  const gridCells = generateGridCells();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateTransform = (
    cellX: number,
    cellY: number,
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ) => {
    // Calculate the cell center position in pixels
    const cellCenterX = (cellX / 100) * width;
    const cellCenterY = (cellY / 100) * height;

    // Calculate the distance between the mouse and the cell center
    const deltaX = mouseX - cellCenterX;
    const deltaY = mouseY - cellCenterY;

    // Calculate the distance as a percentage of the container size
    const percentX = (deltaX / width) * 100;
    const percentY = (deltaY / height) * 100;

    // Limit the maximum movement to create a subtle effect
    const maxMovement = 3; // percentage (reduced for subtlety)
    const moveX = Math.max(Math.min(percentX, maxMovement), -maxMovement);
    const moveY = Math.max(Math.min(percentY, maxMovement), -maxMovement);

    // Apply the transform in the opposite direction of the mouse movement
    return `translate(${-moveX}%, ${-moveY}%)`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full overflow-hidden bg-transparent relative will-change-transform contain-layout",
        containerClassName
      )}
      {...props}
    >
      {gridCells.map((cell) => (
        <div
          key={cell.id}
          className={cn(
            "absolute rounded-[36%_64%_47%_53%_/_30%_30%_70%_70%] opacity-40 blur-3xl transition-transform duration-300 ease-in-out",
            className
          )}
          style={{
            width: `${cell.size}%`,
            height: `${cell.size}%`,
            backgroundColor: cell.color,
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            transform:
              dimensions.width > 0 && dimensions.height > 0
                ? calculateTransform(
                    cell.x,
                    cell.y,
                    mousePosition.x,
                    mousePosition.y,
                    dimensions.width,
                    dimensions.height
                  )
                : "none",
            animation: `pulse-${cell.id % 3} ${15 + cell.id % 10}s infinite ease-in-out`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes pulse-0 {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.5; }
          }
          @keyframes pulse-1 {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.45; }
          }
          @keyframes pulse-2 {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};
