//Central app Validator that Validate all validation from here.

import validation from 'validate.js'
import {ErrorMessage} from 'src/utils/message';
import moment from 'moment';
import {maxCharLength} from "../utils/constant";


let constraints = {
    email: {
        presence: {
            message: ErrorMessage.emailRequired
        },
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: ErrorMessage.emailInvalid,
        }
    },
    password: {
        presence: {
            message: ErrorMessage.passwordRequired
        },
        length: {
            minimum: 6,
            message: ErrorMessage.passwordLenght,
        }
    },
    phoneNo: {
        presence: {
            message: ErrorMessage.phoneRequired
        },
        format: {
            pattern: "^[0-9]{" + maxCharLength.phoneNo + "}$",
            message: ErrorMessage.phoneInvalid,
        },
    },
    confirmPassword: {
        presence: {
            message: ErrorMessage.confirmpasswordRequired
        },
        equality: "password"
    },

};


export function validate(fieldName, value) {
    let formValues = {};
    formValues[fieldName] = value == '' ? null : value;

    let formFields = {};
    formFields[fieldName] = constraints[fieldName];

    validation.extend(validation.validators.datetime, {
        parse: function(value, options) {
            return +moment.utc(value);
        },
        format: function(value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        }
    });

    let result = validation(formValues, formFields,{fullMessages: false});
    if (result) {
        return result[fieldName][0]
    }
    return null
}

let PasswordConstraints = {
    password: {
        presence: {
            message: ErrorMessage.passwordRequired
        },
        length: {
            minimum: 6,
            message: ErrorMessage.passwordLenght,
        }
    },
    confirmPassword: {
        presence: {
            message: ErrorMessage.confirmpasswordRequired
        },
        length: {
            minimum: 6,
            message: ErrorMessage.passwordLenght,
        },
        equality: {
            attribute: "password",
            message: ErrorMessage.passwordMisMatch
        }
    },
};



export function PasswordValidate(password, confirmPassword) {

    let result1 = validation({password: password, confirmPassword: confirmPassword}, PasswordConstraints,{fullMessages: false});

    if (result1 !== undefined && result1['confirmPassword'] !== undefined) {
        return result1['confirmPassword'][0];
    }
    return null;
}