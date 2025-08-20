import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initGSAP = () => {
    gsap.utils.toArray(".fade-up").forEach((el, i) => {
        gsap.fromTo(
            el, { opacity: 0, y: 50 }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    });
};