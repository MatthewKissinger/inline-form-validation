// TODO 



// setup up validation functions for each type of input

// DOM Cache
const form = document.getElementsByTagName('form')[0];

const mail = document.querySelector('#mail');
const mailError = document.querySelector('#mail + span.error');

const country = document.querySelector('#country');
const countryError = document.querySelector('#country + span.error');

const zipcode = document.querySelector('#zip');
const zipcodeError = document.querySelector('#zip + span.error');

const password1 = document.querySelector('#pass1');
const password1Error = document.querySelector('#pass1 + span.error');

const password2 = document.querySelector('#pass2');
const password2Error = document.querySelector('#pass2 + span.error');

// get countries from rest countries api

fetch(`https://restcountries.com/v2/all`).then(function(res) {
    return res.json();
}).then(function(data) {
    initializeCountries(data);
}).catch(function(err) {
    console.log("Error: ", err);
});

// Validation Event listeners

mail.addEventListener('input', function() {
    if (mail.validity.valid) {
        // clear the content of the error message
        mailError.textContent = '';
    } else {
        showEmailError(mail);
    }
});

country.addEventListener('focusout', function() {
    showCountryError();
});

country.addEventListener('change', function() {
    showCountryError();
})

zipcode.addEventListener('input', function() {
    // console.log(zipcode.validity);
    if (zipcode.validity.valid) {
        zipcodeError.textContent = '';
    } else {
        showZipcodeError(zipcode);
    }
})

password1.addEventListener('input', function() {
    if (password1.validity.valid) {
        password1Error.textContent = '';
    } else {
        showPass1Error();
    }
});

password2.addEventListener('input', function() {
    if (password1.value === password2.value) {
        password2Error.textContent = '';
        password2.classList.add('valid');
        password2.classList.remove('invalid');
    } else {
        showPass2Error();
    }
})

form.addEventListener('submit', function(e) {
    // test for email input validity, if valid submit form
    if (!mail.validity.valid) {
        showEmailError(mail);
        e.preventDefault();
    }

    if (!country.classList.contains('valid')) {
        showCountryError();
        e.preventDefault();
    }

    if (!zipcode.validity.valid) {
        showZipcodeError(zipcode);
        e.preventDefault();
    }

    if (!password1.validity.valid) {
        showPass1Error();
        e.preventDefault();
    }

    if (!password2.classList.contains('valid')) {
        showPass2Error();
        e.preventDefault();
    }
    
});

// Methods

function initializeCountries(data) {
    data.forEach((item) => {
        let option = document.createElement('option');
        option.setAttribute('value', item.name);
        option.innerText = item.name;

        country.appendChild(option);
    })
}

function showEmailError(input) {
    if (input.validity.valueMissing) {
        input.nextElementSibling.textContent = `You need to enter an ${input.type}`;
    } else if (input.validity.typeMismatch) {
        input.nextElementSibling.textContent = `Please enter a valid ${input.type}`;
    } else if (input.validity.tooShort) {
        input.nextElementSibling.textContent = `${input.type} should be at least ${input.minLength} characters`;
    } else if (input.validity.patternMismatch) {
        input.nextElementSibling.textContent = `Please enter a valid ${input.type}`;
    }
}

function showCountryError() {
    if (country.value === 'default') {
        countryError.textContent = 'Please select a country';
        country.classList.add('invalid');
        country.classList.remove('valid');
    } else {
        countryError.textContent = '';
        country.classList.add('valid');
        country.classList.remove('invalid');
    }
}

function showZipcodeError(input) {
    if (input.validity.valueMissing) {
        input.nextElementSibling.textContent = `Do not leave input blank`;
    } else if (input.validity.patternMismatch) {
        input.nextElementSibling.textContent = `Please enter a valid zipcode`;
    }
}

function showPass1Error() {
    if (password1.validity.valueMissing) {
        password1Error.textContent = 'Cannot leave input blank';
    } else if (password1.validity.patternMismatch) {
        password1Error.textContent = 'Entered must match the specifications below';
    }
}

function showPass2Error() {
    if (password2.validity.valueMissing) {
        password2Error.textContent = 'Cannot leave input blank';
        password2.classList.add('invalid');
        password2.classList.remove('valid');
    } else if (password1.value !== password2.value) {
        password2Error.textContent = "Passwords do not match";
        password2.classList.add('invalid');
        password2.classList.remove('valid');
    } 
    // else if (password1.value === password2.value) {
    //     password2Error.textContent = '';
    //     password2.classList.remove('invalid');
    //     password2.classList.add('valid');
    // }

    console.log(password1.value);
    console.log(password2.value);
}
