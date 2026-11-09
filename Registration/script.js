const scriptURL = "https://script.google.com/macros/s/AKfycbxSYZxinNx1YGXWFUq2ir-28Zir5bu-IxtQ50KSbigZbeOWq2kk9maJXuGDqnpRHxHa/exec";
const sumUpLink = "https://pay.sumup.com/b2c/QEK4YNPB";

const countries = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahamas", code: "+1-242" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Barbados", code: "+1-246" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" },
    { name: "Benin", code: "+229" },
    { name: "Bhutan", code: "+975" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" },
    { name: "Brazil", code: "+55" },
    { name: "Brunei", code: "+673" },
    { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" },
    { name: "Burundi", code: "+257" },
    { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" },
    { name: "Canada", code: "+1" },
    { name: "Cape Verde", code: "+238" },
    { name: "Central African Republic", code: "+236" },
    { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Comoros", code: "+269" },
    { name: "Congo", code: "+242" },
    { name: "Costa Rica", code: "+506" },
    { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" },
    { name: "Dominica", code: "+1-767" },
    { name: "Dominican Republic", code: "+1-809" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Equatorial Guinea", code: "+240" },
    { name: "Eritrea", code: "+291" },
    { name: "Estonia", code: "+372" },
    { name: "Ethiopia", code: "+251" },
    { name: "Fiji", code: "+679" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Greece", code: "+30" },
    { name: "Grenada", code: "+1-473" },
    { name: "Guatemala", code: "+502" },
    { name: "Guinea", code: "+224" },
    { name: "Guyana", code: "+592" },
    { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Jamaica", code: "+1-876" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kuwait", code: "+965" },
    { name: "Kyrgyzstan", code: "+996" },
    { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" },
    { name: "Libya", code: "+218" },
    { name: "Liechtenstein", code: "+423" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Madagascar", code: "+261" },
    { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" },
    { name: "Maldives", code: "+960" },
    { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" },
    { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" },
    { name: "Mexico", code: "+52" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" },
    { name: "Montenegro", code: "+382" },
    { name: "Morocco", code: "+212" },
    { name: "Mozambique", code: "+258" },
    { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" },
    { name: "North Korea", code: "+850" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Panama", code: "+507" },
    { name: "Papua New Guinea", code: "+675" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Rwanda", code: "+250" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" },
    { name: "Seychelles", code: "+248" },
    { name: "Sierra Leone", code: "+232" },
    { name: "Singapore", code: "+65" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sudan", code: "+249" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Tajikistan", code: "+992" },
    { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Turkmenistan", code: "+993" },
    { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Uzbekistan", code: "+998" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Yemen", code: "+967" },
    { name: "Zambia", code: "+260" },
    { name: "Zimbabwe", code: "+263" }
];

function loadCountryCodes() {
    const phoneCode = document.getElementById("phoneCode");
    const emergencyPhoneCode = document.getElementById("emergencyPhoneCode");

    if (!phoneCode || !emergencyPhoneCode) return;

    countries.forEach(country => {
        const option1 = document.createElement("option");
        option1.value = country.code;
        option1.textContent = `${country.name} (${country.code})`;

        const option2 = option1.cloneNode(true);

        phoneCode.appendChild(option1);
        emergencyPhoneCode.appendChild(option2);
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
