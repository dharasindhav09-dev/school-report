// Enhanced script.js with mobile optimizations

// Function to validate Admissions form
function validateAdmissionsForm(event) {
    event.preventDefault(); // prevent form submission

    const name = document.getElementById('admit-name')?.value.trim();
    const dob = document.getElementById('admit-dob')?.value;
    const parent = document.getElementById('admit-parent')?.value.trim();
    const phone = document.getElementById('admit-phone')?.value.trim();
    const grade = document.getElementById('admit-grade')?.value;

    if (!name || !dob || !parent || !phone || !grade) {
        showAlert("Please fill in all fields.", "error");
        return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        showAlert("Please enter a valid 10-digit phone number.", "error");
        return false;
    }

    showAlert("Admission form submitted successfully!", "success");
    event.target.reset();
    return true;
}

// Function to validate Contact form
function validateContactForm(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]')?.value.trim();
    const email = document.querySelector('input[name="email"]')?.value.trim();
    const message = document.querySelector('textarea[name="message"]')?.value.trim();

    if (!name || !email || !message) {
        showAlert("Please fill in all fields.", "error");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert("Please enter a valid email address.", "error");
        return false;
    }

    showAlert("Message sent successfully!", "success");
    event.target.reset();
    return true;
}

// Enhanced mobile-friendly alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Enhanced CSS for custom alert with better mobile support
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                left: 20px;
                z-index: 1000;
                max-width: 500px;
                margin: 0 auto;
                padding: 0;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: slideInDown 0.3s ease-out;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .custom-alert.success {
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
            }

            .custom-alert.error {
                background: linear-gradient(135deg, #f44336, #da190b);
                color: white;
            }

            .alert-content {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                gap: 10px;
            }

            .alert-icon {
                font-size: 1.2em;
                font-weight: bold;
                flex-shrink: 0;
            }

            .alert-message {
                flex: 1;
                font-size: 1em;
                font-weight: 500;
                word-break: break-word;
            }

            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5em;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
                flex-shrink: 0;
            }

            .alert-close:hover {
                background: rgba(255,255,255,0.2);
            }

            @keyframes slideInDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .custom-alert {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    border-radius: 8px;
                }
                
                .alert-content {
                    padding: 12px 15px;
                    gap: 8px;
                }
                
                .alert-message {
                    font-size: 0.9em;
                }
                
                .alert-close {
                    width: 25px;
                    height: 25px;
                    font-size: 1.3em;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.animation = 'slideOutUp 0.3s ease-in forwards';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);
}

// Mobile-optimized smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    if (!nav || !header) return;
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation');
    
    // Add mobile toggle styles
    if (!document.querySelector('#mobile-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-nav-styles';
        style.textContent = `
            .mobile-nav-toggle {
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5em;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            
            .mobile-nav-toggle:hover {
                background: rgba(255,255,255,0.1);
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
                
                nav {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                
                nav.active {
                    display: flex;
                }
                
                nav a {
                    padding: 12px 20px;
                    margin: 5px 0;
                    text-align: center;
                    border-radius: 8px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Insert toggle button
    header.insertBefore(mobileToggle, nav);
    
    // Toggle functionality
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking nav links
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('active');
            mobileToggle.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            nav.classList.remove('active');
            mobileToggle.innerHTML = '☰';
        }
    });
}

// Enhanced loading animation for forms
function addLoadingToForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
                submitBtn.disabled = true;

                // Enhanced spinner CSS
                if (!document.querySelector('#spinner-styles')) {
                    const spinnerStyle = document.createElement('style');
                    spinnerStyle.id = 'spinner-styles';
                    spinnerStyle.textContent = `
                        .loading-spinner {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 0.8s ease-in-out infinite;
                            margin-right: 5px;
                        }

                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                        
                        @media (max-width: 480px) {
                            .loading-spinner {
                                width: 12px;
                                height: 12px;
                            }
                        }
                    `;
                    document.head.appendChild(spinnerStyle);
                }

                // Reset button after processing
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// Enhanced real-time validation with mobile optimization
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Use 'input' event for real-time feedback on mobile
        input.addEventListener('input', function() {
            clearFieldError(this);
            // Debounce validation for better performance on mobile
            clearTimeout(this.validationTimeout);
            this.validationTimeout = setTimeout(() => {
                if (this.value.trim()) {
                    validateField(this);
                }
            }, 500);
        });

        input.addEventListener('blur', function() {
            clearTimeout(this.validationTimeout);
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.name === 'phone' && value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#f44336';
    field.style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.3)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.85em;
        margin-top: 5px;
        font-weight: 500;
        padding: 2px 0;
    `;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearFieldError(field) {
    field.style.borderColor = '#ddd';
    field.style.boxShadow = 'none';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Touch and gesture support for mobile devices
function initTouchSupport() {
    // Prevent zoom on double tap for form inputs on iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve touch feedback for interactive elements
    const touchElements = document.querySelectorAll('button, .btn, nav a, .gallery img');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Performance optimization for mobile
function initPerformanceOptimizations() {
    // Lazy load images in gallery
    const images = document.querySelectorAll('.gallery img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here if needed
        }, 100);
    }, { passive: true });
}

// Main initialization function
document.addEventListener('DOMContentLoaded', () => {
    // Original form validation
    const admissionsForm = document.getElementById('admitForm');
    if (admissionsForm) {
        admissionsForm.addEventListener('submit', validateAdmissionsForm);
    }

    const contactForm = document.querySelector('form');
    if (contactForm && !contactForm.id) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // Initialize all features
    initSmoothScrolling();
    initMobileNavigation();
    addLoadingToForms();
    initRealTimeValidation();
    initTouchSupport();
    initPerformanceOptimizations();

    // Enhanced fade-in animation with mobile optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.container, .gallery img');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close alerts with Escape key
    if (e.key === 'Escape') {
        const alert = document.querySelector('.custom-alert');
        if (alert) alert.remove();
        
        // Close mobile menu with Escape
        const nav = document.querySelector('nav.active');
        if (nav) {
            nav.classList.remove('active');
            const toggle = document.querySelector('.mobile-nav-toggle');
            if (toggle) toggle.innerHTML = '☰';
        }
    }
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', () => {
    // Close mobile menu on orientation change
    const nav = document.querySelector('nav.active');
    if (nav) {
        nav.classList.remove('active');
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (toggle) toggle.innerHTML = '☰';
    }
    
    // Trigger resize event after orientation change
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});
