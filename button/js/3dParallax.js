window.onload = () => {
  const ANGEL = 30;
  let wrap = document.querySelector('.parallax');
  let el = document.querySelector('.content');
  wrap.addEventListener('mousemove', (e) => {
    let x = (1 - (e.offsetY - wrap.offsetHeight / 2)) / wrap.offsetHeight * 2 * ANGEL;
    let y = (e.offsetX - wrap.offsetWidth / 2) / wrap.offsetWidth * 2 * ANGEL;
    el.style.transform = `perspective(300px) rotateX(${ x }deg) rotateY(${ y }deg)`;
  });
  wrap.addEventListener('mouseout', (e)=>{
    el.style.transform = `perspective(300px) rotateX(0deg) rotateY(0deg)`;
  })
};