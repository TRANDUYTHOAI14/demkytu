document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const charCount = document.getElementById("char-count");
    const wordCount = document.getElementById("word-count");
    const warningMsg = document.getElementById("warning-msg");
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    const body = document.body;

    const MAX_CHARS = 200;

    // 🟢 Kiểm tra Dark Mode trong LocalStorage
    function loadDarkMode() {
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
            toggleDarkMode.textContent = "☀️ Chế độ sáng";
        } else {
            body.classList.remove("dark-mode");
            toggleDarkMode.textContent = "🌙 Chế độ tối";
        }
    }

    // 🔹 Load trạng thái Dark Mode ngay khi tải trang
    loadDarkMode();

    // 🔹 Toggle Dark Mode khi nhấn nút
    toggleDarkMode.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            toggleDarkMode.textContent = "🌙 Chế độ tối";
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            toggleDarkMode.textContent = "☀️ Chế độ sáng";
        }
    });

    // 🟢 Cập nhật số ký tự & từ
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

        // Lưu văn bản vào LocalStorage
        localStorage.setItem("savedText", text);
    }

    // 🔹 Load trạng thái văn bản từ LocalStorage
    if (localStorage.getItem("savedText")) {
        textInput.value = localStorage.getItem("savedText");
        updateCounts();
    }

    // 🔹 Cập nhật khi người dùng nhập
    textInput.addEventListener("input", updateCounts);
});
