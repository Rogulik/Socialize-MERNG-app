module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    const regExForEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if(username.trim() === ''){
        errors.username = 'Username is required'
    }
    if(email.trim() === ''){
        errors.email = 'Email is required'
    }else if(!email.match(regExForEmail)){
        errors.email = 'Email must be a valid email address'
    }
    if(password.trim() === ''){
        errors.password = 'Password is required'
    }
    if(password !== confirmPassword){
        errors.confirmPassword = 'Confirm password must match with the password'
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (usernameOrEmail, password) => {
    const errors = {}
    if(usernameOrEmail.trim() === ''){
        errors.usernameOrEmail = 'Username or Email is required'
    }
    if(password.trim() === ''){
        errors.password = 'Password is required'
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}