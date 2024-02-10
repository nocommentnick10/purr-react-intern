export default class ModalView {
    constructor () {

    }

    uiEls = {
        form:  document.querySelector('#modalForm'),
        formEl: document.querySelector('#modalFormEl'),
        nameField: document.querySelector('#name'),
        emailField: document.querySelector('#mail'),
        phoneField: document.querySelector('#phone'),
        compField: document.querySelector('#comp'),
        siteField: document.querySelector('#site'),
        modalBtn: document.querySelector('#modalBtn'),
        modalSuccess: document.querySelector('#modalSuccess'),
        modalSuccessBtn: document.querySelector('#modalSuccessBtn'),
        callModalBtns: document.querySelectorAll('.cta-btn'),
        closeBtns: document.querySelectorAll('.close-modal'),
        cookieModal: document.querySelector('#cookieModal'),
        cookieBtns: document.querySelectorAll('.modal-cookie__btn')
    }

    openCookieModal () {
        this.uiEls.cookieModal.classList.add('modal-cookie_animate')
    }

    showModal () {
        this.uiEls.formEl.classList.remove('hidden')
    }

    showSuccess () {
        this.uiEls.modalSuccess.classList.remove('hidden')
    }

    closeModal(e) {
        e.target.closest('[data-modal]').classList.add('hidden')
    }

    formatPhoneField(maskedPhone) {
        this.uiEls.phoneField.value = maskedPhone
    }

    renderBtnMode (fieldsChecks) {
        const {isEmptyName, isValidPhone, isEmptyPhone, isEmptyEmail, isValidEmail} = fieldsChecks

        isEmptyName || isEmptyPhone || isEmptyEmail ? this.uiEls.modalBtn.setAttribute('disabled', '') : this.uiEls-modalBtn.removeAttribute('disabled')
    }

    gatherData(fieldsChecks){
        const {isEmptyName, isValidPhone, isEmptyPhone, isEmptyEmail, isValidEmail} = fieldsChecks

        if(isEmptyName && document.querySelector('[data-errname]') === null){
                const markup = `<span class="required" data-errname="">This field is required.</span>`
                this.uiEls.nameField.insertAdjacentHTML('beforebegin', markup)
                setTimeout(function(){
                    document.querySelector('[data-errname]').remove()
                }, 5000)
        }

        if(isEmptyPhone && document.querySelector('[data-errphone]') === null){
            const markup = `<span class="required" data-errphone="">This field is required.</span>`
            this.uiEls.phoneField.insertAdjacentHTML('beforebegin', markup)
            setTimeout(function(){
                document.querySelector('[data-errphone]').remove()
            }, 5000)
        } else if(!isValidPhone && document.querySelector('[data-errphone]') === null){
            const markup = `<span class="required" data-errphone="">Invalid phone number.</span>`
            this.uiEls.phoneField.insertAdjacentHTML('beforebegin', markup)
            setTimeout(function(){
                document.querySelector('[data-errphone]').remove()
            }, 5000)
        }

        if(isEmptyEmail && document.querySelector('[data-erremail]') === null){
                const markup = `<span class="required" data-erremail="">This field is required.</span>`
                this.uiEls.emailField.insertAdjacentHTML('beforebegin', markup)
                setTimeout(function(){
                    document.querySelector('[data-erremail]').remove()
                }, 5000)
        }else if(!isValidEmail && document.querySelector('[data-erremail]') === null){
            const markup = `<span class="required" data-erremail="">Invalid email.</span>`
            this.uiEls.emailField.insertAdjacentHTML('beforebegin', markup)
            setTimeout(function(){
                document.querySelector('[data-erremail]').remove()
            }, 5000)
        }

        if(!isEmptyName
            && !isEmptyPhone
            && isValidPhone
            &&  !isEmptyEmail
            && isValidEmail){
                return {
                    name: this.uiEls.nameField.value.trim(),
                    phone: this.uiEls.phoneField.value.trim(),
                    email: this.uiEls.emailField.value.trim(),
                }
        } else {
            if (document.querySelector('[data-errform]') === null) {
                const markup = `<span class="required" data-errform="">Please fill in all required fields</span>`
                this.uiEls.siteField.insertAdjacentHTML('beforebegin', markup)
                setTimeout(function(){
                    document.querySelector('[data-errform]').remove()
                }, 5000)
            }
            return false
        }
    }
}