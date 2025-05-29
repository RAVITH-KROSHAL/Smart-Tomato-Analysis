// script.js

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Download file function
function downloadFile(filename) {
    // Since we can't actually serve files, we'll simulate the download
    alert(`Downloading ${filename}...\n\nNote: This is a demo. In a real implementation, this would download the actual file.`);
    
    // In a real implementation, you would use something like:
    // const link = document.createElement('a');
    // link.href = `/files/${filename}`;
    // link.download = filename;
    // link.click();
}

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent successfully.\n\nWe'll get back to you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '0'; // Start invisible for the animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .milestone, .file-card, .hero-content > *').forEach(element => {
    element.style.opacity = '0'; // Start invisible
    observer.observe(element);
});