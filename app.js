console.log("Hello world");
//
var summerBtn = document.getElementById("summer");
var autumnBtn = document.getElementById("autumn");
var winterBtn = document.getElementById("winter");
var sounds = [
    { name: "Осень", src: "/audio/autumn.mp3" },
    { name: "Лето", src: "./audio/summer.mp3" },
    { name: "Зима", src: "./audio/winter.mp3" },
];
var playSound = function (sound) {
    if (!sound.audio) {
        sound.audio = new Audio(sound.src);
    }
    sound.audio.play();
};
var currentSound = null;
// создаем функцию которая проверяет есть ли display: block
function toggleButtonDisplay(input) {
    if (input.style.display !== "block") {
        input.style.display = "block";
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] !== input && inputs[i].style.display === "block") {
                inputs[i].style.display = "none";
            }
        }
    }
}
// создаем функцию для изменения звуков по клику
var changeSound = function (sound) {
    var _a;
    if (currentSound) {
        (_a = currentSound.audio) === null || _a === void 0 ? void 0 : _a.pause();
    }
    if (currentSound !== sound) {
        playSound(sound);
        currentSound = sound;
    }
    else {
        currentSound = null;
    }
};
// Выбираем все кнопки на странице и получаем массив
var btns = document.querySelectorAll("button");
// Проходим по массиву
btns.forEach(function (btn) {
    // Вешаем событие клик
    btn.addEventListener("click", function (e) {
        var target = e.target;
        var wether = target.dataset.name;
        var buttonWrapper = btn.parentNode;
        var btnVolumeSlider = btn.querySelector("#volume-slider");
        btnVolumeSlider.addEventListener("input", function () {
            if (currentSound === null || currentSound === void 0 ? void 0 : currentSound.audio) {
                currentSound.audio.volume = +btnVolumeSlider.value / 100;
            }
        });
        if (wether === "summer") {
            changeSound(sounds[1]);
            buttonWrapper.style.backgroundImage = "url(./images/summer.jpeg)";
            toggleButtonDisplay(btnVolumeSlider);
        }
        if (wether === "autumn") {
            changeSound(sounds[0]);
            buttonWrapper.style.backgroundImage = "url(./images/autumn.jpeg)";
            toggleButtonDisplay(btnVolumeSlider);
        }
        if (wether === "winter") {
            changeSound(sounds[2]);
            buttonWrapper.style.backgroundImage = "url(./images/winter.jpeg)";
            toggleButtonDisplay(btnVolumeSlider);
        }
    });
});
