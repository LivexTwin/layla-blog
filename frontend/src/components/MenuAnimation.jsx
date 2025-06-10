import { useEffect } from "react";
import gsap from "gsap";

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

      gsap.fromTo(
        menuWrapper,
        { height: 0 },
        {
          height: fullHeight,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => (menuWrapper.style.pointerEvents = "auto"),
          onComplete: () => {
            menuWrapper.style.height = "auto";
          },
        }
      );

      gsap.fromTo(
        menuItems,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    };

    const closeMenu = () => {
      menuLabel.classList.remove("hidden");
      closeLabel.classList.add("hidden");

      menuToggle.setAttribute("aria-expanded", "false");

      menuWrapper.style.height = `${menuWrapper.scrollHeight}px`;

      requestAnimationFrame(() => {
        gsap.to(menuWrapper, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            menuWrapper.style.pointerEvents = "none";
          },
        });

        gsap.to(menuItems, {
          y: 10,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
        });
      });
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
      isOpen = !isOpen;
    });

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
  }, []);

  return null;
}
