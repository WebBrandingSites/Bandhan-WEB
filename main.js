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


    // Initialize Scrollytelling 3D Experience (only on home page where canvas exists)
    const scrollyCanvas = document.getElementById('scrolly-canvas');
    
    if (scrollyCanvas) {
        const ctx = scrollyCanvas.getContext('2d');
        const totalFrames = 38;
        const images = [];
        let loadedCount = 0;
        
        const frameObj = { frame: 0 };

        // Preload function
        function preload3DImages(callback) {
            const loaderElement = document.querySelector('.scrollytelling-loader');
            const progressText = loaderElement ? loaderElement.querySelector('p') : null;

            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameNum = String(i).padStart(3, '0');
                img.src = `/3D%20Sequences/ezgif-frame-${frameNum}.jpg`;
                
                img.onload = () => {
                    loadedCount++;
                    if (progressText) {
                        progressText.textContent = `Loading 3D Experience... ${Math.round((loadedCount / totalFrames) * 100)}%`;
                    }
                    if (loadedCount === totalFrames) {
                        if (loaderElement) {
                            gsap.to(loaderElement, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => loaderElement.remove()
                            });
                        }
                        callback();
                    }
                };

                img.onerror = () => {
                    console.warn(`Failed to load 3D frame ${i}`);
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        if (loaderElement) loaderElement.remove();
                        callback();
                    }
                };

                images.push(img);
            }
        }

        // Draw image keeping aspect ratio (cover style to fill left and right)
        function drawFrame(img, canvas, ctx) {
            if (!img || !ctx || !canvas) return;
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            const hRatio = canvasWidth / imgWidth;
            const vRatio = canvasHeight / imgHeight;
            const ratio  = Math.max(hRatio, vRatio); // Use Math.max for cover
            
            const newWidth = imgWidth * ratio;
            const newHeight = imgHeight * ratio;
            
            const x = (canvasWidth - newWidth) / 2;
            const y = (canvasHeight - newHeight) / 2;
            
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            // Background color of the sequence (very dark base)
            ctx.fillStyle = '#080a0a';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, newWidth, newHeight);
        }

        function resizeCanvas() {
            scrollyCanvas.width = scrollyCanvas.parentElement.clientWidth || window.innerWidth;
            scrollyCanvas.height = scrollyCanvas.parentElement.clientHeight || window.innerHeight;
            if (images[frameObj.frame]) {
                drawFrame(images[frameObj.frame], scrollyCanvas, ctx);
            }
        }

        // Run preload
        preload3DImages(() => {
            // Set initial canvas size and render first frame
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Set initial overlay card states
            gsap.set(".scrollytelling-overlay-wrapper", { opacity: 0, y: 30, pointerEvents: "none" });
            gsap.set(".text-overlay-1", { opacity: 1, y: 0, pointerEvents: "auto" });

            // Timeline: Pinned to `#scrollytelling-section`
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#scrollytelling-section",
                    start: "top top",
                    end: "+=300%", // 3 screens of scrolling for 3 overlays
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Animate frames 0 to 37 (Safety Helmet to Sunset Refinery)
            tl.to(frameObj, {
                frame: totalFrames - 1,
                snap: "frame",
                ease: "none",
                duration: 1,
                onUpdate: () => {
                    if (images[frameObj.frame]) {
                        drawFrame(images[frameObj.frame], scrollyCanvas, ctx);
                    }
                }
            }, 0);

            // Overlay 1 (Hero): Starts visible, fades out
            tl.to(".text-overlay-1", {
                opacity: 0,
                y: -30,
                pointerEvents: "none",
                ease: "power2.inOut",
                duration: 0.08
            }, 0.20);

            // Overlay 2 (About Us): Slides in from left, then slides out to left
            tl.fromTo(".text-overlay-2", 
                { opacity: 0, x: -100, y: 0, pointerEvents: "none" },
                { opacity: 1, x: 0, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.08 },
                0.35
            );
            tl.to(".text-overlay-2", {
                opacity: 0,
                x: -100,
                pointerEvents: "none",
                ease: "power2.in",
                duration: 0.08
            }, 0.60);

            // Overlay 3 (Why Choose Us): Slides in from right, then slides out to right
            tl.fromTo(".text-overlay-3", 
                { opacity: 0, x: 100, y: 0, pointerEvents: "none" },
                { opacity: 1, x: 0, y: 0, pointerEvents: "auto", ease: "power2.out", duration: 0.08 },
                0.75
            );
            tl.to(".text-overlay-3", {
                opacity: 0,
                x: 100,
                pointerEvents: "none",
                ease: "power2.in",
                duration: 0.08
            }, 0.95);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


