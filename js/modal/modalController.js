import ModalView from "./modalView.js"
import ModalModel from "./modalModel.js"
import { closeMenu } from "../burger-menu/burger-menu.js"

const view = new ModalView()
const model = new ModalModel()

class ModalController {
    constructor (formUiController, formModelController) {
        this.formUiController = view
        this.formModelController = model
    }

    getFieldChecks () {
        return this.formModelController.checkFields(this.formUiController.uiEls.nameField, this.formUiController.uiEls.phoneField, this.formUiController.uiEls.emailField)
    }

    makeRequest (fieldChecks) {
        const formData = this.formUiController.gatherData(fieldChecks)
        if (formData) {
            this.formUiController.uiEls.formEl.classList.add('hidden')
            this.formUiController.uiEls.form.reset()
            this.formUiController.showSuccess()
        }
    }

    toggleBtnMode (fieldChecks) {
        this.formUiController.renderBtnMode(fieldChecks)
    }

    formatPhone (e) {
        const maskedPhone = this.formModelController.getMask(e.target.value);
        this.formUiController.formatPhoneField(maskedPhone)
    }

    openCookie () {
        this.formUiController.openCookieModal()
    }

    openModal () {
        this.formUiController.showModal()
    }

    closeModal(e) {
        this.formUiController.closeModal(e)
    }
}

const formCtrl = new ModalController(view, model)

// Cookie

window.addEventListener('DOMContentLoaded', () => {
    formCtrl.openCookie()
})

view.uiEls.cookieBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        formCtrl.closeModal(e)
    })
})

// Form

view.uiEls.form.addEventListener('input', () => {
    formCtrl.toggleBtnMode(formCtrl.getFieldChecks())
})

view.uiEls.form.addEventListener('submit', (e) => {
    e.preventDefault()
    formCtrl.makeRequest(formCtrl.getFieldChecks())
})

view.uiEls.callModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeMenu() // Close menu if form modal is active
        formCtrl.toggleBtnMode(formCtrl.getFieldChecks())
        formCtrl.openModal()
    })
})

view.uiEls.phoneField.addEventListener('input', (e) => {
    formCtrl.formatPhone(e)
});

// Modal closers

view.uiEls.closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        formCtrl.closeModal(e)
    })
})

view.uiEls.modalSuccessBtn.addEventListener('click', (e) => {
    formCtrl.closeModal(e)
})

document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-modal') && !e.target.classList.contains('modal-cookie')) formCtrl.closeModal(e)
})