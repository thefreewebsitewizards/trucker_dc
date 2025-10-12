// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeFormValidation();
    initializeConditionalFields();
});

// Contact form initialization
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function submitForm() {
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showSuccessMessage();
        }, 2000);
    }
    
    function showSuccessMessage() {
        const formContainer = document.querySelector('.contact-form-container');
        const successMessage = document.getElementById('formSuccess');
        
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
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
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Name validation
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    // Message length validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    formGroup.classList.add('error');
    
    // Create error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Conditional form fields
function initializeConditionalFields() {
    const inquiryType = document.getElementById('inquiryType');
    const freightFields = document.getElementById('freightFields');
    
    inquiryType.addEventListener('change', function() {
        if (this.value === 'freight') {
            freightFields.style.display = 'block';
            freightFields.style.animation = 'slideDown 0.3s ease';
        } else {
            freightFields.style.display = 'none';
        }
    });
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                item.classList.add('open');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
}

// Reset form function
function resetForm() {
    const form = document.getElementById('contactForm');
    const formContainer = document.querySelector('.contact-form-container');
    const successMessage = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Reset form
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
    
    // Clear any errors
    const errorElements = form.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => group.classList.remove('error'));
    
    // Hide conditional fields
    document.getElementById('freightFields').style.display = 'none';
    
    // Scroll back to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Social link tracking
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList[1]; // Gets the platform class (youtube, tiktok, etc.)
            console.log(`Social media click: ${platform}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Contact method hover effects
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.method-icon i');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
    });
});

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Character counter for message field
document.addEventListener('DOMContentLoaded', function() {
    const messageField = document.getElementById('message');
    const formGroup = messageField.closest('.form-group');
    
    // Create character counter
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = '0 characters';
    formGroup.appendChild(counter);
    
    messageField.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
        
        if (length < 10) {
            counter.style.color = '#e74c3c';
        } else if (length > 500) {
            counter.style.color = '#f39c12';
        } else {
            counter.style.color = '#27ae60';
        }
    });
});

// Form submission analytics (placeholder)
function trackFormSubmission(inquiryType) {
    // This would integrate with analytics services
    console.log(`Form submitted: ${inquiryType} inquiry`);
}