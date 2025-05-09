document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('estyContactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('estyContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Social Media Link Animation
    animateSocialLinks();
});

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Change button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simple client-side validation
    if (!validateForm(form)) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    // Form submission logic (using Formspree or your backend)
    const formData = new FormData(form);
    
    // Replace with your actual form submission endpoint
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
    .catch(handleError)
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function validateForm(form) {
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    let isValid = true;

    // Reset error states
    form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });

    // Email validation
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        isValid = false;
    }

    // Message validation
    if (!message.value || message.value.length < 10) {
        message.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function handleResponse(response) {
    const formStatus = document.getElementById('form-status');
    
    if (response.ok) {
        formStatus.textContent = 'Thank you! Your message has been sent.';
        formStatus.className = 'success';
        document.getElementById('estyContactForm').reset();
    } else {
        throw new Error('Network response was not ok');
    }
    formStatus.style.display = 'block';
    setTimeout(() => formStatus.style.opacity = '1', 10);
}

function handleError(error) {
    console.error('Error:', error);
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = 'Oops! There was a problem. Please try again.';
    formStatus.className = 'error';
    formStatus.style.display = 'block';
    setTimeout(() => formStatus.style.opacity = '1', 10);
}

function animateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        // Add delay based on position
        link.style.transitionDelay = `${index * 0.1}s`;
        
        // Pulse animation on hover
        link.addEventListener('mouseenter', () => {
            link.classList.add('pulse');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('pulse');
        });
    });
}
            
            // Change button text
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form data using Fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success message
                    formStatus.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Error message
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                formStatus.className = 'error';
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.opacity = '1';
                    }, 500);
                }, 5000);
            });
        });
    }
});