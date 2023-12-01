function friendsCounter(element, startValue, endValue, reverse = false) {
  let currentCount = reverse ? endValue : startValue;

  const intervalId = setInterval(() => {
    element.textContent = currentCount;
    if (reverse) {
      if (currentCount === startValue) {
        clearInterval(intervalId);
      } else {
        currentCount--;
      }
    } else {
      if (currentCount === endValue) {
        clearInterval(intervalId);
      } else {
        currentCount++;
      }
    }
  }, 80);
}

export default friendsCounter;