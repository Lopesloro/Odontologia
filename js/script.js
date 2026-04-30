/**
 * Clarità Odontologia - Main JavaScript
 * Funcionalidades: Menu mobile, navegação suave, header scroll, scroll reveal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');

        // Criar/remover overlay mobile
        if (nav.classList.contains('active')) {
            nav.classList.add('nav-mobile');
            document.body.style.overflow = 'hidden';
        } else {
            nav.classList.remove('nav-mobile');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') &&
            !nav.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    let lastScroll = 0;
    const scrollThreshold = 50;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;

        // Adicionar/remover sombra ao header baseado no scroll
        if (currentScroll > scrollThreshold) {
            header.style.boxShadow = '0 4px 20px rgba(136, 158, 189, 0.15)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '';
            header.style.backgroundColor = '';
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ========================================
    // Smooth Scroll para âncoras
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Link on Scroll
    // ========================================
    function updateActiveLink() {
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll(
        '.especialidade-card, .dentista-card, .section-header, .footer-block'
    );

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.style.opacity = '1';
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        revealObserver.observe(element);
    });

    // ========================================
    // Parallax Effect for Waves
    // ========================================
    const waves = document.querySelectorAll('.wave');

    function handleParallax() {
        const scrolled = window.pageYOffset;
        waves.forEach((wave, index) => {
            const speed = 0.1 + (index * 0.05);
            wave.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // Desativar parallax em dispositivos móveis
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', handleParallax, { passive: true });
    }

    // ========================================
    // WhatsApp Button Visibility
    // ========================================
    const whatsappFloat = document.querySelector('.whatsapp-float');

    function toggleWhatsappButton() {
        if (window.pageYOffset > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0.8';
        }
    }

    if (whatsappFloat) {
        window.addEventListener('scroll', toggleWhatsappButton, { passive: true });
    }

    // ========================================
    // Formatação de Telefone (se houver formulário)
    // ========================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            // Formatar como (XX) XXXXX-XXXX
            if (value.length > 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    });

    // ========================================
    // Botão de Voltar ao Topo (opcional)
    // ========================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 25px;
        width: 44px;
        height: 44px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        box-shadow: var(--shadow-md);
    `;
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, { passive: true });

    // ========================================
    // Performance: Lazy load para elementos
    // ========================================
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');

        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');

                    if (src) {
                        element.src = src;
                        element.removeAttribute('data-lazy');
                    }

                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(element => lazyObserver.observe(element));
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c Clarità Odontologia ', 'background: #889EBD; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Site desenvolvido com ❤ para cuidar do seu sorriso ', 'color: #4A5248; font-size: 12px;');
});

// ========================================
// Utilitários
// ========================================

/**
 * Debounce function para otimizar eventos
 */
function debounce(func, wait) {
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

/**
 * Throttle function para otimizar scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exportar funções úteis para o escopo global
window.ClaritaApp = {
    debounce,
    throttle
};
