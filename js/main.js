const menuItems = document.querySelectorAll(".menu li");
const commandWindow =
  document.querySelector(".command-window");
const menu = document.querySelector(".menu");

const startMessage = document.getElementById("startMessage");
const mainMenu = document.getElementById("mainMenu");

const gameScreen =
  document.querySelector(".game-screen");




document.addEventListener("pointerdown", () => {
  gameScreen.focus();
});
const pageContent =
  document.getElementById("pageContent");

let current = 0;
let isSelected = false;
let gameState = "start";

// =====================
// BGM（Web Audio API）
// =====================

const bgm = new Audio("./sounds/bgm.mp3");

bgm.loop = true;

const audioContext = new AudioContext();

const bgmSource =
  audioContext.createMediaElementSource(bgm);

const bgmGain =
  audioContext.createGain();

bgmSource.connect(bgmGain);

bgmGain.connect(audioContext.destination);

bgmGain.gain.value = 0;


// 端末によるBGM音量調整
let bgmMaxVolume = 0.05;

if (/iPhone|iPod/.test(navigator.userAgent)) {
  
  bgmMaxVolume = 0.03;
  
}
// =====================
// SE読み込み
// =====================
const selectSE = new Audio("./sounds/decision.mp3");
selectSE.volume = 0.7;

const textSE = new Audio("./sounds/text.mp3");
textSE.volume = 0.7;

const moveSE = new Audio("./sounds/text.mp3");
moveSE.volume = 0.7;

const textLoopSE = new Audio("./sounds/text_loop.mp3");

textLoopSE.loop = true;

textLoopSE.preload = "auto";

textLoopSE.volume = 0.9;

function playMoveSE() {
  
  const se = moveSE.cloneNode();
  
  se.volume = 0.7;
  
  se.play()
    .catch(() => {});
  
}

function keepFocus() {
  
  gameScreen.focus();
  
}

function playTextSE() {
  
  const se = textSE.cloneNode();
  
  se.volume = 0.7;
  
  se.play()
    .catch(() => {});
  
}

function startBGM() {
  
  audioContext.resume();
  
  bgmGain.gain.value = 0;
  
  bgm.play()
    .then(() => {
      
      console.log("BGM再生OK");
      
      
      let volume = 0;
      
      
      const fadeIn = setInterval(() => {
        
        
        volume += 0.005;
        
        
        if (volume >= bgmMaxVolume) {
  
  volume = bgmMaxVolume;
  
  clearInterval(fadeIn);
  
}

        bgmGain.gain.value = volume;
        
      }, 100);
      
    })
    .catch((error) => {
      
      console.log("BGM再生失敗");
      console.log(error);
      
    });
  
}
// ★ここから追加

const pages = {
  
  try: {
    
    title: "我々の経験から",
    
    text: "ここはやってみたくなるようなことを書くページです。"
    
  },
  
  things: {
    
    title: "もののやり方",
    
    text: "ここに内容を書きます。"
    
  },
  
  others: {
    
    title: "もの以外のやり方",
    
    text: "ここに内容を書きます。"
    
  },
  
  introduction: {
    
    title: "紹介ページ",
    
    text: "ここに紹介内容を書きます。"
    
  }
  
};
// ★ここまで追加

// =====================
// 初期カーソル
// =====================

if (menuItems.length > 0) {

  menuItems[current]
    .classList.add("selected");

}



// =====================
// マウス操作
// =====================
menuItems.forEach((item, index) => {
  
  
  // カーソル移動
  
  item.addEventListener(
    "mouseenter",
    () => {
      
      changeCursor(index);
      
    }
  );
  // 決定
  
  item.addEventListener(
  "click",
  () => {
    
    selectItem(index);
    
  }
);
});
/*menuItems.forEach((item, index) => {
  
  item.addEventListener("pointerdown", () => {
    
    changeCursor(index);
    
  });
  
});*/
menuItems.forEach((item, index) => {
  
  item.addEventListener("pointerenter", () => {
    
    changeCursor(index);
    
  });
  
});


