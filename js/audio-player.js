import playList from 'audio-list.js';

const playerElement = document.querySelector('.player');
const playPrevElement = playerElement.querySelector('.play-prev');
const playElement = playerElement.querySelector('.play');
const playNextElement = playerElement.querySelector('.play-next');
const playListElement = playerElement.querySelector('.player__play-list');

const songTitleElement = playerElement.querySelector('.player__song');
const timelineElement = playerElement.querySelector('.player__timeline');
const progressElement = timelineElement.querySelector('.player__progress');
const currentTimeElement = playerElement.querySelector('.time__current');
const durationElement = playerElement.querySelector('.time__duration');

const volumeElement = playerElement.querySelector('.player__volume');
const volumeIconElement = volumeElement.querySelector('.player__volume-icon');
const volumeScaleElement = volumeElement.querySelector('.player__volume-scale');
const volumeProgressElement = volumeElement.querySelector('.player__volume-progress');

const START_TIME = '00:00';

let isPlay = false;
let currentAudioNumber = 0;
let currentAudioTime = 0; // in seconds
let audioVolume = 1;
let timer;
const audio = new Audio();

const togglePlay = () => {
    isPlay = !isPlay;
    playElement.classList.toggle('play');
    playElement.classList.toggle('pause');
};

const setProgress = () => {
    progressElement.style.width = `${currentAudioTime / playList[currentAudioNumber].secondsDuration * 100}%`;
};

const updateCurrentTime = () => {
    currentAudioTime = audio.currentTime;

    if (currentTimeElement.textContent === playList[currentAudioNumber].duration) {
        clearInterval(timer);
        return START_TIME;
    }

    let current = Math.round(currentAudioTime);
    currentTimeElement.textContent = `00:${current < 10 ? "0" : ""}${current}`;

    setProgress();
}

const playAudio = () => {
    songTitleElement.textContent = playList[currentAudioNumber].title;
    durationElement.textContent = playList[currentAudioNumber].duration;

    audio.src = playList[currentAudioNumber].src;
    audio.currentTime = currentAudioTime;
    audio.onended = () => playNextAudio();
    audio.play();

    if (!playListElement.children[currentAudioNumber].classList.contains('item-active')) {
        playListElement.children[currentAudioNumber].classList.add('item-active');
    }

    timer = setInterval(() => updateCurrentTime(), 1000);
};

const pauseAudio = () => {
    audio.pause();

    clearInterval(timer);
};

const resetProgress = () => {
    currentAudioTime = 0;
    currentTimeElement.textContent = START_TIME;
    progressElement.style.width = '0%';
};

const createPlayList = () => {
    for (let item of playList) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('player__play-item');
        itemElement.textContent = item.title;
        playListElement.append(itemElement);
    }

    playListElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('player__play-item')) {
            let selectedSongIndex = playList.findIndex(item => item.title === event.target.textContent);
            if (currentAudioNumber !== selectedSongIndex) {
                playListElement.children[currentAudioNumber].classList.toggle('item-active');
                if (isPlay) {
                    playListElement.children[currentAudioNumber].classList.toggle('off');
                    currentAudioNumber = selectedSongIndex;
                    playListElement.children[currentAudioNumber].classList.toggle('item-active');
                } else {
                    currentAudioNumber = selectedSongIndex;
                    togglePlay();
                }
                playListElement.children[currentAudioNumber].classList.toggle('off');
                pauseAudio();
                resetProgress();
                playAudio();
            } else {
                playListElement.children[currentAudioNumber].classList.toggle('off');
                togglePlay();
                isPlay ? playAudio() : pauseAudio();
            }
        }
    });
};

const playPrevAudio = () => {
    if (playListElement.children[currentAudioNumber].classList.contains('item-active')) {
        playListElement.children[currentAudioNumber].classList.remove('item-active');
    }
    if (!isPlay) {
        togglePlay();
    } else {
        playListElement.children[currentAudioNumber].classList.toggle('off');
    }

    if (currentAudioNumber === 0) {
        currentAudioNumber = playList.length - 1;
    } else {
        currentAudioNumber--;
    }

    playListElement.children[currentAudioNumber].classList.toggle('off');

    pauseAudio();
    resetProgress();
    playAudio();
};

const playNextAudio = () => {
    if (playListElement.children[currentAudioNumber].classList.contains('item-active')) {
        playListElement.children[currentAudioNumber].classList.remove('item-active');
    }
    if (!isPlay) {
        togglePlay();
    } else {
        playListElement.children[currentAudioNumber].classList.toggle('off');
    }

    if (currentAudioNumber === playList.length - 1) {
        currentAudioNumber = 0;
    } else {
        currentAudioNumber++;
    }

    playListElement.children[currentAudioNumber].classList.toggle('off');

    pauseAudio();
    resetProgress();
    playAudio();
};

const setNewVolume = () => {
    audio.volume = audioVolume;
    volumeProgressElement.style.width = `${Math.round(audioVolume * 100)}%`;
};

const addVolume = () => {
    volumeIconElement.addEventListener('click', () => {
        if (volumeIconElement.classList.toggle('off')) {
            audio.volume = 0;
            volumeProgressElement.style.width = `0%`;
        } else {
            setNewVolume();
        }
    });

    volumeScaleElement.addEventListener('click', event => {
        const width = window.getComputedStyle(volumeScaleElement).width;
        const newVolume = event.offsetX / parseInt(width);
        audioVolume = newVolume;
        setNewVolume();
    });
};

const addAudioPlayer = () => {
    createPlayList();
    songTitleElement.textContent = playList[currentAudioNumber].title;
    durationElement.textContent = playList[currentAudioNumber].duration;

    playElement.addEventListener('click', () => {
        togglePlay();
        playListElement.children[currentAudioNumber].classList.toggle('off');
        isPlay ? playAudio() : pauseAudio();
    });

    playPrevElement.addEventListener('click', () => playPrevAudio());
    playNextElement.addEventListener('click', () => playNextAudio());

    timelineElement.addEventListener('click', event => {
        const timelineWidth = window.getComputedStyle(timelineElement).width;
        const newTime = event.offsetX / parseInt(timelineWidth) * playList[currentAudioNumber].secondsDuration;
        audio.currentTime = newTime;
        updateCurrentTime();
    });

    addVolume();
}

export { addAudioPlayer };