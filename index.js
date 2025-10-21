
const unvoiced = document.querySelectorAll(".unvoiced");
const voiced = document.querySelectorAll(".voiced");

const highlightCell = (elements) => {
    for (let el of elements) {
        if (el.classList.contains("impossible")) {
            continue;
        }
        const currBackground = el.style.backgroundColor;
        el.addEventListener("mouseenter", (e) => {
            el.style.backgroundColor = "green";
        });
        el.addEventListener("mouseleave", (e) => {
            el.style.backgroundColor = currBackground;
        });
    }
}

highlightCell(unvoiced);
highlightCell(voiced);
