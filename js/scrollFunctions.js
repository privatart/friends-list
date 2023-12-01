const rootElement = document.documentElement;

export function handleScroll() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.2) {
    scrollToTopBtn.style.display = "block";
    scrollToBottomBtn.style.display = "none";
  } else {
    scrollToTopBtn.style.display = "none";
    scrollToBottomBtn.style.display = "block";
  }
}

export function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function scrollToBottom() {
  rootElement.scrollTo({
    top: rootElement.scrollHeight,
    behavior: "smooth",
  });
}