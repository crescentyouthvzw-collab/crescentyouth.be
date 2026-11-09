const pages = {
  sport: {
    icon: 'fas fa-running',
    nl: {
      title: 'Sport', meta: 'Bekijk komende en afgelopen sportactiviteiten van Crescent Youth vzw in Brugge.',
      hero_title: 'Sport', hero_subtitle: 'Beweeg mee met sportieve activiteiten die jongeren verbinden, energie geven en teamwork versterken.',
      options_intro: 'Kies hieronder tussen komende sportactiviteiten en afgelopen sportmomenten.', upcoming_card_text: 'Bekijk komende sportactiviteiten, toernooien en actieve challenges.', past_card_text: 'Bekijk sportactiviteiten die al hebben plaatsgevonden.',
      upcoming_intro: 'THE SPORTS ARENA vindt plaats op zondag 29 november in Buurtcentrum Xaverianen. Bekijk het programma en de registratie-informatie.', empty_text: 'Nieuwe sportactiviteiten worden binnenkort hier geplaatst.', upcoming_item_badge: '29 november 2026', upcoming_item_text: 'Zondag 29 november 2026 · 13:00–16:30 · Buurtcentrum Xaverianen, Sint-Michiels, Brugge.', upcoming_item_link: 'Bekijk eventdetails',
      past_badge: 'Afgelopen sportevent', past_item_title: 'Sportmoment', past_item_text: 'Een paar sfeerbeelden van onze voetbalmomenten! Wil je erbij zijn?',
      past_item_cta: 'Volg ons op Instagram en join onze WhatsApp-groepen om mee te doen aan de volgende activiteit. Kom voetballen, ontmoet nieuwe mensen en maak deel uit van Crescent Youth.',
      cta_text: 'Nieuwe sportevents worden hier en via onze sociale kanalen gedeeld.'
    },
    en: {
      title: 'Sport', meta: 'View upcoming and past sports activities from Crescent Youth vzw in Bruges.',
      hero_title: 'Sport', hero_subtitle: 'Join sports activities that connect young people, build energy and strengthen teamwork.',
      options_intro: 'Choose between upcoming sports activities and past sports moments.', upcoming_card_text: 'View upcoming sports activities, tournaments and active challenges.', past_card_text: 'View sports activities that have already taken place.',
      upcoming_intro: 'THE SPORTS ARENA takes place on Sunday 29 November at Buurtcentrum Xaverianen. See the programme and registration details.', empty_text: 'New sports activities will be posted here soon.', upcoming_item_badge: '29 November 2026', upcoming_item_text: 'Sunday 29 November 2026 · 13:00–16:30 · Buurtcentrum Xaverianen, Sint-Michiels, Bruges.', upcoming_item_link: 'View event details',
      past_badge: 'Past sport event', past_item_title: 'Sports moment', past_item_text: 'A few snapshots from our football moments! Want to join us?',
      past_item_cta: 'Follow us on Instagram and join our WhatsApp groups to take part in our next activity. Come play football, meet new people and be part of Crescent Youth.',
      cta_text: 'New sports events will be shared here and through our social channels.'
    },
    fr: {
      title: 'Sport', meta: 'Découvre les activités sportives à venir et passées de Crescent Youth vzw à Bruges.',
      hero_title: 'Sport', hero_subtitle: 'Participe à des activités sportives qui rassemblent les jeunes, donnent de l’énergie et renforcent l’esprit d’équipe.',
      options_intro: 'Choisis entre les activités sportives à venir et les moments sportifs passés.', upcoming_card_text: 'Découvre les activités sportives, tournois et défis à venir.', past_card_text: 'Découvre les activités sportives qui ont déjà eu lieu.',
      upcoming_intro: 'THE SPORTS ARENA aura lieu le dimanche 29 novembre au Buurtcentrum Xaverianen. Découvre le programme et les informations d’inscription.', empty_text: 'Les nouvelles activités sportives seront bientôt publiées ici.', upcoming_item_badge: '29 novembre 2026', upcoming_item_text: 'Dimanche 29 novembre 2026 · 13:00–16:30 · Buurtcentrum Xaverianen, Sint-Michiels, Bruges.', upcoming_item_link: 'Voir les détails',
      past_badge: 'Événement sportif passé', past_item_title: 'Moment sportif', past_item_text: 'Quelques photos de nos moments de football ! Envie de nous rejoindre ?',
      past_item_cta: 'Suivez-nous sur Instagram et rejoignez nos groupes WhatsApp pour participer à nos prochaines activités. Venez jouer au football, rencontrer de nouvelles personnes et faire partie de Crescent Youth.',
      cta_text: 'Les nouveaux événements sportifs seront partagés ici et via nos réseaux sociaux.'
    },
    ar: {
      title: 'الرياضة', meta: 'اطلع على الأنشطة الرياضية القادمة والسابقة لشبيبة الهلال في بروج.',
      hero_title: 'الرياضة', hero_subtitle: 'شارك في أنشطة رياضية تجمع الشباب، وتمنحهم الطاقة، وتعزز روح الفريق.',
      options_intro: 'اختر بين الأنشطة الرياضية القادمة واللحظات الرياضية السابقة.', upcoming_card_text: 'اطلع على الأنشطة الرياضية والبطولات والتحديات القادمة.', past_card_text: 'اطلع على الأنشطة الرياضية التي أُقيمت سابقًا.',
      upcoming_intro: 'تُقام فعالية THE SPORTS ARENA يوم الأحد 29 نوفمبر في Buurtcentrum Xaverianen. اطّلع على البرنامج ومعلومات التسجيل.', empty_text: 'سيتم نشر الأنشطة الرياضية الجديدة هنا قريبًا.', upcoming_item_badge: '29 نوفمبر 2026', upcoming_item_text: 'الأحد 29 نوفمبر 2026 · 13:00–16:30 · Buurtcentrum Xaverianen، سينت ميخيلس، بروج.', upcoming_item_link: 'تفاصيل الفعالية',
      past_badge: 'فعالية رياضية سابقة', past_item_title: 'لحظة رياضية', past_item_text: 'بعض الصور من لحظاتنا في كرة القدم! هل ترغب في الانضمام إلينا؟',
      past_item_cta: 'تابعونا على إنستغرام وانضموا إلى مجموعاتنا على واتساب للمشاركة في أنشطتنا القادمة. تعالوا للعب كرة القدم، والتعرّف على أشخاص جدد، وكونوا جزءًا من شباب الهلال.',
      cta_text: 'سيتم نشر الفعاليات الرياضية الجديدة هنا وعبر قنواتنا الاجتماعية.'
    }
  },
  social: {
    icon: 'fas fa-handshake',
    nl: {
      title: 'Sociale activiteiten', meta: 'Bekijk komende en afgelopen sociale activiteiten van Crescent Youth vzw in Brugge.',
      hero_title: 'Sociale activiteiten', hero_subtitle: 'Ontmoet, verbind en geniet van warme communitymomenten waar jongeren elkaar beter leren kennen.',
      options_intro: 'Kies hieronder tussen komende sociale activiteiten en afgelopen communitymomenten.', upcoming_card_text: 'Bekijk komende ontmoetingen, creatieve activiteiten en gezellige communitymomenten.', past_card_text: 'Bekijk sociale activiteiten die al hebben plaatsgevonden.',
      upcoming_intro: 'Er zijn momenteel geen nieuwe sociale activiteiten aangekondigd.', empty_text: 'Nieuwe sociale activiteiten worden binnenkort hier geplaatst.',
      event_kicker: 'Terugblik', past_intro: 'Een terugblik op onze Zusters Iftar van 8 maart in Brugge.',
      past_badge: 'Afgelopen sociaal event', past_item_title: 'Zusters Iftar', past_item_text: 'Op 8 maart kwamen zusters samen in Brugge voor een warme avond van bezinning, creativiteit, gebed en een gezamenlijke iftar.',
      event_date_label: 'Datum', event_date: '8 maart', event_location_label: 'Locatie', event_location: 'Brugge', event_program_label: 'Programma', event_program: 'Lezing, tasbeeh-activiteit, gezamenlijk gebed en iftar',
      view_poster: 'Bekijk de eventposter', view_gallery: 'Bekijk de sfeerbeelden', gallery_kicker: '8 maart • Brugge', gallery_title: 'Sfeerbeelden van de avond', gallery_intro: 'Van de zorgvuldig gedekte tafels en de tasbeeh-activiteit tot de gezamenlijke iftar.', event_details_label: 'Eventdetails', lightbox_label: 'Vergrote foto', lightbox_close: 'Sluit foto',
      cta_text: 'Nieuwe sociale activiteiten worden hier en via onze sociale kanalen gedeeld.'
    },
    en: {
      title: 'Social activities', meta: 'View upcoming and past social activities from Crescent Youth vzw in Bruges.',
      hero_title: 'Social activities', hero_subtitle: 'Meet, connect and enjoy warm community moments where young people get to know each other better.',
      options_intro: 'Choose between upcoming social activities and past community moments.', upcoming_card_text: 'View upcoming meetups, creative activities and warm community moments.', past_card_text: 'View social activities that have already taken place.',
      upcoming_intro: 'No new social activities have been announced yet.', empty_text: 'New social activities will be posted here soon.',
      event_kicker: 'Event recap', past_intro: 'A look back at our Sisters’ Iftar on 8 March in Bruges.',
      past_badge: 'Past social event', past_item_title: 'Sisters’ Iftar', past_item_text: 'On 8 March, sisters came together in Bruges for a warm evening of reflection, creativity, prayer and a shared iftar.',
      event_date_label: 'Date', event_date: '8 March', event_location_label: 'Location', event_location: 'Bruges', event_program_label: 'Programme', event_program: 'Talk, tasbeeh activity, communal prayer and iftar',
      view_poster: 'View the event poster', view_gallery: 'View the photo gallery', gallery_kicker: '8 March • Bruges', gallery_title: 'Moments from the evening', gallery_intro: 'From the carefully prepared tables and tasbeeh activity to the shared iftar.', event_details_label: 'Event details', lightbox_label: 'Enlarged photo', lightbox_close: 'Close photo',
      cta_text: 'New social activities will be shared here and through our social channels.'
    },
    fr: {
      title: 'Activités sociales', meta: 'Découvre les activités sociales à venir et passées de Crescent Youth vzw à Bruges.',
      hero_title: 'Activités sociales', hero_subtitle: 'Rencontre, crée du lien et profite de moments chaleureux où les jeunes apprennent à mieux se connaître.',
      options_intro: 'Choisis entre les activités sociales à venir et les moments communautaires passés.', upcoming_card_text: 'Découvre les rencontres, activités créatives et moments communautaires à venir.', past_card_text: 'Découvre les activités sociales qui ont déjà eu lieu.',
      upcoming_intro: 'Aucune nouvelle activité sociale n’est annoncée pour le moment.', empty_text: 'Les nouvelles activités sociales seront bientôt publiées ici.',
      event_kicker: 'Retour en images', past_intro: 'Retour sur notre Iftar des sœurs du 8 mars à Bruges.',
      past_badge: 'Événement social passé', past_item_title: 'Iftar des sœurs', past_item_text: 'Le 8 mars, des sœurs se sont réunies à Bruges pour une soirée chaleureuse de réflexion, de créativité, de prière et d’iftar partagé.',
      event_date_label: 'Date', event_date: '8 mars', event_location_label: 'Lieu', event_location: 'Bruges', event_program_label: 'Programme', event_program: 'Conférence, activité tasbeeh, prière commune et iftar',
      view_poster: 'Voir l’affiche de l’événement', view_gallery: 'Voir les photos', gallery_kicker: '8 mars • Bruges', gallery_title: 'Moments de la soirée', gallery_intro: 'Des tables soigneusement dressées et de l’activité tasbeeh jusqu’à l’iftar partagé.', event_details_label: 'Détails de l’événement', lightbox_label: 'Photo agrandie', lightbox_close: 'Fermer la photo',
      cta_text: 'Les nouvelles activités sociales seront partagées ici et via nos réseaux sociaux.'
    },
    ar: {
      title: 'الأنشطة الاجتماعية', meta: 'اطلع على الأنشطة الاجتماعية القادمة والسابقة لشبيبة الهلال في بروج.',
      hero_title: 'الأنشطة الاجتماعية', hero_subtitle: 'تعرّف، تواصل، واستمتع بلحظات مجتمعية دافئة يتعرف فيها الشباب على بعضهم أكثر.',
      options_intro: 'اختر بين الأنشطة الاجتماعية القادمة واللحظات المجتمعية السابقة.', upcoming_card_text: 'اطلع على اللقاءات والأنشطة الإبداعية واللحظات المجتمعية القادمة.', past_card_text: 'اطلع على الأنشطة الاجتماعية التي أُقيمت سابقًا.',
      upcoming_intro: 'لا توجد أنشطة اجتماعية جديدة معلنة حاليًا.', empty_text: 'سيتم نشر الأنشطة الاجتماعية الجديدة هنا قريبًا.',
      event_kicker: 'لمحة من الفعالية', past_intro: 'نظرة على إفطار الأخوات الذي أُقيم يوم 8 مارس في بروج.',
      past_badge: 'فعالية اجتماعية سابقة', past_item_title: 'إفطار الأخوات', past_item_text: 'في 8 مارس، اجتمعت الأخوات في بروج لقضاء أمسية دافئة جمعت بين التأمل والإبداع والصلاة والإفطار الجماعي.',
      event_date_label: 'التاريخ', event_date: '8 مارس', event_location_label: 'المكان', event_location: 'بروج', event_program_label: 'البرنامج', event_program: 'محاضرة، نشاط لصنع المسبحة، صلاة جماعية وإفطار',
      view_poster: 'عرض ملصق الفعالية', view_gallery: 'عرض الصور', gallery_kicker: '8 مارس • بروج', gallery_title: 'لقطات من الأمسية', gallery_intro: 'من تجهيز الطاولات بعناية ونشاط صنع المسبحة إلى الإفطار الجماعي.', event_details_label: 'تفاصيل الفعالية', lightbox_label: 'صورة مكبرة', lightbox_close: 'إغلاق الصورة',
      cta_text: 'سيتم نشر الأنشطة الاجتماعية الجديدة هنا وعبر قنواتنا الاجتماعية.'
    }
  },
  trips: {
    icon: 'fas fa-route',
    nl: {
      title: 'Trips', meta: 'Bekijk komende en afgelopen trips van Crescent Youth vzw in Brugge.',
      hero_title: 'Trips', hero_subtitle: 'Ontdek samen nieuwe plaatsen, bouw herinneringen op en beleef uitstappen met de community.',
      options_intro: 'Kies hieronder tussen komende trips en afgelopen uitstappen.', upcoming_card_text: 'Bekijk komende uitstappen, dagtrips en ontdekkingsmomenten.', past_card_text: 'Bekijk trips die al hebben plaatsgevonden.',
      upcoming_intro: 'Er zijn momenteel geen nieuwe trips aangekondigd.', empty_text: 'Nieuwe trips worden binnenkort hier geplaatst.',
      event_kicker: 'Terugblik • 28 februari 2026', past_intro: "Herbeleef onze Road to Ramadan-uitstap met foto's en een video.",
      past_badge: 'Afgelopen trip', past_item_title: 'Road to Ramadan', past_item_text: 'Op 28 februari 2026 gingen we samen op pad voor Road to Ramadan. Van de treinreis en het bezoek aan de moskee tot ontmoetingen en samen eten: een dag vol bezinning, verbondenheid en mooie herinneringen.',
      event_details_label: 'Details van de uitstap', event_date_label: 'Datum', event_date: '28 februari 2026', event_program_label: 'Momenten', event_program: 'Samen reizen, moskeebezoek en ontmoeting',
      watch_video: 'Bekijk de video', view_gallery: "Bekijk de foto's", video_kicker: 'De dag in beeld', video_title: 'Bekijk onze tripvideo', video_intro: 'Een korte terugblik op de reis, de ontmoetingen en de mooie momenten onderweg.', video_label: 'Road to Ramadan - video van de uitstap op 28 februari 2026', video_fallback: 'Je browser ondersteunt deze video niet.',
      gallery_kicker: '28 februari 2026 • Road to Ramadan', gallery_title: 'Sfeerbeelden van de uitstap', gallery_intro: 'Van het vertrek met de trein tot het groepsmoment in de moskee.', lightbox_label: 'Vergrote foto', lightbox_close: 'Sluit foto', gallery_photo_1: 'Open foto van de treinreis', gallery_photo_2: 'Open groepsfoto een', gallery_photo_3: 'Open groepsfoto twee', gallery_photo_4: 'Open groepsfoto drie',
      cta_text: 'Nieuwe trips worden hier en via onze sociale kanalen gedeeld.'
    },
    en: {
      title: 'Trips', meta: 'View upcoming and past trips from Crescent Youth vzw in Bruges.',
      hero_title: 'Trips', hero_subtitle: 'Discover new places together, create memories and experience trips with the community.',
      options_intro: 'Choose between upcoming trips and past outings.', upcoming_card_text: 'View upcoming outings, day trips and discovery moments.', past_card_text: 'View trips that have already taken place.',
      upcoming_intro: 'No new trips have been announced yet.', empty_text: 'New trips will be posted here soon.',
      event_kicker: 'Event recap • 28 February 2026', past_intro: 'Relive our Road to Ramadan outing through photos and video.',
      past_badge: 'Past trip', past_item_title: 'Road to Ramadan', past_item_text: 'On 28 February 2026, we headed out together for Road to Ramadan. From the train journey and mosque visit to conversations and sharing food, it was a day of reflection, connection and good memories.',
      event_details_label: 'Trip details', event_date_label: 'Date', event_date: '28 February 2026', event_program_label: 'Highlights', event_program: 'Travelling together, visiting a mosque and connecting',
      watch_video: 'Watch the video', view_gallery: 'View the photos', video_kicker: 'The day in motion', video_title: 'Watch our trip video', video_intro: 'A short look back at the journey, the people and the moments we shared.', video_label: 'Road to Ramadan - trip video from 28 February 2026', video_fallback: 'Your browser does not support this video.',
      gallery_kicker: '28 February 2026 • Road to Ramadan', gallery_title: 'Moments from the trip', gallery_intro: 'From setting off by train to our group moment at the mosque.', lightbox_label: 'Enlarged photo', lightbox_close: 'Close photo', gallery_photo_1: 'Open photo from the train journey', gallery_photo_2: 'Open first group photo', gallery_photo_3: 'Open second group photo', gallery_photo_4: 'Open third group photo',
      cta_text: 'New trips will be shared here and through our social channels.'
    },
    fr: {
      title: 'Sorties', meta: 'Découvre les sorties à venir et passées de Crescent Youth vzw à Bruges.',
      hero_title: 'Sorties', hero_subtitle: 'Découvre de nouveaux lieux ensemble, crée des souvenirs et vis des sorties avec la communauté.',
      options_intro: 'Choisis entre les sorties à venir et les sorties passées.', upcoming_card_text: 'Découvre les sorties, excursions d’une journée et moments de découverte à venir.', past_card_text: 'Découvre les sorties qui ont déjà eu lieu.',
      upcoming_intro: 'Aucune nouvelle sortie n’est annoncée pour le moment.', empty_text: 'Les nouvelles sorties seront bientôt publiées ici.',
      event_kicker: 'Retour en images • 28 février 2026', past_intro: 'Revivez notre sortie Road to Ramadan en photos et en vidéo.',
      past_badge: 'Sortie passée', past_item_title: 'Road to Ramadan', past_item_text: 'Le 28 février 2026, nous sommes partis ensemble pour Road to Ramadan. Du trajet en train et de la visite de la mosquée aux échanges et au repas partagé : une journée de réflexion, de rencontres et de beaux souvenirs.',
      event_details_label: 'Détails de la sortie', event_date_label: 'Date', event_date: '28 février 2026', event_program_label: 'Moments forts', event_program: 'Voyage en groupe, visite de la mosquée et rencontres',
      watch_video: 'Voir la vidéo', view_gallery: 'Voir les photos', video_kicker: 'La journée en vidéo', video_title: 'Regardez notre vidéo', video_intro: 'Un court souvenir du voyage, des rencontres et des moments partagés.', video_label: 'Road to Ramadan - vidéo de la sortie du 28 février 2026', video_fallback: 'Votre navigateur ne prend pas en charge cette vidéo.',
      gallery_kicker: '28 février 2026 • Road to Ramadan', gallery_title: 'Souvenirs de la sortie', gallery_intro: 'Du départ en train à notre photo de groupe à la mosquée.', lightbox_label: 'Photo agrandie', lightbox_close: 'Fermer la photo', gallery_photo_1: 'Ouvrir la photo du trajet en train', gallery_photo_2: 'Ouvrir la première photo de groupe', gallery_photo_3: 'Ouvrir la deuxième photo de groupe', gallery_photo_4: 'Ouvrir la troisième photo de groupe',
      cta_text: 'Les nouvelles sorties seront partagées ici et via nos réseaux sociaux.'
    },
    ar: {
      title: 'الرحلات', meta: 'اطلع على الرحلات القادمة والسابقة لشبيبة الهلال في بروج.',
      hero_title: 'الرحلات', hero_subtitle: 'اكتشفوا أماكن جديدة معًا، واصنعوا ذكريات جميلة، وعيشوا تجربة الرحلات مع المجتمع.',
      options_intro: 'اختر بين الرحلات القادمة والرحلات السابقة.', upcoming_card_text: 'اطلع على الخرجات والرحلات اليومية ولحظات الاكتشاف القادمة.', past_card_text: 'اطلع على الرحلات التي أُقيمت سابقًا.',
      upcoming_intro: 'لا توجد رحلات جديدة معلنة حاليًا.', empty_text: 'سيتم نشر الرحلات الجديدة هنا قريبًا.',
      event_kicker: 'ذكريات الرحلة • 28 فبراير 2026', past_intro: 'شاهدوا ذكريات رحلة Road to Ramadan من خلال الصور والفيديو.',
      past_badge: 'رحلة سابقة', past_item_title: 'Road to Ramadan', past_item_text: 'في 28 فبراير 2026 خرجنا معًا في رحلة Road to Ramadan. من رحلة القطار وزيارة المسجد إلى اللقاءات وتناول الطعام معًا، كان يومًا مليئًا بالتأمل والتواصل والذكريات الجميلة.',
      event_details_label: 'تفاصيل الرحلة', event_date_label: 'التاريخ', event_date: '28 فبراير 2026', event_program_label: 'أبرز اللحظات', event_program: 'السفر معًا وزيارة المسجد والتعارف',
      watch_video: 'شاهد الفيديو', view_gallery: 'شاهد الصور', video_kicker: 'ملخص اليوم بالفيديو', video_title: 'شاهد فيديو رحلتنا', video_intro: 'لقطات قصيرة من الرحلة واللقاءات واللحظات التي شاركناها.', video_label: 'Road to Ramadan - فيديو رحلة 28 فبراير 2026', video_fallback: 'متصفحك لا يدعم تشغيل هذا الفيديو.',
      gallery_kicker: '28 فبراير 2026 • Road to Ramadan', gallery_title: 'صور من الرحلة', gallery_intro: 'من الانطلاق بالقطار إلى الصورة الجماعية في المسجد.', lightbox_label: 'صورة مكبرة', lightbox_close: 'إغلاق الصورة', gallery_photo_1: 'فتح صورة رحلة القطار', gallery_photo_2: 'فتح الصورة الجماعية الأولى', gallery_photo_3: 'فتح الصورة الجماعية الثانية', gallery_photo_4: 'فتح الصورة الجماعية الثالثة',
      cta_text: 'سيتم نشر الرحلات الجديدة هنا وعبر قنواتنا الاجتماعية.'
    }
  }
};

