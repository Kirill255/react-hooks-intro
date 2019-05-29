import { useLayoutEffect } from "react";

const useBodyScrollLock = () => {
  useLayoutEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    // console.log(originalOverflow);
    document.body.style.overflow = "hidden";

    return () => {
      // document.body.style.overflow = "";
      document.body.style.overflow = originalOverflow; // document.body.style.overflow = "visible";
    };
  }, []);
};

export { useBodyScrollLock };
