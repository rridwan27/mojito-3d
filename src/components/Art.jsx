import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { featureLists, goodLists } from '../../constants/index.js'
import { useRef } from 'react';

const Art = () => {
  const containerRef = useRef();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px), (max-height: 500px) and (orientation: landscape)",
    }, (context) => {
      const { isMobile } = context.conditions;
      const start = isMobile ? 'top 20%' : 'top top';

      if (isMobile) {
        // Simple opacity/scale reveal for mobile - no pinning
        gsap.timeline({
          scrollTrigger: {
            trigger: '#art',
            start: start,
            end: 'bottom center',
            scrub: 1.5,
          }
        })
        .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut' })
        .to('.masked-img', { scale: 1.1, opacity: 1, duration: 1, ease: 'power1.inOut' })
        .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
      } else {
        // Optimized pinned mask scrub for desktop
        const maskTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#art',
            start,
            end: 'bottom center',
            scrub: 1.5,
            pin: true
          }
        });

        maskTimeline
          .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut' })
          .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut' })
          .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
      }
    });
  }, { scope: containerRef });

  return (
    <div id="art" ref={containerRef}>
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The ART</h2>

        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src="/images/check.webp" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          <div className="cocktail-img">
            <img
              src="/images/under-img.webp"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            />
          </div>

          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src="/images/check.webp" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>This isn’t just a drink. It’s a carefully crafted moment made just for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Art