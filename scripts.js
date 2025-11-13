// ============================================
// PORTFOLIO WEBSITE JAVASCRIPT
// All interactive features implemented with vanilla JS
// ============================================

// ============================================
// 1. DARK MODE TOGGLE
// ============================================
(function initDarkMode() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // Toggle theme function
    function toggleTheme() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    // Add event listeners
    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', () => {
        toggleTheme();
        // Close mobile menu after theme change
        closeMobileMenu();
    });
})();

// ============================================
// 2. STICKY HEADER
// ============================================
(function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 80) {
            header.classList.add('glass', 'dark:glass', 'shadow-lg');
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'blur(12px)';
            
            // Dark mode check
            if (document.documentElement.classList.contains('dark')) {
                header.style.backgroundColor = 'rgba(14, 15, 19, 0.8)';
            }
        } else {
            header.classList.remove('glass', 'dark:glass', 'shadow-lg');
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
})();

// ============================================
// 3. MOBILE MENU
// ============================================
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    mobileMenu.classList.remove('hidden');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Set up focus trap
    focusableElements = Array.from(mobileMenu.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    ));
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    setTimeout(() => firstFocusableElement?.focus(), 100);
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    mobileMenu.classList.add('hidden');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Mobile menu event listeners
document.getElementById('mobile-menu-toggle')?.addEventListener('click', openMobileMenu);
document.getElementById('mobile-menu-close')?.addEventListener('click', closeMobileMenu);
document.getElementById('mobile-menu-backdrop')?.addEventListener('click', closeMobileMenu);

// Close menu when clicking nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeMobileMenu, 100);
    });
});

// Focus trap for mobile menu
document.addEventListener('keydown', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement?.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement?.focus();
                e.preventDefault();
            }
        }
    }
});