const common = {
  nl: {
    nav_home: 'Home', nav_activities: 'Activiteiten', nav_events: 'Events', nav_membership: 'Lidmaatschap', nav_donate: 'Doneren', nav_faq: 'FAQ', nav_register: 'Lid worden', nav_contact: 'Contact',
    hero_events: 'Bekijk events', hero_back: 'Terug naar activiteiten', events_title: 'Events', upcoming_title: 'Komende events', past_title: 'Afgelopen events', upcoming_card_title: 'Komende events', past_card_title: 'Afgelopen events', image_later: 'Afbeelding later toevoegen', cta_title: 'Blijf op de hoogte', cta_button: 'Contacteer ons',
    footer_about: 'Wij verbinden jongeren van alle achtergronden met islamitische waarden via educatie, sport en inspirerende activiteiten.', footer_links_title: 'Snelle links', footer_home: 'Home', footer_activities: 'Wat doen wij?', footer_membership: 'Lidmaatschap', footer_contact: 'Contact', footer_contact_title: 'Contact info', footer_terms: 'Algemene voorwaarden', footer_privacy: 'Privacybeleid', footer_cookie: 'Cookiebeleid', footer_top: 'Terug naar boven', footer_rights: 'Alle rechten voorbehouden', cookies_text: 'We gebruiken cookies om jouw ervaring te verbeteren. Door onze site te blijven gebruiken, accepteer je ons', cookies_policy: 'cookiebeleid', cookies_button: 'Akkoord', slideshow_previous: 'Vorige foto', slideshow_next: 'Volgende foto', slideshow_pause: 'Pauzeer slideshow', slideshow_play: 'Start slideshow'
  },
  en: {
    nav_home: 'Home', nav_activities: 'Activities', nav_events: 'Events', nav_membership: 'Membership', nav_donate: 'Donate', nav_faq: 'FAQ', nav_register: 'Join us', nav_contact: 'Contact',
    hero_events: 'View events', hero_back: 'Back to activities', events_title: 'Events', upcoming_title: 'Upcoming events', past_title: 'Past events', upcoming_card_title: 'Upcoming events', past_card_title: 'Past events', image_later: 'Image coming later', cta_title: 'Stay updated', cta_button: 'Contact us',
    footer_about: 'We connect young people from all backgrounds through Islamic values, education, sport and inspiring activities.', footer_links_title: 'Quick links', footer_home: 'Home', footer_activities: 'What we do', footer_membership: 'Membership', footer_contact: 'Contact', footer_contact_title: 'Contact info', footer_terms: 'Terms and conditions', footer_privacy: 'Privacy policy', footer_cookie: 'Cookie policy', footer_top: 'Back to top', footer_rights: 'All rights reserved', cookies_text: 'We use cookies to improve your experience. By continuing to use our site, you accept our', cookies_policy: 'cookie policy', cookies_button: 'Accept', slideshow_previous: 'Previous photo', slideshow_next: 'Next photo', slideshow_pause: 'Pause slideshow', slideshow_play: 'Play slideshow'
  },
  fr: {
    nav_home: 'Accueil', nav_activities: 'Activités', nav_events: 'Événements', nav_membership: 'Adhésion', nav_donate: 'Faire un don', nav_faq: 'FAQ', nav_register: 'Devenir membre', nav_contact: 'Contact',
    hero_events: 'Voir les événements', hero_back: 'Retour aux activités', events_title: 'Événements', upcoming_title: 'Événements à venir', past_title: 'Événements passés', upcoming_card_title: 'Événements à venir', past_card_title: 'Événements passés', image_later: 'Image à ajouter plus tard', cta_title: 'Reste informé', cta_button: 'Contacte-nous',
    footer_about: 'Nous rassemblons des jeunes de tous horizons autour de valeurs islamiques, de l’éducation, du sport et d’activités inspirantes.', footer_links_title: 'Liens rapides', footer_home: 'Accueil', footer_activities: 'Ce que nous faisons', footer_membership: 'Adhésion', footer_contact: 'Contact', footer_contact_title: 'Contact', footer_terms: 'Conditions générales', footer_privacy: 'Politique de confidentialité', footer_cookie: 'Politique relative aux cookies', footer_top: 'Retour en haut', footer_rights: 'Tous droits réservés', cookies_text: 'Nous utilisons des cookies pour améliorer ton expérience. En continuant à utiliser notre site, tu acceptes notre', cookies_policy: 'politique relative aux cookies', cookies_button: 'Accepter', slideshow_previous: 'Photo précédente', slideshow_next: 'Photo suivante', slideshow_pause: 'Mettre le diaporama en pause', slideshow_play: 'Lancer le diaporama'
  },
  ar: {
    nav_home: 'الرئيسية', nav_activities: 'الأنشطة', nav_events: 'الفعاليات', nav_membership: 'العضوية', nav_donate: 'تبرع', nav_faq: 'الأسئلة الشائعة', nav_register: 'انضم إلينا', nav_contact: 'اتصل بنا',
    hero_events: 'عرض الفعاليات', hero_back: 'العودة إلى الأنشطة', events_title: 'الفعاليات', upcoming_title: 'الفعاليات القادمة', past_title: 'الفعاليات السابقة', upcoming_card_title: 'الفعاليات القادمة', past_card_title: 'الفعاليات السابقة', image_later: 'سيتم إضافة الصورة لاحقًا', cta_title: 'ابقَ على اطلاع', cta_button: 'تواصل معنا',
    footer_about: 'نربط الشباب من مختلف الخلفيات بالقيم الإسلامية من خلال التعليم والرياضة والأنشطة الملهمة.', footer_links_title: 'روابط سريعة', footer_home: 'الرئيسية', footer_activities: 'ماذا نفعل؟', footer_membership: 'العضوية', footer_contact: 'اتصل بنا', footer_contact_title: 'معلومات التواصل', footer_terms: 'الشروط والأحكام', footer_privacy: 'سياسة الخصوصية', footer_cookie: 'سياسة ملفات تعريف الارتباط', footer_top: 'العودة إلى الأعلى', footer_rights: 'جميع الحقوق محفوظة', cookies_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستخدامك للموقع فإنك توافق على', cookies_policy: 'سياسة ملفات تعريف الارتباط', cookies_button: 'موافق', slideshow_previous: 'الصورة السابقة', slideshow_next: 'الصورة التالية', slideshow_pause: 'إيقاف عرض الشرائح مؤقتًا', slideshow_play: 'تشغيل عرض الشرائح'
  }
};

