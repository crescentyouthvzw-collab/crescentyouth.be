const scriptURL = "https://script.google.com/macros/s/AKfycbxSYZxinNx1YGXWFUq2ir-28Zir5bu-IxtQ50KSbigZbeOWq2kk9maJXuGDqnpRHxHa/exec";
const sumUpLink = "https://pay.sumup.com/b2c/QEK4YNPB";

const countries = [
    { name: "Afghanistan", code: "+93", region: "AF" },
    { name: "Albania", code: "+355", region: "AL" },
    { name: "Algeria", code: "+213", region: "DZ" },
    { name: "Andorra", code: "+376", region: "AD" },
    { name: "Angola", code: "+244", region: "AO" },
    { name: "Argentina", code: "+54", region: "AR" },
    { name: "Armenia", code: "+374", region: "AM" },
    { name: "Australia", code: "+61", region: "AU" },
    { name: "Austria", code: "+43", region: "AT" },
    { name: "Azerbaijan", code: "+994", region: "AZ" },
    { name: "Bahamas", code: "+1-242", region: "BS" },
    { name: "Bahrain", code: "+973", region: "BH" },
    { name: "Bangladesh", code: "+880", region: "BD" },
    { name: "Barbados", code: "+1-246", region: "BB" },
    { name: "Belarus", code: "+375", region: "BY" },
    { name: "Belgium", code: "+32", region: "BE" },
    { name: "Belize", code: "+501", region: "BZ" },
    { name: "Benin", code: "+229", region: "BJ" },
    { name: "Bhutan", code: "+975", region: "BT" },
    { name: "Bolivia", code: "+591", region: "BO" },
    { name: "Bosnia and Herzegovina", code: "+387", region: "BA" },
    { name: "Botswana", code: "+267", region: "BW" },
    { name: "Brazil", code: "+55", region: "BR" },
    { name: "Brunei", code: "+673", region: "BN" },
    { name: "Bulgaria", code: "+359", region: "BG" },
    { name: "Burkina Faso", code: "+226", region: "BF" },
    { name: "Burundi", code: "+257", region: "BI" },
    { name: "Cambodia", code: "+855", region: "KH" },
    { name: "Cameroon", code: "+237", region: "CM" },
    { name: "Canada", code: "+1", region: "CA" },
    { name: "Cape Verde", code: "+238", region: "CV" },
    { name: "Central African Republic", code: "+236", region: "CF" },
    { name: "Chad", code: "+235", region: "TD" },
    { name: "Chile", code: "+56", region: "CL" },
    { name: "China", code: "+86", region: "CN" },
    { name: "Colombia", code: "+57", region: "CO" },
    { name: "Comoros", code: "+269", region: "KM" },
    { name: "Congo", code: "+242", region: "CG" },
    { name: "Costa Rica", code: "+506", region: "CR" },
    { name: "Croatia", code: "+385", region: "HR" },
    { name: "Cuba", code: "+53", region: "CU" },
    { name: "Cyprus", code: "+357", region: "CY" },
    { name: "Czech Republic", code: "+420", region: "CZ" },
    { name: "Denmark", code: "+45", region: "DK" },
    { name: "Djibouti", code: "+253", region: "DJ" },
    { name: "Dominica", code: "+1-767", region: "DM" },
    { name: "Dominican Republic", code: "+1-809", region: "DO" },
    { name: "Ecuador", code: "+593", region: "EC" },
    { name: "Egypt", code: "+20", region: "EG" },
    { name: "El Salvador", code: "+503", region: "SV" },
    { name: "Equatorial Guinea", code: "+240", region: "GQ" },
    { name: "Eritrea", code: "+291", region: "ER" },
    { name: "Estonia", code: "+372", region: "EE" },
    { name: "Ethiopia", code: "+251", region: "ET" },
    { name: "Fiji", code: "+679", region: "FJ" },
    { name: "Finland", code: "+358", region: "FI" },
    { name: "France", code: "+33", region: "FR" },
    { name: "Gabon", code: "+241", region: "GA" },
    { name: "Gambia", code: "+220", region: "GM" },
    { name: "Georgia", code: "+995", region: "GE" },
    { name: "Germany", code: "+49", region: "DD" },
    { name: "Ghana", code: "+233", region: "GH" },
    { name: "Greece", code: "+30", region: "GR" },
    { name: "Grenada", code: "+1-473", region: "GD" },
    { name: "Guatemala", code: "+502", region: "GT" },
    { name: "Guinea", code: "+224", region: "GN" },
    { name: "Guyana", code: "+592", region: "GY" },
    { name: "Haiti", code: "+509", region: "HT" },
    { name: "Honduras", code: "+504", region: "HN" },
    { name: "Hungary", code: "+36", region: "HU" },
    { name: "Iceland", code: "+354", region: "IS" },
    { name: "India", code: "+91", region: "IN" },
    { name: "Indonesia", code: "+62", region: "ID" },
    { name: "Iran", code: "+98", region: "IR" },
    { name: "Iraq", code: "+964", region: "IQ" },
    { name: "Ireland", code: "+353", region: "IE" },
    { name: "Israel", code: "+972", region: "IL" },
    { name: "Italy", code: "+39", region: "IT" },
    { name: "Jamaica", code: "+1-876", region: "JM" },
    { name: "Japan", code: "+81", region: "JP" },
    { name: "Jordan", code: "+962", region: "JO" },
    { name: "Kazakhstan", code: "+7", region: "KZ" },
    { name: "Kenya", code: "+254", region: "KE" },
    { name: "Kuwait", code: "+965", region: "KW" },
    { name: "Kyrgyzstan", code: "+996", region: "KG" },
    { name: "Laos", code: "+856", region: "LA" },
    { name: "Latvia", code: "+371", region: "LV" },
    { name: "Lebanon", code: "+961", region: "LB" },
    { name: "Lesotho", code: "+266", region: "LS" },
    { name: "Liberia", code: "+231", region: "LR" },
    { name: "Libya", code: "+218", region: "LY" },
    { name: "Liechtenstein", code: "+423", region: "LI" },
    { name: "Lithuania", code: "+370", region: "LT" },
    { name: "Luxembourg", code: "+352", region: "LU" },
    { name: "Madagascar", code: "+261", region: "MG" },
    { name: "Malawi", code: "+265", region: "MW" },
    { name: "Malaysia", code: "+60", region: "MY" },
    { name: "Maldives", code: "+960", region: "MV" },
    { name: "Mali", code: "+223", region: "ML" },
    { name: "Malta", code: "+356", region: "MT" },
    { name: "Mauritania", code: "+222", region: "MR" },
    { name: "Mauritius", code: "+230", region: "MU" },
    { name: "Mexico", code: "+52", region: "MX" },
    { name: "Moldova", code: "+373", region: "MD" },
    { name: "Monaco", code: "+377", region: "MC" },
    { name: "Mongolia", code: "+976", region: "MN" },
    { name: "Montenegro", code: "+382", region: "ME" },
    { name: "Morocco", code: "+212", region: "MA" },
    { name: "Mozambique", code: "+258", region: "MZ" },
    { name: "Myanmar", code: "+95", region: "MM" },
    { name: "Namibia", code: "+264", region: "NA" },
    { name: "Nepal", code: "+977", region: "NP" },
    { name: "Netherlands", code: "+31", region: "NL" },
    { name: "New Zealand", code: "+64", region: "NZ" },
    { name: "Nicaragua", code: "+505", region: "NI" },
    { name: "Niger", code: "+227", region: "NE" },
    { name: "Nigeria", code: "+234", region: "NG" },
    { name: "North Korea", code: "+850", region: "KP" },
    { name: "Norway", code: "+47", region: "NO" },
    { name: "Oman", code: "+968", region: "OM" },
    { name: "Pakistan", code: "+92", region: "PK" },
    { name: "Panama", code: "+507", region: "PA" },
    { name: "Papua New Guinea", code: "+675", region: "PG" },
    { name: "Paraguay", code: "+595", region: "PY" },
    { name: "Peru", code: "+51", region: "PE" },
    { name: "Philippines", code: "+63", region: "PH" },
    { name: "Poland", code: "+48", region: "PL" },
    { name: "Portugal", code: "+351", region: "PT" },
    { name: "Qatar", code: "+974", region: "QA" },
    { name: "Romania", code: "+40", region: "RO" },
    { name: "Russia", code: "+7", region: "RU" },
    { name: "Rwanda", code: "+250", region: "RW" },
    { name: "Saudi Arabia", code: "+966", region: "SA" },
    { name: "Senegal", code: "+221", region: "SN" },
    { name: "Serbia", code: "+381", region: "CS" },
    { name: "Seychelles", code: "+248", region: "SC" },
    { name: "Sierra Leone", code: "+232", region: "SL" },
    { name: "Singapore", code: "+65", region: "SG" },
    { name: "Slovakia", code: "+421", region: "SK" },
    { name: "Slovenia", code: "+386", region: "SI" },
    { name: "Somalia", code: "+252", region: "SO" },
    { name: "South Africa", code: "+27", region: "ZA" },
    { name: "South Korea", code: "+82", region: "KR" },
    { name: "Spain", code: "+34", region: "ES" },
    { name: "Sri Lanka", code: "+94", region: "LK" },
    { name: "Sudan", code: "+249", region: "SD" },
    { name: "Sweden", code: "+46", region: "SE" },
    { name: "Switzerland", code: "+41", region: "CH" },
    { name: "Syria", code: "+963", region: "SY" },
    { name: "Taiwan", code: "+886", region: "TW" },
    { name: "Tajikistan", code: "+992", region: "TJ" },
    { name: "Tanzania", code: "+255", region: "TZ" },
    { name: "Thailand", code: "+66", region: "TH" },
    { name: "Tunisia", code: "+216", region: "TN" },
    { name: "Turkey", code: "+90", region: "TR" },
    { name: "Turkmenistan", code: "+993", region: "TM" },
    { name: "Uganda", code: "+256", region: "UG" },
    { name: "Ukraine", code: "+380", region: "UA" },
    { name: "United Arab Emirates", code: "+971", region: "AE" },
    { name: "United Kingdom", code: "+44", region: "GB" },
    { name: "United States", code: "+1", region: "US" },
    { name: "Uruguay", code: "+598", region: "UY" },
    { name: "Uzbekistan", code: "+998", region: "UZ" },
    { name: "Venezuela", code: "+58", region: "VE" },
    { name: "Vietnam", code: "+84", region: "VD" },
    { name: "Yemen", code: "+967", region: "YD" },
    { name: "Zambia", code: "+260", region: "ZM" },
    { name: "Zimbabwe", code: "+263", region: "RH" }
];

