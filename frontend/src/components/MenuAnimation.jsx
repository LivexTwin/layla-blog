import { useEffect } from "react";

export default function MenuAnimation() {
  useEffect(() => {
    // Only run logic if the media query matches
    if (!window.matchMedia("(max-width: 768px)").matches) return;

    const menuToggle = document.querySelector(".menu__toggle");
    const menuWrapper = document.querySelector(".menu__wrapper");
    const menuLabel = menuToggle?.querySelector(".menu__label--menu");
    const closeLabel = menuToggle?.querySelector(".menu__label--close");

    let isOpen = false;

    const openMenu = () => {
      menuWrapper?.classList.add("is-open");
      menuToggle?.setAttribute("aria-expanded", "true");
      menuLabel?.classList.add("hidden");
      closeLabel?.classList.remove("hidden");
      isOpen = true;
    };

    const closeMenu = () => {
      menuWrapper?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuLabel?.classList.remove("hidden");
      closeLabel?.classList.add("hidden");
      isOpen = false;
    };

    const toggleMenu = () => {
      isOpen ? closeMenu() : openMenu();
    };

    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !menuWrapper?.contains(e.target) &&
        !menuToggle?.contains(e.target)
      ) {
        closeMenu();
      }
    };

    menuToggle?.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      menuToggle?.removeEventListener("click", toggleMenu);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return null;
}
