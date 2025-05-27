import { buildLegacyTheme } from "sanity";

export const laylaDarkTheme = buildLegacyTheme({
  // Primary brand colors
  "--brand-primary": "#0e4f47", // your green accent
  "--brand-secondary": "#a8bdb3", // softer secondary greenish-gray

  // Backgrounds and surfaces
  "--component-bg": "#0d0d0d", // very dark black (Chinese Black #0d0d0d)
  "--component-text-color": "#a8bdb3", // neutral light-ish for text

  // Buttons
  "--default-button-color": "#0e4f47",
  "--default-button-primary-color": "#0e4f47",
  "--default-button-success-color": "#a8bdb3",
  "--default-button-warning-color": "#f2926e",
  "--default-button-danger-color": "#e7c1b3",

  // Focus and accents
  "--focus-color": "#f2926e",

  // Typography
  "--font-family-base": '"Sofia Pro", sans-serif',
  "--font-family-heading": '"Sofia Pro", sans-serif',

  // Navigation
  "--main-navigation-color": "#0d0d0d",
  "--main-navigation-color--inverted": "#f2f6f3",

  // States and highlights
  "--state-success-color": "#a8bdb3",
  "--state-warning-color": "#f2926e",
  "--state-danger-color": "#e7c1b3",
});
