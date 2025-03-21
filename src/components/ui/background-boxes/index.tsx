"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface BackgroundBoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  boxes?: {
    value: number;
    size: number;
    x: number;
    y: number;
    color: string;
  }[];
  className?: string;
  containerClassName?: string;
}

export const BackgroundBoxes = ({
  boxes = [
    {
      value: 0,
      size: 60,
      x: 10,
      y: 30,
      color: "var(--primary-color, #4f46e5)",
    },
    {
      value: 1,
      size: 120,
      x: 30,
      y: 60,
      color: "var(--secondary-color, #8b5cf6)",
    },
    {
      value: 2,
      size: 40,
      x: 60,
      y: 30,
      color: "var(--tertiary-color, #ec4899)",
    },
    {
      value: 3,
      size: 80,
      x: 80,
      y: 80,
      color: "var(--quaternary-color, #10b981)",
    },
    {
      value: 4,
      size: 100,
      x: 50,
      y: 50,
      color: "var(--quinary-color, #f59e0b)",
    },
  ],
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
    boxX: number,
    boxY: number,
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ) => {
    // Calculate the box center position in pixels
    const boxCenterX = (boxX / 100) * width;
    const boxCenterY = (boxY / 100) * height;

    // Calculate the distance between the mouse and the box center
    const deltaX = mouseX - boxCenterX;
    const deltaY = mouseY - boxCenterY;

    // Calculate the distance as a percentage of the container size
    const percentX = (deltaX / width) * 100;
    const percentY = (deltaY / height) * 100;

    // Limit the maximum movement to create a subtle effect
    const maxMovement = 5; // percentage
    const moveX = Math.max(Math.min(percentX, maxMovement), -maxMovement);
    const moveY = Math.max(Math.min(percentY, maxMovement), -maxMovement);

    // Apply the transform in the opposite direction of the mouse movement
    return `translate(${-moveX}%, ${-moveY}%)`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full overflow-hidden bg-transparent relative",
        containerClassName
      )}
      {...props}
    >
      {boxes.map((box) => (
        <div
          key={box.value}
          className={cn(
            "absolute rounded-[36%_64%_47%_53%_/_30%_30%_70%_70%] opacity-40 blur-3xl transition-transform duration-300 ease-in-out",
            className
          )}
          style={{
            width: box.size,
            height: box.size,
            backgroundColor: box.color,
            left: `${box.x}%`,
            top: `${box.y}%`,
            transform:
              dimensions.width > 0 && dimensions.height > 0
                ? calculateTransform(
                    box.x,
                    box.y,
                    mousePosition.x,
                    mousePosition.y,
                    dimensions.width,
                    dimensions.height
                  )
                : "none",
          }}
        />
      ))}
    </div>
  );
};