function selectItem(index) {
  
  if (isSelected) {
    return;
  }
  
  
  isSelected = true;
  
  
  const item = menuItems[index];
  
  
  item.classList.add("pressed");
  
  
  selectSE.currentTime = 0;
  
  selectSE.play()
    .catch(() => {});
  
  
  const page = item.dataset.page;
  
  
  setTimeout(() => {
    
    openPage(page);
    
    isSelected = false;
    
  }, 1000);
  
}
/*window.addEventListener(
    "keydown",
    (event) => {
      
      console.log("押されたキー:", event.key);
      
      
      // ページ中は無視
      if (gameState === "page") {
        return;
      }
    
    if (event.key === "ArrowDown" ||
  event.key === "ArrowRight") {
  
  
  let next = current + 1;
  
  
  if (next >= menuItems.length) {
    next = 0;
  }
  
  
  changeCursor(next);
  
}
if (event.key === "ArrowUp" ||
  event.key === "ArrowLeft") {
  
  
  let next = current - 1;
  
  
  if (next < 0) {
    next = menuItems.length - 1;
  }
  
  
  changeCursor(next);
  
}
    
    
    
    
    if (event.key === "Enter") {
  
  
  // まだスタート前なら
 if (gameState === "start") {
  
  selectSE.currentTime = 0;
  selectSE.play();
  
  startBGM();
 startMessage.style.display = "none";

mainMenu.classList.add("show");

gameState = "menu";

current = 0;

menuItems.forEach(item => {
  item.classList.remove("selected");
});

menuItems[0].classList.add("selected");

keepFocus();

return;
  
}
  
  
  // スタート後なら決定
  selectItem(current);
  
  
}
    
    
  }
);*/


// =====================
// カーソル変更
// =====================
function changeCursor(index) {
  
  
  if (!menuItems[index]) {
    return;
  }
    if (current === index) {
    return;
  }
  
  // 前の選択を消す
  
  menuItems.forEach((item) => {
    
    item.classList.remove("selected");
    
  });
  
  
  // 新しい選択を付ける
  
  current = index;
  
  menuItems[current]
    .classList.add("selected");
  
  
  playMoveSE();
  
}

function typeWriter(element, text, speed, callback) {
  
  element.textContent = "";
  
  let i = 0;
  
  
  textLoopSE.currentTime = 0;
  
  textLoopSE.play()
    .catch(() => {});
  
  
  setTimeout(() => {
    
    
    const timer = setInterval(() => {
      
      element.textContent += text.charAt(i);
      
      i++;
      
      
      if (i >= text.length) {
        
        clearInterval(timer);
        
        textLoopSE.pause();
        
        textLoopSE.currentTime = 0;
        
        if (callback) {
          callback();
        }
        
      }
      
      
    }, speed);
    
    
  }, 80);
  
}
// =====================
// 最初のタップ
// =====================

function openPage(page) {
  
  gameState = "page";

  console.log("openPage実行", page);

  
  mainMenu.style.display = "none";
  
  pageContent.style.display = "block";
  
  pageContent.classList.add("active");
  
  pageContent.innerHTML = `
    <h1></h1>
    <p></p>
    <button class="back">戻る</button>
  `;
  
  const title =
    pageContent.querySelector("h1");
  
  const text =
    pageContent.querySelector("p");
  
 // タイトルは最初から表示

title.textContent = pages[page].title;


// 本文だけ一文字ずつ表示

typeWriter(
  text,
  pages[page].text,
  50
);

setTimeout(() => {
  keepFocus();
}, 50);
  
  const back =
    pageContent.querySelector(".back");
  
  back.addEventListener("click", () => {
  gameState = "menu";
  pageContent.style.display = "none";
  
  pageContent.classList.remove("active");
  
  mainMenu.style.display = "block";
  
  menuItems.forEach((item) => {
    
    item.classList.remove("pressed");
    
  });
  
 isSelected = false;

setTimeout(() => {
  keepFocus();
}, 50);
});
}
// =====================
// 最初のタップ
// =====================

startMessage.addEventListener("click", () => {
  
  
  selectSE.currentTime = 0;
  
  selectSE.play()
    .then(() => {
      console.log("スタートSE再生OK");
    })
    .catch((error) => {
      console.log("スタートSE再生NG");
      console.log(error);
    });
  
  
  // 少し間を空けてBGM開始
  setTimeout(() => {
    
    startBGM();
    
  }, 300);
  
  
  startMessage.style.display = "none";
  
  mainMenu.classList.add("show");
  
  
  setTimeout(() => {
    keepFocus();
  }, 50);
  
  
});
