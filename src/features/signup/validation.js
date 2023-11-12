function validateUsernameLength(username) {
    return username.length >= 3 && username.length <= 20;
}

function validateUsernameCharacters(username) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(username);
}

function validateUsername(username) {
    return validateUsernameLength(username) && validateUsernameCharacters(username);
}

function validatePasswordLength(password) {
    return password.length >= 8 && password.length <= 64;
}

function validatePasswordHasUppercase(password) {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
}

function validatePasswordHasLowercase(password) {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(password);
}

function validatePasswordHasNumber(password) {
    const numberRegex = /[0-9]/;
    return numberRegex.test(password);
}

function validatePasswordHasSpecialChar(password) {
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    return specialCharRegex.test(password);
}

function validatePassword(password) {
    return validatePasswordLength(password) &&
        validatePasswordHasUppercase(password) &&
        validatePasswordHasLowercase(password) &&
        validatePasswordHasNumber(password) &&
        validatePasswordHasSpecialChar(password);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export {
    validateUsername,
    validatePassword,
    validateEmail,
    validateUsernameCharacters,
    validateUsernameLength,
    validatePasswordLength,
    validatePasswordHasUppercase,
    validatePasswordHasLowercase,
    validatePasswordHasNumber,
    validatePasswordHasSpecialChar
}