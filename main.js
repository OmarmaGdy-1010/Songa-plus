const img = document.querySelector('.image img');
const image = document.querySelector('.image ');
const artist = document.querySelector('.image .artist');
const track_name = document.querySelector('.image .track-name');
const time_line_Slider = document.querySelector('.slider-time .time-line');
const current_Time = document.querySelector('.slider-time .current');
const duration_Time = document.querySelector('.slider-time .duration');
const volume_icon = document.querySelector('.slider-volume .volume-icon');
const volume_Slider = document.querySelector('.slider-volume .volume');
const pre_Btn = document.querySelector('.controls .pre');
const turn_on_Btn = document.querySelector('.controls .turn-on');
const next_Btn = document.querySelector('.controls .next');
const audio = document.getElementById('audio');
// counter 
let Q = 0;


// get current song from JSOn file
function getSong() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let songsObj = JSON.parse(this.responseText);
            // Count Of Songs in JSON File
            let countSongs = songsObj.length;
            // get current song 
            let currentSong = songsObj[ Q ];
            // create a function appindeng data inner html File
            addSongDATA(currentSong);
            // create a function for play and pause button when on click
            turn_on_Btn.onclick = function () {
                turn_on_Btn.classList.toggle("running");
                turn_on_Btn.classList.toggle("stoped");
                playBtn();
            };
            // create a function for next song when on click
            next_Btn.onclick = function () {
                if (Q < countSongs - 1) {
                    Q++;
                    addSongDATA(songsObj[ Q ]);
                    playBtn();
                } else if (Q == countSongs - 1) {
                    Q = 0;
                }
            };
            // create a function for pre song when on click
            pre_Btn.onclick = function () {
                if (Q <= countSongs - 1 && Q > 0) {
                    Q--;
                    addSongDATA(songsObj[ Q ]);
                    playBtn();
                } else if (Q == 0) {
                    Q = countSongs - 1;
                    addSongDATA(songsObj[ Q ]);
                    playBtn();
                }
            };


        }
    };




    myRequest.open("GET", "songs.json", true);
    myRequest.send();
}
getSong();



function addSongDATA(song) {
    img.src = song[ "img" ];
    artist.innerHTML = song[ "artist" ];
    track_name.innerHTML = song[ "name" ];
    audio.src = song[ "path" ];
    setTimeout(() => {
        time_line_Slider.value = 0;
        duration_Time.innerHTML = formatTime(audio.duration);
        setInterval(() => {
            time_line_Slider.max = audio.duration;
            current_Time.innerHTML = formatTime(audio.currentTime);
            time_line_Slider.value = audio.currentTime;
            if (audio.currentTime === audio.duration) {
                next_Btn.click();
            }
        }, 500);
    }, 300);
}

// create a function for play and pause button

function playBtn() {
    if (turn_on_Btn.className.includes("running")) {
        turn_on_Btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        audio.play();
    } else if (turn_on_Btn.className.includes("stoped")) {
        turn_on_Btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        audio.pause();
    }
}


function formatTime(time) {
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    if (m < 10) {
        m = `0${m}`;
    }
    if (s < 10) {
        s = `0${s}`;
    }
    return `${m}:${s}`;
}


time_line_Slider.addEventListener('change', function () {
    time_line_Slider.max = audio.duration;
    audio.currentTime = time_line_Slider.value;

});



volume_Slider.addEventListener('input', (e) => {
    audio.volume = e.target.value;

    if (v % 2) {
        v++
                volume_icon.innerHTML = `<i class="fa-solid fa-volume-up">`
    }
});


let v = 0;
let currentVolume;
let lastVolume;
volume_icon.addEventListener('click', () => {
    v++;
    // if v is odd number this is mean the user clicked one or three or five ...etc . (v % 2 ) = 0 = false = "mute the audio "'
    //  so this is mean he need mute tha audio.
    if (!(v % 2)) {
        volume_Slider.value = currentVolume;
        audio.volume = lastVolume;
        volume_icon.innerHTML = `<i class="fa-solid fa-volume-up">`;

    } else if (v % 2) {
        currentVolume = volume_Slider.value;
        lastVolume = audio.volume;
        volume_Slider.value = '0';
        audio.volume = 0;
        volume_icon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }


});


audio.onplay = function () {
    image.style.opacity = "1";
    img.style = "animation-name: play;";
};
audio.onpause = function () {
    image.style.opacity = "0.7";
    img.style = "animation-name: pause;";
};


