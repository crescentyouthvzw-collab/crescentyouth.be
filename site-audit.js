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
        styles.href = '/site-audit.css?v=20261109-footer';
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

    const navLinks = [
        ['/index.html', 'Home', 'Home', 'Accueil', 'الرئيسية'],
        ['/index.html#activiteiten', 'Activiteiten', 'Activities', 'Activités', 'الأنشطة'],
        ['/Events/calendar.html', 'Events', 'Events', 'Événements', 'الفعاليات'],
        ['/index.html#membership-preview', 'Lidmaatschap', 'Membership', 'Adhésion', 'العضوية'],
        ['/Donation.html', 'Doneren', 'Donate', 'Faire un don', 'تبرع'],
        ['/index.html#faq', 'FAQ', 'FAQ', 'FAQ', 'الأسئلة الشائعة'],
        ['/Registration/Registration.html', 'Lid worden', 'Join us', 'Nous rejoindre', 'انضم إلينا'],
        ['/Contact.html', 'Contact', 'Contact', 'Contact', 'اتصل بنا']
    ];
    const footerText = {
        nl: ['Jongeren in Brugge verbinden via educatie, sport en activiteiten.', 'Snelle links', 'Contact en gegevens', 'Maatschappelijke zetel', 'Ondernemingsnummer', 'Juridische informatie', 'Algemene voorwaarden', 'Privacybeleid', 'Cookiebeleid', 'Alle rechten voorbehouden.', 'Terug naar boven'],
        en: ['Connecting young people in Bruges through education, sports and activities.', 'Quick links', 'Contact and details', 'Registered office', 'Enterprise number', 'Legal information', 'Terms and conditions', 'Privacy policy', 'Cookie policy', 'All rights reserved.', 'Back to top'],
        fr: ['Nous rassemblons les jeunes à Bruges autour de l’éducation, du sport et d’activités.', 'Liens rapides', 'Contact et coordonnées', 'Siège social', 'Numéro d’entreprise', 'Informations légales', 'Conditions générales', 'Politique de confidentialité', 'Politique de cookies', 'Tous droits réservés.', 'Retour en haut'],
        ar: ['نجمع الشباب في بروج من خلال التعليم والرياضة والأنشطة.', 'روابط سريعة', 'معلومات التواصل', 'المقر المسجل', 'رقم المؤسسة', 'المعلومات القانونية', 'الشروط والأحكام', 'سياسة الخصوصية', 'سياسة ملفات تعريف الارتباط', 'جميع الحقوق محفوظة.', 'العودة إلى الأعلى']
    };
    const footer = document.querySelector('footer');
    const brandImage = document.querySelector('header .logo img, header .brand img')?.src;
    for (const brand of document.querySelectorAll('header .logo-text, header .brand span')) {
        brand.setAttribute('translate', 'no');
        brand.classList.add('notranslate');
    }

    function footerLanguage() {
        return root.lang || 'nl';
    }
    const menuLinks = [...document.querySelectorAll('#nav-links a')];

    function syncSharedLayout(lang) {
        const column = { nl: 1, en: 2, fr: 3, ar: 4 }[lang] || 1;
        const current = path === '/index.html' && navLinks.some(([href]) => href === path + location.hash)
            ? path + location.hash
            : path.startsWith('/Events/') ? '/Events/calendar.html' : path;
        for (const link of menuLinks) {
            const url = new URL(link.href);
            const href = (url.pathname === '/' ? '/index.html' : url.pathname) + url.hash;
            const item = navLinks.find(([target]) => target === href);
            if (!item) continue;
            link.textContent = item[column];
            if (href === current) link.setAttribute('aria-current', href === path ? 'page' : 'location');
            else link.removeAttribute('aria-current');
        }

        if (!footer || footer.dataset.locale === lang) return;
        footer.className = 'site-footer';
        footer.dataset.locale = lang;
        footer.lang = lang;
        footer.dir = lang === 'ar' ? 'rtl' : 'ltr';
        const [about, quick, contact, office, number, legal, terms, privacy, cookies, rights, top] =
            footerText[lang] || footerText.nl;
        const links = navLinks.map(item => '<li><a href="' + item[0] + '">' + item[column] + '</a></li>').join('');
        footer.innerHTML = `
            <div class="site-footer-grid">
                <div>
                    <h2 class="site-footer-brand"><img alt="" width="44" height="44"><span class="notranslate" translate="no">Crescent Youth vzw</span></h2><p>${about}</p>
                    <div class="site-footer-social">
                        <a href="https://www.instagram.com/crescentyouth.be/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg></a>
                        <a href="https://www.tiktok.com/@crescentyouth.be" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2h3c.3 2.4 2 4.2 4 4.5v3a8 8 0 0 1-4-1.5v8a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3V2Z"/></svg></a>
                        <a href="https://linktr.ee/CrescentYouth" aria-label="Linktree" target="_blank" rel="noopener noreferrer"><img src="/images/linktree-seeklogo.png" alt=""></a>
                    </div>
                </div>
                <div><h2>${quick}</h2><ul>${links}</ul></div>
                <div><h2>${contact}</h2><p><a href="mailto:info@crescentyouth.be">info@crescentyouth.be</a></p>
                    <address>${office}<br>Molenwiekstraat-West 13<br>8200 Brugge, Belgium</address>
                    <p>${number} <a href="https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1023462539">1023.462.539</a></p>
                </div>
                <div><h2>${legal}</h2><ul>
                    <li><a href="/comply_with_law/terms-and-conditions.html">${terms}</a></li>
                    <li><a href="/comply_with_law/privacy-policy.html">${privacy}</a></li>
                    <li><a href="/comply_with_law/cookie-policy.html">${cookies}</a></li>
                </ul></div>
            </div>
            <div class="site-footer-bottom">
                <p>© ${new Date().getFullYear()} <span class="notranslate" translate="no">Crescent Youth vzw</span>. ${rights}</p>
                <a href="#" class="site-footer-top"><span aria-hidden="true">↑</span> ${top}</a>
            </div>`;
        const logo = footer.querySelector('.site-footer-brand img');
        if (brandImage) logo.src = brandImage;
        else logo.remove();
    }

    window.addEventListener('hashchange', () => syncSharedLayout(footerLanguage()));


    const menu = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');
    const switcher = document.querySelector('.lang-switcher');
    const navigationLabels = {
        nl: ['Open navigatie', 'Sluit navigatie', 'Hoofdnavigatie', 'Taal kiezen'],
        en: ['Open menu', 'Close menu', 'Main navigation', 'Choose language'],
        fr: ['Ouvrir le menu', 'Fermer le menu', 'Navigation principale', 'Choisir la langue'],
        ar: ['فتح القائمة', 'إغلاق القائمة', 'التنقل الرئيسي', 'اختيار اللغة']
    };
    function syncNavigation() {
        const labels = navigationLabels[root.lang] || navigationLabels.nl;
        menu?.setAttribute('aria-label', labels[menu.getAttribute('aria-expanded') === 'true' ? 1 : 0]);
        nav?.setAttribute('aria-label', labels[2]);
        switcher?.setAttribute('aria-label', labels[3]);
    }
    if (menu) new MutationObserver(syncNavigation).observe(menu, {
        attributes: true, attributeFilter: ['aria-expanded']
    });

    function syncLanguage() {
        syncNavigation();
        const lang = root.lang || 'nl';
        syncSharedLayout(footerLanguage());
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
