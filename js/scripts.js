document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Greeting (Requirement 2) ---
    const greetingElement = document.getElementById('dynamic-greeting');
    const hour = new Date().getHours();
    let greetingText = "Good Evening";
    
    if (hour < 12) greetingText = "Good Morning";
    else if (hour < 18) greetingText = "Good Afternoon";
    
    greetingElement.textContent = `${greetingText}, I'm`;

    // --- 2. Dark Mode with LocalStorage (Requirement 3) ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });

    // --- 3. Form Validation & Feedback (Requirement 5) ---
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Basic Validation
        if (name.length < 2) {
            showFeedback("Please enter a valid name.", "error");
            return;
        }

        // Simulate Success
        showFeedback(`Thank you, ${name}! Your message has been "sent".`, "success");
        contactForm.reset();
    });

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = type; // 'success' or 'error'
        feedback.classList.remove('hidden');
        
        // Hide after 5 seconds
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 5000);
    }

    // --- 4. Scroll Animations (Requirement 4) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});