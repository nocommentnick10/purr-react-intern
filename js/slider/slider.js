window.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider')
    const slidesContainer = slider.querySelector('.slider__wrapper')
    const slides = Array.from(slidesContainer.querySelectorAll('img'))
    const prevBtn = slider.querySelector('#prevBtn')
    const nextBtn = slider.querySelector('#nextBtn')
    const navBtns = slider.querySelectorAll('.slider__nav')
  
    let currentIndex = 0
    const slideWidth = slides[0].offsetWidth
    let slideCount = slides.length
    let isAnimating = false
    let isAnimatingNav = false
    let move = 0

    const firstClone = slides[0].cloneNode(true)
    const lastClone = slides[slideCount-1].cloneNode(true)

    slidesContainer.insertAdjacentElement('beforeend', firstClone)
    slidesContainer.insertAdjacentElement('afterbegin', lastClone)

    slides.unshift(lastClone)
    slides.push(firstClone)

    slideCount = slides.length

    // console.log(slideCount)
    // console.log(slides)

    slidesContainer.style.transform = `translateX(-${slideWidth}px)`

    currentIndex++

    markActiveSlide = () => {
      navBtns.forEach((btn) => {
        btn.classList.remove('slider__nav_active')
      })
      navBtns[currentIndex-1].classList.add('slider__nav_active')
    }

    goToPrevSlide = () => {
      if (isAnimating) return

      isAnimating = true

      if(currentIndex === 1) {    
        move = slideWidth*currentIndex
        const animation = setInterval(() => {
          move -= slideWidth/50
          slidesContainer.style.transform = `translateX(-${move}px)`
        }, 10)
        setTimeout(() => {
          clearInterval(animation)
          currentIndex = 5
          slidesContainer.style.transform = `translateX(-${slideWidth*currentIndex}px)`
          isAnimating = false
          markActiveSlide()
        }, 500)
      } else {
        move = slideWidth*currentIndex
        const animation = setInterval(() => {
          move -= slideWidth/50
          slidesContainer.style.transform = `translateX(-${move}px)`
        }, 10)
        setTimeout(() => {
          clearInterval(animation)
          isAnimating = false
          currentIndex--
          markActiveSlide()
        }, 500)
      }
    }    
  
    goToNextSlide = () => {
      if (isAnimating) return

      isAnimating = true

      if(currentIndex === 5) {
        move = slideWidth*currentIndex
        const animation = setInterval(() => {
          move += slideWidth/50
          slidesContainer.style.transform = `translateX(-${move}px)`
        }, 10)
        setTimeout(() => {
          clearInterval(animation)
          currentIndex = 1
          slidesContainer.style.transform = `translateX(-${slideWidth*currentIndex}px)`
          isAnimating = false
          markActiveSlide()
        }, 500)
      } else {
        move = slideWidth*currentIndex
        const animation = setInterval(() => {
          move += slideWidth/50
          slidesContainer.style.transform = `translateX(-${move}px)`
        }, 10)
        setTimeout(() => {
          clearInterval(animation)
          isAnimating = false
          currentIndex++
          markActiveSlide()
        }, 500)
    }
  }

  goToNavSlide = (e) => {
    if (isAnimatingNav) return

    navIndex = e.target.dataset.nav
    indexToSlide = currentIndex
    if (navIndex > currentIndex) {
      isAnimatingNav = true
      const moveToNav = setInterval(() => {
        goToNextSlide()
      }, 50)
      setTimeout(() => {
        clearInterval(moveToNav)
        isAnimatingNav = false
      }, 550*(navIndex-indexToSlide))
    } else if (navIndex < currentIndex) {
      isAnimatingNav = true
      const moveToNav = setInterval(() => {
        goToPrevSlide()
      }, 50)
      setTimeout(() => {
        clearInterval(moveToNav)
        isAnimatingNav = false
      }, 550*(indexToSlide-navIndex))
    }
  }
        
    prevBtn.addEventListener('click', goToPrevSlide)
    nextBtn.addEventListener('click', goToNextSlide)

    navBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        goToNavSlide(e)
      })
    })
})