const pageName = document.body.dataset.page || 'sport';
const pageData = pages[pageName] || pages.sport;
const langButtons = document.querySelectorAll('.lang-option');
const i18nElements = document.querySelectorAll('[data-i18n]');
const i18nAriaElements = document.querySelectorAll('[data-i18n-aria]');
const metaDescription = document.querySelector('meta[name="description"]');
const galleryTranslations = {
  "Jongeren tijdens een sportactiviteit van Crescent Youth": {
    "en": "Young people at a Crescent Youth sports activity",
    "fr": "Des jeunes lors d’une activité sportive de Crescent Youth",
    "ar": "شباب خلال نشاط رياضي لشبيبة الهلال"
  },
  "Jongeren verzamelen zich tijdens een zaalvoetbalactiviteit": {
    "en": "Young people gather during a futsal activity",
    "fr": "Des jeunes se rassemblent lors d’une activité de futsal",
    "ar": "شباب يجتمعون خلال نشاط لكرة القدم داخل الصالة"
  },
  "Twee spelers overleggen op het veld": {
    "en": "Two players talk on the court",
    "fr": "Deux joueurs discutent sur le terrain",
    "ar": "لاعبان يتحدثان في الملعب"
  },
  "Speler kijkt geconcentreerd naar het veld": {
    "en": "A player looks intently at the court",
    "fr": "Un joueur regarde attentivement le terrain",
    "ar": "لاعب ينظر إلى الملعب بتركيز"
  },
  "Spelers nemen rust langs de zijlijn": {
    "en": "Players take a break on the sidelines",
    "fr": "Des joueurs se reposent sur le bord du terrain",
    "ar": "لاعبون يستريحون على جانب الملعب"
  },
  "Speler volgt aandachtig de wedstrijd": {
    "en": "A player watches the match closely",
    "fr": "Un joueur suit attentivement le match",
    "ar": "لاعب يتابع المباراة باهتمام"
  },
  "Twee teamgenoten met een arm om elkaar heen": {
    "en": "Two teammates with their arms around each other",
    "fr": "Deux coéquipiers se tiennent par les épaules",
    "ar": "زميلان في الفريق يضعان ذراعيهما على كتفي بعضهما"
  },
  "Teamgenoten moedigen elkaar aan": {
    "en": "Teammates encourage one another",
    "fr": "Des coéquipiers s’encouragent",
    "ar": "زملاء الفريق يشجعون بعضهم"
  },
  "Drie jongeren langs de zijlijn": {
    "en": "Three young people on the sidelines",
    "fr": "Trois jeunes au bord du terrain",
    "ar": "ثلاثة شباب على جانب الملعب"
  },
  "Poster van de Zusters Iftar bijeenkomst op 8 maart in Brugge": {
    "en": "Poster for the Sisters’ Iftar on 8 March in Bruges",
    "fr": "Affiche de l’iftar des sœurs du 8 mars à Bruges",
    "ar": "ملصق إفطار الأخوات يوم 8 مارس في بروج"
  },
  "Feestelijk gedekte tafels voor de Zusters Iftar": {
    "en": "Festive table settings for the Sisters’ Iftar",
    "fr": "Tables dressées pour l’iftar des sœurs",
    "ar": "طاولات مزينة لإفطار الأخوات"
  },
  "Plaats aan tafel met een dadel en ramadankaart": {
    "en": "A place setting with a date and a Ramadan card",
    "fr": "Un couvert avec une datte et une carte de Ramadan",
    "ar": "مكان على الطاولة مع تمرة وبطاقة رمضان"
  },
  "Kralen en materialen voor de tasbeeh-activiteit": {
    "en": "Beads and materials for the prayer-bead activity",
    "fr": "Perles et matériel pour l’atelier de fabrication de chapelets",
    "ar": "خرز ومواد لنشاط صنع المسابح"
  },
  "Uitgebreid iftarbuffet met warme gerechten": {
    "en": "An iftar buffet with a variety of hot dishes",
    "fr": "Buffet d’iftar avec plusieurs plats chauds",
    "ar": "بوفيه إفطار يضم أطباقًا ساخنة متنوعة"
  },
  "Ramadan Kareem plaatskaart met dadel": {
    "en": "A Ramadan Kareem place card with a date",
    "fr": "Marque-place Ramadan Kareem avec une datte",
    "ar": "بطاقة مكان مكتوب عليها رمضان كريم مع تمرة"
  },
  "Gezamenlijke iftar aan een sfeervol verlichte tafel": {
    "en": "A shared iftar at a warmly lit table",
    "fr": "Iftar partagé autour d’une table éclairée",
    "ar": "إفطار جماعي حول طاولة مضاءة"
  },
  "Gasten die gerechten opscheppen aan het iftarbuffet": {
    "en": "Guests serving themselves at the iftar buffet",
    "fr": "Des convives se servent au buffet d’iftar",
    "ar": "ضيوف يملؤون أطباقهم من بوفيه الإفطار"
  },
  "Kleurrijke selectie salades en warme gerechten": {
    "en": "A colourful selection of salads and hot dishes",
    "fr": "Sélection colorée de salades et de plats chauds",
    "ar": "تشكيلة ملونة من السلطات والأطباق الساخنة"
  },
  "Close-up van het verzorgde iftarbuffet": {
    "en": "Close-up of the iftar buffet",
    "fr": "Gros plan du buffet d’iftar",
    "ar": "لقطة مقربة لبوفيه الإفطار"
  },
  "Brood, salades en warme gerechten bij de gezamenlijke iftar": {
    "en": "Bread, salads and hot dishes at the shared iftar",
    "fr": "Pain, salades et plats chauds lors de l’iftar partagé",
    "ar": "خبز وسلطات وأطباق ساخنة في الإفطار الجماعي"
  },
  "Deelnemers van de Road to Ramadan-uitstap samen in de moskee": {
    "en": "Road to Ramadan participants together in the mosque",
    "fr": "Participants à la sortie Road to Ramadan réunis dans la mosquée",
    "ar": "المشاركون في رحلة Road to Ramadan مجتمعون في المسجد"
  },
  "Twee deelnemers tijdens de treinreis": {
    "en": "Two participants during the train journey",
    "fr": "Deux participants pendant le trajet en train",
    "ar": "مشاركان خلال رحلة القطار"
  },
  "Groepsfoto van de deelnemers in de moskee": {
    "en": "Group photo of participants in the mosque",
    "fr": "Photo de groupe des participants dans la mosquée",
    "ar": "صورة جماعية للمشاركين في المسجد"
  },
  "Tweede groepsfoto in de moskee": {
    "en": "Second group photo in the mosque",
    "fr": "Deuxième photo de groupe dans la mosquée",
    "ar": "الصورة الجماعية الثانية في المسجد"
  },
  "Derde groepsfoto in de moskee": {
    "en": "Third group photo in the mosque",
    "fr": "Troisième photo de groupe dans la mosquée",
    "ar": "الصورة الجماعية الثالثة في المسجد"
  }
};
const galleryDescriptions = Array.from(document.images)
  .filter(image => Object.hasOwn(galleryTranslations, image.alt))
  .map(image => [image, image.alt]);