function loadCountryCodes() {
    const phoneCode = document.getElementById("phoneCode");
    const emergencyPhoneCode = document.getElementById("emergencyPhoneCode");

    if (!phoneCode || !emergencyPhoneCode) return;

    countries.forEach(country => {
        const option1 = document.createElement("option");
        option1.value = country.code;
        option1.dataset.region = country.region;
        option1.dataset.countryName = country.name;
        option1.textContent = `${country.name} (${country.code})`;

        const option2 = option1.cloneNode(true);

        phoneCode.appendChild(option1);
        emergencyPhoneCode.appendChild(option2);
    });

    function translateCountries() {
        if (!Intl.DisplayNames) return;
        const locale = document.documentElement.lang || "nl";
        const names = new Intl.DisplayNames(locale, { type: "region" });
        for (const select of [phoneCode, emergencyPhoneCode]) {
            for (const option of select.options) {
                if (!option.dataset.region) continue;
                const country = names.of(option.dataset.region) || option.dataset.countryName;
                option.textContent = country + " (" + option.value + ")";
            }
        }
    }
    translateCountries();
    new MutationObserver(translateCountries).observe(document.documentElement, {
        attributes: true, attributeFilter: ["lang"]
    });

    phoneCode.value = "+32";
    emergencyPhoneCode.value = "+32";
}

