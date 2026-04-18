document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. State Management & Advanced Greeting ---
    const greetingText = document.getElementById('dynamic-greeting');
    const visitorFormContainer = document.getElementById('visitor-form-container');
    const visitorInput = document.getElementById('visitor-name-input');
    const saveVisitorBtn = document.getElementById('save-visitor-btn');

    // Retrieve name from state (localStorage)
    let visitorName = localStorage.getItem('portfolio-visitor');

    function updateGreeting() {
        const hours = new Date().getHours();
        let timeGreeting = "Good Evening 🌙";
        if (hours < 12) timeGreeting = "Good Morning ☀️";
        else if (hours < 18) timeGreeting = "Good Afternoon ☕";

        if (visitorName) {
            greetingText.innerText = `${timeGreeting}, ${visitorName}!`;
            visitorFormContainer.classList.add('hidden');
        } else {
            greetingText.innerText = `${timeGreeting}!`;
        }
    }

    updateGreeting();

    saveVisitorBtn.addEventListener('click', () => {
        const name = visitorInput.value.trim();
        if (name) {
            localStorage.setItem('portfolio-visitor', name);
            visitorName = name;
            updateGreeting();
        }
    });

    // --- 2. Dark Mode State Management ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- 3. Complex Logic: Filter + Sort System ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const skillGrid = document.getElementById('skill-grid');
    let currentFilter = 'all';

    function renderCards() {
        // Convert NodeList to Array for sorting
        let cards = Array.from(document.querySelectorAll('.project-card'));
        
        // Apply Filter
        cards.forEach(card => {
            if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });

        // Apply Sort
        const sortValue = sortSelect.value;
        if (sortValue !== 'default') {
            cards.sort((a, b) => {
                const nameA = a.dataset.name.toLowerCase();
                const nameB = b.dataset.name.toLowerCase();
                if (sortValue === 'name-asc') return nameA.localeCompare(nameB);
                if (sortValue === 'name-desc') return nameB.localeCompare(nameA);
                return 0;
            });
            // Re-append to DOM in new order
            cards.forEach(card => skillGrid.appendChild(card));
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCards();
        });
    });

    sortSelect.addEventListener('change', renderCards);

    // --- 4. API Integration: GitHub Repos ---
    const githubContent = document.getElementById('github-content');
    const refreshBtn = document.getElementById('refresh-api');

    async function fetchGitHubRepos() {
        githubContent.innerHTML = '<p class="loading">Loading repositories...</p>';
        try {
            // Using a generic query or your actual username. Replace 'saadalshlowiy' if needed.
            const response = await fetch('https://api.github.com/users/github/repos?per_page=3&sort=updated');
            if (!response.ok) throw new Error('API unreachable');
            const repos = await response.json();
            
            githubContent.innerHTML = '';
            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.innerHTML = `
                    <h4><a href="${repo.html_url}" target="_blank" style="color: inherit;">${repo.name}</a></h4>
                    <p>${repo.description || 'No description available.'}</p>
                    <span class="repo-badge">${repo.language || 'Code'}</span>
                `;
                githubContent.appendChild(card);
            });
        } catch (err) {
            githubContent.innerHTML = `<p class="error-msg">⚠️ Could not load GitHub data. Check your connection or API limits.</p>`;
        }
    }

    refreshBtn.addEventListener('click', fetchGitHubRepos);
    fetchGitHubRepos();

    // --- 5. Complex Logic: Form Validation ---
    const contactForm = document.getElementById('contact-form');
    
    function validateInput(element, errorElementId, condition) {
        const errorElement = document.getElementById(errorElementId);
        if (!condition) {
            element.classList.add('input-error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            element.classList.remove('input-error');
            errorElement.classList.add('hidden');
            return true;
        }
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const msgEl = document.getElementById('message');
        
        // Validation Rules
        const isNameValid = validateInput(nameEl, 'name-error', nameEl.value.trim() !== '');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = validateInput(emailEl, 'email-error', emailRegex.test(emailEl.value.trim()));
        const isMsgValid = validateInput(msgEl, 'message-error', msgEl.value.trim() !== '');

        if (isNameValid && isEmailValid && isMsgValid) {
            const feedback = document.getElementById('form-feedback');
            feedback.innerText = `Thank you, ${nameEl.value}! Your message has been sent securely.`;
            feedback.className = 'success';
            feedback.classList.remove('hidden');
            
            contactForm.reset();
            setTimeout(() => feedback.classList.add('hidden'), 5000);
        }
    });

    // --- 6. Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
