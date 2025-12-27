
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(12); // Default small size
  const [isHoveringText, setIsHoveringText] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use refs for values to avoid re-renders on mousemove
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.15; // Smooth follow speed (0-1)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the target is text-related or interactive
      const isText = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'LABEL'].includes(target.tagName);
      const isInteractive = ['BUTTON', 'A', 'INPUT'].includes(target.tagName) || target.closest('button') || target.closest('a');

      if (isInteractive) {
        setSize(60); // Large sphere for interactive elements
        setIsHoveringText(false);
      } else if (isText) {
        // Compute the font size of the text we are hovering
        const style = window.getComputedStyle(target);
        const fontSize = parseFloat(style.fontSize);
        
        // Adapt size to be slightly larger than the letter (e.g., 1.5x)
        // Clamp it reasonably so it doesn't disappear or get huge
        const newSize = Math.max(20, Math.min(fontSize * 1.8, 150));
        setSize(newSize);
        setIsHoveringText(true);
      } else {
        setSize(12); // Reset to small dot
        setIsHoveringText(false);
      }
    };

    const loop = () => {
      // Linear interpolation for smooth movement (Fluid/Sphere physics)
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      if (cursor) {
        // Translate -50% to center the cursor on the mouse
        cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference will-change-transform"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'white', // White mixes with difference to invert colors
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        // Removed backdropFilter: 'blur(2px)' to ensure text remains crisp and readable
        // The sphere effect is maintained via the inset shadow
        boxShadow: isHoveringText 
            ? 'inset 0 0 12px rgba(0,0,0,0.15)' // Softer shadow when reading text
            : 'inset 0 0 4px rgba(0,0,0,0.5)',  // Distinct sphere edge when idle
      }}
    />
  );
};

export default CustomCursor;
