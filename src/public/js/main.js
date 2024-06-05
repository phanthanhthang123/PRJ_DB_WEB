
// sale end-time
const endTime = new Date("2024-06-30 23:59:59").getTime();
function endTime_() {
    const now = new Date().getTime();

    const timeLeft = endTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    // render
    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    if (timeLeft < 0) {
        days = hours = minutes = seconds = 0;
        document.getElementById("days").innerText = days.toString().padStart(2, "0");
        document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
    }
}
endTime_();
// cap nhat thoi gian moi 1 giay
const countdown = setInterval(() => {
    endTime_();
}, 1000)


// header-overlay
document.addEventListener('DOMContentLoaded', function () {
    // header-overlay
    const header__search_input = document.querySelector('.header__search-input');
    const header_overlay = document.querySelector('.header-overlay');
    const header__suggest_search = document.querySelector('.header__suggest-search');
    if (header__search_input) {
        header__search_input.addEventListener('click', (e) => {
            e.preventDefault();
            header_overlay.classList.add('active');
            header__suggest_search.style.display = "block";
        });
        header__search_input.addEventListener('submit', (e) => {
            e.preventDefault();
            header_overlay.classList.remove('active');
            header__suggest_search.style.display = "none";
        });
        header__search_input.addEventListener('blur', (e) => {
            e.preventDefault();
            header_overlay.classList.remove('active');
            header__suggest_search.style.display = "none";
        });
    }
});


