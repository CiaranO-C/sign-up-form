
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', event => {
        if (event.target.value) {
            validateInput(event)
        } else {
            event.target.style.removeProperty('border-color');
        }; //pass input id to function
    });
});

function validateInput(event) {
    const input = event.target

    input.removeEventListener('input', validateInput);
    input.addEventListener('input', validateInput);


    if (input.id === 'confirm-password') {
        passwordMatch(input);

    } else {
        const isValid = validators[input.id].pattern.test(input.value);



        if (isValid) {
            input.style.borderColor = 'green';
            if (input.nextElementSibling) {
                const errorMessage = input.nextElementSibling;
                errorMessage.remove();
            };
        } else if (!input.value) {
            input.style.removeProperty('border-color');

            if (input.nextElementSibling) {
                input.nextElementSibling.remove();
            };
        } else {
            input.style.borderColor = 'red';

            if (!input.nextElementSibling && input.value) {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = validators[input.id].error;
                input.parentNode.appendChild(errorMessage);
            };
        };
    };
};

function passwordMatch(pass2) {
    const pass1 = document.getElementById('password').value;

    if (pass1 === pass2.value) {
        pass2.style.borderColor = 'green';
    } else if (!pass2.value) {
        pass2.style.removeProperty('border-color');

        if (pass2.nextElementSibling) {
            pass2.nextElementSibling.remove();
        };
    } else {
        pass2.style.borderColor = 'red';

        if (!pass2.nextElementSibling && pass2.value) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Passwords do not match';
            pass2.parentNode.appendChild(errorMessage);
        };
    };
};

const validators = {
    'first-name': {
        pattern: /^[a-zA-Z]+$/,
        error: 'Must contain only letters',
    },
    'last-name': {
        pattern: /^[a-zA-Z]{2,}$/,
        error: 'Must contain only letters',
    },
    'email': {
        pattern: /^\w+@\w+\.\w+$/,
        error: 'Enter valid email',
    },
    'phone': {
        pattern: /^\+\d{1,14}$/,
        error: 'Enter valid number with country code',
    },
    'password': {
        pattern: /^(?=.*\d)(?=.*[^a-zA-Z0-9\s]).*$/,
        error: 'Must contain a number and special character',
    },
};
