document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.sun-faq__item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.sun-faq__question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // FAQ Categories
        const faqCategories = document.querySelectorAll('.sun-faq__category');
        const allFaqItems = document.querySelectorAll('.sun-faq__item');
        
        faqCategories.forEach(category => {
            category.addEventListener('click', () => {
                const selectedCategory = category.getAttribute('data-category');
                
                // Update active category
                faqCategories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');
                
                // Filter FAQ items
                if (selectedCategory === 'all') {
                    allFaqItems.forEach(item => item.style.display = 'block');
                } else {
                    allFaqItems.forEach(item => {
                        if (item.getAttribute('data-category') === selectedCategory) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Resources Tabs
    const resourcesTabs = document.querySelectorAll('.sun-resources__tab');
    if (resourcesTabs.length > 0) {
        resourcesTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                resourcesTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Here you would typically show/hide content based on the selected tab
                // For this example, we're just changing the active state
                console.log(`Tab ${tab.getAttribute('data-tab')} selected`);
            });
        });
    }
    
    // Pricing Toggle
    const pricingToggle = document.querySelector('.sun-pricing__toggle-input');
    if (pricingToggle) {
        const monthlyLabel = document.querySelector('.sun-pricing__toggle-label:first-child');
        const yearlyLabel = document.querySelector('.sun-pricing__toggle-label:last-child');
        
        pricingToggle.addEventListener('change', () => {
            if (pricingToggle.checked) {
                monthlyLabel.classList.remove('sun-pricing__toggle-label--active');
                yearlyLabel.classList.add('sun-pricing__toggle-label--active');
                
                // Here you would update prices to show annual pricing
                console.log('Annual pricing selected');
            } else {
                yearlyLabel.classList.remove('sun-pricing__toggle-label--active');
                monthlyLabel.classList.add('sun-pricing__toggle-label--active');
                
                // Here you would update prices to show monthly pricing
                console.log('Monthly pricing selected');
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Here you would typically submit the form via AJAX
                alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
                contactForm.reset();
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    }
});