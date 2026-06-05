import './style.css';
import { 
  createIcons, 
  Construction, 
  Settings, 
  Droplets, 
  Wrench, 
  Shield, 
  Handshake, 
  HardHat, 
  MapPin, 
  Phone, 
  Mail, 
  Eye, 
  Target, 
  Zap, 
  Star, 
  Sprout, 
  BookOpen, 
  User,
  Shovel,
  Hammer,
  Cpu,
  Clock,
  Quote,
  Award,
  ShieldCheck
} from 'lucide';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function init() {
    console.log('Bandhan website loaded');
    
    // Initialize Lucide icons
    createIcons({
        icons: {
            Construction,
            Settings,
            Droplets,
            Wrench,
            Shield,
            Handshake,
            HardHat,
            MapPin,
            Phone,
            Mail,
            Eye,
            Target,
            Zap,
            Star,
            Sprout,
            BookOpen,
            User,
            Shovel,
            Hammer,
            Cpu,
            Clock,
            Quote,
            Award,
            ShieldCheck
        }
    });

    // Initialize 3D Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-3d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (revealElements.length > 0 && !prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px', // trigger exactly on viewport boundaries
            threshold: 0.01 // trigger when at least 1% of the element is visible
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
        
        // Handle staggered group lists (.reveal-group)
        const revealGroups = document.querySelectorAll('.reveal-group');
        revealGroups.forEach(group => {
            const children = group.querySelectorAll('.reveal-3d');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 120}ms`;
            });
        });

        // Safety fallback: reveal all elements when close to the bottom of the page
        window.addEventListener('scroll', () => {
            const scrollBottom = window.innerHeight + window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollBottom >= docHeight - 100) {
                document.querySelectorAll('.reveal-3d:not(.reveal-visible)').forEach(el => {
                    el.classList.add('reveal-visible');
                });
            }
        });
    }

    // Initialize dynamic 3D cursor tilt effect for all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation degrees (up to 12 degrees max tilt)
            const rotateX = ((centerY - y) / centerY) * 12; 
            const rotateY = ((x - centerX) / centerX) * 12; 

            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Initialize ScrollFloat text-splitting and GSAP animations
    const scrollFloats = document.querySelectorAll('.scroll-float');
    scrollFloats.forEach(el => {
        const textElement = el.querySelector('.scroll-float-text');
        if (textElement) {
            const textContent = textElement.textContent.trim();
            const words = textContent.split(/\s+/);
            
            // Rebuild HTML: wrap each word to prevent broken wrapping,
            // and each letter in a span.char
            textElement.innerHTML = words.map(word => {
                const chars = word.split('').map(char => `<span class="char">${char}</span>`).join('');
                return `<span class="word" style="display: inline-block; white-space: nowrap;">${chars}</span>`;
            }).join('&nbsp;');

            const charElements = textElement.querySelectorAll('.char');
            const playType = el.getAttribute('data-play') || 'scroll';

            if (playType === 'onload') {
                // Animate immediately on load (perfect for hero headings)
                gsap.fromTo(
                    charElements,
                    {
                        willChange: 'opacity, transform',
                        opacity: 0,
                        yPercent: 120,
                        scaleY: 2.3,
                        scaleX: 0.7,
                        transformOrigin: '50% 0%'
                    },
                    {
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                        opacity: 1,
                        yPercent: 0,
                        scaleY: 1,
                        scaleX: 1,
                        stagger: 0.03,
                        delay: 0.2
                    }
                );
            } else {
                // Scroll-linked animation for elements below the fold
                gsap.fromTo(
                    charElements,
                    {
                        willChange: 'opacity, transform',
                        opacity: 0,
                        yPercent: 120,
                        scaleY: 2.3,
                        scaleX: 0.7,
                        transformOrigin: '50% 0%'
                    },
                    {
                        duration: 1,
                        ease: 'back.inOut(2)',
                        opacity: 1,
                        yPercent: 0,
                        scaleY: 1,
                        scaleX: 1,
                        stagger: 0.03,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom-=10%', // Trigger when the top of the header hits near bottom of screen
                            end: 'bottom center+=10%',  // Complete when the header scrolls up to center area
                            scrub: true
                        }
                    }
                );
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


