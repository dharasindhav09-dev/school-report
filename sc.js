// script.js

// Function to validate Admissions form
function validateAdmissionsForm(event) {
    event.preventDefault(); // prevent form submission

    const name = document.getElementById('admit-name').value.trim();
    const dob = document.getElementById('admit-dob').value;
    const parent = document.getElementById('admit-parent').value.trim();
    const phone = document.getElementById('admit-phone').value.trim();
    const grade = document.getElementById('admit-grade').value;

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

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

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

// Custom alert function with better styling
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

    // Add CSS for custom alert
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                min-width: 300px;
                max-width: 500px;
                padding: 0;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease-out;
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
            }

            .alert-message {
                flex: 1;
                font-size: 1em;
                font-weight: 500;
            }

            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5em;
                cursor: pointer;
                padding: 0;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
            }

            .alert-close:hover {
                background: rgba(255,255,255,0.2);
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .custom-alert {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);

    // Add slideOut animation
    if (!document.querySelector('#slideout-animation')) {
        const slideOutStyle = document.createElement('style');
        slideOutStyle.id = 'slideout-animation';
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation to forms
function addLoadingToForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
                submitBtn.disabled = true;

                // Add spinner CSS if not already added
                if (!document.querySelector('#spinner-styles')) {
                    const spinnerStyle = document.createElement('style');
                    spinnerStyle.id = 'spinner-styles';
                    spinnerStyle.textContent = `
                        .loading-spinner {
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 0.8s ease-in-out infinite;
                        }

                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(spinnerStyle);
                }

                // Reset button after 2 seconds (simulating form processing)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// Enhanced form validation with real-time feedback
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
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
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 0.9em;
        margin-top: 5px;
        font-weight: 500;
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

// Attach event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Original form validation
    const admissionsForm = document.getElementById('admitForm');
    if (admissionsForm) admissionsForm.addEventListener('submit', validateAdmissionsForm);

    const contactForm = document.querySelector('form');
    if (contactForm && !contactForm.id) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // Initialize new features
    initSmoothScrolling();
    addLoadingToForms();
    initRealTimeValidation();

    // Add fade-in animation to elements
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.container, .gallery img');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close alerts with Escape key
    if (e.key === 'Escape') {
        const alert = document.querySelector('.custom-alert');
        if (alert) alert.remove();
    }
});