// ============================================
// 4. SMOOTH SCROLLING
// ============================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ============================================
// 5. PROJECT MODAL
// ============================================
const projectData = [
    {
        title: "Event Booking System",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
        description: "A comprehensive event management and ticket booking platform designed to streamline event organization and attendee registration.",
        problem: "Event organizers needed a centralized system to manage multiple events, handle ticket sales, track attendee information, and provide administrative controls—all in one place.",
        solution: "Built a full-stack web application with user registration, event scheduling, ticket purchasing workflows, and an admin dashboard for complete event oversight. The system includes real-time availability updates and automated confirmation emails.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        links: {
            source: "https://github.com/Antu-devnath/Event-Booking-Project",
            live: null
        }
    },
    {
        title: "Learning Artificial Intelligence",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
        description: "A repository showcasing various AI and machine learning experiments including neural networks, supervised/unsupervised learning algorithms, and comprehensive data preprocessing techniques.",
        problem: "Understanding and implementing various machine learning algorithms from scratch to gain deep insights into how AI models work under the hood.",
        solution: "Created multiple Jupyter notebooks demonstrating different ML techniques, from basic regression to complex neural networks. Implemented data cleaning pipelines, feature engineering, and model evaluation metrics to showcase the complete ML workflow.",
        technologies: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter"],
        links: {
            source: "https://github.com/Antu-devnath/Learning-Artificial-Intelligence",
            live: null
        }
    },
    {
        title: "TravelBro - Travel Management System",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop",
        description: "A sophisticated CRUD-based travel agency management system for handling tour packages, bookings, employee management, and comprehensive billing operations.",
        problem: "Travel agencies struggle with managing packages, customer bookings, employee assignments, and financial tracking across multiple systems, leading to inefficiencies and errors.",
        solution: "Developed a desktop application using C# and .NET Framework with SQL Server backend, featuring dynamic dashboards for real-time insights, automated billing calculations, and streamlined package management workflows.",
        technologies: ["C#", ".NET Framework", "SQL Server", "Windows Forms"],
        links: {
            source: "https://github.com/Antu-devnath/My-C-Sharp-project-Travel-Bro-",
            live: null
        }
    },
    {
        title: "Arcade 3-in-1 Game Collection",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
        description: "A collection of three classic arcade-style mini-games featuring interactive gameplay, score tracking systems, and smooth responsive controls.",
        problem: "Creating engaging retro gaming experiences with modern performance while maintaining the nostalgic feel of classic arcade games.",
        solution: "Implemented multiple game engines using C++ with OpenGL graphics rendering and GLUT for window management. Added physics systems, collision detection, scoring mechanisms, and high-score persistence. Also created Unity versions for cross-platform deployment.",
        technologies: ["C++", "OpenGL", "GLUT", "Unity", "Game Physics"],
        links: {
            source: "https://github.com/Antu-devnath/Arcade3in1",
            live: null
        }
    },
    {
        title: "CRUD Application",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        description: "A streamlined database management application demonstrating full CRUD (Create, Read, Update, Delete) operations with an intuitive user interface.",
        problem: "Need for a simple yet powerful tool to manage database records efficiently without writing SQL queries manually, suitable for non-technical users.",
        solution: "Built a Windows Forms application in C# with .NET that provides an intuitive GUI for all database operations. Implemented data validation, error handling, and transaction management to ensure data integrity.",
        technologies: ["C#", ".NET Framework", "SQL Server", "ADO.NET", "Windows Forms"],
        links: {
            source: "https://github.com/Antu-devnath/Crud-Application",
            live: null
        }
    },
    {
        title: "C# Code Repository",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
        description: "A curated collection of reusable C# components, design patterns, small utility applications, and code snippets focused on clean code principles and optimization.",
        problem: "Developers often recreate common functionality from scratch. A centralized repository of tested, optimized code components saves time and ensures consistency.",
        solution: "Compiled a comprehensive library of C# utilities covering data structures, algorithms, design patterns (Singleton, Factory, Observer), file I/O helpers, and common business logic implementations with extensive documentation.",
        technologies: ["C#", ".NET", "Visual Studio", "Object-Oriented Design"],
        links: {
            source: "https://github.com/Antu-devnath/cSHARP_CODE",
            live: null
        }
    },
    {
        title: "Online Shopping System",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
        description: "A prototype e-commerce platform featuring product catalog management, shopping cart functionality, and secure user authentication system.",
        problem: "Small businesses need affordable e-commerce solutions with essential features like product browsing, cart management, and order processing without complex infrastructure.",
        solution: "Created a Java-based web application using JDBC for database connectivity with MySQL. Implemented user sessions, product search/filter, cart persistence, and basic checkout workflow with order history tracking.",
        technologies: ["Java", "JDBC", "MySQL", "Servlets", "JSP"],
        links: {
            source: "https://github.com/Antu-devnath/Online_Shoping_System_with_java",
            live: null
        }
    },
    {
        title: "Foodfanda - UI/UX Design",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop",
        description: "A user-centered food delivery application design emphasizing intuitive navigation, responsive layouts, and an engaging interface to enhance the user experience.",
        problem: "Food delivery apps often suffer from cluttered interfaces, confusing navigation, and poor mobile optimization, leading to cart abandonment and user frustration.",
        solution: "Designed a complete UI/UX system in Figma with user research-backed wireframes, interactive prototypes, and a modern design system. Focused on reducing friction in the ordering process, improving restaurant discovery, and creating delightful micro-interactions.",
        technologies: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
        links: {
            source: null,
            live: "https://drive.google.com/file/d/1OKWhTfmYLYKPXlSMHwsTGlaTmyDpjchQ/view?usp=sharing"
        }
    }
];

let modalFocusableElements = [];
let modalFirstFocusable = null;
let modalLastFocusable = null;

function openProjectModal(projectIndex) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const project = projectData[projectIndex];
    
    // Build modal content
    const techBadges = project.technologies.map(tech => 
        `<span class="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary">${tech}</span>`
    ).join('');
    
    const linksHTML = `
        <div class="flex gap-4 mt-6">
            ${project.links.source ? `<a href="${project.links.source}" target="_blank" rel="noopener noreferrer" class="flex-1 px-6 py-3 bg-primary text-dark text-center rounded-lg hover:shadow-lg transition-all font-semibold">View Source Code</a>` : ''}
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="flex-1 px-6 py-3 bg-secondary text-dark text-center rounded-lg hover:shadow-lg transition-all font-semibold">View Live Demo</a>` : ''}
        </div>
    `;
    
    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-xl mb-6">
        <h2 id="modal-title" class="text-3xl font-bold mb-4">${project.title}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6 text-lg">${project.description}</p>
        
        <div class="mb-6">
            <h3 class="text-xl font-bold mb-2 text-primary">The Problem</h3>
            <p class="text-gray-600 dark:text-gray-400">${project.problem}</p>
        </div>
        
        <div class="mb-6">
            <h3 class="text-xl font-bold mb-2 text-secondary">The Solution</h3>
            <p class="text-gray-600 dark:text-gray-400">${project.solution}</p>
        </div>
        
        <div class="mb-6">
            <h3 class="text-xl font-bold mb-2">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
                ${techBadges}
            </div>
        </div>
        
        ${linksHTML}
    `;
    
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Set up focus trap for modal
    modalFocusableElements = Array.from(modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    ));
    modalFirstFocusable = modalFocusableElements[0];
    modalLastFocusable = modalFocusableElements[modalFocusableElements.length - 1];
    
    // Focus close button
    setTimeout(() => document.getElementById('modal-close')?.focus(), 100);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectIndex = parseInt(card.dataset.project);
        openProjectModal(projectIndex);
    });
    
    // Make cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const projectIndex = parseInt(card.dataset.project);
            openProjectModal(projectIndex);
        }
    });
});

