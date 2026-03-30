document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Greeting based on Time ---
    const greeting = document.getElementById('dynamic-greeting');
    const hours = new Date().getHours();
    if (hours < 12) greeting.innerText = "Good Morning ☀️";
    else if (hours < 18) greeting.innerText = "Good Afternoon ☕";
    else greeting.innerText = "Good Evening 🌙";

    // --- 2. Dark Mode with localStorage ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- 3. Skill Filtering System ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- 4. Fetch Public API Data ---
    const apiContent = document.getElementById('api-content');
    const refreshBtn = document.getElementById('refresh-api');

    async function getTechQuote() {
        apiContent.innerHTML = '<p class="loading">Loading...</p>';
        try {
            // Using the Advice Slip API (Public & Free)
            const response = await fetch('https://api.adviceslip.com/advice');
            if (!response.ok) throw new Error('API unreachable');
            const data = await response.json();
            apiContent.innerHTML = `<p>"${data.slip.advice}"</p>`;
        } catch (err) {
            apiContent.innerHTML = `<p class="error-msg">⚠️ Could not load data. Check your connection.</p>`;
        }
    }

    refreshBtn.addEventListener('click', getTechQuote);
    getTechQuote(); // Initial call

    // --- 5. Form Validation & Feedback ---
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        
        // Show Success Feedback
        feedback.innerText = `Thank you, ${name}! I will get back to you soon.`;
        feedback.className = 'success';
        feedback.classList.remove('hidden');
        
        contactForm.reset();
        setTimeout(() => feedback.classList.add('hidden'), 5000);
    });

    // --- 6. Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});