 
// Selecting all necessary elements
const music = new Audio('./audio/alone.mp3');

// Song data (you can replace this with dynamic data)
const songs = [
    {
        id : "01",
        songName: 'Unsure <br> <div class = "subtitle"> Alan Walker</div>',
        poster: "./images/01.jpg",
        
    },
    {
        id : "02",
        songName: 'Who I Am <br> <div class = "subtitle"> Alan Walker</div>',
        poster: "./images/02.jpg",
        
    },
    
    {
        id : "03",
        songName: 'Let It Go <br> <div class = "subtitle"> Indina Menzel</div>',
        poster: "./images/03.jpg",
        
    },

    {
        id : "04",
        songName: ' Maghron La <br> <div class = "subtitle"> Rozeo & Sabri Sisters</div>',
        poster: "./images/04.jpg",
        
    },
    
    {
        id : "05",
        songName: ' Pasoori <br> <div class = "subtitle"> Ali Sethi & Shae Gill</div>',
        poster: "./images/05.jpg",
        
    },

    {
        id : "06",
        songName: 'Dreamers <br> <div class = "subtitle"> Jungkook</div>',
        poster: "./images/06.jpg",
        
    },
    
    {
        id : "07",
        songName: 'Blank Space <br> <div class = "subtitle"> Taylor Swift</div>',
        poster: "./images/07.jpg",
        
    },

    {
        id : "08",
        songName: ' Photograph <br> <div class = "subtitle"> EdSheeran</div>',
        poster: "./images/08.jpg",
        
    },
    
    {
        id : "09",
        songName: 'Unsure <br> <div class = "subtitle"> Alan Walker</div>',
        poster: "./images/01.jpg",
        
    },

    {
        id : "10",
        songName: 'Who I Am <br> <div class = "subtitle"> Alan Walker</div>',
        poster: "./images/02.jpg",
        
    },

    {
        id : "11",
        songName: 'Shadow <br> <div class = "subtitle"> Livingston</div>',
        poster: "./images/11.jpg",
        
    },
    {
        id : "12",
        songName: ' Maghron La <br> <div class = "subtitle"> Rozeo & Sabri Sisters</div>',
        poster: "./images/04.jpg",
        
    },
    
    {
        id : "13",
        songName: ' Pasoori <br> <div class = "subtitle"> Ali Sethi & Shae Gill</div>',
        poster: "./images/05.jpg",
        
    },

    {
        id : "14",
        songName: 'Dreamers <br> <div class = "subtitle"> Jungkook</div>',
        poster: "./images/06.jpg",
        
    },
    
    {
        id : "15",
        songName: 'Blank Space <br> <div class = "subtitle"> Taylor Swift</div>',
        poster: "./images/07.jpg",
        
    },

    {
        id : "16",
        songName: ' Photograph <br> <div class = "subtitle"> EdSheeran</div>',
        poster: "./images/08.jpg",
        
    },
    
];

/*master player play pause */
let masterPlay = document.getElementById('masterPlay');

let wave = document.getElementById('wave');

masterPlay.addEventListener('click', ()=>{
    if(music.paused || music.currentTime <= 0)
        {
            music.play();
            wave.classList.add('active1');
            masterPlay.classList.remove('bi-play-circle-fill');
            masterPlay.classList.add('bi-pause-circle-fill');
        }
    else
    {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-circle-fill');
        masterPlay.classList.remove('bi-pause-circle-fill');
    }
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('libraryPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    });
}


const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('song_item')).forEach((el) => {
        el.style.background = 'rgba(105, 105, 105, 0.0)';
    });
}



