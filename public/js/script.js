  $(document).ready(function () {
    // Address form validation
    $('#addressForm').submit(function (event) {
      // Validate street
      validateField($('input[name="address[street]"]'), /^[a-zA-Z0-9\s.,\-\()]{1,100}$/, 'provide a valid street name containing alphanumeric characters, spaces, commas, dot, or hyphens.');

      // Validate city
      validateField($('input[name="address[city]"]'), /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid city name containing alphabetic characters and spaces.');

      // Validate zipCode
      validateField($('input[name="address[zipCode]"]'), /^\d{5,10}$/, 'Please provide a valid zip code consisting of 5-10 digits.');

      // Validate state
      validateField($('input[name="address[state]"]'), /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid state name containing alphabetic characters and spaces.');

      // Validate country
      validateField($('input[name="address[country]"]'), /^[a-zA-Z\s\-.]{1,100}$/, 'Please provide a valid country name containing alphabetic characters and spaces.');

      // If any validation fails, prevent form submission
      if (!isFormValid($('#addressForm'))) {
        event.preventDefault();
      }
    });

    // Keyup event for address form fields
    $('#addressForm input').keyup(function () {
      validateField($(this), /^[a-zA-Z0-9\s.,\-\()]{1,100}$/, 'provide a valid street name containing alphanumeric characters, spaces, commas, dot, or hyphens.');
      isFormValid($('#addressForm'));
    });

    // Signup form validation
    $('#signup input').keyup(function () {
      var usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

      if (this.id === 'username') {
        validateField($(this), usernameRegex, 'Username must start with a letter and contain 4-20 alphanumeric characters or underscores.');
      } else if (this.id === 'Email') {
        validateField($(this), emailRegex, 'Please provide a valid email address.');
      } else if (this.id === 'Password') {
        validateField($(this), passwordRegex, 'Password must contain at least 8 characters including one digit, one lowercase, and one uppercase letter.');
      }

      isFormValid($('#signup'));
    });

    function validateField(inputElement, pattern, errorMessage) {
      const value = inputElement.val().trim();
      const isValid = pattern.test(value);
      const feedbackElement = inputElement.next();

      if (!isValid) {
        inputElement.addClass('is-invalid');
        inputElement.css('border', '1px solid red');
        feedbackElement.text(errorMessage);
      } else {
        inputElement.removeClass('is-invalid');
        inputElement.css('border', '1px solid green');
        feedbackElement.text('Correct');
      }
    }

    function isFormValid(form) {
      const invalidInputs = form.find('.is-invalid');
      if (invalidInputs.length === 0) {
        form.find('button[type="submit"]').prop('disabled', false);
      } else {
        form.find('button[type="submit"]').prop('disabled', true);
      }
    }
  });

