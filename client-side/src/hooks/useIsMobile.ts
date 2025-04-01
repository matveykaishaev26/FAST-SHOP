import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= breakpoint);
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};
