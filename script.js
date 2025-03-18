document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");

    const updateCharCount = () => {
        charCount.textContent = textInput.value.length;
    };

    textInput.addEventListener("input", updateCharCount);
});
