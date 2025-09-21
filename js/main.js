// Tissoli Luxury Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const philosophySection = document.querySelector('#philosophy');
            if (philosophySection) {
                const offsetTop = philosophySection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-item, .life-item, .architecture-item, .commitment-item, .contact-info, .contact-form');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission (replace with actual form handling)
            console.log('Form submitted:', formObject);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.about-item, .life-item, .architecture-item, .commitment-item');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Loading animation for images (only if no background image is set)
    const imageContainers = document.querySelectorAll('.image-placeholder');
    imageContainers.forEach(container => {
        // Skip containers that have specific image classes
        if (container.classList.contains('about-icon-1') || 
            container.classList.contains('about-icon-2') || 
            container.classList.contains('about-icon-3') ||
            container.classList.contains('life-image-1') || 
            container.classList.contains('life-image-2') || 
            container.classList.contains('life-image-3') || 
            container.classList.contains('life-image-4') ||
            container.classList.contains('philosophy-image-bg') ||
            container.classList.contains('flagship-image-bg') ||
            container.classList.contains('architecture-image-1') || 
            container.classList.contains('architecture-image-2') || 
            container.classList.contains('architecture-image-3')) {
            return; // Skip this container
        }
        
        // Check if the container already has a background image from CSS
        const computedStyle = window.getComputedStyle(container);
        const hasBackgroundImage = computedStyle.backgroundImage && 
                                 computedStyle.backgroundImage !== 'none' && 
                                 !computedStyle.backgroundImage.includes('linear-gradient');
        
        // Only add shimmer animation if no background image is set
        if (!hasBackgroundImage) {
            container.style.background = 'linear-gradient(45deg, #e5e5e5, #d0d0d0)';
            container.style.backgroundSize = '200px 100%, 100% 100%';
            container.style.animation = 'shimmer 2s infinite';
        }
    });

    // Add sophisticated button animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for philosophy and flagship links
    const philosophyLink = document.querySelector('.philosophy-link');
    if (philosophyLink) {
        philosophyLink.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add sophisticated scroll-triggered animations
    const scrollAnimations = document.querySelectorAll('.section-title, .philosophy-description, .life-imagined-description');
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    scrollAnimations.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(el);
    });

    // Add notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: var(--font-secondary);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Add shimmer animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200px 0, 0 0; }
            100% { background-position: 200px 0, 0 0; }
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .about-item,
        .life-item,
        .architecture-item,
        .commitment-item,
        .contact-info,
        .contact-form {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .nav-link.active {
            color: var(--color-accent);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        body.menu-open {
            overflow: hidden;
        }

        /* Enhanced button hover effects */
        .btn-primary:hover,
        .btn-secondary:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        /* Life item hover effects */
        .life-item:hover h3 {
            transform: translateY(-10px);
        }

        .life-item h3 {
            transition: transform 0.3s ease;
        }

        /* Architecture item hover effects */
        .architecture-item:hover .architecture-image .image-placeholder {
            transform: scale(1.1);
        }

        .architecture-image .image-placeholder {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);

    // Initialize scroll position on page load
    updateActiveNav();

    // Smooth reveal animation for hero text (already in CSS, but trigger it)
    setTimeout(() => {
        const heroTitleLines = document.querySelectorAll('.hero-title-line');
        heroTitleLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.3}s`;
        });
    }, 100);

    // Add sophisticated loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger animations for elements already in view
        const elementsInView = document.querySelectorAll('.about-item, .life-item, .architecture-item, .commitment-item');
        elementsInView.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animate-in');
            }
        });
    });

    // Add sophisticated scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent), var(--color-gold));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    console.log('Tissoli luxury website loaded successfully');
});