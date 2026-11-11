(() => {
    const root = document.documentElement;
    const notice = document.querySelector('.legal-language');
    const menu = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');
    const languages = {
        nl: '',
        en: 'This legal document is available in Dutch.',
        fr: 'Ce document juridique est disponible en n\u00e9erlandais.',
        ar: '\u0647\u0630\u0647 \u0627\u0644\u0648\u062b\u064a\u0642\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0645\u062a\u0627\u062d\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0647\u0648\u0644\u0646\u062f\u064a\u0629.'
    };

    function setLanguage(lang) {
        const language = Object.hasOwn(languages, lang) ? lang : 'nl';
        notice.textContent = languages[language];
        notice.hidden = language === 'nl';
        document.querySelectorAll('.lang-option').forEach(button => {
            button.classList.toggle('active', button.dataset.lang === language);
        });
        try { localStorage.setItem('siteLang', language); } catch (_) { /* storage unavailable */ }
        root.dir = language === 'ar' ? 'rtl' : 'ltr';
        root.lang = language;
    }

    function toggleMenu(open) {
        nav.classList.toggle('open', open);
        menu.setAttribute('aria-expanded', String(open));
    }

    menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || menu.getAttribute('aria-expanded') !== 'true') return;
        toggleMenu(false);
        menu.focus();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    document.querySelectorAll('.lang-option').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    let saved;
    try { saved = localStorage.getItem('siteLang'); } catch (_) { /* storage unavailable */ }
    setLanguage(saved);
})();