let currentLanguage = localStorage.getItem('siteLang') || 'nl';

function dictionaryFor(lang) {
  return { ...common[lang], ...pageData[lang] };
}

function setLanguage(lang) {
  const dict = dictionaryFor(lang);
  i18nElements.forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  i18nAriaElements.forEach(el => {
    const key = el.dataset.i18nAria;
    if (dict[key]) el.setAttribute('aria-label', dict[key]);
  });
  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  document.documentElement.lang = lang === 'ar' ? 'ar' : lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = `${dict.title} | Crescent Youth`;
  if (metaDescription && dict.meta) metaDescription.setAttribute('content', dict.meta);
  const slideLabel = { nl: 'Toon foto', en: 'Show photo', fr: 'Afficher la photo', ar: 'عرض الصورة' };
  document.querySelectorAll('.hero-slide-dot').forEach((dot, index) =>
    dot.setAttribute('aria-label', (slideLabel[lang] || slideLabel.nl) + ' ' + (index + 1)));
  const closeLabel = { nl: 'Sluit foto', en: 'Close photo', fr: 'Fermer la photo', ar: 'إغلاق الصورة' };
  document.querySelector('.lightbox-close')?.setAttribute('aria-label', closeLabel[lang] || closeLabel.nl);
  for (const [image, original] of galleryDescriptions) {
    image.alt = galleryTranslations[original][lang] || original;
  }
  currentLanguage = lang;
  localStorage.setItem('siteLang', lang);
}