//index of songs by id
let index = 0;
let poster_main_player = document.getElementById('poster_main_player');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('libraryPlay')).forEach((e)=>{
        
    e.addEventListener('click', (el)=>{
        index = el.target.id;
        //console.log(index);
        music.src = `./audio/${index}.mp3`;
        poster_main_player.src= `./images/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        
        let songTitles = songs.filter((els) =>{
            return els.id == index;
        }); 

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;   

        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('song_item')[index-1].style.background="rgb(105,105,105,0.1)");
        
        makeAllPlays();
        el.target.classList.remove('bi-pause-fill');
        el.target.classList.add('bi-play-fill');
        wave.classList.add('active1');
    });
});


let NowPlaying = document.getElementById('NowPlaying');
let EndPlaying = document.getElementById('EndPlaying');
let look =  document.getElementById('look');
let statusbar1 = document.getElementById('statusbar1');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_current = music.currentTime; // corrected from music.NowPlaying
    let music_dur = music.duration;

    // Calculate duration time
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }

    EndPlaying.innerText = `${min1}:${sec1}`;
    
    // Calculate current time
    let min2 = Math.floor(music_current / 60);
    let sec2 = Math.floor(music_current % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }

    NowPlaying.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_current / music_dur) * 100);
    look.value = progressBar;
    let lookbar = look.value;
    statusbar1.style.width = `${lookbar}%`;
    dot.style.left = `${lookbar}%`;

});

look.addEventListener('change', () => {
    music.currentTime = look.value * music.duration / 100;
});
 

let volume_icon = document.getElementById('volume_icon');
let volume = document.getElementById('volume');
let volumebar = document.getElementsByClassName('volumebar')[0];
let volumedot = document.getElementById('volumedot');

volume.addEventListener('change', () => {
    if (volume.value == 0) {
        volume_icon.classList.remove('bi-volume-up-fill');
        volume_icon.classList.remove('bi-volume-down-fill');
        volume_icon.classList.add('bi-volume-off-fill');
    }
    
    if (volume.value > 0) {
        volume_icon.classList.remove('bi-volume-up-fill');
        volume_icon.classList.add('bi-volume-down-fill');
        volume_icon.classList.remove('bi-volume-off-fill');
    }

    if (volume.value > 50) {
        volume_icon.classList.add('bi-volume-up-fill');
        volume_icon.classList.remove('bi-volume-down-fill');
        volume_icon.classList.remove('bi-volume-off-fill');
    }

    // Update the volumebar and volumedot based on the volume value
    volumebar.style.width = `${volume.value}%`;
    volumedot.style.left = `${volume.value}%`;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = document.getElementsByClassName('song_item').length;
    }
    music.src = `./audio/${index}.mp3`;
    poster_main_player.src = `./images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-circle-fill');
    masterPlay.classList.add('bi-pause-circle-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    document.getElementsByClassName('song_item')[index - 1].style.background = "rgba(105, 105, 105, 0.1)";

    makeAllPlays();
    let currentPlayButton = document.getElementsByClassName('libraryPlay')[index - 1];
    currentPlayButton.classList.remove('bi-play-fill');
    currentPlayButton.classList.add('bi-pause-fill');
    wave.classList.add('active1');
});

next.addEventListener('click', ()=> {
    index++;
    if(index > Array.from( document.getElementsByClassName('song_item').length))
        {
            index = 1;
        }
    music.src = `./audio/${index}.mp3`;
    poster_main_player.src = `./images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-circle-fill');
    masterPlay.classList.add('bi-pause-circle-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    document.getElementsByClassName('song_item')[index - 1].style.background = "rgba(105, 105, 105, 0.1)";

    makeAllPlays();
    let currentPlayButton = document.getElementsByClassName('libraryPlay')[index - 1];
    currentPlayButton.classList.remove('bi-play-fill');
    currentPlayButton.classList.add('bi-pause-fill');
    wave.classList.add('active1');

})

  
let Pop_Songs_left = document.getElementById('Pop_Songs_left');
let Pop_Songs_right = document.getElementById('Pop_Songs_right');
let Pop_Songs = document.getElementsByClassName('Pop_Songs')[0];


/*Scrolling Popular songs */
Pop_Songs_right.addEventListener('click', () => {
    Pop_Songs.scrollLeft += 330;
});

Pop_Songs_left.addEventListener('click', () => {
    Pop_Songs.scrollLeft -= 200; // Corrected scrollLeft here
});

let pop_artist_left = document.getElementById('pop_artist_left');
let pop_artist_right = document.getElementById('pop_artist_right');
let item = document.getElementsByClassName('item')[0];


/*Scrolling Popular artists */
pop_artist_right.addEventListener('click', () => {
    item.scrollLeft += 330;
});

pop_artist_left.addEventListener('click', () => {
    item.scrollLeft -= 200; // Corrected scrollLeft here
});


/*For songs.html*/// Add event listeners to play buttons and heart icons in the table
const playButtons = document.querySelectorAll('.libraryPlay');
playButtons.forEach((playButton, index) => {
    playButton.addEventListener('click', () => {
        playSong(index); // Function to play the song
    });
});

const heartIcons = document.querySelectorAll('.bi-heart');
heartIcons.forEach((heartIcon, index) => {
    heartIcon.addEventListener('click', () => {
        addToFavorites(index); // Function to add to favorites
    });
});

// Function to play the song
const playSong = (index) => {
    const song = songs[index];
    music.src = `./audio/${song.id}.mp3`;
    poster_main_player.src = song.poster;
    music.play();
    masterPlay.classList.remove('bi-play-circle-fill');
    masterPlay.classList.add('bi-pause-circle-fill');
    
    // Update the title
    title.innerHTML = song.songName;
    
    // Update background color
    makeAllBackground();
    document.getElementsByClassName('song_item')[index].style.background = "rgba(105, 105, 105, 0.1)";
    
    // Update play button styles
    makeAllPlays();
    playButtons.forEach(button => {
        button.classList.remove('bi-pause-fill');
        button.classList.add('bi-play-fill');
    });
    playButtons[index].classList.remove('bi-play-fill');
    playButtons[index].classList.add('bi-pause-fill');
    wave.classList.add('active1');
};

// Function to add to favorites
const addToFavorites = (index) => {
    heartIcons[index].classList.toggle('favorite'); // Toggle the favorite class
};
 
/* Playlist */
document.getElementById('playlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var playlistName = document.getElementById('playlistName').value;
    if (playlistName) {
        if (confirm('Are you sure you want to create this playlist?')) {
            createPlaylist(playlistName);
            document.getElementById('playlistName').value = '';
        }
    }
});

function createPlaylist(name) {
    var playlistsContainer = document.getElementById('playlists');
    var playlist = document.createElement('div');
    playlist.classList.add('playlist');

    var playlistHeader = document.createElement('h3');
    playlistHeader.textContent = name;

    var addSongButton = document.createElement('button');
    addSongButton.textContent = 'Add Song';
    addSongButton.addEventListener('click', function() {
        showAddSongForm(playlist);
    });

    playlistHeader.appendChild(addSongButton);
    playlist.appendChild(playlistHeader);

    var songList = document.createElement('ul');
    playlist.appendChild(songList);

    playlistsContainer.appendChild(playlist);
}

// Create the predefined playlist "My Playlist"
function createPredefinedPlaylist() {
    var playlistName = 'My Playlist';
    var playlistsContainer = document.getElementById('playlists');
    var playlist = document.createElement('div');
    playlist.classList.add('playlist');

    document.getElementById('playlistForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var playlistName = document.getElementById('playlistName').value;
        if (playlistName) {
            if (confirm('Are you sure you want to create this playlist?')) {
                createPlaylist(playlistName);
                document.getElementById('playlistName').value = '';
            }
        }
    });
}
    
    function createPlaylist(name) {
        var playlistsContainer = document.getElementById('playlists');
        var playlist = document.createElement('div');
        playlist.classList.add('playlistItem');
    
        var playlistHeader = document.createElement('h3');
        playlistHeader.textContent = name;
    
        var addSongButton = document.createElement('button');
        addSongButton.textContent = 'Add Song';
        addSongButton.addEventListener('click', function() {
            // Replace this with your logic to add songs to the playlist
            alert('Song added to playlist: ' + name);
        });
    
        playlist.appendChild(playlistHeader);
        playlist.appendChild(addSongButton);
    
        playlistsContainer.appendChild(playlist);
    }
    