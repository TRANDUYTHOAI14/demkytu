document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");
    const wordCount = document.getElementById("word-count");
    const warningMsg = document.getElementById("warning-msg");
    const toggleDarkMode = document.getElementById("toggle-dark-mode");

    const MAX_CHARS = 200;

    // 🔹 Load trạng thái văn bản từ LocalStorage
    if (localStorage.getItem("savedText")) {
        textInput.value = localStorage.getItem("savedText");
        updateCounts();
    }

    // 🔹 Load trạng thái Dark Mode từ LocalStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // 🟢 Hàm cập nhật số ký tự & số từ
    function updateCounts() {
        const text = textInput.value;
        charCount.textContent = text.length;
        wordCount.textContent = text.trim().split(/\s+/).filter(Boolean).length;

        // Cảnh báo nếu vượt quá ký tự cho phép
        if (text.length > MAX_CHARS) {
            warningMsg.textContent = `⚠️ Đã vượt quá ${MAX_CHARS} ký tự!`;
            warningMsg.style.display = "block";
        } else {
            warningMsg.style.display = "none";
        }

        // Lưu trạng thái vào LocalStorage
        localStorage.setItem("savedText", text);
    }

    // 🟢 Cập nhật khi người dùng nhập
    textInput.addEventListener("input", updateCounts);

    // 🟢 Chuyển đổi Dark Mode
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });
});
