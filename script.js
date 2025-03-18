document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");
    const wordCount = document.getElementById("word-count");
    const warningMsg = document.getElementById("warning-msg");
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    const convertInput = document.getElementById("convert-input");
    const convertOutput = document.getElementById("convert-output");
    const convertBtns = document.querySelectorAll(".convert-btn");
    const copyBtn = document.getElementById("copy-btn");
    const copyMsg = document.getElementById("copy-msg");

    const MAX_CHARS = 200;

    // 🔹 Load trạng thái từ LocalStorage
    if (localStorage.getItem("savedText")) {
        textInput.value = localStorage.getItem("savedText");
        updateCounts();
    }
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // 🟢 Cập nhật số ký tự & số từ
    function updateCounts() {
        const text = textInput.value;
        charCount.textContent = text.length;
        wordCount.textContent = text.trim().split(/\s+/).filter(Boolean).length;

        warningMsg.style.display = text.length > MAX_CHARS ? "block" : "none";
        warningMsg.textContent = text.length > MAX_CHARS ? `⚠️ Vượt quá ${MAX_CHARS} ký tự!` : "";

        localStorage.setItem("savedText", text);
    }
    textInput.addEventListener("input", updateCounts);

    // 🟢 Chuyển đổi Dark Mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleDarkMode.textContent = "☀️ Chế độ Sáng";
    }

    // 🌙 Chuyển đổi Dark Mode
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggleDarkMode.textContent = "☀️ Chế độ Sáng";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleDarkMode.textContent = "🌙 Chế độ Tối";
        }
    });

    





    // 🟢 Xử lý chuyển đổi chữ
    convertBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let text = convertInput.value;
            switch (btn.dataset.type) {
                case "uppercase":
                    convertOutput.textContent = text.toUpperCase();
                    break;
                case "lowercase":
                    convertOutput.textContent = text.toLowerCase();
                    break;
                case "capitalize":
                    convertOutput.textContent = text
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ");
                    break;
            }
        });
    });

    // 🟢 Xử lý Copy
    copyBtn.addEventListener("click", () => {
        const text = convertOutput.textContent.trim();
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                copyMsg.style.display = "block";
                copyMsg.classList.add("animate__animated", "animate__fadeIn");
                setTimeout(() => {
                    copyMsg.style.display = "none";
                }, 3000);
            });
        }
    });





});
