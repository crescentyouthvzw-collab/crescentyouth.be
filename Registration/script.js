const scriptURL = "https://script.google.com/macros/s/AKfycbywKrmZXhg3DDQyuhPAIQUBJquBXOYtaUxqn5QSLHw7n1-L9H_QuyhSHKNN9KIG7kE2OA/exec";
const sumUpLink = "https://pay.sumup.com/b2c/QEK4YNPB";

const countries = [
    { name: "Belgium", code: "+32" },
    { name: "Netherlands", code: "+31" },
    { name: "France", code: "+33" },
    { name: "Germany", code: "+49" },
    { name: "United Kingdom", code: "+44" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Canada", code: "+1" },
    { name: "United States", code: "+1" },
    { name: "India", code: "+91" },
    { name: "Pakistan", code: "+92" },
    { name: "Bangladesh", code: "+880" },
    { name: "Morocco", code: "+212" },
    { name: "Turkey", code: "+90" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "United Arab Emirates", code: "+971" }
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