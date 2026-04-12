// Mobile / desktop menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');

if (mobileMenu && mainNav) {
  mobileMenu.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll to top
const toTopBtn = document.querySelector('.to-top');
if (toTopBtn) {
  toTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scroll reveal
const animatedEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (animatedEls.length) {
  const observerOptions = { threshold: 0.18, rootMargin: '0px 0px -40px 0px' };

  const onAppear = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, observerOptions);

  animatedEls.forEach(el => onAppear.observe(el));
}

// Stats animation
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-card h3');

  stats.forEach(stat => {
    const original = stat.textContent;
    const numeric = parseInt(original, 10);
    const hasPlus = original.includes('+');
    const hasPercent = original.includes('%');

    if (isNaN(numeric)) return;

    let current = 0;
    const increment = numeric / 40;

    const timer = setInterval(() => {
      current += increment;

      if (current >= numeric) {
        stat.textContent = numeric + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
      }
    }, 30);
  });
};

const statsSection = document.querySelector('.quick-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');

if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
  setTimeout(() => {
    cookieBanner.classList.add('show');
  }, 1000);
}

if (cookieAccept && cookieBanner) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 400);
  });
}

// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    if (item) item.classList.toggle('active');
  });
});

// i18n translations
const translations = {
  nl: {
    nav_home: 'Home',
    nav_mission: 'Missie',
    nav_values: 'Kernwaarden',
    nav_activities: 'Wat doen wij?',
    nav_team: 'Team',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    hero_title: 'Welkom bij Crescent Youth',
    hero_subtitle: 'Wij verbinden jongeren van alle achtergronden met islamitische waarden via educatie, sport en inspirerende activiteiten.',
    hero_cta: 'Bekijk verder',

    stats_youth: 'Actieve jongeren',
    stats_events: 'Evenementen per jaar',
    stats_impact: 'Passie, Engagement, Impact',

    mission_title: 'Onze missie',
    mission_text: 'Crescent Youth is een plek waar jongeren samenkomen om te leren, te groeien en plezier te maken, geïnspireerd door islamitische waarden van respect, solidariteit en verantwoordelijkheid. We geloven dat iedereen welkom is, ongeacht achtergrond, en creëren een veilige en inclusieve omgeving waar je jezelf kan zijn. Met toffe activiteiten zoals workshops, sport, cultuur en uitstappen helpen we jongeren nieuwe skills ontdekken en sterke vriendschappen opbouwen. We zetten in op dialoog, samenwerking en positieve rolmodellen, zodat jongeren weerbaar en zelfverzekerd in het leven staan. Samen bouwen we aan een community die kansen biedt, diversiteit omarmt en waarin jongeren een actieve stem hebben.',

    values_title: 'Kernwaarden',
    values_intro: 'Dit is wat ons drijft: waarden die jongeren verbinden, laten groeien en samen impact maken.',
    value_education_title: 'Educatie',
    value_education_text: 'Leren op een manier die bij jou past! Van workshops tot sport en creatieve projecten – wij geven jongeren de tools om te groeien.',
    value_compass_title: 'Kompas',
    value_compass_text: 'Ons kompas? Islamitische waarden. Ze geven ons richting en helpen ons eerlijk, respectvol en open te blijven.',
    value_connection_title: 'Verbinding',
    value_connection_text: 'Hier vind je jouw crew! Een plek waar diversiteit telt, vriendschappen ontstaan en we samen impact maken.',
    value_integrity_title: 'Integriteit',
    value_integrity_text: 'We houden het echt. Eerlijkheid en transparantie in alles wat we doen – van projecten tot hoe we met elkaar omgaan.',
    value_openness_title: 'Openheid',
    value_openness_text: 'Iedereen hoort erbij. Verschillen maken ons sterker; we creëren ruimte voor dialoog, samenwerking en respect.',

    activities_title: 'Wat doen wij?',
    activities_intro: 'Check wat we doen! Van leren tot sporten en ontdekken, alles om samen te groeien en sterker te staan.',
    activity_education_title: 'Educatie',
    activity_education_text: 'Ontdek nieuwe dingen en boost je skills! Toffe workshops, interactieve sessies en talks die jou verder brengen.',
    activity_sport_title: 'Sport',
    activity_sport_text: 'Beweeg mee! Van voetbal tot coole challenges, sport en fun gaan hier hand in hand.',
    activity_social_title: 'Sociale activiteiten',
    activity_social_text: 'Samen lachen, creatief bezig zijn en nieuwe vrienden maken. Gezellige momenten in onze community.',
    activity_trips_title: 'Trips',
    activity_trips_text: 'Ontdek, beleef, geniet! Onvergetelijke trips en herinneringen die je niet vergeet.',

    team_title: 'Onze crew',
    team_intro: 'Onze crew geeft alles om samen onze missie waar te maken.',
    team_nadir: 'Secretaris',
    team_khalid: 'Coördinator',
    team_mukhtar: 'Bestuurslid',
    team_sharfuddeen: 'IT-specialist',
    team_wassim: 'Financieel',

    faq_title: 'Veelgestelde vragen',
    faq_intro: 'Hier vind je antwoorden op de meest gestelde vragen over Crescent Youth.',
    faq_q1: 'Werken jullie enkel voor moslimjongeren?',
    faq_a1: 'Nee! Iedereen is welkom bij Crescent Youth, ongeacht achtergrond, geloof of afkomst. We zijn geïnspireerd door islamitische waarden zoals respect, solidariteit en verantwoordelijkheid, maar onze deuren staan open voor alle jongeren. Diversiteit maakt onze community net sterker!',
    faq_q2: 'Wat doet Crescent Youth precies?',
    faq_a2: 'We organiseren van alles: workshops, sport, sociale activiteiten en uitstappen. Van voetbal tot citytrips, van creatieve sessies tot inspirerende talks. Er is altijd wel iets dat bij jou past!',
    faq_q3: 'Hoe oud moet ik zijn om mee te doen?',
    faq_a3: 'Crescent Youth richt zich op jongeren tussen 14 en 30 jaar.',
    faq_q4: 'Kost het iets om lid te worden?',
    faq_a4: 'Lidmaatschap kost slechts 10 euro per jaar. Als lid geniet je van voordelen zoals lagere prijzen voor onze events en activiteiten.',
    faq_q5: 'Hoe kan ik meedoen of meer info krijgen?',
    faq_a5: 'Stuur ons een mailtje op info@crescentyouth.be of stuur een DM via Instagram. We horen graag van je!',
    faq_q6: 'Kan ik ook vrijwilliger worden?',
    faq_a6: 'Absoluut. We zijn altijd op zoek naar gemotiveerde mensen die mee willen bouwen aan onze community. Contacteer ons en we bekijken samen de mogelijkheden.',
    faq_q7: 'Waar zijn jullie actief?',
    faq_a7: 'Crescent Youth is gevestigd in Brugge en organiseert activiteiten in en rond de regio.',

    cta_title: 'Word deel van onze community!',
    cta_text: 'Join our crew! Samen leren, connecten en groeien – jouw plek, jouw vibe.',
    cta_button: 'Contacteer ons',

    footer_about: 'Wij verbinden jongeren van alle achtergronden met islamitische waarden via educatie, sport en inspirerende activiteiten.',
    footer_links_title: 'Snelle links',
    footer_home: 'Home',
    footer_mission: 'Missie',
    footer_values: 'Kernwaarden',
    footer_activities: 'Wat doen wij?',
    footer_faq: 'FAQ',
    footer_contact: 'Contact',
    footer_contact_title: 'Contact info',

    cookies_text: 'We gebruiken cookies om jouw ervaring te verbeteren. Door onze site te blijven gebruiken, accepteer je ons',
    cookies_button: 'Akkoord',

    contact_hero_title: 'Neem contact op',
    contact_hero_subtitle: 'Heb je een vraag, idee of wil je samenwerken? Laat van je horen – we reageren zo snel mogelijk.',
    contact_hero_cta: 'Ga naar het formulier',

    contact_email_title: 'Email',
    contact_email_hint: 'We proberen binnen 24–48 uur te reageren.',

    contact_whatsapp_title: 'WhatsApp groepen',
    contact_whatsapp_text: 'Sluit je aan bij onze communitygroepen via WhatsApp:',
    contact_whatsapp_brothers: 'Broeders – WhatsApp groep',
    contact_whatsapp_sisters: 'Zusters – WhatsApp groep',

    contact_social_title: 'Sociale media',
    contact_social_text: 'Volg ons voor activiteiten, updates en community nieuws:',
    contact_social_instagram: 'Instagram – @crescentyouth.be',
    contact_social_tiktok: 'TikTok – @crescentyouth.be',

    contact_form_title: 'Stuur ons een bericht',
    contact_form_subtitle: 'Vul het formulier in en we nemen zo snel mogelijk contact met je op.',

    contact_label_name: 'Naam',
    contact_label_email: 'E-mailadres',
    contact_label_phone: 'Telefoonnummer',
    contact_label_subject: 'Onderwerp',
    contact_label_message: 'Bericht',

    contact_placeholder_name: 'bijv. Ahmed Al-Mansouri',
    contact_placeholder_email: 'bijv. ahmed@example.com',
    contact_placeholder_phone: 'bijv. +32 4xx xx xx xx',
    contact_placeholder_message: 'Schrijf hier je vraag of voorstel...',

    contact_select_default: 'Kies een onderwerp',
    contact_select_general: 'Algemene vraag',
    contact_select_membership: 'Lidmaatschap',
    contact_select_activities: 'Activiteiten',
    contact_select_volunteering: 'Vrijwilligerswerk',
    contact_select_collab: 'Samenwerking',
    contact_select_other: 'Andere',

    contact_button_submit: 'Verstuur bericht'
  },

  en: {
    nav_home: 'Home',
    nav_mission: 'Mission',
    nav_values: 'Core values',
    nav_activities: 'What we do',
    nav_team: 'Team',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    hero_title: 'Welcome to Crescent Youth',
    hero_subtitle: 'We connect youth from all backgrounds with Islamic values through education, sports and inspiring activities.',
    hero_cta: 'Discover more',

    stats_youth: 'Active youth',
    stats_events: 'Events per year',
    stats_impact: 'Passion, Engagement, Impact',

    mission_title: 'Our mission',
    mission_text: 'Crescent Youth is a place where young people come together to learn, grow, and have fun, inspired by Islamic values of respect, solidarity, and responsibility. We believe that everyone is welcome, regardless of background, and we create a safe and inclusive environment where you can truly be yourself. With exciting activities such as workshops, sports, cultural events, and trips, we help young people discover new skills and build strong friendships. We focus on dialogue, collaboration, and positive role models, empowering youth to become resilient and confident in their daily lives. Together, we are building a community that creates opportunities, embraces diversity, and gives young people an active voice.',

    values_title: 'Core values',
    values_intro: 'These values guide us and help young people grow and make impact together.',
    value_education_title: 'Education',
    value_education_text: 'Learning in a way that fits you, from workshops to sports and creative projects.',
    value_compass_title: 'Compass',
    value_compass_text: 'Islamic values give us direction and help us stay fair, respectful and open.',
    value_connection_title: 'Connection',
    value_connection_text: 'A place where friendships grow and diversity is our strength.',
    value_integrity_title: 'Integrity',
    value_integrity_text: 'Honesty and transparency in everything we do.',
    value_openness_title: 'Openness',
    value_openness_text: 'Everyone is welcome and there is room for dialogue and respect.',

    activities_title: 'What we do?',
    activities_intro: 'Take a look at what we do to help young people grow and become stronger together.',
    activity_education_title: 'Education',
    activity_education_text: 'Workshops, interactive sessions and talks that help you move forward.',
    activity_sport_title: 'Sports',
    activity_sport_text: 'From football to fun challenges, sports and fun go together.',
    activity_social_title: 'Social activities',
    activity_social_text: 'Relax, be creative and make new friends in our community.',
    activity_trips_title: 'Trips',
    activity_trips_text: 'Explore, experience, enjoy! Fun trips and unforgettable memories.',

    team_title: 'Our crew',
    team_intro: 'Our crew gives everything to make our mission reality.',
    team_nadir: 'Secretary',
    team_khalid: 'Coordinator',
    team_mukhtar: 'Board member',
    team_sharfuddeen: 'IT specialist',
    team_wassim: 'Finance',

    faq_title: 'Frequently Asked Questions',
    faq_intro: 'Here you can find answers to the most frequently asked questions about Crescent Youth.',
    faq_q1: 'Do you only work with Muslim youth?',
    faq_a1: 'No! Everyone is welcome at Crescent Youth, regardless of background, belief or origin. We are inspired by Islamic values such as respect, solidarity and responsibility, but our doors are open to all young people. Diversity is what makes our community stronger.',
    faq_q2: 'What does Crescent Youth actually do?',
    faq_a2: 'We organise all kinds of things: workshops, sports, social activities and trips. From football to city trips, from creative sessions to inspiring talks, there is always something that fits you.',
    faq_q3: 'How old do I need to be to join?',
    faq_a3: 'Crescent Youth is for young people between 14 and 30 years old.',
    faq_q4: 'Does it cost anything to become a member?',
    faq_a4: 'Membership costs only 10 euros per year. As a member, you enjoy benefits such as lower prices for our events and activities.',
    faq_q5: 'How can I get involved or get more information?',
    faq_a5: 'Send us an email at info@crescentyouth.be or send us a direct message via Instagram. We would love to hear from you.',
    faq_q6: 'Can I also become a volunteer?',
    faq_a6: 'Absolutely. We are always looking for motivated people who want to help build our community. Contact us and we will explore the possibilities together.',
    faq_q7: 'Where are you active?',
    faq_a7: 'Crescent Youth is based in Bruges and organises activities in and around the region.',

    cta_title: 'Become part of our community!',
    cta_text: 'Join our crew! Learn, connect and grow together.',
    cta_button: 'Contact us',

    footer_about: 'We connect youth from all backgrounds with Islamic values through education, sports and inspiring activities.',
    footer_links_title: 'Quick links',
    footer_home: 'Home',
    footer_mission: 'Mission',
    footer_values: 'Core values',
    footer_activities: 'What we do?',
    footer_faq: 'FAQ',
    footer_contact: 'Contact',
    footer_contact_title: 'Contact info',

    cookies_text: 'We use cookies to improve your experience. By continuing to use our site, you accept our cookie policy.',
    cookies_button: 'Accept',

    contact_hero_title: 'Get in touch',
    contact_hero_subtitle: 'Do you have a question, idea or would you like to collaborate? Reach out and we will respond as soon as possible.',
    contact_hero_cta: 'Go to the form',

    contact_email_title: 'Email',
    contact_email_hint: 'We try to respond within 24–48 hours.',

    contact_whatsapp_title: 'WhatsApp groups',
    contact_whatsapp_text: 'Join our community groups via WhatsApp:',
    contact_whatsapp_brothers: 'Brothers – WhatsApp group',
    contact_whatsapp_sisters: 'Sisters – WhatsApp group',

    contact_social_title: 'Social media',
    contact_social_text: 'Follow us for activities, updates and community news:',
    contact_social_instagram: 'Instagram – @crescentyouth.be',
    contact_social_tiktok: 'TikTok – @crescentyouth.be',

    contact_form_title: 'Send us a message',
    contact_form_subtitle: 'Fill in the form and we will get back to you as soon as possible.',

    contact_label_name: 'Name',
    contact_label_email: 'Email address',
    contact_label_phone: 'Phone number',
    contact_label_subject: 'Subject',
    contact_label_message: 'Message',

    contact_placeholder_name: 'e.g. Ahmed Al-Mansouri',
    contact_placeholder_email: 'e.g. ahmed@example.com',
    contact_placeholder_phone: 'e.g. +32 4xx xx xx xx',
    contact_placeholder_message: 'Write your question or proposal here...',

    contact_select_default: 'Choose a subject',
    contact_select_general: 'General question',
    contact_select_membership: 'Membership',
    contact_select_activities: 'Activities',
    contact_select_volunteering: 'Volunteering',
    contact_select_collab: 'Collaboration',
    contact_select_other: 'Other',

    contact_button_submit: 'Send message'
  },

  fr: {
    nav_home: 'Accueil',
    nav_mission: 'Mission',
    nav_values: 'Valeurs',
    nav_activities: 'Ce que nous faisons?',
    nav_team: 'Équipe',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    hero_title: 'Bienvenue chez Crescent Youth',
    hero_subtitle: 'Nous connectons des jeunes de tous horizons avec les valeurs islamiques à travers l’éducation, le sport et des activités inspirantes.',
    hero_cta: 'Découvrir plus',

    stats_youth: 'Jeunes actifs',
    stats_events: 'Événements par an',
    stats_impact: 'Passion, Engagement, Impact',

    mission_title: 'Notre mission',
    mission_text: 'Crescent Youth est un lieu où les jeunes se réunissent pour apprendre, grandir et s’amuser, inspirés par les valeurs islamiques de respect, de solidarité et de responsabilité. Nous croyons que chacun est le bienvenu, quelle que soit son origine, et nous créons un environnement sûr et inclusif où tu peux être toi-même. Avec des activités passionnantes comme des ateliers, du sport, de la culture et des sorties, nous aidons les jeunes à découvrir de nouvelles compétences et à créer des amitiés solides. Nous misons sur le dialogue, la collaboration et des modèles positifs, afin de renforcer la résilience et la confiance des jeunes dans leur quotidien. Ensemble, nous construisons une communauté qui offre des opportunités, valorise la diversité et donne aux jeunes une voix active.',

    values_title: 'Valeurs clés',
    values_intro: 'Nos valeurs rassemblent les jeunes, les font grandir et leur permettent de créer de l’impact ensemble.',
    value_education_title: 'Éducation',
    value_education_text: 'Apprendre d’une manière qui te correspond, avec des ateliers, du sport et des projets créatifs.',
    value_compass_title: 'Boussole',
    value_compass_text: 'Les valeurs islamiques nous donnent une direction et nous aident à rester justes, respectueux et ouverts.',
    value_connection_title: 'Lien',
    value_connection_text: 'Un endroit où les amitiés naissent et où la diversité est une force.',
    value_integrity_title: 'Intégrité',
    value_integrity_text: 'Honnêteté et transparence dans tout ce que nous faisons.',
    value_openness_title: 'Ouverture',
    value_openness_text: 'Tout le monde est le bienvenu; il y a de la place pour le dialogue et le respect.',

    activities_title: 'Ce que nous faisons?',
    activities_intro: 'Découvre ce que nous faisons pour aider les jeunes à grandir et à se renforcer ensemble.',
    activity_education_title: 'Éducation',
    activity_education_text: 'Des ateliers et sessions interactives pour te faire avancer.',
    activity_sport_title: 'Sport',
    activity_sport_text: 'Du football et d’autres défis ludiques pour bouger dans la bonne ambiance.',
    activity_social_title: 'Activités sociales',
    activity_social_text: 'Des moments conviviaux pour créer, rire et se faire de nouveaux amis.',
    activity_trips_title: 'Excursions',
    activity_trips_text: 'Découvrir, vivre, profiter ! Des excursions et des souvenirs inoubliables.',

    team_title: 'Notre équipe',
    team_intro: 'Notre équipe donne tout pour faire vivre notre mission.',
    team_nadir: 'Secrétaire',
    team_khalid: 'Coordinateur',
    team_mukhtar: "Membre du conseil d'administration",
    team_sharfuddeen: 'Spécialiste IT',
    team_wassim: 'Finances',

    faq_title: 'Questions fréquentes',
    faq_intro: 'Tu trouveras ici les réponses aux questions les plus fréquentes sur Crescent Youth.',
    faq_q1: 'Travaillez-vous uniquement pour les jeunes musulmans ?',
    faq_a1: 'Non ! Tout le monde est le bienvenu chez Crescent Youth, peu importe ton origine, ta religion ou ton parcours. Nous nous inspirons des valeurs islamiques comme le respect, la solidarité et la responsabilité, mais nos portes sont ouvertes à tous les jeunes. La diversité rend notre communauté encore plus forte !',
    faq_q2: 'Que fait exactement Crescent Youth ?',
    faq_a2: 'On organise plein de choses : ateliers, sport, activités sociales et sorties. Du foot aux city trips, des sessions créatives aux talks inspirants. Il y a toujours quelque chose pour toi !',
    faq_q3: 'Quel âge faut-il avoir pour participer ?',
    faq_a3: 'Crescent Youth s’adresse aux jeunes entre 14 et 30 ans.',
    faq_q4: 'Est-ce que ça coûte quelque chose de devenir membre ?',
    faq_a4: "L’adhésion coûte seulement 10 euros par an. En tant que membre, tu profites d’avantages comme des prix réduits pour nos événements et activités.",
    faq_q5: 'Comment puis-je participer ou obtenir plus d’infos ?',
    faq_a5: 'Envoie-nous un mail à info@crescentyouth.be ou un DM via Instagram. On est là pour toi !',
    faq_q6: 'Puis-je aussi devenir bénévole ?',
    faq_a6: 'Absolument ! On cherche toujours des personnes motivées pour contribuer à notre communauté. Contacte-nous et on voit ensemble les possibilités.',
    faq_q7: 'Où êtes-vous actifs ?',
    faq_a7: 'Crescent Youth est basé à Bruges et organise des activités dans la région.',

    cta_title: 'Rejoins notre communauté !',
    cta_text: 'Rejoins notre équipe ! Apprendre, connecter et grandir ensemble.',
    cta_button: 'Nous contacter',

    footer_about: 'Nous connectons des jeunes de tous horizons avec les valeurs islamiques à travers l’éducation, le sport et des activités inspirantes.',
    footer_links_title: 'Liens rapides',
    footer_home: 'Accueil',
    footer_mission: 'Mission',
    footer_values: 'Valeurs',
    footer_activities: 'Ce que nous faisons?',
    footer_faq: 'FAQ',
    footer_contact: 'Contact',
    footer_contact_title: 'Infos de contact',

    cookies_text: 'Nous utilisons des cookies pour améliorer ton expérience. En continuant, tu acceptes notre politique de cookies.',
    cookies_button: 'Accepter',

    contact_hero_title: 'Contacte-nous',
    contact_hero_subtitle: 'Tu as une question, une idée ou envie de collaborer ? Écris-nous et nous te répondrons dès que possible.',
    contact_hero_cta: 'Aller au formulaire',

    contact_email_title: 'Email',
    contact_email_hint: 'Nous essayons de répondre dans les 24–48 heures.',

    contact_whatsapp_title: 'Groupes WhatsApp',
    contact_whatsapp_text: 'Rejoins nos groupes communautaires sur WhatsApp :',
    contact_whatsapp_brothers: 'Frères – Groupe WhatsApp',
    contact_whatsapp_sisters: 'Sœurs – Groupe WhatsApp',

    contact_social_title: 'Réseaux sociaux',
    contact_social_text: 'Suis-nous pour des activités, mises à jour et actualités:',
    contact_social_instagram: 'Instagram – @crescentyouth.be',
    contact_social_tiktok: 'TikTok – @crescentyouth.be',

    contact_form_title: 'Envoie-nous un message',
    contact_form_subtitle: 'Remplis le formulaire et nous reviendrons vers toi dès que possible.',

    contact_label_name: 'Nom',
    contact_label_email: 'Adresse e-mail',
    contact_label_phone: 'Numéro de téléphone',
    contact_label_subject: 'Sujet',
    contact_label_message: 'Message',

    contact_placeholder_name: 'ex. Ahmed Al-Mansouri',
    contact_placeholder_email: 'ex. ahmed@example.com',
    contact_placeholder_phone: 'ex. +32 4xx xx xx xx',
    contact_placeholder_message: 'Écris ta question ou ta proposition ici...',

    contact_select_default: 'Choisis un sujet',
    contact_select_general: 'Question générale',
    contact_select_membership: 'Adhésion',
    contact_select_activities: 'Activités',
    contact_select_volunteering: 'Bénévolat',
    contact_select_collab: 'Collaboration',
    contact_select_other: 'Autre',

    contact_button_submit: 'Envoyer le message'
  },

  ar: {
    nav_home: 'الرئيسية',
    nav_mission: 'المهمة',
    nav_values: 'القيم الأساسية',
    nav_activities: 'ماذا نفعل؟',
    nav_team: 'الفريق',
    nav_faq: 'الأسئلة',
    nav_contact: 'اتصل بنا',

    hero_title: 'مرحبًا بكم في كريسنت يوث',
    hero_subtitle: 'نربط الشباب من مختلف الخلفيات بالقيم الإسلامية من خلال التعليم والرياضة والأنشطة الملهمة.',
    hero_cta: 'اكتشف المزيد',

    stats_youth: 'شباب نشطون',
    stats_events: 'فعاليات سنويًا',
    stats_impact: 'شغف، التزام، تأثير',

    mission_title: 'مهمتنا',
    mission_text: 'كريسنت يوث هو مكان يجتمع فيه الشباب للتعلّم والنمو والاستمتاع، بإلهام من القيم الإسلامية.',

    values_title: 'القيم الأساسية',
    values_intro: 'هذه هي القيم التي توجهنا وتساعد الشباب على النمو وصنع الأثر معًا.',
    value_education_title: 'التعليم',
    value_education_text: 'التعلّم بطريقة تناسبك، من الورشات إلى الرياضة والمشاريع الإبداعية.',
    value_compass_title: 'البوصلة',
    value_compass_text: 'القيم الإسلامية تمنحنا الاتجاه وتساعدنا على البقاء عادلين ومحترمين ومنفتحين.',
    value_connection_title: 'الترابط',
    value_connection_text: 'مكان تنمو فيه الصداقات ويكون فيه التنوع مصدر قوة.',
    value_integrity_title: 'النزاهة',
    value_integrity_text: 'الصدق والشفافية في كل ما نقوم به.',
    value_openness_title: 'الانفتاح',
    value_openness_text: 'الجميع مرحب بهم وهناك مساحة للحوار والاحترام.',

    activities_title: 'ماذا نفعل؟',
    activities_intro: 'اكتشف ما نقوم به لمساعدة الشباب على النمو والتقوّي معًا.',
    activity_education_title: 'التعليم',
    activity_education_text: 'ورشات وجلسات تفاعلية ومحاضرات تساعدك على التقدم.',
    activity_sport_title: 'الرياضة',
    activity_sport_text: 'من كرة القدم إلى التحديات الممتعة، الرياضة والمتعة تسيران معًا.',
    activity_social_title: 'الأنشطة الاجتماعية',
    activity_social_text: 'استرخِ، كن مبدعًا، واصنع صداقات جديدة داخل مجتمعنا.',
    activity_trips_title: 'الرحلات',
    activity_trips_text: 'اكتشف، عش، واستمتع! رحلات وذكريات لا تُنسى.',

    team_title: 'فريقنا',
    team_intro: 'فريقنا يبذل كل ما لديه لتحقيق رسالتنا.',
    team_nadir: 'المنسق',
    team_khalid: 'نائب المنسق',
    team_mukhtar: 'عضو مجلس الإدارة',
    team_sharfuddeen: 'أخصائي تكنولوجيا المعلومات',
    team_wassim: 'المالية',

    faq_title: 'الأسئلة المتكررة',
    faq_intro: 'هنا ستجد إجابات عن أكثر الأسئلة شيوعًا حول <span class="brand-ltr">Crescent Youth</span>.',
    faq_q1: 'هل تعملون فقط مع الشباب المسلمين؟',
    faq_a1: 'لا، الجميع مرحب بهم في Crescent Youth بغض النظر عن الخلفية أو المعتقد أو الأصل. نحن مستوحون من القيم الإسلامية مثل الاحترام والتضامن والمسؤولية، لكن أبوابنا مفتوحة لجميع الشباب. التنوع هو ما يجعل مجتمعنا أقوى.',
    faq_q2: 'ماذا تفعل Crescent Youth بالضبط؟',
    faq_a2: 'نحن ننظم العديد من الأنشطة مثل الورشات والرياضة والأنشطة الاجتماعية والرحلات. من كرة القدم إلى الرحلات داخل المدن، ومن الجلسات الإبداعية إلى المحاضرات الملهمة، هناك دائمًا شيء يناسبك.',
    faq_q3: 'كم يجب أن يكون عمري للانضمام؟',
    faq_a3: 'Crescent Youth موجهة للشباب بين 14 و30 سنة.',
    faq_q4: 'هل هناك تكلفة للانضمام كعضو؟',
    faq_a4: 'تكلفة العضوية هي 10 يورو فقط في السنة. وكعضو، تستفيد من مزايا مثل أسعار أقل للفعاليات والأنشطة.',
    faq_q5: 'كيف يمكنني المشاركة أو الحصول على مزيد من المعلومات؟',
    faq_a5: 'أرسل لنا بريدًا إلكترونيًا على info@crescentyouth.be أو رسالة عبر Instagram. يسعدنا التواصل معك.',
    faq_q6: 'هل يمكنني أيضًا أن أصبح متطوعًا؟',
    faq_a6: 'بالتأكيد. نحن دائمًا نبحث عن أشخاص متحمسين يرغبون في المساهمة في بناء مجتمعنا. تواصل معنا وسنستكشف الإمكانيات معًا.',
    faq_q7: 'أين تنشطون؟',
    faq_a7: 'Crescent Youth مقرها في بروج وتنظم أنشطة في المدينة والمناطق المحيطة بها.',

    cta_title: 'كن جزءًا من مجتمعنا!',
    cta_text: 'انضم إلى فريقنا! تعلّم وتواصل وانمُ معنا.',
    cta_button: 'اتصل بنا',

    footer_about: 'نربط الشباب من مختلف الخلفيات بالقيم الإسلامية من خلال التعليم والرياضة والأنشطة الملهمة.',
    footer_links_title: 'روابط سريعة',
    footer_home: 'الرئيسية',
    footer_mission: 'المهمة',
    footer_values: 'القيم الأساسية',
    footer_activities: 'ماذا نفعل؟',
    footer_faq: 'الأسئلة',
    footer_contact: 'اتصل بنا',
    footer_contact_title: 'معلومات التواصل',

    cookies_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. من خلال الاستمرار في استخدام موقعنا، فإنك توافق على سياسة ملفات تعريف الارتباط الخاصة بنا.',
    cookies_button: 'موافق',

    contact_hero_title: 'تواصل معنا',
    contact_hero_subtitle: 'هل لديك سؤال أو فكرة أو ترغب في التعاون؟ تواصل معنا وسنرد عليك في أقرب وقت ممكن.',
    contact_hero_cta: 'اذهب إلى النموذج',

    contact_email_title: 'البريد الإلكتروني',
    contact_email_hint: 'نحاول الرد خلال 24 إلى 48 ساعة.',

    contact_whatsapp_title: 'مجموعات واتساب',
    contact_whatsapp_text: 'انضم إلى مجموعات مجتمعنا عبر واتساب:',
    contact_whatsapp_brothers: 'الإخوة – مجموعة واتساب',
    contact_whatsapp_sisters: 'الأخوات – مجموعة واتساب',

    contact_social_title: 'وسائل التواصل الاجتماعي',
    contact_social_text: 'تابعنا للاطلاع على الأنشطة والتحديثات وأخبار المجتمع:',
    contact_social_instagram: 'إنستغرام – @crescentyouth.be',
    contact_social_tiktok: 'تيك توك – @crescentyouth.be',

    contact_form_title: 'أرسل لنا رسالة',
    contact_form_subtitle: 'املأ النموذج وسنتواصل معك في أقرب وقت ممكن.',

    contact_label_name: 'الاسم',
    contact_label_email: 'البريد الإلكتروني',
    contact_label_phone: 'رقم الهاتف',
    contact_label_subject: 'الموضوع',
    contact_label_message: 'الرسالة',

    contact_placeholder_name: 'مثال: أحمد المنصوري',
    contact_placeholder_email: 'مثال: ahmed@example.com',
    contact_placeholder_phone: 'مثال: +32 4xx xx xx xx',
    contact_placeholder_message: 'اكتب سؤالك أو اقتراحك هنا...',

    contact_select_default: 'اختر موضوعًا',
    contact_select_general: 'سؤال عام',
    contact_select_membership: 'العضوية',
    contact_select_activities: 'الأنشطة',
    contact_select_volunteering: 'التطوع',
    contact_select_collab: 'التعاون',
    contact_select_other: 'أخرى',

    contact_button_submit: 'إرسال الرسالة'
  }
};

const langButtons = document.querySelectorAll('.lang-option');
const i18nElements = document.querySelectorAll('[data-i18n]');
const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
const selectOptions = document.querySelectorAll('[data-i18n-select] option[data-i18n]');

function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) return;

    if (dict[key].includes('<span')) {
      el.innerHTML = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });

  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  selectOptions.forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key]) opt.textContent = dict[key];
  });

  document.documentElement.lang = (lang === 'ar') ? 'ar' : lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  localStorage.setItem('siteLang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const lang = btn.getAttribute('data-lang');
    setLanguage(lang);
  });
});

const storedLang = localStorage.getItem('siteLang') || 'nl';
setLanguage(storedLang);