const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');
if (mobileMenu && mainNav) {
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || mobileMenu.getAttribute('aria-expanded') !== 'true') return;
    mobileMenu.click();
    mobileMenu.focus();
  });
  mobileMenu.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('#nav-links a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-expanded', 'false');
  }));
}

window.addEventListener('scroll', () => document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50));
document.querySelector('.to-top')?.addEventListener('click', event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

const animatedEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (animatedEls.length && 'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveal-enabled');
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    obs.unobserve(entry.target);
  }), { threshold: .18, rootMargin: '0px 0px -40px 0px' });
  animatedEls.forEach(el => observer.observe(el));
}

langButtons.forEach(btn => btn.addEventListener('click', event => {
  event.preventDefault();
  setLanguage(btn.dataset.lang);
}));

setLanguage(currentLanguage);

const heroSlideshow = document.querySelector('.hero-slideshow');
const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.hero-slide-dot'));
const heroPrevious = document.querySelector('.hero-slide-prev');
const heroNext = document.querySelector('.hero-slide-next');
const heroToggle = document.querySelector('.hero-slide-toggle');

if (heroSlideshow && heroSlides.length > 1) {
  const hero = heroSlideshow.closest('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let slideshowTimer;
  let slideshowPaused = reduceMotion;
  let slideshowHovered = false;
  let slideshowFocused = false;

  const showHeroSlide = index => {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const stopHeroSlideshow = () => {
    window.clearInterval(slideshowTimer);
    slideshowTimer = undefined;
  };

  const startHeroSlideshow = () => {
    stopHeroSlideshow();
    if (slideshowPaused || slideshowHovered || slideshowFocused || document.hidden) return;
    slideshowTimer = window.setInterval(() => showHeroSlide(activeSlide + 1), 6000);
  };

  const updateHeroToggle = () => {
    if (!heroToggle) return;
    const dictionary = dictionaryFor(currentLanguage);
    heroToggle.setAttribute('aria-pressed', slideshowPaused ? 'true' : 'false');
    heroToggle.setAttribute('aria-label', slideshowPaused ? dictionary.slideshow_play : dictionary.slideshow_pause);
    heroToggle.dataset.i18nAria = slideshowPaused ? 'slideshow_play' : 'slideshow_pause';
    const icon = heroToggle.querySelector('i');
    icon?.classList.toggle('fa-pause', !slideshowPaused);
    icon?.classList.toggle('fa-play', slideshowPaused);
  };

  const selectHeroSlide = index => {
    showHeroSlide(index);
    startHeroSlideshow();
  };

  heroPrevious?.addEventListener('click', () => selectHeroSlide(activeSlide - 1));
  heroNext?.addEventListener('click', () => selectHeroSlide(activeSlide + 1));
  heroDots.forEach(dot => dot.addEventListener('click', () => selectHeroSlide(Number(dot.dataset.slide))));
  heroToggle?.addEventListener('click', () => {
    slideshowPaused = !slideshowPaused;
    updateHeroToggle();
    startHeroSlideshow();
  });
  hero?.addEventListener('mouseenter', () => {
    slideshowHovered = true;
    stopHeroSlideshow();
  });
  hero?.addEventListener('mouseleave', () => {
    slideshowHovered = false;
    startHeroSlideshow();
  });
  hero?.addEventListener('focusin', () => {
    slideshowFocused = true;
    stopHeroSlideshow();
  });
  hero?.addEventListener('focusout', event => {
    if (!hero.contains(event.relatedTarget)) {
      slideshowFocused = false;
      startHeroSlideshow();
    }
  });
  document.addEventListener('visibilitychange', startHeroSlideshow);

  showHeroSlide(0);
  updateHeroToggle();
  startHeroSlideshow();
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

if (lightbox && lightboxImage) {
  document.querySelectorAll('.gallery-item, .event-poster').forEach(item => {
    item.addEventListener('click', () => {
      const thumbnail = item.querySelector('img');
      lightboxImage.src = item.dataset.full || thumbnail?.src || '';
      lightboxImage.alt = thumbnail?.alt || '';
      lightbox.showModal();
    });
  });

  lightboxClose?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    lightboxImage.removeAttribute('src');
    lightboxImage.alt = '';
  });
}

