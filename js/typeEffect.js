function typeEffect(element, innertext, speed) {
  let i = 0;
  const timer = setInterval(function () {
    if (i < innertext.length) {
      element.append(innertext.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, 160);
}

export default typeEffect;