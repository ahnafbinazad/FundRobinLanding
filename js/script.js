/**
 * FundRobin.ai Landing Page Scripts
 * Clean, modern JavaScript for the pre-launch landing page
 */

document.addEventListener('DOMContentLoaded', function() {
    // // Header scroll behavior
    // const header = document.querySelector('header');
    
    // window.addEventListener('scroll', function() {
    //     if (window.scrollY > 10) {
    //         header.classList.add('scrolled');
    //     } else {
    //         header.classList.remove('scrolled');
    //     }
    // });
    
    // Variables to track scroll position
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    // Handle scroll events
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when not at the top
        if (currentScrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For mobile or negative scrolling
    }, false);

    // Elements to animate on page load with specified animations
    const elementsWithAnimation = [
        { selector: '.hero-content', animation: 'slide-from-left' },
        { selector: '.hero-signup', animation: 'fade-in', delay: 200 },
        { selector: '.hero-image', animation: 'slide-from-right', delay: 100 },
        { selector: '.badge', animation: 'scale-in', delay: 300 },
    ];
    
    // Apply initial animations
    elementsWithAnimation.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.classList.add(item.animation);
            if (item.delay) {
                element.style.animationDelay = `${item.delay}ms`;
            }
        }
    });
    
    // Sections to observe for scroll animations
    const sectionTitles = document.querySelectorAll('.why-join h2, .features h2, .faq h2, .section-intro');
    const benefitItems = document.querySelectorAll('.benefit-item');
    const featureCards = document.querySelectorAll('.feature-card');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply appropriate animation based on element type
                if (entry.target.classList.contains('to-animate')) {
                    entry.target.classList.add('fade-in');
                } else if (entry.target.classList.contains('to-scale')) {
                    entry.target.classList.add('scale-in');
                } else if (entry.target.classList.contains('to-slide-right')) {
                    entry.target.classList.add('slide-from-right');
                } else if (entry.target.classList.contains('to-slide-left')) {
                    entry.target.classList.add('slide-from-left');
                }
                
                // Stop observing after animation is applied
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section titles with scale animations
    sectionTitles.forEach(title => {
        title.classList.add('to-scale');
        scrollObserver.observe(title);
    });
    
    // Observe benefit items with staggered delays
    benefitItems.forEach((item, index) => {
        item.classList.add('to-animate');
        item.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        scrollObserver.observe(item);
    });
    
    // Observe feature cards with staggered delays and alternating animations
    featureCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('to-slide-left');
        } else {
            card.classList.add('to-slide-right');
        }
        card.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        scrollObserver.observe(card);
    });
    
    // Observe FAQ items with staggered delays
    faqItems.forEach((item, index) => {
        item.classList.add('to-animate');
        item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        scrollObserver.observe(item);
    });

    // Form validation with enhanced feedback
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        const emailField = document.getElementById('email');
        const organizationField = document.getElementById('organization');
        
        // Add input validation indicators
        emailField.addEventListener('input', function() {
            validateEmail(this);
        });
        
        function validateEmail(input) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(input.value)) {
                input.classList.add('valid');
                input.classList.remove('invalid');
                return true;
            } else if (input.value.length > 0) {
                input.classList.add('invalid');
                input.classList.remove('valid');
                return false;
            } else {
                input.classList.remove('valid', 'invalid');
                return false;
            }
        }
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateEmail(emailField)) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please enter a valid email address';
                
                // Remove any existing error messages
                const existingError = signupForm.querySelector('.error-message');
                if (existingError) existingError.remove();
                
                emailField.parentNode.appendChild(errorMessage);
                emailField.focus();
                
                // Trigger shake animation
                emailField.classList.add('shake');
                setTimeout(() => {
                    emailField.classList.remove('shake');
                }, 600);
                
                return;
            }
            
            // Collect the form data
            const formData = {
                email: emailField.value,
                organization: organizationField.value
            };
            
            // Placeholder for API submission
            console.log('Form submitted with data:', formData);
            
            // Show success message
            submitSuccess();
        });
    }
    
    // Add CSS for form validation
    const validationStyle = document.createElement('style');
    validationStyle.textContent = `
        input.valid {
            border: 2px solid var(--success) !important;
            background-color: rgba(56, 178, 172, 0.05) !important;
        }
        input.invalid {
            border: 2px solid #e53e3e !important;
            background-color: rgba(229, 62, 62, 0.05) !important;
        }
        .error-message {
            color: #e53e3e;
            font-size: 0.85rem;
            margin-top: 8px;
            position: absolute;
            bottom: -22px;
            left: 20px;
        }
        .form-group {
            position: relative;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(validationStyle);
    
    // Enhanced FAQ Accordion with smooth transitions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQs first
            faqQuestions.forEach(otherQuestion => {
                otherQuestion.parentElement.classList.remove('active');
            });
            
            // Toggle active state if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
                
                // Scroll into better view if needed
                const rect = faqItem.getBoundingClientRect();
                const isPartiallyVisible = (
                    rect.top >= 0 &&
                    rect.top <= window.innerHeight * 0.7
                );
                
                if (!isPartiallyVisible) {
                    faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // Success message for form submission
    function submitSuccess() {
        // Create success message with enhanced styling
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>You've been added to our early access list. We'll be in touch soon!</p>
        `;
        
        // Replace form with success message
        signupForm.innerHTML = '';
        signupForm.appendChild(successMessage);
        
        // Add styles for success message
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                text-align: center;
                padding: 20px;
                animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            .success-icon {
                font-size: 60px;
                color: var(--white);
                margin-bottom: 20px;
                animation: pulse 2s infinite;
            }
            .success-message h3 {
                font-size: 1.8rem;
                margin-bottom: 12px;
                color: var(--white);
                -webkit-text-fill-color: var(--white);
            }
            .success-message p {
                color: rgba(255,255,255,0.9);
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
    }
});

// Smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Add highlight effect to target element
            const originalBackgroundColor = targetElement.style.backgroundColor;
            targetElement.style.transition = 'background-color 0.8s ease';
            targetElement.style.backgroundColor = 'rgba(79, 143, 240, 0.1)';
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Reset background after animation
            setTimeout(() => {
                targetElement.style.backgroundColor = originalBackgroundColor;
            }, 1500);
        }
    }
});
