const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const audio = $("#audio");
const cdThumb = $(".cd-thumb");
const heading = $(".titleSong h2");
const cd = $(".cd");
const backgroundLight = $(".lightBackground");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progressBar = $("#progress");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlistNode = $(".playlist");
const chillBtn = $(".chill-mode");
const notificationNode = $(".chill-mode");
const progressVolume = $('#progress-v');
const volumeBtn = $('.VolumeControl');
const volumeWrapper = $('.volume-wrapper');



//Local storages
const PLAYER_STORAGE_KEY = "F8-player";
// localStorage.setItem('key','value');

const timeDelay = function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 500);
  });
};

const app = {
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,
  isNoti: false,
  isChillMode: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Closer",
      singer: "Halsey",
      path: "./assets/musics/Music 1/The Chainsmokers - Closer ft. Halsey.mp3",
      image: "./assets/musics/Music 1/IMG2.png",
    },
    {
      name: "Phoebe Ryan",
      singer: "Mine (Illenium Remix)",
      path: "./assets/musics/Music 2/Phoebe Ryan - Mine (Illenium Remix).mp3",
      image: "./assets/musics/Music 2/IMG.png",
    },
    {
      name: "Illenium - Fractures",
      singer: "Feat. Nevve",
      path: "./assets/musics/Music 3/Illenium - Fractures (Feat. Nevve).mp3",
      image: "./assets/musics/Music 3/IMG.png",
    },
    {
      name: "Don't Let Me Down",
      singer: "Daya",
      path: "./assets/musics/Music 4/The Chainsmokers - Don't Let Me Down ft. Daya.mp3",
      image: "./assets/musics/Music 4/IMG.png",
    },
    {
      name: "Inside Out",
      singer: "Charlee",
      path: "./assets/musics/Music 5/The Chainsmokers - Inside Out ft. Charlee.mp3",
      image: "./assets/musics/Music 5/IMG.png",
    },
    {
      name: "New York City",
      singer: "Raftaar x kr$na",
      path: "./assets/musics/Music 6/The Chainsmokers - New York City.mp3",
      image: "./assets/musics/Music 6/IMG.png",
    },
    {
      name: "Don't Let Me Down",
      singer: "Illenium Remix",
      path: "./assets/musics/Music 7/The Chainsmokers - Don't Let Me Down (Illenium Remix).mp3",
      image: "./assets/musics/Music 7/IMG.png",
    },
    {
      name: "Until You Were Gone",
      singer: "Skrux & Saturn Remix",
      path: "./assets/musics/Music 8/The Chainsmokers & Tritonal - Until You Were Gone (Skrux & Saturn Remix).mp3",
      image: "./assets/musics/Music 8/IMG.png",
    },
    {
      name: "All We Know ",
      singer: " Phoebe Ryan",
      path: "./assets/musics/Music 9/The Chainsmokers - All We Know (Ft. Phoebe Ryan).mp3",
      image: "./assets/musics/Music 9/IMG.png",
    },
    {
      name: "Closer Remix",
      singer: "Anki Remix",
      path: "./assets/musics/Muisc 10/The Chainsmokers - Closer ft. Halsey (Anki Remix).mp3",
      image: "./assets/musics/Muisc 10/IMG.png",
    },
  ],
  chillSong: [
    {
      name: "Ghé Qua",
      singer: "Dick x Tofu x PC",
      path: "./assets/musics/ChillMusic/GheQua.mp3",
      image:
        "https://i.ytimg.com/vi/wNH2zUpr_k4/maxresdefault.jpg",
    },
    {
      name: "Lỗi Tại Anh",
      singer: "Alex Lam x Freak D",
      path: "./assets/musics/ChillMusic/LoiTaiAnh.mp3",
      image:
        "https://lyricvn.com/wp-content/uploads/2021/07/8451c24e944f5054e5b8090f254080e0.jpg",
    },
    {
      name: "Đoạn Tuyệt Nàng Đi",
      singer: "Phát Huy T4 x Dino",
      path: "./assets/musics/ChillMusic/DoatTuyetNangDi.mp3",
      image: "https://i.ytimg.com/vi/Vo7N4uSaJV8/maxresdefault.jpg",
    },
    {
      name: "Muốn Nói Với Em",
      singer: "TTeam x BlackBi (Truong Nguyen Lofi mix)",
      path: "./assets/musics/ChillMusic/MuonNoiVoiEm.mp3",
      image: "https://i.ytimg.com/vi/eg29qwPW4V8/maxresdefault.jpg",
    },
    {
      name: "Dù Cho Mai Về Sau",
      singer: "Bùi Trường Linh x FREAK D",
      path: "./assets/musics/ChillMusic/DuChoMaiVeSau.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b273d08e312c1749467b13f34608",
    },
    {
      name: "Chẳng Thể Tìm Được Em",
      singer: "PhucXp ft. Freak D",
      path: "./assets/musics/ChillMusic/ChangTheTimDuocEm.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/a/b/8/6ab8deee3953592dc9a4cfcb81bfb1b8.jpg",
    },
    {
      name: "Chỉ Là Muốn Nói",
      singer: "Khải",
      path: "./assets/musics/ChillMusic/ChiLaMuonNoi.mp3",
      image: "https://i.ytimg.com/vi/LFpKuYb04h0/maxresdefault.jpg",
    },
    {
      name: "Em Bỏ Thuốc Chưa",
      singer: "Bích Phương x Freak D",
      path: "./assets/musics/ChillMusic/EmBoThuocChua.mp3",
      image:
        "https://bloganchoi.com/wp-content/uploads/2020/05/bich-phuong.jpg",
    },
    {
      name: "Giờ Em Đâu",
      singer: "DATKAA x Prod. QT BEATZ ",
      path: "./assets/musics/ChillMusic/GioEmODau.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/2/5/c/125cdc5d9d35bf1e1b664feb124055c0.jpg",
    },
    {
      name: "Hạ Còn Vương Nắng",
      singer: "DATKAA x KIDO x Prod. QT BEATZ",
      path: "./assets/musics/ChillMusic/HaConVuonNang.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/8/4/e/684e70dd4cabcd49a65f076096c1f820.jpg",
    },
    {
      name: "Hẹn Em Kiếp Sau",
      singer: "Lã. x Duy Phúc x TiB",
      path: "./assets/musics/ChillMusic/HenEmKiepSau.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/a/5/c/ca5c05e1e0e068e8d505216ed0794a6e.jpg",
    },
    {
      name: "Hong Kong 1",
      singer: "Nguyễn Trọng Tài x San Ji x Double X",
      path: "./assets/musics/ChillMusic/HongKongI.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/playlist/2018/10/10/5/b/a/2/1539155622062_500.jpg",
    },
    {
      name: "Tháng Năm",
      singer: " Soobin x Freak D",
      path: "./assets/musics/ChillMusic/ThangNam.mp3",
      image: "https://i.ytimg.com/vi/sG9JhIRuTkA/maxresdefault.jpg",
    },
    {
      name: "Chuyện Rằng",
      singer: "Thịnh Suy x Freak D",
      path: "./assets/musics/ChillMusic/Chuyen Rang.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b2734be34a1e036c97d22b5392d5",
    },
    {
      name: "Nợ Ai Đó Lời Xin Lỗi",
      singer: "Bozitt x Freak D",
      path: "./assets/musics/ChillMusic/No Ai Do Loi Xin Loi.mp3",
      image:
        "https://i1.sndcdn.com/artworks-cgg23tTwEz2VnTMX-rxOrJA-t500x500.jpg",
    },
    {
      name: "Dại Khờ",
      singer: "NB3 Hoài Bảo x Freak D",
      path: "./assets/musics/ChillMusic/Dại Khờ (Lofi Ver.) - NB3 Hoài Bảo x Freak D.mp3",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Thức Giấc",
      singer: "Da LAB x Ryan",
      path: "./assets/musics/ChillMusic/ThucGiac.mp3",
      image: "https://i.ytimg.com/vi/R3trO4a49go/maxresdefault.jpg",
    },
    {
      name: "Tình Đầu",
      singer: "Tăng Duy Tân",
      path: "./assets/musics/ChillMusic/TInhDau.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/a/d/1/0ad18644161b1bbe41bc1ca0471600ba.jpg",
    },
    {
      name: "Tình Đẹp Đến Mấy Cũng Tàn",
      singer: "Như Việt Ft Đình Dũng x Vux",
      path: "./assets/musics/ChillMusic/TinhDauDepDenMayCungTan.mp3",
      image:
        "https://thuthuat.taimienphi.vn/cf/Images/tt/2019/12/16/loi-bai-hat-tinh-dep-den-may-cung-tan.jpg",
    },
    {
      name: "Mãi Mãi Không Phải Anh",
      singer: "Thanh Bìnhk",
      path: "./assets/musics/ChillMusic/MaiMaiKhongPhaiAnh.mp3",
      image: "https://i.ytimg.com/vi/q5Kw-Yw0_E8/maxresdefault.jpg",
    },
    {
      name: "Hôm Nay Em Cưới Rồi",
      singer: "Khải Đăng x Freak D",
      path: "./assets/musics/ChillMusic/HomNayEmCuoiRoi.mp3",
      image: "https://i.ytimg.com/vi/NuWAl7-Vkwk/maxresdefault.jpg",
    },
    {
      name: "1402",
      singer: "NHÂN x HIẾU (prod. by wavytrbl)",
      path: "./assets/musics/ChillMusic/1402.mp3",
      image: "./assets/IMG/1402-final.png",
    },
  ],
  tempSong: [],
  setConfigure: function (key, value) {
    app.config[key] = value;
    window.localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(app.config));
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  renderSongs: function () { 
    const html = this.songs.reduce(function (accumulator, song, index) {
      return (
        accumulator +
        `
            <div data-index="${index}" class="song ${
          app.currentIndex === index ? "active" : ""
        } " >
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
            `
      );
    }, "");
    $(".playlist").innerHTML = html;
  },
  songActive: function () {
    const currentSongActive = $(".song.active");
    if(currentSongActive){
      currentSongActive.classList.remove("active");
    }
    const listElementSong = document.querySelectorAll(".song");
    listElementSong.forEach(function (song, index) {
      if (index === app.currentIndex) song.classList.add("active");
    });
  },
  handleEvents: function () {
    // handle when play new song
    const playSong = function () {
      cdAnimate.pause();
      progressBar.value = 0;
      timeDelay().then(function () {
        audio.play();
        cdAnimate.play();
      });
    };
    //RepeatSong
    repeatBtn.onclick = function () {
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        app.isRepeat = true;
      } else {
        app.isRepeat = false;
      }
      app.setConfigure("isRepeat", app.isRepeat);
    };
    //RandomSong
    randomBtn.onclick = function () {
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        app.isRandom = true;
      } else {
        app.isRandom = false;
      }
      app.setConfigure("isRandom", app.isRandom);
    };
    //NextSong
    const btnNext = $(".btn-next");
    btnNext.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      if (!player.classList.contains("playing")) {
        player.classList.add("playing");
      }
      playSong();
      app.songActive();
    };
    //BackSong:
    const btnBack = $(".btn-prev");
    btnBack.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        app.randomSong();
      } else {
        app.backSong();
      }
      if (!player.classList.contains("playing")) {
        player.classList.add("playing");
      }
      playSong();
      app.songActive();
    };
    //rotate CD handle events
    const cdAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 16000,
      iterations: Infinity,
    });
    cdAnimate.pause();

    //Scroll list songs handle events
    const cdWidth = cd.offsetWidth;
    const brWidth = backgroundLight.offsetWidth;
    document.onscroll = function () {
      const scrollRange = window.scrollY || document.documentElement.scrollTop;
      const cdNewWidth = cdWidth - scrollRange <= 0 ? 0 : cdWidth - scrollRange;
      const brNewWidth = brWidth - scrollRange <= 0 ? 0 : brWidth - scrollRange;
      const opacityCd = cdNewWidth / cdWidth;
      const opacityBr = brNewWidth / brWidth;
      cd.style.width = cdNewWidth + "px";
      backgroundLight.style.width = brNewWidth + "px";
      backgroundLight.style.height = brNewWidth + "px";
      cd.style.opacity = opacityCd;
      backgroundLight.style.opacity = opacityBr;
    };

    //Click play button handle events
    playBtn.onclick = function (e) {
      player.classList.toggle("playing");
      if (player.classList.contains("playing")) {
        audio.play();
        cdAnimate.play();
      } else {
        audio.pause();
        cdAnimate.pause();
      }
    };
    //on song is played and change progress bar

    const timeUpdate = function () {
      if (audio.duration) {
        const progressPercent = Math.ceil(
          (audio.currentTime / audio.duration) * 1000
        );
        progressBar.value = progressPercent;
      }
    };
    audio.addEventListener("timeupdate", timeUpdate);

    //on seek progress bar
    progressBar.oninput = function (e) {
      const seekTime = Math.floor((progressBar.value / 1000) * audio.duration);
      audio.currentTime = seekTime;
    };

    // handle song when ended
    audio.onended = function () {
      if (repeatBtn.classList.contains("active")) {
        playSong();
      } else {
        btnNext.click();
      }
    };
    // handle when click song section
    playlistNode.onclick = function (e) {
      const ElementClosest = e.target.closest(".song:not(.active)");
      if (
        ElementClosest ||
        e.target == $(".option") ||
        e.target == $(".option > i")
      ) {
        const onIndex = ElementClosest.getAttribute("data-index");
        app.currentIndex = Number(onIndex);
        app.loadCurrentSong();
        app.songActive();
        cdAnimate.pause();
        progressBar.value = 0;
        player.classList.remove("playing");
        timeDelay().then(function () {
          audio.play();
          player.classList.add("playing");
          cdAnimate.play();
        });
      }
    };
    //Handel shortcut Space,button up-down to pause,play,next,back song
    document.onkeydown = function (e) {
      e.preventDefault();
      switch (e.which) {
        case 32:
          playBtn.click();
          break;
        case 40:
          btnNext.click();
          break;
        case 38:
          btnBack.click();
      }
    };

    window.onbeforeunload = function (e) {
      app.setConfigure("currentIndex", app.currentIndex);
      app.setConfigure("currentTime", audio.currentTime);
      app.setConfigure("currentProgressBar", progressBar.value);
    };

    // mode handel
    app.tempSong = app.songs;
    //NM: normal mode | CM: chill mode
    let NMAudioCrrTime = 0;
    let NMProBarCrrTime = 0;
    let NMCurrIndex = 0;
    let CMAudioCrrTime = 0;
    let CMProBarCrrTime = 0;
    let CMCurrIndex = 0;


    // save data when switch mode
    chillBtn.onmousedown = function () {
      if (chillBtn.classList.contains("on-mode")) {
        CMCurrIndex = app.currentIndex;
        CMAudioCrrTime = audio.currentTime;
        CMProBarCrrTime = progressBar.value;
      } else {
        NMCurrIndex = app.currentIndex;
        NMAudioCrrTime = audio.currentTime;
        NMProBarCrrTime = progressBar.value;
      }

    };

    onOffModeHandle = function () {
      if (chillBtn.classList.contains("on-mode")) {
        player.classList.add("chillMode");
        app.songs = app.chillSong;
        app.renderSongs();
        app.currentIndex = CMCurrIndex;
        app.loadCurrentSong();
        audio.currentTime = CMAudioCrrTime;
        progressBar.value  = CMProBarCrrTime;
        app.songActive();
        if (player.classList.contains("playing")) {
          audio.pause();
          player.classList.remove('playing');
          cdAnimate.pause();
        }
        app.isChillMode = true;
      } else {
        player.classList.remove("chillMode");
        app.songs = app.tempSong;
        app.renderSongs();
        app.currentIndex = NMCurrIndex;
        app.loadCurrentSong();
        audio.currentTime = NMAudioCrrTime;
        progressBar.value  = NMProBarCrrTime;

        app.songActive();
        if (player.classList.contains("playing")) {
          audio.pause();
          player.classList.remove('playing');
          console.log(1);
          cdAnimate.pause();
        }
        app.isChillMode = false;
      }
    };

    if (chillBtn.classList.contains("on-mode")) {
      player.classList.add("chillMode");
      app.songs = app.chillSong;
      app.renderSongs();
      app.loadCurrentSong();
      app.songActive();
      if (player.classList.contains("playing")) {
        audio.play();
      }
      app.isChillMode = true;
    } else {
      player.classList.remove("chillMode");
      app.songs = app.tempSong;
      app.renderSongs();
      app.loadCurrentSong();
      app.songActive();
      if (player.classList.contains("playing")) {
        audio.play();
      }
      app.isChillMode = false;
    }
    
    const handelChillMode = function () {
      app.isNoti = true;
      //set configure mode
      app.setConfigure("isNoti", true);
      notificationNode.classList.remove("noti");
      //main handle
      chillBtn.classList.toggle("on-mode");
      onOffModeHandle();
      //set configure chill mode
      app.setConfigure("isChillMode", app.isChillMode);
    };
    chillBtn.addEventListener("click", handelChillMode);


     // volume control
     audio.volume = 0.7;
     progressVolume.value = audio.volume*100;

     progressVolume.oninput = function(){
      audio.volume = progressVolume.value/100;
     }

     volumeWrapper.onclick = function(e){
       e.stopPropagation();
     }
     progressVolume.onclick = function(e){
       e.stopPropagation();
     }
     
     progressVolume.onmouseup = function(e){
       setTimeout(function(){
         volumeWrapper.classList.remove("vl-on");
       },2000);
     }

     volumeBtn.onclick = function(e){
      volumeWrapper.classList.toggle("vl-on");
     }
    },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  loadConfigure: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    this.isChillMode = this.config.isChillMode; 
    if(this.config.currentIndex != undefined && this.config.currentProgressBar != undefined && this.config.currentTime != undefined)
    {
      this.currentIndex = this.config.currentIndex;
      audio.currentTime = this.config.currentTime;
      progressBar.value = this.config.currentProgressBar;
    } 
    if (this.isRandom) randomBtn.classList.add("active");
    if (this.isRepeat) repeatBtn.classList.add("active");
    if (this.isChillMode) chillBtn.classList.add("on-mode");
  },
  nextSong: function () {
    if (this.currentIndex < this.songs.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  backSong: function () {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  notification: function () {
    if (!this.config.isNoti) {
      setTimeout(function () {
        if (!player.classList.contains("chillMode")) {
          notificationNode.classList.add("noti");
        }
      }, 3000);
      setTimeout(function () {
        notificationNode.classList.remove("noti");
      }, 10000);
    }
  },
  main: function () {
    this.loadConfigure();
    this.defineProperties();
    this.renderSongs();
    // this.loadCurrentSong();
    this.handleEvents();
    this.notification();
  },
};


app.main();

//notification
