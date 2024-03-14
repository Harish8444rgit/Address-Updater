//signupValidation
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('signup');

  form.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form fields
    var usernameInput = document.getElementById('username');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('Password');

    // Define regular expressions for validation
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    // Perform validation
    var isUsernameValid = usernameRegex.test(usernameInput.value);
    var isEmailValid = emailRegex.test(emailInput.value);
    var isPasswordValid = passwordRegex.test(passwordInput.value);

    // Display validation messages
    if (!isUsernameValid) {
      usernameInput.classList.add('is-invalid');
    } else {
      usernameInput.classList.remove('is-invalid');
    }

    if (!isEmailValid) {
      emailInput.classList.add('is-invalid');
    } else {
      emailInput.classList.remove('is-invalid');
    }

    if (!isPasswordValid) {
      passwordInput.classList.add('is-invalid');
    } else {
      passwordInput.classList.remove('is-invalid');
    }

    // If all fields are valid, submit the form
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      form.submit();
    }
  });
});
// loginValidation
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('login');

  form.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form fields
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('Password');

    // Define regular expressions for validation
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
    var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    // Perform validation
    var isUsernameValid = usernameRegex.test(usernameInput.value);
    var isPasswordValid = passwordRegex.test(passwordInput.value);

    // Display validation messages
    if (!isUsernameValid) {
      usernameInput.classList.add('is-invalid');
    } else {
      usernameInput.classList.remove('is-invalid');
    }
    if (!isPasswordValid) {
      passwordInput.classList.add('is-invalid');
    } else {
      passwordInput.classList.remove('is-invalid');
    }

    // If all fields are valid, submit the form
    if (isUsernameValid  && isPasswordValid) {

      form.submit();
    }
  });
});
//addressValidation
document.addEventListener('DOMContentLoaded', function () {
  const addressForm = document.getElementById('addressForm');

  addressForm.addEventListener('submit', function (event) {
    // Validate street
    const streetInput = document.querySelector('input[name="address[street]"]');
    validateField(streetInput, /^[a-zA-Z0-9\s.,\-\()]{1,100}$/, 'provide a valid street name containing alphanumeric characters, spaces, commas, dot, or hyphens.');

    // Validate city
    const cityInput = document.querySelector('input[name="address[city]"]');
    validateField(cityInput, /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid city name containing alphabetic characters and spaces.');

    // Validate zipCode
    const zipCodeInput = document.querySelector('input[name="address[zipCode]"]');
    validateField(zipCodeInput, /^\d{5,10}$/, 'Please provide a valid zip code consisting of 5-10 digits.');

    // Validate state
    const stateInput = document.querySelector('input[name="address[state]"]');
    validateField(stateInput, /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid state name containing alphabetic characters and spaces.');

    // Validate country
    const countryInput = document.querySelector('input[name="address[country]"]');
    validateField(countryInput, /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid country name containing alphabetic characters and spaces.');

    // If any validation fails, prevent form submission
    if (!isFormValid(addressForm)) {
      event.preventDefault();
    }
  });

  function validateField(inputElement, pattern, errorMessage) {
    const value = inputElement.value.trim();
    const isValid = pattern.test(value);
    const feedbackElement = inputElement.nextElementSibling;

    if (!isValid) {
      inputElement.classList.add('is-invalid');
      inputElement.style.border = '1px solid red'; // Add red border for invalid input
      feedbackElement.textContent = errorMessage;
    } else {
      inputElement.classList.remove('is-invalid');
      inputElement.style.border = '1px solid green'; // Add green border for valid input
      feedbackElement.textContent = 'Correct'; 
    }
  }

  function isFormValid(form) {
    const invalidInputs = form.querySelectorAll('.is-invalid');
    return invalidInputs.length === 0;
  }
});
