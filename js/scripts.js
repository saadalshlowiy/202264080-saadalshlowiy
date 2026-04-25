document.addEventListener('DOMContentLoaded', () => {
    
    const greetingText = document.getElementById('dynamic-greeting');
    const visitorFormContainer = document.getElementById('visitor-form-container');
    const visitorInput = document.getElementById('visitor-name-input');
    const saveVisitorBtn = document.getElementById('save-visitor-btn');

    let visitorName = localStorage.getItem('portfolio-visitor');

    const updateGreeting = () => {
        if (!greetingText) return;
        
        const hours = new Date().getHours();
        let timeGreeting = "Good evening";
        if (hours < 12) timeGreeting = "Good morning";
        else if (hours < 18) timeGreeting = "Good afternoon";

        if (visitorName) {
            greetingText.innerText = `${timeGreeting}, ${visitorName}!`;
            if (visitorFormContainer) visitorFormContainer.classList.add('hidden');
        } else {
            greetingText.innerText = `${timeGreeting}!`;
        }
    };

    updateGreeting();

    if (saveVisitorBtn) {
        saveVisitorBtn.addEventListener('click', () => {
            const name = visitorInput.value.trim();
            if (name) {
                localStorage.setItem('portfolio-visitor', name);
                visitorName = name;
                updateGreeting();
            }
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const skillGrid = document.getElementById('skill-grid');
    let currentFilter = 'all';

    const renderCards = () => {
        let cards = Array.from(document.querySelectorAll('.project-card'));
        
        cards.forEach(card => {
            if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });

        if (sortSelect && sortSelect.value !== 'default' && skillGrid) {
            cards.sort((a, b) => {
                const nameA = a.dataset.name.toLowerCase();
                const nameB = b.dataset.name.toLowerCase();
                return sortSelect.value === 'name-asc' 
                    ? nameA.localeCompare(nameB) 
                    : nameB.localeCompare(nameA);
            });
            cards.forEach(card => skillGrid.appendChild(card));
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCards();
        });
    });

    if (sortSelect) sortSelect.addEventListener('change', renderCards);

    const githubContent = document.getElementById('github-content');
    const refreshBtn = document.getElementById('refresh-api');

    const fetchGitHubRepos = async () => {
        if (!githubContent) return;
        
        githubContent.innerHTML = '<p class="loading">Fetching repositories...</p>';
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch('https://api.github.com/users/saadalshlowiy/repos?per_page=3&sort=updated', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('API unreachable');
            const repos = await response.json();
            
            githubContent.innerHTML = '';
            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'repo-card';
                
                const desc = repo.description 
                    ? (repo.description.length > 80 ? repo.description.substring(0, 80) + '...' : repo.description) 
                    : 'No description available.';

                card.innerHTML = `
                    <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h4>
                    <p>${desc}</p>
                    <span class="repo-badge">${repo.language || 'Config'}</span>
                `;
                githubContent.appendChild(card);
            });
        } catch (err) {
            githubContent.innerHTML = `<p class="error-msg">⚠️ Could not load GitHub data. Check your connection.</p>`;
        }
    };

    if (refreshBtn) refreshBtn.addEventListener('click', fetchGitHubRepos);
    fetchGitHubRepos();

    const contactForm = document.getElementById('contact-form');
    
    const checkInput = (element, errorElementId, condition) => {
        const errorElement = document.getElementById(errorElementId);
        if (!element || !errorElement) return false;

        if (!condition) {
            element.classList.add('input-error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            element.classList.remove('input-error');
            errorElement.classList.add('hidden');
            return true;
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const msgEl = document.getElementById('message');
            
            const isNameValid = checkInput(nameEl, 'name-error', nameEl.value.trim() !== '');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = checkInput(emailEl, 'email-error', emailRegex.test(emailEl.value.trim()));
            const isMsgValid = checkInput(msgEl, 'message-error', msgEl.value.trim() !== '');

            if (isNameValid && isEmailValid && isMsgValid) {
                const feedback = document.getElementById('form-feedback');
                feedback.innerText = `Thanks ${nameEl.value}! Your message has been sent.`;
                feedback.className = 'success';
                feedback.classList.remove('hidden');
                
                contactForm.reset();
                setTimeout(() => feedback.classList.add('hidden'), 5000);
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const statsContainer = document.getElementById('scraping-stats');
    if (statsContainer) {
        let pagesScraped = 1420500; 
        setInterval(() => {
            pagesScraped += Math.floor(Math.random() * 25);
            statsContainer.innerText = pagesScraped.toLocaleString();
        }, 1200);
    }
});
