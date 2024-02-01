//make nodelist of all inputs

//add blur event listeners to each input element

//on blur event validate user input, if valid remove error colour and messages

//else if invalid add error color and message, add listener for any input which recursively calls the validate func again

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', event => {
        validateInput(event.target); //pass input id to function
    });
});

function validateInput(input) {
console.log('blur fired!');
    //if input.id is confirm password pass to confirm function, else do below
    const isValid = validators[input.id].pattern.test(input.value);

    if(isValid) {
        input.style.borderColor = 'green';
        if(input.nextElementSibling) {
            const errorMessage = input.nextElementSibling;
            errorMessage.remove();
        };
    } else {
        input.style.borderColor = 'red';

        if(!input.nextElementSibling) { 
            const errorMessage = document.createElement('p');
            errorMessage.textContent = validators[input.id].error;
            input.parentNode.appendChild(errorMessage);
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