function cleanPhoneCode(code) {
    return code.replace("+", "00").replace(/-/g, "");
}

const errorMessages = {
    nl: {
        email: "Gelieve een geldig e-mailadres in te vullen (bijv. naam@gmail.com).",
        phone: "Gelieve een geldig telefoonnummer in te vullen (minstens 9 cijfers).",
        emergencyPhone: "Gelieve een geldig noodtelefoonnummer in te vullen.",
        age: "Je moet minstens 15 jaar oud zijn om je te registreren.",
        duplicate: "Dit e-mailadres of telefoonnummer is al gebruikt voor een lidmaatschapsaanvraag. Contacteer ons om verder te gaan.",
        error: "Er liep iets mis. Probeer het opnieuw of contacteer ons.",
        processing: "Bezig met verwerken... even geduld",
        proceed: "Doorgaan naar betaling"
    },
    en: {
        email: "Please enter a valid email address (e.g. name@gmail.com).",
        phone: "Please enter a valid phone number (at least 9 digits).",
        emergencyPhone: "Please enter a valid emergency contact phone number.",
        age: "You must be at least 15 years old to register.",
        duplicate: "This email address or phone number was already used for a membership application. Contact us to continue.",
        error: "Something went wrong. Please try again or contact us.",
        processing: "Processing... Please wait",
        proceed: "Proceed to Payment"
    },
    fr: {
        email: "Veuillez entrer une adresse e-mail valide (ex. nom@gmail.com).",
        phone: "Veuillez entrer un numéro de téléphone valide (au moins 9 chiffres).",
        emergencyPhone: "Veuillez entrer un numéro de téléphone d'urgence valide.",
        age: "Vous devez avoir au moins 15 ans pour vous inscrire.",
        duplicate: "Cette adresse e-mail ou ce numéro a déjà été utilisé pour une demande d’adhésion. Contacte-nous pour continuer.",
        error: "Une erreur s'est produite. Veuillez réessayer ou nous contacter.",
        processing: "Traitement en cours... merci de patienter",
        proceed: "Continuer vers le paiement"
    },
    ar: {
        email: "يرجى إدخال بريد إلكتروني صحيح (مثال: name@gmail.com).",
        phone: "يرجى إدخال رقم هاتف صحيح (9 أرقام على الأقل).",
        emergencyPhone: "يرجى إدخال رقم هاتف صحيح لجهة اتصال الطوارئ.",
        age: "يجب أن يكون عمرك 15 عامًا على الأقل للتسجيل.",
        duplicate: "استُخدم هذا البريد الإلكتروني أو رقم الهاتف في طلب عضوية سابق. تواصل معنا للمتابعة.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا.",
        processing: "جارٍ المعالجة... يرجى الانتظار",
        proceed: "المتابعة إلى الدفع"
    }
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(number) {
    return /^[0-9]{4,14}$/.test(number);
}

document.addEventListener("DOMContentLoaded", function () {
    loadCountryCodes();

    const form = document.getElementById("registrationForm");
    const loading = document.getElementById("loading");
    const submitBtn = document.getElementById("submitBtn");
    const dobInput = document.getElementById("dateOfBirth");

    if (!form || !loading || !submitBtn || !dobInput) return;

    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    dobInput.max = `${minAgeDate.getFullYear()}-${String(minAgeDate.getMonth() + 1).padStart(2, '0')}-${String(minAgeDate.getDate()).padStart(2, '0')}`;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const phoneCode = document.getElementById("phoneCode").value;
        const phone = document.getElementById("phone").value.trim().replace(/[().\s-]/g, '');
        const emergencyPhoneCode = document.getElementById("emergencyPhoneCode").value;
        const emergencyPhone = document.getElementById("emergencyPhone").value.trim().replace(/[().\s-]/g, '');
        const dateOfBirth = document.getElementById("dateOfBirth").value;

        const currentLang = localStorage.getItem("siteLang") || "nl";
        const msg = (errorMessages[currentLang] || errorMessages.nl);

        if (!isValidEmail(email)) {
            alert(msg.email);
            return;
        }

        if (!isValidPhone(phone)) {
            alert(msg.phone);
            return;
        }

        if (!isValidPhone(emergencyPhone)) {
            alert(msg.emergencyPhone);
            return;
        }

        if (!dateOfBirth || dateOfBirth > dobInput.max) {
            alert(msg.age);
            return;
        }

        loading.style.display = "block";
        submitBtn.disabled = true;
        submitBtn.textContent = msg.processing;

        const formData = new FormData();

        formData.append("firstName", document.getElementById("firstName").value.trim());
        formData.append("lastName", document.getElementById("lastName").value.trim());
        formData.append("email", email);
        formData.append("phone", cleanPhoneCode(phoneCode) + " " + phone);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("gender", document.getElementById("gender").value);
        formData.append("membership", document.getElementById("membership").value);
        formData.append("emergencyName", document.getElementById("emergencyName").value.trim());
        formData.append("emergencyPhone", cleanPhoneCode(emergencyPhoneCode) + " " + emergencyPhone);
        formData.append("interests", document.getElementById("interests").value.trim());
        formData.append("gdprConsent", document.getElementById("gdprConsent").checked ? "Yes" : "No");
        formData.append("termsConsent", document.getElementById("termsConsent").checked ? "Yes" : "No");
        formData.append("photoConsent", document.getElementById("photoConsent").checked ? "Yes" : "No");

        fetch(scriptURL, {
            method: "POST",
            body: formData
        })
            .then(async function (response) {
                if (!response.ok) throw new Error('Registration request failed.');
                const status = (await response.text()).trim();
                if (status === 'Duplicate') {
                    alert(msg.duplicate);
                    loading.style.display = "none";
                    submitBtn.disabled = false;
                    submitBtn.textContent = msg.proceed;
                    return;
                }
                if (status !== 'Success') throw new Error('Registration was not saved.');
                window.location.href = sumUpLink;
            })
            .catch(function () {
                const currentLang = localStorage.getItem("siteLang") || "nl";
                const msg = (errorMessages[currentLang] || errorMessages.nl);
                alert(msg.error);
                loading.style.display = "none";
                submitBtn.disabled = false;
                submitBtn.textContent = msg.proceed;
            });
    });
});
