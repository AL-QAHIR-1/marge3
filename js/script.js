
 //زر الرجوع 
function goBack() {
    window.history.back();
}


// ===============================
// نظام حفظ موحد + شريط تقدم
// ===============================

const TOTAL_FIRST5 = 114;
const TOTAL_MUTASHABIHAT = 114;

function getSavedData() {
    return JSON.parse(localStorage.getItem("savedSections")) || {};
}

function setSavedData(data) {
    localStorage.setItem("savedSections", JSON.stringify(data));
}

function toggleSave(section, surah, button) {

    let savedData = getSavedData();

    if (!savedData[section]) {
        savedData[section] = [];
    }

    const index = savedData[section].indexOf(surah);

    if (index === -1) {
        savedData[section].push(surah);
    } else {
        savedData[section].splice(index, 1);
    }

    setSavedData(savedData);
    updateButtonState(button, section, surah);
    updateProgress();
}

function updateButtonState(button, section, surah) {

    let savedData = getSavedData();

    if (savedData[section] && savedData[section].includes(surah)) {
        button.classList.add("saved");
        button.textContent = "✓ محفوظ";
    } else {
        button.classList.remove("saved");
        button.textContent = "تم الحفظ";
    }
}

// ===============================
// تحديث شريط التقدم
// ===============================

function updateProgress() {

    let savedData = getSavedData();

    // أول 5 آيات
    let first5Count = savedData.first5 ? savedData.first5.length : 0;
    let first5Percent = (first5Count / TOTAL_FIRST5) * 100;

    if (document.getElementById("first5-progress")) {
        document.getElementById("first5-progress").style.width = first5Percent + "%";
        document.getElementById("first5-count").textContent =
            first5Count + " / " + TOTAL_FIRST5;
    }

}

// ===============================
// تحميل الصفحة
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".save-btn");

    buttons.forEach(button => {

        const section = button.dataset.section;
        const surah = button.dataset.surah;

        updateButtonState(button, section, surah);

        button.addEventListener("click", function () {
            toggleSave(section, surah, button);
        });

    });

    updateProgress();
});
// الوضع الليلي
document.addEventListener("DOMContentLoaded", () => {
    const modeBtn = document.getElementById("mode-toggle");

    // نرجع آخر وضع محفوظ
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
        modeBtn.textContent = "☀️";
    } else {
        modeBtn.textContent = "🌙";
    }

    // عند الضغط على الزر
    modeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            modeBtn.textContent = "☀️";
            localStorage.setItem("mode", "dark");
        } else {
            modeBtn.textContent = "🌙";
            localStorage.setItem("mode", "light");
        }
    });
});
