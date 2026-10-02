"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAR_URL =
  "https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png";

const stats = [
  {
    id: "box1",
    value: "58%",
    text: "Increase in pick up point use",
    position: "top-box",
  },
  {
    id: "box2",
    value: "23%",
    text: "Decreased in customer phone calls",
    position: "bottom-box",
  },
  {
    id: "box3",
    value: "27%",
    text: "Increase in pick up point use",
    position: "top-box",
  },
  {
    id: "box4",
    value: "40%",
    text: "Decreased in customer phone calls",
    position: "bottom-box",
  },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const road = roadRef.current;
      const trail = trailRef.current;
      const title = titleRef.current;

      const letters =
        title.querySelectorAll(".value-letter");

      /*
      
      CAR DIMENSIONS
      
      */

      const getDimensions = () => {
        const roadWidth =
          road.getBoundingClientRect().width;

        const carWidth =
          car.getBoundingClientRect().width;

        return {
          roadWidth,
          carWidth,

          // Start completely outside left
          startX: -carWidth,

          // Go completely outside right
          endX:
            roadWidth +
            carWidth +
            150,
        };
      };

      /*
      
      MAIN CAR SCROLL ANIMATION
      
      */

      const createAnimation = () => {
        const {
          roadWidth,
          carWidth,
          startX,
          endX,
        } = getDimensions();

        gsap.set(car, {
          x: startX,
        });

        gsap.set(trail, {
          width: 0,
        });

        gsap.set(letters, {
          opacity: 0,
        });

        const carAnimation = gsap.to(car, {
          x: endX,

          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top top",

            end: "bottom top",

            scrub: true,

            /*
            IMPORTANT:
            The complete hero viewport stays
            pinned while the document scrolls.
            */

            pin: trackRef.current,

            anticipatePin: 1,

            invalidateOnRefresh: true,
          },

          onUpdate: function () {
            /*
            Current car position
            */

            const carX =
              gsap.getProperty(car, "x");

            /*
            Car center
            */

            const carCenter =
              Number(carX) +
              carWidth / 2;

            /*
            ==================================
            GREEN TRAIL
            ==================================
            */

            gsap.set(trail, {
              width: Math.max(
                0,
                carCenter
              ),
            });

            /*
            ==================================
            LETTER REVEAL
            ==================================
            */

            letters.forEach(
              (letter) => {
                const letterX =
                  letter.offsetLeft;

                if (
                  carCenter >= letterX
                ) {
                  letter.style.opacity = "1";
                } else {
                  letter.style.opacity = "0";
                }
              }
            );
          },
        });

        /*
        
        STATS
        
        */

        stats.forEach(
          (stat, index) => {
            const element =
              document.getElementById(
                stat.id
              );

            if (!element) return;

            const start =
              400 + index * 200;

            const end =
              600 + index * 200;

            gsap.to(element, {
              opacity: 1,

              scrollTrigger: {
                trigger: sectionRef.current,

                start: `top+=${start} top`,

                end: `top+=${end} top`,

                scrub: true,
              },
            });
          }
        );

        return carAnimation;
      };

      let animation =
        createAnimation();

      /*
      
      RESIZE
      
      */

      const handleResize = () => {
        animation.scrollTrigger?.kill();

        animation.kill();

        ScrollTrigger.getAll()
          .forEach((trigger) => {
            if (
              trigger.vars.trigger ===
              sectionRef.current
            ) {
              trigger.kill();
            }
          });

        animation =
          createAnimation();

        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      /*
      
      CLEANUP
      
      */

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );

        animation.scrollTrigger?.kill();

        animation.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
    >
      {/* ======================================
          STICKY TRACK
      ====================================== */}

      <div
        ref={trackRef}
        className="track"
      >

        {/* ====================================
            ROAD
        ==================================== */}

        <div
          ref={roadRef}
          className="road"
        >

          {/* Green trail */}

          <div
            ref={trailRef}
            className="trail"
          />

          {/* ==================================
              WELCOME TEXT

              IMPORTANT:
              Text road ke ANDAR hai.
          ================================== */}

          <h1
            ref={titleRef}
            className="value-add"
          >
            {"WELCOME ITZFIZZ".split("").map(
              (char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="value-letter"
                >
                  {char === " "
                    ? "\u00A0"
                    : char}
                </span>
              )
            )}
          </h1>

          {/* ==================================
              CAR
          ================================== */}

          <img
            ref={carRef}
            src={CAR_URL}
            alt="Orange sports car"
            className="car"
          />

          {/* ==================================
              SCROLL INDICATOR
          ================================== */}

          <div className="scroll-copy">
            <span className="scroll-line" />

            <span>
              SCROLL TO DRIVE
            </span>
          </div>

        </div>

        {/* ====================================
            STATISTICS
        ==================================== */}

        <div className="stats-layer">

          {stats.map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className={`stat-card ${stat.position}`}
            >
              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.text}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}