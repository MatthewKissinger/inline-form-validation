// TODO 

// get countries from rest countries api

fetch(`https://restcountries.com/v2/all`).then(function(res) {
    // console.log(res.json());
    return res.json();
}).then(function(data) {
    console.log(data);
});

// setup up validation functions for each type of input

// DOM Cache
const form = document.getElementsByTagName('form')[0];

const mail = document.querySelector('#mail');
const mailError = document.querySelector('#mail + span.error');

const country = document.querySelector('#country');
const countryError = document.querySelector('#country + span.error');

// generate options tags with the country names from the rest countries api

const zipcode = document.querySelector('#zip');
const zipcodeError = document.querySelector('#zip + span.error');

const password1 = document.querySelector('#pass1');
const password1Error = document.querySelector('#pass1 + span.error');

const password2 = document.querySelector('#pass2');
const password2Error = document.querySelector('#pass2 + span.error');

// Validation Event listeners

mail.addEventListener('input', function() {
    if (mail.validity.valid) {
        // clear the content of the error message
        mailError.textContent = '';
    } else {
        showErrorAll(mail);
    }
})

form.addEventListener('submit', function(e) {
    if (!mail.validity.valid) {
        showErrorAll(mail);
        e.preventDefault();
    }
    
})

// Methods

function showErrorAll(input) {
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
