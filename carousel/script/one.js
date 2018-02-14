window.onload = function () {
  let pre = document.querySelector('#pre');
  let next = document.querySelector('#next');
  let content = document.querySelector('#content');
  let wrap = document.querySelector("#wrap1");
  let control = document.getElementById('control');
  let dots = control.getElementsByTagName('li');
  let timer = null;
  wrap.style.opacity = '1';

  for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = active;
  }
  pre.onclick = () => {
    if (timer === null) {
      timer = requestAnimationFrame(() => {
        let old_left = content.offsetLeft;
        animate(old_left, 1);
      });
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
          if(i === 4) {
            dots[i].classList.remove('active');
            dots[0].classList.add('active');
            break;
          } else {
            dots[i].classList.remove('active');
            dots[i + 1].classList.add('active');
            break;
          }
        }
      }
    }
  };
  next.onclick = () => {
    if (timer === null) {
      timer = requestAnimationFrame(() => {
        let old_left = content.offsetLeft;
        animate(old_left, -1);
      });
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
          if (i === 0) {
            dots[i].classList.remove('active');
            dots[4].classList.add('active');
            break;
          } else {
            dots[i].classList.remove('active');
            dots[i - 1].classList.add('active');
            break;
          }
        }
      }
    }
  };

  function active() {
    if (!this.classList.contains('active')) {
      for (let j = 0; j < dots.length; j++) {
        if (dots[j].classList.contains('active')) {
          dots[j].classList.remove('active');
          let index = this.dataset.index - dots[j].dataset.index;
          if (index > 0) {
            if (timer === null) {
              timer = requestAnimationFrame(() => {
                let old_left = content.offsetLeft;
                animate(old_left, 1, index);
              })
            }
          } else {
            if (timer === null) {
              timer = requestAnimationFrame(() => {
                let old_left = content.offsetLeft;
                animate(old_left, -1, -index);
              })
            }
          }
        }
      }
      this.classList.add('active');
    }
  }

  function animate(old_left, direction = 1, index = 1) {
    let left_value = Number.parseInt(window.getComputedStyle(content, null).left);
    if (direction > 0) {
      content.style.left = left_value - 20 + 'px';
      if (old_left - content.offsetLeft <= 850 * index) {
        requestAnimationFrame(() => {
          animate(old_left, 1, index);
        })
      } else {
        content.style.left = old_left - 850 * index + 'px';
        cancelAnimationFrame(timer);
        timer = null;
      }
      if (content.offsetLeft === -5100) {
        content.style.left = -850 + 'px';
      }
    } else {
      content.style.left = left_value + 20 + 'px';
      if (old_left - content.offsetLeft >= -850 * index) {
        timer = requestAnimationFrame(() => {
          animate(old_left, -1, index);
        })
      } else {
        cancelAnimationFrame(timer);
        timer = null;
        content.style.left = old_left + 850 * index + 'px';
      }
      if (content.offsetLeft === 0) {
        content.style.left = -5100 + 850 + 'px';
      }
    }
  }
};