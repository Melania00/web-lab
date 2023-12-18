const burgerMenu = document.querySelector('.header-burger__menu');
const navigationMenu = document.querySelector('.header__navigation ul');

burgerMenu.addEventListener('click', () => {
    navigationMenu.classList.toggle('active');
});

function checkScroll() {
    const elementsLeft = document.querySelectorAll('.animated__left');
    const elementsRight = document.querySelectorAll('.animated__right');

    elementsLeft.forEach((element) => {
        if (isElementInViewport(element, 0.5)) {
            element.classList.add('show');
        }
    });

    elementsRight.forEach((element) => {
        if (isElementInViewport(element, 0.5)) {
            element.classList.add('show');
        }
    });
}

function isElementInViewport(el, threshold) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.top >= -rect.height * threshold &&
        rect.bottom <= windowHeight + rect.height * threshold
    );
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);