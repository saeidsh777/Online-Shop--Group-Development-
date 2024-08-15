import { emailRegex, phoneNumberRegex } from "./regex";

export const API_BASE_URL = 'http://localhost:3000';

// Validation Options ( react-hook-form )
export const optionsHookForm = {
    email: {
        required: 'The email is not valid',
        pattern: {
            value: emailRegex,
            message: 'The email is not valid',
        },
    },

    phoneNumber: {
        required: 'Please enter a valid phone number',
        pattern: {
            value: phoneNumberRegex,
            message: 'Please enter a valid phone number',
        },
    },

    name: {
        required: 'Enter more than 5 characters',
        minLength: 5,
    },

    password: {
        required: 'Enter more than 8 characters',
        minLength: 8,
    },
};
