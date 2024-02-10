export default class ModalModel {
    constructor () {

    }

    checkFields (nameField, phoneField, emailField) {
        const isEmptyName = nameField.value.trim() === ''
        const isValidPhone = phoneField.value.length === 16
        const isEmptyPhone = phoneField.value.trim() === ''
        const isEmptyEmail = emailField.value.trim() === ''
        const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        const isValidEmail = emailPattern.test(emailField.value.trim()) === true

        return {
            isEmptyName,
            isValidPhone,
            isEmptyPhone,
            isEmptyEmail,
            isValidEmail
        }
    }

    getMask (phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '').slice(1)
        
        return '+7' + cleaned.replace(/^(\d)/, '($1')
                             .replace(/^(\(\d{3})(\d)/, '$1) $2')
                             .replace(/(\d{4})(\d{1,5})/, '$1-$2')
                             .replace(/(-\d{3})\d+?$/, '$1');
    }
}