console.log("Hello world");
//
const summerBtn = document.getElementById("summer") as HTMLInputElement;
const autumnBtn = document.getElementById("autumn") as HTMLInputElement;
const winterBtn = document.getElementById("winter") as HTMLInputElement;
// определяем типы для звуков и перечисление доступных сезонов
type Sound = {
    name: string;
    src: string;
    audio?: HTMLAudioElement;
};

const sounds: Sound[] = [
    { name: "Осень", src: "/audio/autumn.mp3" },
    { name: "Лето", src: "./audio/summer.mp3" },
    { name: "Зима", src: "./audio/winter.mp3" },
];

const playSound = (sound: Sound) => {
    if (!sound.audio) {
        sound.audio = new Audio(sound.src);
    }
    sound.audio.play();
};

let currentSound: Sound | null = null;

// создаем функцию которая проверяет есть ли display: block
function toggleButtonDisplay(input: HTMLInputElement): void {
    if (input.style.display !== "block") {
        input.style.display = "block";
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i] !== input && inputs[i].style.display === "block") {
                inputs[i].style.display = "none";
            }
        }
    }
}

// создаем функцию для изменения звуков по клику
const changeSound = (sound: Sound) => {
    if (currentSound) {
        currentSound.audio?.pause();
    }
    if (currentSound !== sound) {
        playSound(sound);
        currentSound = sound;
    } else {
        currentSound = null;
    }
};

// Выбираем все кнопки на странице и получаем массив
const btns = document.querySelectorAll("button");
// Проходим по массиву
btns.forEach(function (btn) {
    // Вешаем событие клик
    btn.addEventListener("click", function (e: Event): void {
        const target = e.target as HTMLInputElement;
        const wether = target.dataset.name;
        const buttonWrapper = btn.parentNode as HTMLElement;
        const btnVolumeSlider = btn.querySelector(
            "#volume-slider"
        ) as HTMLInputElement;

        btnVolumeSlider.addEventListener("input", function () {
            if (currentSound?.audio) {
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
