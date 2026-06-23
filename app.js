/**
 * HIPSTER BARBER STUDIO - INTERACTIVE JS
 * Premium UI Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Interactivity
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open'); // Prevent scrolling when open
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Navbar Scroll Styling
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('reveal-visible');
                // Unobserve once revealed to keep layout performant
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is in view
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly before it enters viewport
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Subtle Parallax Effect for Hero background
    const heroBg = document.querySelector('.hero-bg');
    
    const handleParallax = () => {
        if (!heroBg) return;
        const scrollPosition = window.scrollY;
        // Check if Hero is in viewport
        if (scrollPosition < window.innerHeight) {
            // Apply scale and translation based on scroll position
            heroBg.style.transform = `scale(1.05) translateY(${scrollPosition * 0.3}px)`;
        }
    };

    window.addEventListener('scroll', handleParallax);

    // 5. Services Accordion Behavior (Hover / Click)
    const accordionPanels = document.querySelectorAll('.accordion-panel');
    
    accordionPanels.forEach(panel => {
        const activatePanel = () => {
            accordionPanels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        };
        
        panel.addEventListener('mouseenter', activatePanel);
        panel.addEventListener('click', activatePanel);
    });

    // 6. Smooth Anchor Scrolling with offset for Navbar height
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

});
