export function handleMouseOver(image, userInfo) {
    image.classList.add('image-hovered');
    image.style.borderRadius = "50%";
    userInfo.style.display = "block";
}

export function handleMouseOut(image, userInfo) {
    image.classList.remove('image-hovered');
    image.style.borderRadius = "25% 10%";
    image.classList.add('image-nothovered');
    userInfo.style.display = "none";
}
