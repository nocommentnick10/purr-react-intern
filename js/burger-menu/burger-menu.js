// Variables

const menuBtn = document.querySelector('#menuBtn')
const closeBtn = document.querySelector('#closeBtn')
const menu = document.querySelector('#menu')
const body = document.querySelector('body')

// Functions

const toggleMenu = () => {
    menu.classList.toggle('hidden')
    body.classList.toggle('no-scroll')
}

export const closeMenu = () => {
    menu.classList.add('hidden')
    body.classList.remove('no-scroll')
}

// Events

menuBtn.addEventListener('click', () => {
    toggleMenu()
})

closeBtn.addEventListener('click', () => {
    toggleMenu()
})

window.addEventListener('resize', () => {
    if (!menu.classList.contains('hidden')) closeMenu()
})