// src/components/MenuAnimation.jsx
import { useEffect } from "react";
import gsap from "gsap";

export default function MenuAnimation() {
  useEffect(() => {
    const menuToggle = document.querySelector(".menu__toggle");
    const menuList = document.querySelector(".menu__list");
    const menuItems = document.querySelectorAll(".menu__item");

    let isOpen = false;

    const openMenu = () => {
      menuToggle.textContent = "Close";
      menuToggle.setAttribute("aria-expanded", "true");
      gsap.to(menuList, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        onStart: () => (menuList.style.pointerEvents = "auto"),
      });

      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    };

    const closeMenu = () => {
      menuToggle.textContent = "Menu";
      menuToggle.setAttribute("aria-expanded", "false");
      gsap.to(menuItems, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });

      gsap.to(menuList, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        onComplete: () => (menuList.style.pointerEvents = "none"),
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
        !menuList.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
        isOpen = false;
      }
    });
  }, []);

  return null;
}
