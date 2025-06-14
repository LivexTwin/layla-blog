import { useEffect } from "react";
import { animate, stagger } from "motion";

export default function MenuAnimation() {
  useEffect(() => {
    const menuToggle = document.querySelector(".menu__toggle");
    const menuWrapper = document.querySelector(".menu__wrapper");
    const menuItems = document.querySelectorAll(".menu__item");

    const menuLabel = menuToggle.querySelector(".menu__label--menu");
    const closeLabel = menuToggle.querySelector(".menu__label--close");

    let isOpen = false;

    const openMenu = () => {
      menuLabel.classList.add("hidden");
      closeLabel.classList.remove("hidden");

      menuToggle.setAttribute("aria-expanded", "true");

      const fullHeight = menuWrapper.scrollHeight;

      animate(
        menuWrapper,
        { height: fullHeight },
        { duration: 0.4, easing: "ease-out" }
      ).finished.then(() => {
        menuWrapper.style.height = "auto";
      });
      menuWrapper.style.pointerEvents = "auto";

      animate(
        menuItems,
        { opacity: 1, transform: "translateY(0px)" },
        { duration: 0.4, delay: stagger(0.1), easing: "ease-out" }
      );
    };

    const closeMenu = () => {
      menuLabel.classList.remove("hidden");
      closeLabel.classList.add("hidden");

      menuToggle.setAttribute("aria-expanded", "false");

      menuWrapper.style.height = `${menuWrapper.scrollHeight}px`;

      requestAnimationFrame(() => {
        animate(
          menuWrapper,
          { height: 0 },
          { duration: 0.4, easing: "ease-in-out" }
        ).finished.then(() => {
          menuWrapper.style.pointerEvents = "none";
        });
        animate(
          menuItems,
          { opacity: 0, transform: "translateY(10px)" },
          { duration: 0.2, delay: stagger(0.05), easing: "ease-in" }
        );
      });
    };

    const toggleMenu = (e) => {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
      isOpen = !isOpen;
    };

    menuToggle.addEventListener("click", toggleMenu);

    document.addEventListener("click", (e) => {
      if (
        isOpen &&
        !menuWrapper.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
        isOpen = false;
      }
    });

    // Clean up listeners on unmount (good practice)
    return () => {
      menuToggle.removeEventListener("click", toggleMenu);
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return null;
}
