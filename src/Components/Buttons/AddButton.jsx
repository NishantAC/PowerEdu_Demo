import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import "./Buttons.css";

const AddButton = ({ onClick, name, width }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const themeProperties = useSelector(selectThemeProperties);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hover) => {
    const tl = gsap.timeline();
    if (hover) {
      tl.to(buttonRef.current, {
        duration: 0.5,
        width: width || 200,
        ease: "back",
      });
      tl.to(
        textRef.current,
        {
          duration: 0.5,
          opacity: 1,
          width: "auto",
          visibility: "visible",
        },
        "<"
      );
    } else {
      tl.to(buttonRef.current, {
        duration: 0.5,
        width: 50,
        ease: "back",
      });
      tl.to(
        textRef.current,
        {
          duration: 0,
          opacity: 0,
          width: 0,
          visibility: "hidden",
        },
        "<"
      );
    }
  }, []);

  useEffect(() => {
    gsap.set(buttonRef.current, { width: 50, height: 50 });
    gsap.set(textRef.current, { opacity: 0, width: 0, visibility: "hidden" });
  }, []);

  return (
    <div className="w-full z-50 ">
      <button
        ref={buttonRef}
        onMouseEnter={() => {
          setIsHovered(true);
          handleHover(true);
        }}
        onMouseLeave={() => {
          handleHover(false);
          setIsHovered(false);
        }}
        className="flex items-center p-2 rounded-full text-wrap overflow-hidden z-50"
        style={{
          backgroundColor: themeProperties.specialColor,
          color: themeProperties.textColorAlt,
          justifyContent: isHovered ? "space-around" : "center",
        }}
        onClick={onClick}
        aria-label={name || "Add Button"}
      >
        <IoMdAdd size={25} />
        <div className="text-nowrap" ref={textRef}>
          { name}
        </div>
      </button>
    </div>
  );
};

export default AddButton;
