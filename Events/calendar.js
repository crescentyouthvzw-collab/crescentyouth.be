// Edit /Events/events.json to announce an event; see EVENTS_HOWTO.md.
// Registration buttons appear only for future events with registrationOpen = true.
(() => {
  'use strict';

  const labels = {
    nl: {
      previous: 'Vorige maand', next: 'Volgende maand', dates: 'Evenementendatums',
      legend: 'Datum met een evenement', upcoming: 'Komende evenementen',
      schedule: 'Wat staat er gepland?', chosen: 'Evenementen op',
      noneUpcoming: 'Er zijn momenteel geen nieuwe evenementen aangekondigd. Kom binnenkort nog eens kijken!',
      noneDay: 'Op deze datum zijn geen evenementen gepland.',
      loading: 'Evenementen laden...', error: 'De kalender kon niet worden geladen. Probeer het later opnieuw.',
      pastEmpty: 'Er zijn nog geen afgelopen evenementen toegevoegd.',
      details: 'Bekijk details', recap: 'Bekijk de terugblik', register: 'Schrijf je in',
      education: 'Educatie', sports: 'Sport', social: 'Sociaal', trips: 'Trips',
      today: 'Vandaag', eventCount: 'evenement(en)'
    },
    en: {
      previous: 'Previous month', next: 'Next month', dates: 'Event dates',
      legend: 'Date with an event', upcoming: 'Upcoming events',
      schedule: 'What is coming up?', chosen: 'Events on',
      noneUpcoming: 'No new events have been announced yet. Check back soon!',
      noneDay: 'No events are scheduled for this date.',
      loading: 'Loading events...', error: 'The calendar could not be loaded. Please try again later.',
      pastEmpty: 'No past events have been added yet.',
      details: 'View details', recap: 'View event recap', register: 'Register now',
      education: 'Education', sports: 'Sports', social: 'Social', trips: 'Trips',
      today: 'Today', eventCount: 'event(s)'
    },
    fr: {
      previous: 'Mois précédent', next: 'Mois suivant', dates: 'Dates des événements',
      legend: 'Date avec événement', upcoming: 'Événements à venir',
      schedule: 'À venir', chosen: 'Événements du',
      noneUpcoming: 'Aucun nouvel événement annoncé pour le moment. Reviens bientôt !',
      noneDay: 'Aucun événement prévu à cette date.',
      loading: 'Chargement des événements...', error: 'Impossible de charger le calendrier. Réessaie plus tard.',
      pastEmpty: 'Aucun événement passé ajouté pour le moment.',
      details: 'Voir les détails', recap: 'Voir le récapitulatif', register: "S'inscrire",
      education: 'Éducation', sports: 'Sport', social: 'Social', trips: 'Sorties',
      today: "Aujourd'hui", eventCount: 'événement(s)'
    },
    ar: {
      previous: 'الشهر السابق', next: 'الشهر التالي', dates: 'مواعيد الفعاليات',
      legend: 'تاريخ توجد فيه فعالية', upcoming: 'الفعاليات القادمة',
      schedule: 'ما الفعاليات القادمة؟', chosen: 'فعاليات يوم',
      noneUpcoming: 'لم يتم الإعلان عن فعاليات جديدة حاليًا. عد قريبًا!',
      noneDay: 'لا توجد فعاليات مجدولة في هذا التاريخ.',
      loading: 'جارٍ تحميل الفعاليات...', error: 'تعذر تحميل التقويم. يرجى المحاولة لاحقًا.',
      pastEmpty: 'لم تُضف فعاليات سابقة بعد.',
      details: 'عرض التفاصيل', recap: 'عرض تفاصيل الفعالية السابقة', register: 'سجّل الآن',
      education: 'التعليم', sports: 'الرياضة', social: 'اجتماعي', trips: 'الرحلات',
      today: 'اليوم', eventCount: 'فعالية'
    }
  };
  const locales = { nl: 'nl-BE', en: 'en-GB', fr: 'fr-BE', ar: 'ar-BE' };
  const $ = id => document.getElementById(id);
  const monthTitle = $('calendar-month-title');
  const weekdays = $('calendar-weekdays');
  const days = $('calendar-days');
  const eventsList = $('calendar-events-list');
  const pastList = $('calendar-past-list');
  if (!monthTitle || !days || !eventsList || !pastList) return;

  const now = new Date();
  const today = formatISO(now);
  const state = { year: now.getFullYear(), month: now.getMonth(), selectedDate: null, events: [], failed: false };

  function formatISO(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  function parseDate(dateStr) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || '')) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d, 12);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
  }
  function language() {
    const stored = localStorage.getItem('siteLang') || 'nl';
    return labels[stored] ? stored : 'nl';
  }
  function translate(key) { return labels[language()][key] || labels.nl[key] || key; }
  function dateLabel(iso, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
    const date = parseDate(iso);
    return date ? new Intl.DateTimeFormat(locales[language()], options).format(date) : iso;
  }
  function make(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
  }
  function safeLink(raw) {
    if (typeof raw !== 'string' || !raw.trim()) return null;
    try {
      const url = new URL(raw, window.location.origin);
      if (url.protocol === 'https:' || (url.origin === window.location.origin && url.protocol === 'http:')) {
        return url.href;
      }
    } catch (_) { /* Invalid URL: no action button. */ }
    return null;
  }
  function eventTitle(event) {
    return typeof event.title === 'string' ? event.title : (event.title?.[language()] || event.title?.nl || 'Crescent Youth');
  }
  function isPast(event) { return event.date < today; }
  let arenaRegistrationOpen = false;
  function createEventCard(event) {
    const article = make('article', 'calendar-event');
    const meta = make('div', 'calendar-event-meta');
    meta.append(make('span', 'calendar-category', translate(event.category)));
    meta.append(make('span', 'calendar-event-date', dateLabel(event.date)));
    article.append(meta, make('h4', '', eventTitle(event)));

    const info = make('div', 'calendar-event-details');
    if (event.time) {
      const time = make('span');
      const icon = make('i', 'far fa-clock'); icon.setAttribute('aria-hidden', 'true');
      const range = document.createElement('bdi');
      range.dir = 'ltr';
      range.textContent = event.time;
      time.append(icon, range);
      info.append(time);
    }
    if (event.location) {
      const location = make('span');
      const icon = make('i', 'fas fa-location-dot'); icon.setAttribute('aria-hidden', 'true');
      location.append(icon, document.createTextNode(event.location));
      info.append(location);
    }
    article.append(info);

    const open = event.id === 'the-sports-arena-2026' ? arenaRegistrationOpen : event.registrationOpen === true;
    const canRegister = !isPast(event) && open && safeLink(event.registrationUrl);
    const destination = canRegister || safeLink(event.detailsUrl);
    if (destination) {
      const actionLabel = canRegister ? 'register' : (isPast(event) ? 'recap' : 'details');
      const link = make('a', 'calendar-action', translate(actionLabel));
      link.href = destination;
      if (destination.startsWith('https://') && new URL(destination).origin !== location.origin) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      article.append(link);
    }
    return article;
  }
  function renderWeekdays() {
    weekdays.replaceChildren();
    for (let i = 0; i < 7; i++) {
      const date = new Date(2026, 0, 5 + i, 12); // Monday first
      weekdays.append(make('span', '', new Intl.DateTimeFormat(locales[language()], { weekday: 'short' }).format(date)));
    }
  }
  function renderCalendar() {
    const { year, month, selectedDate } = state;
    const monthDate = new Date(year, month, 1, 12);
    monthTitle.textContent = new Intl.DateTimeFormat(locales[language()], { month: 'long', year: 'numeric' }).format(monthDate);
    $('calendar-prev').setAttribute('aria-label', translate('previous'));
    $('calendar-next').setAttribute('aria-label', translate('next'));
    days.setAttribute('aria-label', translate('dates'));
    $('calendar-legend-label').textContent = translate('legend');
    days.replaceChildren();
    const firstDay = (monthDate.getDay() + 6) % 7; // Monday = 0
    const monthLength = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const blank = make('span', 'calendar-day-placeholder'); blank.setAttribute('aria-hidden', 'true'); days.append(blank);
    }
    for (let day = 1; day <= monthLength; day++) {
      const iso = formatISO(new Date(year, month, day));
      const dailyEvents = state.events.filter(e => e.date === iso);
      const button = make('button', 'calendar-day', String(day));
      button.type = 'button';
      button.setAttribute('aria-label', `${dateLabel(iso)}${dailyEvents.length ? `, ${dailyEvents.length} ${translate('eventCount')}` : ''}`);
      button.setAttribute('aria-pressed', String(selectedDate === iso));
      if (iso === today) button.classList.add('is-today');
      if (dailyEvents.length) { button.classList.add('has-event'); button.append(make('span', 'event-dot')); }
      if (selectedDate === iso) button.classList.add('is-selected');
      button.addEventListener('click', () => {
        state.selectedDate = state.selectedDate === iso ? null : iso;
        renderCalendar(); renderEventList();
      });
      days.append(button);
    }
  }
  function showEmpty(parent, message) { parent.replaceChildren(make('p', 'calendar-empty', message)); }
  function renderEventList() {
    $('calendar-list-label').textContent = state.selectedDate ? dateLabel(state.selectedDate) : translate('upcoming');
    $('calendar-selection-title').textContent = state.selectedDate ? translate('chosen') + ' ' + dateLabel(state.selectedDate) : translate('schedule');
    if (state.failed) return showEmpty(eventsList, translate('error'));
    const filtered = state.selectedDate
      ? state.events.filter(e => e.date === state.selectedDate)
      : state.events.filter(e => !isPast(e));
    if (!filtered.length) return showEmpty(eventsList, translate(state.selectedDate ? 'noneDay' : 'noneUpcoming'));
    eventsList.replaceChildren(...filtered.map(createEventCard));
  }
  function renderPast() {
    if (state.failed) return showEmpty(pastList, translate('error'));
    const past = state.events.filter(isPast).sort((a, b) => b.date.localeCompare(a.date));
    if (!past.length) return showEmpty(pastList, translate('pastEmpty'));
    pastList.replaceChildren(...past.map(createEventCard));
  }
  function render() { renderWeekdays(); renderCalendar(); renderEventList(); renderPast(); }

  $('calendar-prev').addEventListener('click', () => {
    const d = new Date(state.year, state.month - 1, 1);
    state.year = d.getFullYear(); state.month = d.getMonth(); state.selectedDate = null; render();
  });
  $('calendar-next').addEventListener('click', () => {
    const d = new Date(state.year, state.month + 1, 1);
    state.year = d.getFullYear(); state.month = d.getMonth(); state.selectedDate = null; render();
  });
  document.querySelectorAll('.lang-option').forEach(button => button.addEventListener('click', render));

  render();
  const arenaEndpoint = window.SPORTS_ARENA_CONFIG?.googleScriptUrl;
  if (arenaEndpoint) {
    fetch(arenaEndpoint, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(status => {
        arenaRegistrationOpen = status?.registrationOpen === true && status?.membershipPricing === true;
        renderEventList();
      })
      .catch(() => { /* Keep the event details link available. */ });
  }
  fetch('/Events/events.json', { cache: 'no-store' })
    .then(response => { if (!response.ok) throw new Error('Failed to load events'); return response.json(); })
    .then(data => {
      state.events = (Array.isArray(data.events) ? data.events : [])
        .filter(e => e && parseDate(e.date) && typeof e.category === 'string')
        .sort((a, b) => a.date.localeCompare(b.date));
      render();
    })
    .catch(() => { state.failed = true; render(); });
})();
