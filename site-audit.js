(() => {
    const root = document.documentElement;
    const path = location.pathname === '/' ? '/index.html' : location.pathname;
    const isLegal = path.startsWith('/comply_with_law/');
    const baseTitle = document.querySelector('meta[property="og:title"]')?.content || document.title;
    const description = document.querySelector('meta[name="description"]');
    const baseDescription = document.querySelector('meta[property="og:description"]')?.content || description?.content;
    const languages = { nl: 'Nederlands', en: 'English', fr: 'Français', ar: 'العربية' };
    const numbers = { nl: ['Landcode telefoonnummer', 'Landcode noodcontact'], en: ['Phone country code', 'Emergency contact country code'], fr: ['Indicatif du téléphone', 'Indicatif du contact d’urgence'], ar: ['رمز البلد للهاتف', 'رمز البلد لجهة اتصال الطوارئ'] };

    // Contact loads this through its existing site script.
    if (!document.querySelector('link[href*="/site-audit.css"]')) {
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = '/site-audit.css?v=20261109-review';
        document.head.append(styles);
    }

    function metadata(selector, tag, attributes) {
        let element = document.querySelector(selector);
        if (!element) {
            element = document.createElement(tag);
            for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
            document.head.append(element);
        }
        return element;
    }
    const canonical = path === '/index.html' ? 'https://crescentyouth.be/' : 'https://crescentyouth.be' + path;
    metadata('link[rel="canonical"]', 'link', { rel: 'canonical', href: canonical });
    metadata('meta[property="og:url"]', 'meta', { property: 'og:url', content: canonical });
    const ogTitle = metadata('meta[property="og:title"]', 'meta', { property: 'og:title', content: baseTitle });
    const ogDescription = metadata('meta[property="og:description"]', 'meta', { property: 'og:description', content: baseDescription || baseTitle });

    for (const paragraph of document.querySelectorAll('footer p')) {
        if (paragraph.querySelector('a')) continue;
        const address = [...paragraph.childNodes].find(node => node.nodeType === 3 && node.textContent.trim() === 'info@crescentyouth.be');
        if (!address) continue;
        const link = document.createElement('a');
        link.href = 'mailto:info@crescentyouth.be';
        link.textContent = 'info@crescentyouth.be';
        address.replaceWith(' ', link);
    }

    function syncLanguage() {
        const lang = isLegal ? 'nl' : (root.lang || 'nl');
        for (const button of document.querySelectorAll('button.lang-option[data-lang]')) {
            const choice = button.dataset.lang;
            button.setAttribute('aria-pressed', String(choice === lang));
            if (languages[choice]) button.setAttribute('aria-label', languages[choice]);
        }
        const labels = numbers[lang] || numbers.nl;
        document.getElementById('phoneCode')?.setAttribute('aria-label', labels[0]);
        document.getElementById('emergencyPhoneCode')?.setAttribute('aria-label', labels[1]);
        const heading = document.querySelector('h1')?.textContent.trim();
        if (!isLegal && heading && !document.body.dataset.page) {
            document.title = lang === 'nl' ? baseTitle : heading + ' | Crescent Youth vzw';
            const subtitle = document.querySelector('p[data-i18n$="_hero_subtitle"], p[data-i18n="hero_subtitle"], p[data-i18n="membership_page_subtitle"], p[data-i18n="about_text"]');
            if (description && baseDescription) {
                description.content = lang === 'nl' ? baseDescription : (subtitle?.textContent.trim() || document.title);
            }
        }
        ogTitle.content = document.title;
        ogDescription.content = description?.content || document.title;
    }
    syncLanguage();
    new MutationObserver(syncLanguage).observe(root, { attributes: true, attributeFilter: ['lang'] });

    // Apply the header offset to a deep link opened directly, after styles have loaded.
    window.addEventListener('load', () => {
        const id = location.hash.slice(1);
        if (!id) return;
        try { document.getElementById(decodeURIComponent(id))?.scrollIntoView(); } catch (_) { /* malformed URL */ }
    }, { once: true });
})();
