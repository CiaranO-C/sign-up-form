
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

function passwordMatch(input) {
    const password = document.getElementById('password').value;
    const confirm =  input

    if (password === confirm.value) {
        confirm.style.borderColor = 'green';

        if (input.nextElementSibling) {
            const errorMessage = input.nextElementSibling;
            errorMessage.remove();
        };

    } else if (!confirm.value) {
        confirm.style.removeProperty('border-color');

        if (confirm.nextElementSibling) {
            confirm.nextElementSibling.remove();
        };

    } else {
        confirm.style.borderColor = 'red';

        if (!confirm.nextElementSibling && confirm.value) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Passwords do not match';
            confirm.parentNode.appendChild(errorMessage);
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
        error: 'Contains number and special character',
    },
};
