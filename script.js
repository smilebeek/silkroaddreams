/* ===== SILK ROAD DREAMS - UZBEKISTAN TOURS JAVASCRIPT ===== */

class UzbekistanSilkRoadWebsite {
    constructor() {
        this.currentLanguage = 'en';
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoPlayInterval = null;
        this.isAnimating = false;
        this.scrollAnimations = [];
        this.cityAnimations = [];
        
        // Uzbekistan-specific data
        this.uzbekistanCities = [
            { name: 'Samarkand', coords: [70, 30], icon: '🕌' },
            { name: 'Bukhara', coords: [40, 60], icon: '🏛️' },
            { name: 'Khiva', coords: [20, 45], icon: '🏰' },
            { name: 'Tashkent', coords: [80, 20], icon: '🏙️' }
        ];
        
        // Initialize when DOM is loaded
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAll();
            });
        } else {
            this.setupAll();
        }
    }

    setupAll() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupLanguageSwitcher();
        this.setupHeroCarousel();
        this.setupScrollAnimations();
        this.setupTourFilters();
        this.setupContactForm();
        this.setupFloatingElements();
        this.setupMobileOptimizations();
        this.setupCounterAnimations();
        this.setupGalleryInteractions();
        this.setupCityAnimations();
        this.startAutoAnimations();
        this.loadSavedPreferences();
    }

    /* ===== LOADING SCREEN WITH UZBEKISTAN MAP ===== */
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Animate Uzbekistan map and cities
        this.animateUzbekistanMap();
        
        // Simulate loading time for dramatic effect
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Start hero animations after loading
            setTimeout(() => {
                this.animateHeroEntrance();
            }, 500);
        }, 3000);
    }

    animateUzbekistanMap() {
        const mapContainer = document.querySelector('.uzbekistan-map');
        if (!mapContainer) return;

        // Create animated city dots
        this.uzbekistanCities.forEach((city, index) => {
            const cityDot = document.createElement('div');
            cityDot.className = 'city-dot-animated';
            cityDot.style.cssText = `
                position: absolute;
                left: ${city.coords[0]}%;
                top: ${city.coords[1]}%;
                width: 12px;
                height: 12px;
                background: #d4af37;
                border-radius: 50%;
                animation: cityPulse 2s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
                z-index: 10;
            `;
            
            // Add city name tooltip
            const cityLabel = document.createElement('div');
            cityLabel.textContent = city.name;
            cityLabel.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 10px;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                animation: fadeInOut 4s ease-in-out infinite;
                animation-delay: ${index * 0.5 + 1}s;
            `;
            
            cityDot.appendChild(cityLabel);
            mapContainer.appendChild(cityDot);
        });
    }

    animateHeroEntrance() {
        const heroElements = [
            '.hero-subtitle',
            '.title-line',
            '.title-main', 
            '.hero-description',
            '.hero-buttons'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    /* ===== NAVIGATION ===== */
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect with Uzbekistan theme
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }

            // Update active section
            this.updateActiveSection();
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    this.closeMobileMenu();
                    
                    // Add Uzbekistan-themed navigation effect
                    this.addNavigationEffect(link);
                }
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    addNavigationEffect(link) {
        // Create a small Uzbekistan flag effect
        const effect = document.createElement('div');
        effect.innerHTML = '🇺🇿';
        effect.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            animation: flagFly 0.8s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        link.style.position = 'relative';
        link.appendChild(effect);
        
        setTimeout(() => effect.remove(), 800);
    }

    updateActiveSection() {
        const sections = ['home', 'about', 'tours', 'gallery', 'contact'];
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    // Remove active from all links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    // Add active to current link
                    navLink.classList.add('active');
                }
            }
        });
    }

    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const body = document.body;

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
            // Add Uzbekistan pattern background to mobile menu
            navMenu.style.background = `
                linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(219,234,254,0.95) 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%234f46e5" opacity="0.1"/></svg>')
            `;
        } else {
            body.style.overflow = '';
            navMenu.style.background = '';
        }
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const body = document.body;

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
        navMenu.style.background = '';
    }

    smoothScrollTo(target) {
        const navbarHeight = 80;
        const targetPosition = target.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /* ===== LANGUAGE SWITCHER WITH UZBEKISTAN SUPPORT ===== */
    setupLanguageSwitcher() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');
        const currentLangSpan = document.getElementById('currentLang');

        // Toggle dropdown
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // Close dropdown on outside click
        document.addEventListener('click', () => {
            languageDropdown.classList.remove('active');
        });

        // Language selection with Uzbekistan-specific languages
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.dataset.lang;
                this.changeLanguage(selectedLang);
                
                // Update current language display
                const langMap = { en: 'EN', uz: 'UZ', ru: 'RU' };
                currentLangSpan.textContent = langMap[selectedLang];
                
                languageDropdown.classList.remove('active');
                
                // Show language change notification
                this.showNotification(this.getTranslation('Language changed successfully', selectedLang), 'success');
            });
        });
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        const elements = document.querySelectorAll(`[data-${lang}]`);
        
        elements.forEach(element => {
            const translatedText = element.getAttribute(`data-${lang}`);
            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        // Handle placeholders
        const placeholderElements = document.querySelectorAll(`[data-${lang}-placeholder]`);
        placeholderElements.forEach(element => {
            const translatedPlaceholder = element.getAttribute(`data-${lang}-placeholder`);
            if (translatedPlaceholder) {
                element.placeholder = translatedPlaceholder;
            }
        });

        // Handle select options
        const selectElements = document.querySelectorAll('select option[data-' + lang + ']');
        selectElements.forEach(option => {
            const translatedText = option.getAttribute('data-' + lang);
            if (translatedText) {
                option.textContent = translatedText;
            }
        });

        // Update document direction for Arabic-like languages if needed
        if (lang === 'uz') {
            document.body.style.fontFamily = "'Inter', 'Times New Roman', sans-serif";
        } else {
            document.body.style.fontFamily = "'Inter', sans-serif";
        }

        // Save language preference
        localStorage.setItem('selectedLanguage', lang);
        
        // Trigger custom event for language change
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    getTranslation(text, lang) {
        const translations = {
            'Language changed successfully': {
                en: 'Language changed successfully',
                uz: 'Til muvaffaqiyatli o\'zgartirildi',
                ru: 'Язык успешно изменён'
            }
        };
        
        return translations[text] ? translations[text][lang] || text : text;
    }

    /* ===== HERO CAROUSEL WITH UZBEKISTAN IMAGES ===== */
    setupHeroCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (slides.length === 0) return;

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.addCarouselEffect('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.addCarouselEffect('next');
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.addCarouselEffect('indicator');
            });
        });

        // Touch/swipe support for mobile
        this.setupCarouselTouch();

        // Auto-play with Uzbekistan themed timing
        this.startAutoPlay();

        // Pause auto-play on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    addCarouselEffect(type) {
        // Add Uzbekistan-themed visual effect
        const effect = document.createElement('div');
        effect.className = 'carousel-effect';
        effect.innerHTML = type === 'prev' ? '🐪' : type === 'next' ? '🕌' : '⭐';
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            animation: carouselEffect 1s ease-out;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    setupCarouselTouch() {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        let startX = 0;
        let startY = 0;
        let isScrolling = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            isScrolling = false;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const deltaX = Math.abs(e.touches[0].pageX - startX);
            const deltaY = Math.abs(e.touches[0].pageY - startY);

            if (!isScrolling) {
                isScrolling = deltaY > deltaX;
            }

            if (!isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });

        carousel.addEventListener('touchend', (e) => {
            if (!startX || !startY || isScrolling) return;

            const endX = e.changedTouches[0].pageX;
            const deltaX = startX - endX;
            const threshold = 50;

            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }

            startX = 0;
            startY = 0;
        }, { passive: true });
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');

        // Remove active classes
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active classes
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 1500);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // Longer interval for better user experience
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    /* ===== SCROLL ANIMATIONS ===== */
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Elements to animate with Uzbekistan-specific styling
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .historical-quote,
            .about-description,
            .heritage-stats .stat-item,
            .highlight-item,
            .tour-card,
            .gallery-item,
            .contact-item,
            .contact-form
        `);

        animatedElements.forEach((element, index) => {
            element.classList.add('hidden');
            element.style.transitionDelay = `${index * 0.05}s`; // Faster stagger for better flow
            observer.observe(element);
        });

        // Parallax effect for hero background (disabled on mobile)
        if (window.innerWidth > 768) {
            this.setupParallax();
        }

        this.scrollAnimations.push(observer);
    }

    animateElement(element) {
        element.classList.remove('hidden');
        element.classList.add('visible');

        // Special animations for Uzbekistan-specific elements
        if (element.classList.contains('stat-item')) {
            this.animateStatNumber(element);
        }

        if (element.classList.contains('highlight-item')) {
            this.animateUzbekistanHighlight(element);
        }
    }

    animateUzbekistanHighlight(element) {
        const icon = element.querySelector('.highlight-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'uzbekBounce 0.8s ease-out';
            }, 200);
        }
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.slide-image');
            
            parallaxElements.forEach(element => {
                const speed = 0.3; // Reduced speed for subtle effect
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }

    /* ===== COUNTER ANIMATIONS ===== */
    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.animated) {
                        this.animateCounter(entry.target);
                        entry.target.dataset.animated = 'true';
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(number);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);
            
            element.textContent = this.formatUzbekistanNumber(current, target);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = this.formatUzbekistanNumber(target, target);
                // Add completion effect
                element.style.animation = 'uzbekCounterComplete 0.5s ease-out';
            }
        };

        requestAnimationFrame(updateCounter);
    }

    formatUzbekistanNumber(num, target) {
        if (target >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toString();
    }

    animateStatNumber(statItem) {
        const number = statItem.querySelector('.stat-number');
        if (number && !number.dataset.animated) {
            setTimeout(() => {
                this.animateCounter(number);
                number.dataset.animated = 'true';
            }, 300);
        }
    }

    /* ===== TOUR FILTERS FOR UZBEKISTAN ===== */
    setupTourFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const tourCards = document.querySelectorAll('.tour-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button with Uzbekistan theme
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Add visual feedback
                this.addFilterEffect(btn);
                
                // Filter tours with animation
                this.filterTours(filter, tourCards);
            });
        });

        // Tour card interactions
        tourCards.forEach(card => {
            this.setupTourCardInteractions(card);
        });
    }

    addFilterEffect(btn) {
        // Create Uzbekistan-themed filter effect
        const effect = document.createElement('div');
        effect.innerHTML = '🇺🇿';
        effect.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.2rem;
            animation: filterEffect 0.8s ease-out;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.appendChild(effect);
        setTimeout(() => effect.remove(), 800);
    }

    filterTours(filter, cards) {
        cards.forEach((card, index) => {
            const category = card.dataset.category || '';
            const shouldShow = filter === 'all' || category.includes(filter);
            
            // Hide all cards first with stagger
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }, index * 50);
            
            setTimeout(() => {
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            }, 300 + index * 50);
        });
    }

    setupTourCardInteractions(card) {
        const tourBtn = card.querySelector('.tour-btn');
        
        if (tourBtn) {
            tourBtn.addEventListener('click', () => {
                this.handleTourBooking(card);
            });
        }

        // Add hover effects for desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                this.addTourCardGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                this.removeTourCardGlow(card);
            });
        }

        // Touch interaction for mobile
        card.addEventListener('touchstart', (e) => {
            this.handleTourCardTouch(card, e);
        }, { passive: true });
    }

    addTourCardGlow(card) {
        card.style.boxShadow = '0 20px 60px rgba(30, 64, 175, 0.2)';
    }

    removeTourCardGlow(card) {
        card.style.boxShadow = '';
    }

    handleTourCardTouch(card, e) {
        // Add touch feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    handleTourBooking(card) {
        const tourName = card.querySelector('h3').textContent;
        const tourPrice = card.querySelector('.price').textContent;
        
        // Create Uzbekistan-themed booking notification
        this.showNotification(
            `🇺🇿 Booking inquiry for "${tourName}" - ${tourPrice}. Welcome to Uzbekistan!`, 
            'success'
        );
        
        // Add booking particles effect
        this.createBookingParticles(card.querySelector('.tour-btn'));
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            this.smoothScrollTo(contactSection);
            
            // Pre-fill form with tour selection
            setTimeout(() => {
                this.prefillTourForm(tourName);
            }, 1000);
        }
    }

    createBookingParticles(button) {
        const rect = button.getBoundingClientRect();
        const uzbekSymbols = ['🕌', '🐪', '⭐', '🇺🇿'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.textContent = uzbekSymbols[Math.floor(Math.random() * uzbekSymbols.length)];
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 10000;
                animation: uzbekParticle 1.5s ease-out forwards;
                --x: ${(Math.random() - 0.5) * 200}px;
                --y: ${(Math.random() - 0.5) * 200}px;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    prefillTourForm(tourName) {
        const selectElement = document.querySelector('select');
        if (selectElement) {
            // Map tour names to select values
            const tourMap = {
                'Samarkand Explorer': 'samarkand',
                'Bukhara Heritage Tour': 'bukhara',
                'Khiva Time Travel': 'khiva',
                'Grand Uzbekistan Tour': 'grand',
                'Artisan & Crafts Tour': 'crafts',
                'Kyzylkum Desert Adventure': 'desert'
            };
            
            const value = tourMap[tourName];
            if (value) {
                selectElement.value = value;
                selectElement.style.background = 'var(--light-blue)';
                setTimeout(() => {
                    selectElement.style.background = '';
                }, 2000);
            }
        }
    }

    /* ===== GALLERY INTERACTIONS ===== */
    setupGalleryInteractions() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            // Add Uzbekistan-themed hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.03)';
                item.style.filter = 'brightness(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.filter = '';
            });

            // Click to show larger view (modal simulation)
            item.addEventListener('click', () => {
                this.showGalleryModal(item, index);
            });
        });
    }

    showGalleryModal(item, index) {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        if (!img) return;

        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'gallery-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            position: relative;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: -40px;
            background: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // Close handlers
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    /* ===== CONTACT FORM ===== */
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Enhanced form validation for Uzbekistan tours
            const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
                
                // Add Uzbekistan-themed focus effects
                input.addEventListener('focus', () => {
                    input.style.borderColor = 'var(--uzbek-blue)';
                    input.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                });
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.getFieldErrorMessage('required');
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = this.getFieldErrorMessage('email');
            }
        } else if (field.type === 'tel' && value) {
            // Basic phone validation
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = this.getFieldErrorMessage('phone');
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    getFieldErrorMessage(type) {
        const messages = {
            required: {
                en: 'This field is required',
                uz: 'Bu maydon majburiy',
                ru: 'Это поле обязательно'
            },
            email: {
                en: 'Please enter a valid email address',
                uz: 'Haqiqiy elektron pochta manzilini kiriting',
                ru: 'Введите действительный email адрес'
            },
            phone: {
                en: 'Please enter a valid phone number',
                uz: 'Haqiqiy telefon raqamini kiriting',
                ru: 'Введите действительный номер телефона'
            }
        };
        
        return messages[type][this.currentLanguage] || messages[type]['en'];
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 5px;
            animation: fadeInUp 0.3s ease-out;
        `;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Validate all fields
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification(
                this.getTranslation('Please fill in all required fields correctly'), 
                'error'
            );
            return;
        }

        // Show loading state with Uzbekistan theme
        submitBtn.innerHTML = `
            <span>${this.getTranslation('Sending message...')}</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = `
                <span>${this.getTranslation('Message sent!')}</span>
                <i class="fas fa-check"></i>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            this.showNotification(
                this.getTranslation('Thank you! We\'ll contact you within 24 hours to plan your Uzbekistan adventure.'), 
                'success'
            );
            
            // Create success particles
            this.createSuccessParticles(submitBtn);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Clear any field errors
                fields.forEach(field => this.clearFieldError(field));
            }, 3000);
            
        }, 2500);
    }

    createSuccessParticles(element) {
        const rect = element.getBoundingClientRect();
        const symbols = ['🎉', '✨', '🇺🇿', '🕌'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 10000;
                animation: successParticle 2s ease-out forwards;
                --x: ${(Math.random() - 0.5) * 300}px;
                --y: ${(Math.random() - 0.5) * 300}px;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }

    getTranslation(key) {
        const translations = {
            'Please fill in all required fields correctly': {
                en: 'Please fill in all required fields correctly',
                uz: 'Iltimos, barcha majburiy maydonlarni to\'g\'ri to\'ldiring',
                ru: 'Пожалуйста, заполните все обязательные поля правильно'
            },
            'Sending message...': {
                en: 'Sending message...',
                uz: 'Xabar yuborilmoqda...',
                ru: 'Отправка сообщения...'
            },
            'Message sent!': {
                en: 'Message sent!',
                uz: 'Xabar yuborildi!',
                ru: 'Сообщение отправлено!'
            },
            'Thank you! We\'ll contact you within 24 hours to plan your Uzbekistan adventure.': {
                en: 'Thank you! We\'ll contact you within 24 hours to plan your Uzbekistan adventure.',
                uz: 'Rahmat! Biz 24 soat ichida siz bilan bog\'lanamiz va O\'zbekiston sayohatingizni rejalashtirish uchun aloqaga chiqamiz.',
                ru: 'Спасибо! Мы свяжемся с вами в течение 24 часов, чтобы спланировать ваше приключение в Узбекистане.'
            }
        };
        
        return translations[key] ? translations[key][this.currentLanguage] || translations[key]['en'] : key;
    }

    /* ===== FLOATING ELEMENTS ===== */
    setupFloatingElements() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        const quickContactBtn = document.getElementById('quickContact');

        // Scroll to top button
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }, { passive: true });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Add Uzbekistan-themed scroll effect
                this.addScrollToTopEffect();
            });
        }

        // Quick contact button
        if (quickContactBtn) {
            quickContactBtn.classList.add('visible');
            
            quickContactBtn.addEventListener('click', () => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    this.smoothScrollTo(contactSection);
                    this.addQuickContactEffect();
                }
            });
        }
    }

    addScrollToTopEffect() {
        const effect = document.createElement('div');
        effect.innerHTML = '🏔️';
        effect.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            font-size: 2rem;
            animation: scrollEffect 1s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    addQuickContactEffect() {
        const effect = document.createElement('div');
        effect.innerHTML = '📞';
        effect.style.cssText = `
            position: fixed;
            bottom: 160px;
            right: 30px;
            font-size: 2rem;
            animation: contactEffect 1s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    /* ===== CITY ANIMATIONS ===== */
    setupCityAnimations() {
        // Create floating Uzbekistan symbols
        this.createFloatingSymbols();
        
        // Setup city-based interactive elements
        this.setupCityInteractions();
    }

    createFloatingSymbols() {
        const symbols = ['🕌', '🐪', '⭐', '🏺', '🧵'];
        const container = document.body;
        
        symbols.forEach((symbol, index) => {
            const element = document.createElement('div');
            element.className = 'floating-uzbek-symbol';
            element.textContent = symbol;
            element.style.cssText = `
                position: fixed;
                font-size: 2rem;
                color: rgba(30, 64, 175, 0.1);
                pointer-events: none;
                z-index: 1;
                animation: floatUzbek 20s linear infinite;
                animation-delay: ${index * 4}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            container.appendChild(element);
            
            // Remove and recreate periodically
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, 20000);
        });
        
        // Recreate symbols periodically
        setTimeout(() => {
            this.createFloatingSymbols();
        }, 15000);
    }

    setupCityInteractions() {
        // Add click effects to city names and landmarks
        const cityElements = document.querySelectorAll('[data-city]');
        
        cityElements.forEach(element => {
            element.addEventListener('click', () => {
                const city = element.dataset.city;
                this.showCityInformation(city);
            });
        });
    }

    showCityInformation(cityName) {
        const cityInfo = {
            'samarkand': {
                emoji: '🕌',
                fact: 'Samarkand is 2,750 years old and was a key city on the Silk Road.'
            },
            'bukhara': {
                emoji: '🏛️',
                fact: 'Bukhara has over 140 architectural monuments and is a UNESCO World Heritage site.'
            },
            'khiva': {
                emoji: '🏰',
                fact: 'Khiva\'s Ichan Kala is the most preserved example of a medieval Islamic city.'
            },
            'tashkent': {
                emoji: '🏙️',
                fact: 'Tashkent is the largest city in Central Asia with over 2.5 million people.'
            }
        };
        
        const info = cityInfo[cityName.toLowerCase()];
        if (info) {
            this.showNotification(`${info.emoji} ${info.fact}`, 'info');
        }
    }

    /* ===== MOBILE OPTIMIZATIONS ===== */
    setupMobileOptimizations() {
        // Disable hover effects on touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            this.optimizeForTouch();
        }

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.closeMobileMenu();
                this.handleResize();
            }, 100);
        });

        // Handle resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Optimize scroll performance on mobile
        if (window.innerWidth <= 768) {
            this.optimizeScrollForMobile();
        }

        // Prevent zoom on iOS
        this.preventIOSZoom();
    }

    optimizeForTouch() {
        // Add touch-friendly interactions
        const interactiveElements = document.querySelectorAll('button, .tour-card, .gallery-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }

    handleResize() {
        // Recalculate parallax if needed
        if (window.innerWidth <= 768) {
            // Disable parallax on mobile
            const parallaxElements = document.querySelectorAll('.slide-image');
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
        }

        // Close mobile menu if window becomes large
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }

        // Update floating symbols
        this.updateFloatingSymbols();
    }

    updateFloatingSymbols() {
        const symbols = document.querySelectorAll('.floating-uzbek-symbol');
        symbols.forEach(symbol => {
            symbol.style.left = Math.random() * 100 + '%';
            symbol.style.top = Math.random() * 100 + '%';
        });
    }

    optimizeScrollForMobile() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbarOnScroll();
                    this.updateFloatingButtons();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateFloatingButtons() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        const quickContactBtn = document.getElementById('quickContact');
        
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        if (quickContactBtn) {
            quickContactBtn.classList.add('visible');
        }
    }

    preventIOSZoom() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.fontSize = '16px';
            });
        });
    }

    /* ===== AUTO ANIMATIONS ===== */
    startAutoAnimations() {
        // Floating animation for scroll indicator
        const scrollLine = document.querySelector('.scroll-line');
        if (scrollLine) {
            setInterval(() => {
                scrollLine.style.animation = 'none';
                setTimeout(() => {
                    scrollLine.style.animation = 'scrollLine 2s ease-in-out infinite';
                }, 10);
            }, 4000);
        }

        // Start city-specific animations
        this.startCityAnimations();
    }

    startCityAnimations() {
        // Animate Uzbekistan elements periodically
        setInterval(() => {
            this.animateRandomUzbekElement();
        }, 8000);
    }

    animateRandomUzbekElement() {
        const uzbekElements = document.querySelectorAll('.highlight-item, .tour-card, .stat-item');
        if (uzbekElements.length > 0) {
            const randomElement = uzbekElements[Math.floor(Math.random() * uzbekElements.length)];
            
            randomElement.style.animation = 'uzbekGlow 1s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 1000);
        }
    }

    /* ===== UTILITY FUNCTIONS ===== */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /* ===== NOTIFICATIONS ===== */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };

        notification.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Notification styles with Uzbekistan theme
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#0066cc',
            warning: '#f59e0b'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            border-left: 4px solid ${colors[type]};
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            color: #334155;
            font-family: var(--font-body);
        `;

        const icon = notification.querySelector('i:first-child');
        icon.style.color = colors[type];
        icon.style.fontSize = '1.2rem';

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
            border-radius: 4px;
            transition: background 0.2s ease;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = '#f1f5f9';
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);

        return notification;
    }

    /* ===== LOAD SAVED PREFERENCES ===== */
    loadSavedPreferences() {
        // Load saved language
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && ['en', 'uz', 'ru'].includes(savedLanguage)) {
            this.changeLanguage(savedLanguage);
            const langMap = { en: 'EN', uz: 'UZ', ru: 'RU' };
            document.getElementById('currentLang').textContent = langMap[savedLanguage];
        }

        // Load other preferences
        const preferences = localStorage.getItem('uzbekistanTourPreferences');
        if (preferences) {
            try {
                const prefs = JSON.parse(preferences);
                // Apply saved preferences
                this.applyUserPreferences(prefs);
            } catch (e) {
                console.log('Could not load saved preferences');
            }
        }
    }

    applyUserPreferences(prefs) {
        // Apply animation preferences
        if (prefs.reducedMotion) {
            document.body.classList.add('reduced-motion');
        }
        
        // Apply theme preferences
        if (prefs.highContrast) {
            document.body.classList.add('high-contrast');
        }
    }

    /* ===== CLEANUP ===== */
    destroy() {
        // Clean up event listeners and intervals
        this.pauseAutoPlay();
        
        this.scrollAnimations.forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        
        this.cityAnimations.forEach(animation => {
            if (animation && animation.cancel) {
                animation.cancel();
            }
        });

        // Remove floating symbols
        const symbols = document.querySelectorAll('.floating-uzbek-symbol');
        symbols.forEach(symbol => symbol.remove());
    }
}

/* ===== ADDITIONAL CSS ANIMATIONS (Injected via JavaScript) ===== */
const additionalStyles = `
    <style>
        @keyframes floatUzbek {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.15; }
            100% { transform: translateY(0px) rotate(360deg); opacity: 0.1; }
        }
        
        @keyframes uzbekBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes uzbekCounterComplete {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: var(--gold-accent); }
            100% { transform: scale(1); }
        }
        
        @keyframes flagFly {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -70px) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -100px) scale(0.5); opacity: 0; }
        }
        
        @keyframes carouselEffect {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        
        @keyframes filterEffect {
            0% { transform: translateX(-50%) translateY(0) scale(0.5); opacity: 0; }
            50% { transform: translateX(-50%) translateY(-10px) scale(1); opacity: 1; }
            100% { transform: translateX(-50%) translateY(-20px) scale(0.5); opacity: 0; }
        }
        
        @keyframes uzbekParticle {
            0% { transform: scale(1); opacity: 1; }
            100% { 
                transform: translate(var(--x), var(--y)) scale(0) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes successParticle {
            0% { transform: scale(1); opacity: 1; }
            100% { 
                transform: translate(var(--x), var(--y)) scale(0.3) rotate(720deg); 
                opacity: 0; 
            }
        }
        
        @keyframes scrollEffect {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
        }
        
        @keyframes contactEffect {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.8; }
            100% { transform: scale(0.8); opacity: 0; }
        }
        
        @keyframes uzbekGlow {
            0%, 100% { box-shadow: 0 0 0 rgba(0, 102, 204, 0); }
            50% { box-shadow: 0 0 20px rgba(0, 102, 204, 0.3); }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
        
        .touch-device .tour-card:hover,
        .touch-device .gallery-item:hover,
        .touch-device .highlight-item:hover {
            transform: none !important;
        }
        
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .high-contrast {
            filter: contrast(1.5);
        }
        
        @media (max-width: 768px) {
            .floating-uzbek-symbol {
                display: none;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

/* ===== INITIALIZE APPLICATION ===== */
// Initialize the Uzbekistan website when DOM is ready
const uzbekistanWebsite = new UzbekistanSilkRoadWebsite();

/* ===== ADDITIONAL EVENT LISTENERS ===== */

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu and dropdowns
    if (e.key === 'Escape') {
        uzbekistanWebsite.closeMobileMenu();
        document.getElementById('languageDropdown')?.classList.remove('active');
    }
    
    // Space bar pauses/resumes carousel
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        if (uzbekistanWebsite.autoPlayInterval) {
            uzbekistanWebsite.pauseAutoPlay();
        } else {
            uzbekistanWebsite.startAutoPlay();
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🇺🇿 Uzbekistan Silk Road Dreams loaded in ${Math.round(loadTime)}ms`);
    });
}

// Console welcome message
console.log(`
🕌 Welcome to Silk Road Dreams - Uzbekistan Tours! 🇺🇿

Discover the magnificent cities of:
• 🏛️ Samarkand - The Pearl of the East
• 🕌 Bukhara - The Living Museum
• 🏰 Khiva - The Ancient Fortress
• 🏙️ Tashkent - The Modern Capital

✨ Features loaded:
• Multi-language support (EN, UZ, RU)
• Uzbekistan-themed animations
• Mobile-optimized experience
• Interactive city tours
• Cultural immersion booking

🐪 Your Uzbekistan adventure awaits!
`);

// Service Worker registration for PWA (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}