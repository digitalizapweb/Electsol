// ============================================
// ELECSOL - Animaciones e Interacciones JavaScript
// ============================================

// Inicializar AOS (Animación al hacer scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
});

// ============================================
// Efecto de Scroll en la Barra de Navegación
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Desplazamiento Suave para Enlaces de Navegación
// ============================================
document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Animación de Contador para Estadísticas
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            if (target === 100) {
                element.textContent = target + '%';
            } else {
                element.textContent = target + '+';
            }
        }
    };
    
    updateCounter();
}

// Observador de Intersección para Estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target = parseInt(text);
                
                // Manejar diferentes formatos de números
                if (text.includes('%')) {
                    target = 100;
                } else if (text === '24/7') {
                    return; // Omitir animación para 24/7
                }
                
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

// Observar sección de estadísticas
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// Validación y Mejora de Formulario
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        // Validar formato de email
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('is-invalid');
            }
        }
        
        // Validar formato de teléfono (teléfono chileno)
        const phoneInput = this.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value) {
            const phonePattern = /^\+?569\d{8}$/;
            if (!phonePattern.test(phoneInput.value.replace(/\s/g, ''))) {
                alert('Por favor ingresa un número de teléfono válido (+569XXXXXXXX)');
                isValid = false;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
            alert('Por favor completa todos los campos correctamente.');
        }
    });
    
    // Validación en tiempo real
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// ============================================
// Efectos Hover en Tarjetas de Servicio
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Interacción del Botón de WhatsApp
// ============================================
const whatsappButton = document.querySelector('#whatsapp');
if (whatsappButton) {
    whatsappButton.addEventListener('mouseenter', function() {
        const pulse = this.querySelector('.whatsapp-pulse');
        pulse.style.animation = 'none';
        setTimeout(() => {
            pulse.style.animation = 'whatsappPulse 2s infinite';
        }, 10);
    });
}

// ============================================
// Carga Diferida de Imágenes
// ============================================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// Cerrar Menú Móvil al Hacer Clic en Enlace
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ============================================
// Indicador de Progreso de Scroll (Opcional)
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
});

// ============================================
// Agregar Animación a Elementos al Hacer Scroll
// ============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .service-card, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ============================================
// Mensaje de Bienvenida en Consola
// ============================================
console.log('%c¡Bienvenido a ELECSOL! ⚡', 'color: #FDB813; font-size: 24px; font-weight: bold;');
console.log('%cTu experto en soluciones eléctricas y energía solar', 'color: #0A2647; font-size: 14px;');

// ============================================
// Optimización de Rendimiento
// ============================================
// Precargar imágenes críticas
const criticalImages = document.querySelectorAll('.hero_section, .service-img');
criticalImages.forEach(img => {
    if (img.dataset.preload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src || img.style.backgroundImage.slice(5, -2);
        document.head.appendChild(preloadLink);
    }
});

// ============================================
// Manejo de Errores para Imágenes
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Error al cargar imagen:', this.src);

    });
});
