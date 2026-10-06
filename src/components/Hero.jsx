import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

const Hero = () => {
  const videoRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const heroSplit = new SplitText(".title", {
        type: "chars, words",
        autoSplit: true,
      });

      const paragraphSplit = new SplitText(".subtitle", {
        type: "lines",
        autoSplit: true,
      });

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      });
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px), (max-height: 500px) and (orientation: landscape)",
    }, (context) => {
      const { isMobile } = context.conditions;
      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      const video = videoRef.current;
      let targetTime = 0;
      let rafId;

      const updateVideo = () => {
        if (video && Math.abs(video.currentTime - targetTime) >= 1 / 24) {
          video.currentTime = targetTime;
        }
        rafId = requestAnimationFrame(updateVideo);
      };

      ScrollTrigger.create({
        trigger: ".video-wrapper",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
        pinType: "fixed",
        anticipatePin: 1,
        onUpdate: (self) => {
          targetTime = self.progress * video.duration;
        },
      });

      rafId = requestAnimationFrame(updateVideo);

      return () => {
        cancelAnimationFrame(rafId);
      };
    });
  }, { scope: containerRef });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const handleUnlock = () => {
      video.play()
        .then(() => video.pause())
        .catch(console.error);
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
    };

    window.addEventListener("pointerdown", handleUnlock);
    window.addEventListener("touchstart", handleUnlock);

    return () => {
      window.removeEventListener("pointerdown", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <section id="home" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.webp"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.webp"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails" className="text-center md:text-start">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video-wrapper relative h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          webkitPlaysInline="true"
          preload="auto"
          disablePictureInPicture
          poster="/images/hero-poster.webp"
          src={typeof window !== 'undefined' && window.innerWidth < 768 ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4"}
        />
      </div>
    </div>
  );
};

export default Hero;