const scriptURL = "https://script.google.com/macros/s/AKfycbywKrmZXhg3DDQyuhPAIQUBJquBXOYtaUxqn5QSLHw7n1-L9H_QuyhSHKNN9KIG7kE2OA/exec";
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

loadCountryCodes();

const form = document.getElementById("registrationForm");
const loading = document.getElementById("loading");
const submitBtn = document.getElementById("submitBtn");
const dobInput = document.getElementById("dateOfBirth");

const today = new Date();
const minAgeDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
dobInput.max = minAgeDate.toISOString().split("T")[0];

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.(com|be|nl|fr|de|org|net|edu|info)$/i.test(email);
}

function isValidPhone(number) {
    return /^[0-9]{9}$/.test(number);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phoneCode = document.getElementById("phoneCode").value;
    const phone = document.getElementById("phone").value.trim();
    const emergencyPhoneCode = document.getElementById("emergencyPhoneCode").value;
    const emergencyPhone = document.getElementById("emergencyPhone").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address, for example name@gmail.com");
        return;
    }

    if (!isValidPhone(phone)) {
        alert("Please enter a valid 9-digit phone number, for example 123456789");
        return;
    }

    if (!isValidPhone(emergencyPhone)) {
        alert("Please enter a valid 9-digit emergency phone number, for example 123456789");
        return;
    }

    if (!dateOfBirth || new Date(dateOfBirth) > minAgeDate) {
        alert("You must be at least 15 years old to register.");
        return;
    }

    loading.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    const formData = new FormData();

    formData.append("firstName", document.getElementById("firstName").value.trim());
    formData.append("lastName", document.getElementById("lastName").value.trim());
    formData.append("email", email);
    formData.append("phone", phoneCode + " " + phone);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", document.getElementById("gender").value);
    formData.append("membership", document.getElementById("membership").value);
    formData.append("emergencyName", document.getElementById("emergencyName").value.trim());
    formData.append("emergencyPhone", emergencyPhoneCode + " " + emergencyPhone);
    formData.append("interests", document.getElementById("interests").value.trim());
    formData.append("gdprConsent", document.getElementById("gdprConsent").checked ? "Yes" : "No");
    formData.append("termsConsent", document.getElementById("termsConsent").checked ? "Yes" : "No");
    formData.append("photoConsent", document.getElementById("photoConsent").checked ? "Yes" : "No");

    fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    })
        .then(function() {
            window.location.href = sumUpLink;
        })
        .catch(function() {
            alert("Something went wrong. Please try again.");
            loading.style.display = "none";
            submitBtn.disabled = false;
            submitBtn.textContent = "Proceed to Payment";
        });
});