// Modal close handlers
document.getElementById('modal-close')?.addEventListener('click', closeProjectModal);
document.getElementById('modal-backdrop')?.addEventListener('click', closeProjectModal);

// Modal keyboard controls and focus trap
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('project-modal');
    if (modal.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
        closeProjectModal();
    }
    
    if (e.key === 'Tab') {
        if (modalFocusableElements.length === 0) return;
        
        if (e.shiftKey) {
            if (document.activeElement === modalFirstFocusable) {
                modalLastFocusable?.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === modalLastFocusable) {
                modalFirstFocusable?.focus();
                e.preventDefault();
            }
        }
    }
});

// ============================================
// 6. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
(function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
})();

// ============================================
// 7. ANIMATED SKILL BARS
// ============================================
(function initSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar && !skillBar.dataset.animated) {
                    const targetWidth = skillBar.dataset.width;
                    setTimeout(() => {
                        skillBar.style.transition = 'width 1.5s ease-out';
                        skillBar.style.width = targetWidth + '%';
                        skillBar.dataset.animated = 'true';
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-bar-container').forEach(container => {
        skillObserver.observe(container);
    });
})();

// ============================================
// 8. CONTACT FORM VALIDATION
// ============================================
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset errors
        document.querySelectorAll('.text-red-500').forEach(el => el.classList.add('hidden'));
        
        let isValid = true;
        
        // Validate name
        if (!name) {
            document.getElementById('name-error').classList.remove('hidden');
            isValid = false;
        }
        
        // Validate email
        if (!email || !emailRegex.test(email)) {
            document.getElementById('email-error').classList.remove('hidden');
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            document.getElementById('message-error').classList.remove('hidden');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            document.getElementById('form-success').classList.remove('hidden');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('form-success').classList.add('hidden');
            }, 5000);
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', { name, email, message });
        }
    });
})();

// ============================================
// 9. COPY EMAIL TO CLIPBOARD
// ============================================
(function initCopyEmail() {
    const copyButton = document.getElementById('copy-email');
    const tooltip = document.getElementById('copy-tooltip');
    
    copyButton?.addEventListener('click', async () => {
        const email = 'antu3841@gmail.com';
        
        try {
            await navigator.clipboard.writeText(email);
            
            // Show tooltip
            tooltip.classList.remove('hidden');
            
            // Hide after 2 seconds
            setTimeout(() => {
                tooltip.classList.add('hidden');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
})();

// ============================================
// 10. VCARD DOWNLOAD
// ============================================
(function initVCardDownload() {
    const downloadButton = document.getElementById('download-vcard');
    
    downloadButton?.addEventListener('click', () => {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Antu Chandra Devnath
N:Devnath;Antu;Chandra;;
TITLE:Researcher, Data Scientist, and Developer
EMAIL:antu3841@gmail.com
ADR;TYPE=WORK:;;House #8, Road #19;Dhaka;;1234;Bangladesh
URL:https://github.com/Antu-devnath
URL:https://www.linkedin.com/in/antu-chandra-debnath-828a7a396/
NOTE:Passionate about AI, web & app development, UI/UX design, and game development
END:VCARD`;
        
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'antu_chandra_devnath.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    });
})();

// ============================================
// 11. BACK TO TOP BUTTON
// ============================================
(function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

// ============================================
// 12. LAZY LOADING FALLBACK
// ============================================
(function initLazyLoadingFallback() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        return; // Browser supports it, no fallback needed
    }
    
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
})();

// ============================================
// 13. REDUCED MOTION SUPPORT
// ============================================
(function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.animate-float, .animate-gradient').forEach(el => {
            el.style.animation = 'none';
        });
    }
})();

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #00E5FF; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #FF3DAB;');
console.log('%cFeel free to reach out: antu3841@gmail.com', 'font-size: 12px; color: #888;');

