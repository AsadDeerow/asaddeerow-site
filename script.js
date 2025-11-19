(function () {
    'use strict';

    function bindThemeToggle() {
        const btn = document.querySelector('[data-action="toggle-theme"]');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                console.warn('Unable to save theme preference', e);
            }
        });
    }

    function setYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    }

    function renderProjects() {
        const root = document.querySelector('[data-list="projects"]');
        const data = (window.__SITE_CONTENT__ && window.__SITE_CONTENT__.projects) || [];
        if (!root) return;

        root.innerHTML = data.map((p, idx) => `
            <article class="card ${idx === 0 ? 'col-span-6' : 'col-span-4'}">
                <h3>${p.title}</h3>
                <p class="muted">${p.summary}</p>
            </article>
        `).join('');
    }

    function renderTimeline() {
        const root = document.querySelector('[data-list="timeline"]');
        const data = (window.__SITE_CONTENT__ && window.__SITE_CONTENT__.timeline) || [];
        if (!root) return;

        root.innerHTML = data.map(item => `
            <li class="t-item">
                <div class="t-dot" aria-hidden="true"></div>
                <div>
                    <strong>${item.date}</strong>
                    <div class="muted">${item.text}</div>
                </div>
            </li>
        `).join('');
    }

    function init() {
        bindThemeToggle();
        setYear();
        renderProjects();
        renderTimeline();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();