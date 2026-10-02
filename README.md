# ITZFIZZ Scroll Car Animation — Reference Recreation

This version follows the behavior of the supplied reference demo:

- 200vh scroll section with a pinned viewport track
- 200px dark road across the center
- top-view orange McLaren image
- green trail grows behind the car
- `WELCOME ITZFIZZ` letters reveal one-by-one as the car passes them
- four KPI cards appear at staggered scroll ranges
- GSAP + ScrollTrigger with `scrub: true`
- Next.js + React + Tailwind CSS

The reference car asset is loaded from the original public demo URL so the visual matches the supplied reference. For an offline/self-contained submission, download the same image into `public/car.png` and change `CAR_URL` in `components/HeroSection.jsx` to `/car.png`.

## Run

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The static output is created in `out/`.


## Creative refinements

This version keeps the reference interaction but adds:
- Larger hero car
- Road depth and subtle lane markings
- Green trail glow
- Orange car aura and premium drop shadow
- Subtle grid/vignette background
- Small “SCROLL TO DRIVE” interaction cue
- Responsive car sizing
