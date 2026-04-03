// ==================== JND Global Enterprise - Script.js ====================

document.addEventListener('DOMContentLoaded', function () {

    // 1. Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Navbar scroll effect (background change on scroll)
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // 3. WhatsApp Button Floating Animation
    const whatsappBtn = document.querySelector('a[href*="wa.me"]');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.classList.add('pulse');
            setTimeout(() => {
                whatsappBtn.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    // 4. Contact Form Validation (Basic)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.querySelector('input[type="text"]');
            const email = document.querySelector('input[type="email"]');
            const message = document.querySelector('textarea');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                e.preventDefault();
                alert('Please fill all fields before submitting.');
            } else {
                // In real project yahan form submit logic aayega (EmailJS ya backend)
                alert('Thank you! Our team will contact you shortly.');
                contactForm.reset();
            }
        });
    }

    // 5. Add "Book Now" buttons functionality
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const service = this.getAttribute('data-service') || "Plumbing Service";
            const whatsappNumber = "923001234567"; // Change this to client's number
            const message = `Assalam-o-Alaikum, I want to book ${service}. Please contact me.`;
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });

    // 6. Back to top button (optional - agar add karna ho)
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 d-none';
    backToTop.style.borderRadius = '50%';
    backToTop.style.width = '50px';
    backToTop.style.height = '50px';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.remove('d-none');
        } else {
            backToTop.classList.add('d-none');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log('%cJND Global Enterprise Website Loaded Successfully!', 'color: #1E40AF; font-weight: bold;');
});