(() => {
    'use strict';

    // This is a draft until the venue, sheet receiver and both payment links are ready.
    const config = window.SPORTS_ARENA_CONFIG || {};
    const form = document.getElementById('registrationForm');
    const fields = document.getElementById('registrationFields');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const availability = document.getElementById('registrationAvailability');
    const memberStatus = document.getElementById('memberStatus');
    const priceStatus = document.getElementById('priceStatus');
    const langButtons = document.querySelectorAll('.lang-option');
    const languages = ['nl', 'en', 'fr', 'ar'];
    let currentLang = localStorage.getItem('siteLang') || 'nl';

    const translations = {
        nl: {
            nav_home: 'Home', nav_activities: 'Activiteiten', nav_events: 'Events', nav_membership: 'Lidmaatschap', nav_donate: 'Doneren', nav_join: 'Lid worden', nav_contact: 'Contact',
            hero_kicker: 'CRESCENT YOUTH PRESENTEERT', hero_categories: 'SPORT • SPEL • VERBINDING', event_date: 'Zondag 29 november 2026', view_programme: 'Bekijk programma', registration_info: 'Registratie-info',
            venue_pending: 'De locatie en boeking zijn nog niet definitief bevestigd. Dit is een voorlopige planning.',
            about_kicker: 'Crescent Youth vzw', about_title: 'Meer dan sport. Samen verbinden.', about_text: 'THE SPORTS ARENA brengt jongeren samen voor sport, interactieve spellen en echte ontmoetingen. Maak nieuwe vrienden, doe mee aan leuke uitdagingen en geniet van een respectvolle en ontspannen sfeer.',
            label_date: 'Datum', label_time: 'Tijd', label_venue: 'Locatie (voorlopig)', label_places: 'Plaatsen', capacity: '35 plaatsen',
            programme_kicker: 'Het plan van de dag', programme_title: 'Programma', programme_intro: 'Eerst samen kennismaken met sociale spellen, daarna sporten in aparte groepen voor meisjes en jongens.',
            social_title: 'Sociale spellen & ontmoeting', social_text: 'Samen kennismaken, groepsspellen en vriendelijke uitdagingen in een begeleide, respectvolle sfeer.', activities_tba: 'Activiteiten worden nog aangekondigd.',
            sports_title: 'Sports Arena', sports_text: 'Recreatieve sport, teamwork en fair play. Meisjes en jongens sporten in gescheiden secties, met afscherming tussen beide groepen.', sports_tba: 'Welke sporten we spelen, maken we binnenkort bekend.',
            tickets_kicker: 'Deelname', tickets_title: 'Registratieprijzen', tickets_intro: 'Schrijf je vooraf in om je plaats aan het voordelige tarief te reserveren zodra de registratie opent.',
            member_price_title: 'Crescent Youth-leden', guest_price_title: 'Niet-leden', advance_registration: 'Vooraf registreren', onsite_price: 'Registratie ter plaatse: €15, enkel als er nog plaatsen beschikbaar zijn.',
            form_kicker: 'Schrijf je in', form_heading: 'Registratie', form_intro: 'Vul je gegevens in zodra de registratie opent. Na een succesvolle inschrijving ga je naar de veilige SumUp-betaalpagina.',
            side_title: 'Jouw plaats bij THE SPORTS ARENA', side_text: 'Een gezellige namiddag met nieuwe gezichten, leuke spellen en sport. Er is een beperkt aantal plaatsen voorzien.',
            side_one: 'Respectvolle, begeleide activiteiten', side_two: 'Afgeschermde sportsecties voor meisjes en jongens', side_three: 'Betaling via SumUp na inschrijving',
            side_pending: 'Let op: locatie en definitieve activiteiten moeten nog bevestigd worden.',
            registration_closed: 'Registratie opent binnenkort. Dit formulier staat nog niet open.', registration_ready: 'Registratie is geopend. Vul het formulier in en betaal daarna via SumUp.',
            first_name: 'Voornaam *', last_name: 'Achternaam *', email_label: 'E-mailadres *', phone_label: 'Telefoonnummer *',
            member_question: 'Ben je lid van Crescent Youth? *', sports_section_label: 'Voorkeur sportgroep *', select_option: 'Selecteer', yes_option: 'Ja', no_option: 'Nee',
            section_sisters: 'Zusters', section_brothers: 'Broeders', section_discuss: 'Bespreek met organisator',
            heard_label: 'Hoe hoorde je over dit event?', heard_placeholder: 'Instagram, WhatsApp, vrienden, website...',
            price_select: 'Kies je lidmaatschapsstatus om je prijs te zien.', price_member: 'Ledenprijs: €8 vooraf', price_guest: 'Niet-ledenprijs: €10 vooraf',
            consent_before: 'Ik geef toestemming om mijn gegevens te verwerken voor de organisatie van dit event en heb het', privacy_link: 'privacybeleid', consent_after: 'gelezen.',
            submit_closed: 'Registratie opent binnenkort', submit_ready: 'Registreer & ga naar SumUp', processing: 'Je registratie wordt verwerkt…',
            saved_redirect: 'Je gegevens zijn opgeslagen. Je wordt doorgestuurd naar SumUp om te betalen.', save_error: 'De registratie kon niet worden bevestigd. Probeer het later opnieuw of contacteer ons.', duplicate: 'Dit e-mailadres is al geregistreerd voor dit event.',
            payment_note: 'Een inschrijving is geen betalingsbewijs. Je betaling wordt apart gecontroleerd via SumUp.',
            values_kicker: 'Onze waarden', values_title: 'Respect. Plezier. Verbinding.', values_text: 'Iedereen verdient een warme en veilige omgeving. We verwachten respect voor elkaar, persoonlijke grenzen en de afspraken van de organisatoren.',
            questions: 'Vragen? Contacteer ons', footer_about: 'Wij verbinden jongeren van alle achtergronden via educatie, sport en inspirerende activiteiten.', footer_links: 'Snelle links', footer_contact: 'Contact', terms: 'Algemene voorwaarden'
        },
        en: {
            nav_home: 'Home', nav_activities: 'Activities', nav_events: 'Events', nav_membership: 'Membership', nav_donate: 'Donate', nav_join: 'Join us', nav_contact: 'Contact',
            hero_kicker: 'CRESCENT YOUTH PRESENTS', hero_categories: 'SPORTS • GAMES • CONNECTIONS', event_date: 'Sunday, 29 November 2026', view_programme: 'View programme', registration_info: 'Registration details',
            venue_pending: 'The venue and booking are not yet finally confirmed. This programme is provisional.',
            about_kicker: 'Crescent Youth vzw', about_title: 'More than sports. A place to connect.', about_text: 'THE SPORTS ARENA brings young people together for sport, interactive games and meaningful connections. Meet new people, enjoy friendly challenges and take part in a welcoming, respectful atmosphere.',
            label_date: 'Date', label_time: 'Time', label_venue: 'Venue (provisional)', label_places: 'Places', capacity: '35 places',
            programme_kicker: 'The plan for the day', programme_title: 'Programme', programme_intro: 'We start with social games and connections, then move into separate sports groups for girls and boys.',
            social_title: 'Social games & connections', social_text: 'Meet new people, join group games and enjoy friendly challenges in a guided, respectful setting.', activities_tba: 'Activities to be announced.',
            sports_title: 'Sports Arena', sports_text: 'Recreational sports, teamwork and fair play. Girls and boys have separate sports areas, with screening between the groups.', sports_tba: 'The sports activities will be announced soon.',
            tickets_kicker: 'Join us', tickets_title: 'Registration fees', tickets_intro: 'Register in advance to reserve your place at the lower price once registration opens.',
            member_price_title: 'Crescent Youth members', guest_price_title: 'Non-members', advance_registration: 'Advance registration', onsite_price: 'On-site registration: €15, only if places remain.',
            form_kicker: 'Join the event', form_heading: 'Registration', form_intro: 'Fill out your details once registration opens. After your registration is saved, you will be directed to secure SumUp payment.',
            side_title: 'Your place at THE SPORTS ARENA', side_text: 'An afternoon with new faces, fun games and sports. Places will be limited.',
            side_one: 'Respectful, guided activities', side_two: 'Screened sports sections for girls and boys', side_three: 'SumUp payment after registration',
            side_pending: 'Please note: the venue and final activities still need confirmation.',
            registration_closed: 'Registration is opening soon. This form is not yet accepting entries.', registration_ready: 'Registration is open. Fill out the form and then pay using SumUp.',
            first_name: 'First name *', last_name: 'Last name *', email_label: 'Email address *', phone_label: 'Phone number *',
            member_question: 'Are you a Crescent Youth member? *', sports_section_label: 'Preferred sports group *', select_option: 'Select', yes_option: 'Yes', no_option: 'No',
            section_sisters: 'Sisters', section_brothers: 'Brothers', section_discuss: 'Discuss with organiser',
            heard_label: 'How did you hear about this event?', heard_placeholder: 'Instagram, WhatsApp, friends, website...',
            price_select: 'Select your membership status to see your fee.', price_member: 'Member fee: €8 in advance', price_guest: 'Non-member fee: €10 in advance',
            consent_before: 'I consent to the use of my details to organise this event and have read the', privacy_link: 'privacy policy', consent_after: '.',
            submit_closed: 'Registration opening soon', submit_ready: 'Register & continue to SumUp', processing: 'Saving your registration…',
            saved_redirect: 'Your details have been saved. Redirecting to SumUp for payment.', save_error: 'We could not confirm your registration. Please try later or contact us.', duplicate: 'This email address is already registered for this event.',
            payment_note: 'A registration is not proof of payment. Payments are verified separately through SumUp.',
            values_kicker: 'Our values', values_title: 'Respect. Fun. Connection.', values_text: 'Everyone deserves a warm, welcoming space. Please respect each other, personal boundaries and the organisers’ guidance.',
            questions: 'Questions? Contact us', footer_about: 'We connect young people from all backgrounds through education, sport and inspiring activities.', footer_links: 'Quick links', footer_contact: 'Contact', terms: 'Terms and conditions'
        },
        fr: {
            nav_home: 'Accueil', nav_activities: 'Activités', nav_events: 'Événements', nav_membership: 'Adhésion', nav_donate: 'Faire un don', nav_join: 'Nous rejoindre', nav_contact: 'Contact',
            hero_kicker: 'CRESCENT YOUTH PRÉSENTE', hero_categories: 'SPORT • JEUX • RENCONTRES', event_date: 'Dimanche 29 novembre 2026', view_programme: 'Voir le programme', registration_info: 'Informations d’inscription',
            venue_pending: 'Le lieu et la réservation ne sont pas encore définitivement confirmés. Ce programme est provisoire.',
            about_kicker: 'Crescent Youth vzw', about_title: 'Plus que du sport. Un lieu de rencontre.', about_text: 'THE SPORTS ARENA rassemble les jeunes autour du sport, de jeux interactifs et de vraies rencontres. Fais connaissance, relève des défis amicaux et profite d’une ambiance accueillante et respectueuse.',
            label_date: 'Date', label_time: 'Heure', label_venue: 'Lieu (provisoire)', label_places: 'Places', capacity: '35 places',
            programme_kicker: 'Déroulement de la journée', programme_title: 'Programme', programme_intro: 'Nous commençons par des jeux et des rencontres, puis des activités sportives en groupes séparés pour les filles et les garçons.',
            social_title: 'Jeux & rencontres', social_text: 'Rencontres, jeux de groupe et défis amicaux dans un cadre encadré et respectueux.', activities_tba: 'Activités à annoncer.',
            sports_title: 'Sports Arena', sports_text: 'Sport de loisir, esprit d’équipe et fair-play. Des espaces séparés pour les filles et les garçons sont prévus, avec une séparation visuelle entre les groupes.', sports_tba: 'Les activités sportives seront bientôt annoncées.',
            tickets_kicker: 'Participation', tickets_title: 'Tarifs d’inscription', tickets_intro: 'Inscris-toi à l’avance pour réserver ta place au tarif réduit dès l’ouverture des inscriptions.',
            member_price_title: 'Membres Crescent Youth', guest_price_title: 'Non-membres', advance_registration: 'Inscription à l’avance', onsite_price: 'Inscription sur place : 15 €, uniquement s’il reste des places.',
            form_kicker: 'Inscription', form_heading: 'Inscription', form_intro: 'Renseigne tes coordonnées après l’ouverture des inscriptions. Une fois enregistré, tu seras dirigé vers le paiement sécurisé SumUp.',
            side_title: 'Ta place à THE SPORTS ARENA', side_text: 'Un après-midi de rencontres, de jeux et de sport. Les places seront limitées.',
            side_one: 'Activités encadrées et respectueuses', side_two: 'Espaces sportifs séparés et protégés des regards', side_three: 'Paiement SumUp après inscription',
            side_pending: 'Attention : le lieu et les activités définitives restent à confirmer.',
            registration_closed: 'Les inscriptions ouvriront bientôt. Ce formulaire n’est pas encore actif.', registration_ready: 'Les inscriptions sont ouvertes. Remplis le formulaire puis paie avec SumUp.',
            first_name: 'Prénom *', last_name: 'Nom *', email_label: 'Adresse e-mail *', phone_label: 'Téléphone *',
            member_question: 'Es-tu membre de Crescent Youth ? *', sports_section_label: 'Groupe sportif préféré *', select_option: 'Sélectionner', yes_option: 'Oui', no_option: 'Non',
            section_sisters: 'Sœurs', section_brothers: 'Frères', section_discuss: 'En parler avec l’organisateur',
            heard_label: 'Comment as-tu découvert cet événement ?', heard_placeholder: 'Instagram, WhatsApp, amis, site web...',
            price_select: 'Choisis ton statut de membre pour voir le tarif.', price_member: 'Tarif membre : 8 € à l’avance', price_guest: 'Tarif non-membre : 10 € à l’avance',
            consent_before: 'J’accepte le traitement de mes données pour l’organisation de cet événement et j’ai lu la', privacy_link: 'politique de confidentialité', consent_after: '.',
            submit_closed: 'Inscriptions bientôt ouvertes', submit_ready: 'S’inscrire et passer à SumUp', processing: 'Enregistrement en cours…',
            saved_redirect: 'Tes coordonnées ont été enregistrées. Redirection vers SumUp pour le paiement.', save_error: 'Nous n’avons pas pu confirmer ton inscription. Réessaie plus tard ou contacte-nous.', duplicate: 'Cette adresse e-mail est déjà inscrite à cet événement.',
            payment_note: 'Une inscription ne prouve pas le paiement. Les paiements sont vérifiés séparément via SumUp.',
            values_kicker: 'Nos valeurs', values_title: 'Respect. Plaisir. Rencontres.', values_text: 'Chacun mérite un cadre chaleureux. Respecte les autres, leurs limites personnelles et les consignes des organisateurs.',
            questions: 'Des questions ? Contacte-nous', footer_about: 'Nous réunissons des jeunes de tous horizons grâce à l’éducation, au sport et à des activités inspirantes.', footer_links: 'Liens rapides', footer_contact: 'Contact', terms: 'Conditions générales'
        },
        ar: {
            nav_home: 'الرئيسية', nav_activities: 'الأنشطة', nav_events: 'الفعاليات', nav_membership: 'العضوية', nav_donate: 'تبرع', nav_join: 'انضم إلينا', nav_contact: 'اتصل بنا',
            hero_kicker: 'تقدم لكم CRESCENT YOUTH', hero_categories: 'رياضة • ألعاب • تعارف', event_date: 'الأحد 29 نوفمبر 2026', view_programme: 'عرض البرنامج', registration_info: 'تفاصيل التسجيل',
            venue_pending: 'لم يُؤكَّد حجز المكان نهائيًا بعد. هذا البرنامج مبدئي.',
            about_kicker: 'Crescent Youth vzw', about_title: 'أكثر من رياضة. مساحة للتواصل.', about_text: 'يجمع THE SPORTS ARENA الشباب عبر الرياضة والألعاب التفاعلية والتعارف. كوّن صداقات جديدة وشارك في تحديات ممتعة ضمن أجواء مرحبة ومحترمة.',
            label_date: 'التاريخ', label_time: 'الوقت', label_venue: 'المكان (مبدئي)', label_places: 'الأماكن', capacity: '35 مكانًا',
            programme_kicker: 'خطة اليوم', programme_title: 'البرنامج', programme_intro: 'نبدأ بألعاب اجتماعية وتعارف، ثم ننتقل إلى الرياضة في مجموعات منفصلة للفتيات والفتيان.',
            social_title: 'ألعاب اجتماعية وتعارف', social_text: 'تعارف وألعاب جماعية وتحديات ودية في بيئة محترمة وتحت الإشراف.', activities_tba: 'سيتم الإعلان عن الأنشطة لاحقًا.',
            sports_title: 'Sports Arena', sports_text: 'رياضة ترفيهية وروح الفريق واللعب النزيه. للفتيات والفتيان أقسام رياضية منفصلة مع حاجز بصري بين المجموعتين.', sports_tba: 'سيتم الإعلان عن الأنشطة الرياضية قريبًا.',
            tickets_kicker: 'المشاركة', tickets_title: 'رسوم التسجيل', tickets_intro: 'سجّل مسبقًا لحجز مكانك بالسعر المخفّض عند فتح التسجيل.',
            member_price_title: 'أعضاء Crescent Youth', guest_price_title: 'غير الأعضاء', advance_registration: 'التسجيل المسبق', onsite_price: 'التسجيل في المكان: 15 يورو، إذا بقيت أماكن متاحة.',
            form_kicker: 'انضم للفعالية', form_heading: 'التسجيل', form_intro: 'أدخل بياناتك عند فتح التسجيل. بعد حفظ التسجيل ستنتقل إلى صفحة دفع SumUp الآمنة.',
            side_title: 'مكانك في THE SPORTS ARENA', side_text: 'بعد ظهر مليء بالتعارف والألعاب والرياضة. الأماكن محدودة.',
            side_one: 'أنشطة منظمة ومحترمة', side_two: 'أقسام رياضية منفصلة ومحجوبة بين الفتيات والفتيان', side_three: 'الدفع عبر SumUp بعد التسجيل',
            side_pending: 'ملاحظة: المكان والأنشطة النهائية ما زالت بانتظار التأكيد.',
            registration_closed: 'سيفتح التسجيل قريبًا. النموذج غير متاح حاليًا.', registration_ready: 'التسجيل مفتوح. املأ النموذج ثم ادفع عبر SumUp.',
            first_name: 'الاسم الأول *', last_name: 'اسم العائلة *', email_label: 'البريد الإلكتروني *', phone_label: 'رقم الهاتف *',
            member_question: 'هل أنت عضو في Crescent Youth؟ *', sports_section_label: 'المجموعة الرياضية المفضلة *', select_option: 'اختر', yes_option: 'نعم', no_option: 'لا',
            section_sisters: 'الأخوات', section_brothers: 'الإخوة', section_discuss: 'مناقشة الأمر مع المنظم',
            heard_label: 'كيف سمعت عن هذه الفعالية؟', heard_placeholder: 'إنستغرام، واتساب، الأصدقاء، الموقع...',
            price_select: 'اختر حالة عضويتك لمعرفة الرسوم.', price_member: 'رسوم الأعضاء: 8 يورو مسبقًا', price_guest: 'رسوم غير الأعضاء: 10 يورو مسبقًا',
            consent_before: 'أوافق على معالجة بياناتي لتنظيم هذه الفعالية وقد قرأت', privacy_link: 'سياسة الخصوصية', consent_after: '.',
            submit_closed: 'سيفتح التسجيل قريبًا', submit_ready: 'سجّل وانتقل إلى SumUp', processing: 'جارٍ حفظ التسجيل…',
            saved_redirect: 'تم حفظ بياناتك. جارٍ الانتقال إلى SumUp للدفع.', save_error: 'تعذر تأكيد التسجيل. حاول لاحقًا أو تواصل معنا.', duplicate: 'هذا البريد الإلكتروني مسجل بالفعل في هذه الفعالية.',
            payment_note: 'التسجيل ليس إثباتًا للدفع. تُراجع المدفوعات بشكل منفصل عبر SumUp.',
            values_kicker: 'قيمنا', values_title: 'الاحترام. المتعة. التواصل.', values_text: 'يستحق الجميع بيئة دافئة وآمنة. نرجو احترام الآخرين وحدودهم الشخصية وتعليمات المنظمين.',
            questions: 'لديك سؤال؟ تواصل معنا', footer_about: 'نجمع الشباب من خلفيات مختلفة عبر التعليم والرياضة والأنشطة الملهمة.', footer_links: 'روابط سريعة', footer_contact: 'اتصل بنا', terms: 'الشروط والأحكام'
        }
    };

    function t(key) {
        return translations[currentLang]?.[key] || translations.nl[key] || key;
    }

    function validPaymentUrl(raw) {
        if (!raw) return false;
        try {
            const url = new URL(raw);
            return url.protocol === 'https:' && url.hostname === 'pay.sumup.com';
        } catch (_) {
            return false;
        }
    }

    function isReady() {
        if (config.registrationOpen !== true) return false;
        try {
            const url = new URL(config.googleScriptUrl);
            return url.protocol === 'https:' && url.hostname === 'script.google.com' &&
                url.pathname.startsWith('/macros/s/') && url.pathname.endsWith('/exec') &&
                validPaymentUrl(config.sumupMemberUrl) && validPaymentUrl(config.sumupNonMemberUrl);
        } catch (_) {
            return false;
        }
    }

    function updatePrice() {
        const status = memberStatus.value;
        priceStatus.textContent = status === 'Yes' ? t('price_member') :
            status === 'No' ? t('price_guest') : t('price_select');
    }

    function updateAvailability() {
        const ready = isReady();
        fields.disabled = !ready;
        submitBtn.disabled = !ready;
        submitBtn.textContent = ready ? t('submit_ready') : t('submit_closed');
        availability.textContent = ready ? t('registration_ready') : t('registration_closed');
        availability.classList.toggle('open', ready);
    }

    function setLanguage(lang) {
        currentLang = languages.includes(lang) ? lang : 'nl';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const translated = translations[currentLang]?.[el.dataset.i18n];
            if (translated) el.textContent = translated;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
        localStorage.setItem('siteLang', currentLang);
        updatePrice();
        updateAvailability();
    }

    memberStatus.addEventListener('change', updatePrice);
    langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
    const menu = document.getElementById('mobile-menu');
    const nav = document.getElementById('main-nav');
    menu?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('#nav-links a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
    }));
    window.addEventListener('scroll', () => document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 40));

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!isReady() || !form.reportValidity()) return;
        const status = memberStatus.value;
        if (status !== 'Yes' && status !== 'No') return;

        const data = Object.fromEntries(new FormData(form).entries());
        const payload = {
            eventId: 'the-sports-arena-2026',
            firstName: data.firstName?.trim(),
            lastName: data.lastName?.trim(),
            email: data.email?.trim(),
            phone: data.phone?.trim(),
            memberStatus: status,
            sportsSection: data.sportsSection,
            heardFrom: data.heardFrom?.trim() || '',
            consent: data.consent === 'yes',
            website: data.website || ''
        };

        formMessage.textContent = t('processing');
        formMessage.className = 'form-message';
        submitBtn.disabled = true;

        try {
            // A plain-text JSON POST follows the previous Noble Journey pattern
            // without triggering an application/json CORS preflight.
            const response = await fetch(config.googleScriptUrl, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const result = await response.json();
            if (!result.success) {
                formMessage.textContent = result.code === 'duplicate' ? t('duplicate') : (result.message || t('save_error'));
                formMessage.className = 'form-message error';
                return;
            }
            const expectedFee = status === 'Yes' ? 8 : 10;
            if (Number(result.amount) !== expectedFee) throw new Error('Fee mismatch');
            formMessage.textContent = t('saved_redirect');
            formMessage.className = 'form-message success';
            const paymentUrl = status === 'Yes' ? config.sumupMemberUrl : config.sumupNonMemberUrl;
            window.location.assign(paymentUrl);
        } catch (error) {
            console.error('Registration could not be confirmed:', error);
            formMessage.textContent = t('save_error');
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.disabled = !isReady();
        }
    });

    setLanguage(currentLang);
})();
