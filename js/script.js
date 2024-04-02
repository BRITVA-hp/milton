document.addEventListener('DOMContentLoaded', () => {
  // modal
  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scarollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scarollWidth;
  }

  let scrollWidth = calcScroll();

  function modal(modal, modalActiveClass, triggers, modalClose) {
    const triggers_ = document.querySelectorAll(triggers),
      modal_ = document.querySelector(modal),
      modalClose_ = document.querySelector(modalClose);

    if (triggers_.length > 0) {
      triggers_.forEach(item => {
        item.addEventListener('click', function() {
          modal_.classList.add(modalActiveClass);
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${scrollWidth}px`;
        });
      });

      modalClose_.addEventListener('click', () => {
        modal_.classList.remove(modalActiveClass);
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
      });

      modal_.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__container')) {
          modal_.classList.remove(modalActiveClass);
          document.body.style.overflow = '';
          document.body.style.marginRight = '0px';
        }
      });
    }
  }
  modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close')


  // menu
  const burger = document.querySelector('.header__burger')
  const menu = document.querySelector('.menu')
  const menuClose = document.querySelector('.menu__close')

  burger.addEventListener('click', () => {
    menu.classList.add('menu--active')
  })
  menuClose.addEventListener('click', () => {
    menu.classList.remove('menu--active')
  })
  menu.addEventListener('click', e => {
    if(e.target.classList.contains('menu__container')) menu.classList.remove('menu--active')
  })

  // accordion
  const accordionTriggers = document.querySelectorAll('.simple__more span')

  accordionTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.parentElement.previousElementSibling
      content.classList.toggle('simple__wrap--open')
      if(content.classList.contains('simple__wrap--open')) {
        animate({
          timing: linear,
          elem: content,
          draw: open,
          duration: 300,
          height: content.scrollHeight,
          inEnd: () => {
            content.style.height = ''
            button.textContent = 'Hide'
          }
        })
      } else {
        animate({
          timing: linear,
          elem: content,
          draw: hide,
          duration: 300,
          height: content.scrollHeight,
          inEnd: () => {
            content.style.height = ''
            button.textContent = 'Read more'
          }
        })
      }
    })
  })

  function animate({timing, draw, duration, elem, height, inEnd}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(elem, progress, height); // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        if(inEnd) inEnd()
      }

    });
  }

  function linear(timeFraction) {
    return timeFraction;
  }

  function open(elem, progress, height) {
    elem.style.height = progress * height + 'px'
  }
  function hide(elem, progress, height) {
    elem.style.height = (1 - progress) * height + 'px'
  }


  // const main = document.querySelector('.main')
  // const top = document.querySelector('.top')
  //
  // const options = {
  //   root: main,
  //   rootMargin: "0px",
  //   threshold: 1.0,
  // };
  // const callback = function (entries, observer) {
  //   entries.forEach((entry) => {
  //     // entry.time; // a DOMHightResTimeStamp indicating when the intersection occurred.
  //     // entry.rootBounds; // a DOMRectReadOnly for the intersection observer's root.
  //     // entry.boundingClientRect; // a DOMRectReadOnly for the intersection observer's target.
  //     // entry.intersectionRect; // a DOMRectReadOnly for the visible portion of the intersection observer's target.
  //     // entry.intersectionRatio; // the number for the ratio of the intersectionRect to the boundingClientRect.
  //     // entry.target; // the Element whose intersection with the intersection root changed.
  //     // entry.isIntersecting; // intersecting: true or false
  //     console.log(entry)
  //   });
  // };
  // const observer = new IntersectionObserver(callback, options);
  //
  // observer.observe(top)

})