// Returns 'auto' when the user prefers reduced motion, 'smooth' otherwise.
// Use for JS-driven scroll calls that bypass the CSS scroll-behavior override.
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
