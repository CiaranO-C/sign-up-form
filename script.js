
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', event => {
        if (event.target.value) {
            validateInput(event)
        } else {
            event.target.style.removeProperty('border-color');
        };
    });
});

const validators = {
    'first-name': {
        pattern: /^[a-zA-Z]+$/,
        errorMessage: 'Must contain only letters',
    },
    'last-name': {
        pattern: /^[a-zA-Z]{2,}$/,
        errorMessage: 'Must contain only letters',
    },
    'email': {
        pattern: /^\w+@\w+\.\w+$/,
        errorMessage: 'Enter valid email',
    },
    'phone': {
        pattern: /^\+\d{1,14}$/,
        errorMessage: 'Enter valid number with country code',
    },
    'password': {
        pattern: /^(?=.*\d)(?=.*[^a-zA-Z0-9\s]).*$/,
        errorMessage: 'Contains number and special character',
    },
    'confirm-password': {
        errorMessage: 'Password does not match',
    },
};


function validateInput(event) {
    const input = event.target;

    //prevents multiple listeners from being applied to element
    input.removeEventListener('input', validateInput);
    input.addEventListener('input', validateInput);


    if (input.id === 'confirm-password') {
        passwordMatch(input);

    } else {
        const isValid = validators[input.id].pattern.test(input.value);
        
        colorBorder(input, isValid);
        handleError(input, isValid);
    };
};


function handleError(input, isValid) {
    const error = input.nextElementSibling;

    if (isValid || !input.value) {
        if (error) error.remove();
    } else {
        if (!error) {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = validators[input.id].errorMessage;
            input.parentNode.appendChild(errorMsg);
        };
    };
};


function colorBorder(input, isValid) {
    if (isValid) {
        input.style.borderColor = 'green';
    } else {
        (input.value) ? input.style.borderColor = 'red' : input.style.removeProperty('border-color');
    };
};


function passwordMatch(input) {
    const confirm = input
    const password = document.getElementById('password').value;
    const isValid = confirm.value === password;

    colorBorder(input, isValid);
    handleError(input, isValid);
};

