window.onload = () => {
  let nav = document.querySelector('.mouse-nav');
  let navLine = document.querySelector('.mouse-nav-follow-line');
  let minLeft = Number.parseInt(window.getComputedStyle(navLine, null).left);
  let maxLeft = minLeft + navLine.offsetWidth * 4;
  nav.addEventListener('mousemove', setLeft);
  nav.addEventListener('mouseleave', () => {
    navLine.style.left = `${ minLeft }px`;
  })
  function setLeft(ev) {
    let changeVal, oldVal, newLeft, time;
    if (ev.target !== ev.currentTarget) {
      changeVal = Math.ceil((ev.offsetX + ev.target.offsetLeft - minLeft) / navLine.offsetWidth);
      oldVal = (navLine.offsetLeft - minLeft) / navLine.offsetWidth;
      newLeft = (changeVal - oldVal - 1) * navLine.offsetWidth + navLine.offsetLeft;
    } else {
      newLeft = ev.offsetX > minLeft ? maxLeft : minLeft;
    }
    navLine.style.left = `${ newLeft }px`;
    console.log(newLeft, changeVal, oldVal);
  }
}