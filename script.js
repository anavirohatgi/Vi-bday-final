let userName = "";
let coinInterval = null;
let coinIntensity = 1;
let coinChaosTimeout = null;
let transitionAllowed = false;

const audio = {
  submit: document.getElementById("submitSound1"),
  wind: document.getElementById("windSound"),
  chime: document.getElementById("chimeSound"),
  wrong: document.getElementById("wrongSound"),
  correct: document.getElementById("correctSound"),
  phaseTwo: document.getElementById("phaseTwoMusic"),
  slotIntro: document.getElementById("slotIntroSound"),
  coin: document.getElementById("coinSound"),
  win1: document.getElementById("winMusic"),
  win2: document.getElementById("winMusic2"),
  startSlot: document.getElementById("startSlotSound"),
  transition: document.getElementById("transitionMusic"),
  birthdayNarration: document.getElementById("birthdayNarration"),
  council: document.getElementById("councilAudio"),
  approved: document.getElementById("approvedAudio"),
  rumble: document.getElementById("rumbleAudio"),
  modiEntry: document.getElementById("modiEntryAudio"),
  warning1: document.getElementById("warningAudio1"),
  warning2: document.getElementById("warningAudio2"),
  modiTheme: document.getElementById("modiTheme"),
  modiText: document.getElementById("modiTextAudio"),
  arrow: document.getElementById("arrowSound"),

  hit1: document.getElementById("hitVoice1"),
  hit2: document.getElementById("hitVoice2"),
  hit3: document.getElementById("hitVoice3"),
  hit4: document.getElementById("hitVoice4"),

  damage: document.getElementById("damageSound"),

  defeat1: document.getElementById("modiDefeatAudio1"),
  defeat2: document.getElementById("modiDefeatAudio2")
};
const defeatMusic = new Audio(
  "https://audio.jukehost.co.uk/019f2381-1bc4-702d-ab47-8cbe36ed0402"
);

const hitVoices = [audio.hit1, audio.hit2, audio.hit3, audio.hit4];

window.addEventListener("load", () => {
  audio.transition.pause();
  audio.transition.currentTime = 0;
  audio.transition.volume = 0;
});

document.getElementById("submitBtn").addEventListener("click", function () {
  userName = document.getElementById("nameInput").value.trim();

  submitSound1.currentTime = 0;
  submitSound1.play();

  document.getElementById("message1").textContent = "1st step successful :)";
});

document.getElementById("myButton").addEventListener("click", function () {
  if (!userName) {
    userName = "there";
  }
  document.body.classList.add("wind-started");
  windSound.currentTime = 0;
  windSound.volume = 0.5;
  windSound.play();
  chimeSound.currentTime = 0;
  chimeSound.volume = 0.18;
  chimeSound.play();
  setTimeout(() => {
    windSound.pause();
    windSound.currentTime = 0;
    chimeSound.pause();
    chimeSound.currentTime = 0;
    phaseTwoMusic.currentTime = 0;
    phaseTwoMusic.volume = 0.75;
    phaseTwoMusic.play();
  }, 3500);
  createWind();
  createLeaves();

  document.querySelector(".container").classList.add("blow-away");

  document.querySelectorAll(".cloud").forEach((cloud) => {
    cloud.classList.add("blow-away");
  });

  setTimeout(() => {
    document.querySelector(".container").style.display = "none";

    document.querySelectorAll(".cloud").forEach((cloud) => {
      cloud.style.display = "none";
    });

    document.getElementById("helloScene").classList.add("show");

    revealGreeting(userName);
  }, 2000);
});
function createWind() {
  const windLayer = document.getElementById("windLayer");

  for (let i = 0; i < 15; i++) {
    const gust = document.createElement("div");

    gust.classList.add("wind");
    gust.style.top = Math.random() * window.innerHeight + "px";
    gust.style.animationDelay = Math.random() * 0.5 + "s";

    windLayer.appendChild(gust);

    setTimeout(() => {
      gust.remove();
    }, 2200);
  }
}

function createLeaves() {
  for (let i = 0; i < 25; i++) {
    setTimeout(createLeaf, i * 80);
  }
}

function createLeaf() {
  const leaf = document.createElement("div");

  leaf.classList.add("leaf");
  leaf.textContent = "🍃";

  leaf.style.top = Math.random() * window.innerHeight + "px";
  leaf.style.left = "-80px";

  document.body.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, 2500);
}

function revealGreeting(name) {
  const text = "Hello, " + name + "!";
  const container = document.getElementById("helloText");
  setTimeout(showContinueQuestion, text.length * 90 + 1800);
  container.innerHTML = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");

    span.className = "char";
    span.textContent = char === " " ? "\u00A0" : char;

    container.appendChild(span);

    setTimeout(() => {
      span.style.transition = "all 0.8s ease";
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, i * 90);
  });
}
function showContinueQuestion() {
  const helloText = document.getElementById("helloText");
  const frog = document.getElementById("frogSkater");

  helloText.classList.add("fade-away");

  if (frog) {
    frog.classList.add("fade-away");
  }

  setTimeout(() => {
    helloText.style.display = "none";

    if (frog) {
      frog.style.display = "none";
    }
    document.getElementById("continuePhase").classList.add("show");
  }, 1800);
}
document.getElementById("noBtn").addEventListener("click", function () {
  const wrongText = document.getElementById("wrongAnswerText");

  wrongText.textContent = "Wrong Answer ( ｡ •̀ ᴖ •́ ｡)💢";
  wrongText.classList.remove("show");

  void wrongText.offsetWidth;

  wrongText.classList.add("show");
  wrongSound.currentTime = 0;
  wrongSound.volume = 0.5;
  wrongSound.play();
});
document.getElementById("yesBtn").addEventListener("click", function () {
  transitionAllowed = true;

  const correctText = document.getElementById("correctAnswerText");
  const wrongText = document.getElementById("wrongAnswerText");

  wrongText.classList.remove("show");
  wrongText.textContent = "";

  correctText.textContent = "Correct Answer (˶ᵔ ᵕ ᵔ˶)";
  correctText.classList.remove("show");
  void correctText.offsetWidth;
  correctText.classList.add("show");

  correctSound.currentTime = 0;
  correctSound.volume = 0.5;

  transitionMusic.pause();
  transitionMusic.currentTime = 0;

  correctSound.onended = () => {
    if (!transitionAllowed) return;

    transitionMusic.currentTime = 0;
    transitionMusic.volume = 0.5;
    transitionMusic.play().catch(() => {
      console.log("Autoplay blocked until user interaction");
    });

    setTimeout(() => {
      transitionAllowed = false;

      document.getElementById("continuePhase").classList.remove("show");
      document.getElementById("continuePhase").style.display = "none";

      document.getElementById("helloScene").classList.remove("show");
      document.getElementById("helloScene").style.display = "none";

      const slotScene = document.getElementById("slotScene");
      slotScene.style.display = "flex";
      slotScene.classList.add("show");

      const slotIntroPhase = document.getElementById("slotIntroPhase");
      slotIntroPhase.style.display = "flex";
      slotIntroPhase.classList.add("show");

      const startSlotBtn = document.getElementById("startSlotBtn");
      startSlotBtn.style.display = "block";
      startSlotBtn.style.margin = "0 auto";
      startSlotBtn.style.opacity = "1";
      startSlotBtn.style.pointerEvents = "auto";

      console.log("slot intro phase shown");
    }, 1800);
  };

  correctSound.play();
});
function startThirdPhase() {
  const helloScene = document.getElementById("helloScene");
  const slotScene = document.getElementById("slotScene");

  phaseTwoMusic.pause();
  phaseTwoMusic.currentTime = 0;

  slotIntroSound.currentTime = 0;
  slotIntroSound.volume = 0.65;
  slotIntroSound.play();

  setTimeout(() => {
    const rain = setInterval(() => {
      createCoinRain();
    }, 700);

    setTimeout(() => {
      clearInterval(rain);
    }, 4000);
  }, 4500);
  setTimeout(() => {
    coinSound.currentTime = 0;
    coinSound.volume = 0.6;
    coinSound.play();
  }, 5700);
}

function startLetterScene() {
  const slotScene = document.getElementById("slotScene");
  const letterScene = document.getElementById("letterScene");

  const youWonText = document.getElementById("youWonText");
  const giftText = document.getElementById("giftText");
  const envelope = document.getElementById("envelopeWrap");

  setTimeout(() => {
    letterScene.classList.add("show");
    slotScene.classList.remove("show");
  }, 1000);

  setTimeout(() => {
    youWonText.classList.add("show");
  }, 4500);

  setTimeout(() => {
    giftText.classList.add("show");
  }, 6200);

  setTimeout(() => {
    youWonText.style.display = "none";
    giftText.style.display = "none";
    envelope.style.opacity = "1";
  }, 7200);

  setTimeout(() => {
    winMusic.currentTime = 0;
    winMusic.volume = 0.7;
    winMusic.play();

    winMusic.onended = () => {
      winMusic2.currentTime = 0;
      winMusic2.volume = 0.7;
      winMusic2.play();
    };
  }, 4500);
}
function createCoinRain() {
  const layer = document.getElementById("coinLayer");

  for (let i = 0; i < 30; i++) {
    const coin = document.createElement("img");

    coin.src = "https://i.ibb.co/4R9Jg4TN/gold-coin.png";

    coin.className = "coin";

    coin.style.left = Math.random() * 100 + "vw";

    coin.style.animationDelay = Math.random() * 1.5 + "s";

    coin.style.animationDuration = 2 + Math.random() * 2 + "s";

    coin.style.transform = `rotate(${Math.random() * 360}deg)`;

    layer.appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 10000);
  }
}
function createCoinBurst(intensity) {
  const layer = document.getElementById("coinLayer");

  const count = Math.floor(5 + intensity * 6);

  for (let i = 0; i < count; i++) {
    const coin = document.createElement("img");
    coin.src = "https://i.ibb.co/4R9Jg4TN/gold-coin.png";
    coin.className = "coin";

    coin.style.left = Math.random() * 100 + "vw";
    coin.style.animationDuration = 0.8 + Math.random() * 1.2 + "s";

    layer.appendChild(coin);

    setTimeout(() => coin.remove(), 12000);
  }
}
function updateCoinAudio() {
  const targetVolume = Math.min(1, 0.2 + coinIntensity * 0.18);

  coinSound.volume += (targetVolume - coinSound.volume) * 0.1;
}
function startCoinEscalation() {
  coinIntensity = 1;

  coinSound.pause();
  coinSound.currentTime = 0;
  coinSound.volume = 0.2;
  coinSound.play();

  coinInterval = setInterval(() => {
    createCoinBurst(coinIntensity);

    if (coinIntensity < 5) {
      coinIntensity += 0.15;
    }

    updateCoinAudio();
  }, 300);

  coinChaosTimeout = setTimeout(() => {
    coinIntensity = 8;
    coinSound.volume = 1;

    const chaos = setInterval(() => {
      createCoinBurst(8);
    }, 120);

    setTimeout(() => {
      clearInterval(chaos);
      clearInterval(coinInterval);

      coinSound.pause();
      coinSound.currentTime = 0;
    }, 1500);
  }, 3000);
}
let envelopeOpened = false;
document.getElementById("pixelEnvelope").addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const envelope = document.getElementById("pixelEnvelope");

  envelope.style.animation = "envelopeZoom 1s ease forwards";

  setTimeout(() => {
    document.getElementById("letterScene").classList.remove("show");

    document.getElementById("birthdayScene").classList.add("show");

    audio.birthdayNarration.currentTime = 0;
    audio.birthdayNarration.play();

    audio.birthdayNarration.onended = () => {
      startApprovalPhase();
    };
  }, 1000);
});
document.getElementById("startSlotBtn").addEventListener("click", () => {
  transitionMusic.pause();
  transitionMusic.currentTime = 0;

  startSlotSound.currentTime = 0;
  startSlotSound.volume = 0.7;
  startSlotSound.play();

  setTimeout(() => {
    document.getElementById("slotIntroPhase").classList.remove("show");
    document.getElementById("slotIntroPhase").style.display = "none";

    const slotVideo = document.getElementById("slotAnimation");
    slotVideo.style.display = "block";
    slotVideo.currentTime = 0;

    slotVideo.onended = startLetterScene;

    slotVideo.play();

    startThirdPhase();
  }, 1200);
});
function startApprovalPhase() {
  console.log("APPROVAL PHASE STARTED");

  document.getElementById("birthdayScene").classList.remove("show");

  document.getElementById("approvalScene").classList.add("show");

  audio.council.currentTime = 0;
  audio.council.volume = 1;
  audio.council.play();

  document.getElementById("councilDarkness").style.animation =
    "darknessFade 2s forwards";

  // Spotlight
  document.getElementById("shrekSpotlight").style.animation =
    "spotlightAppear 2s forwards";

  // Shrek enters
  document.getElementById("councilShrek").style.animation =
    "shrekAscend 5s ease forwards";

  // Council text appears
  setTimeout(() => {
    document.getElementById("councilText").style.animation =
      "councilAppear 2s forwards";
  }, 1500);

  // After council speech ends
  audio.council.onended = () => {
    document.getElementById("approvedText").style.animation =
      "approvedBoom .8s ease forwards";

    audio.approved.currentTime = 0;
    audio.approved.volume = 1;
    audio.approved.play();
  };
}

let transitionStarted = false;

// 1 second before approval audio ends
audio.approved.addEventListener("timeupdate", () => {
  if (
    !transitionStarted &&
    audio.approved.duration &&
    audio.approved.duration - audio.approved.currentTime <= 1
  ) {
    transitionStarted = true;

    // Rumble starts
    audio.rumble.currentTime = 0;
    audio.rumble.volume = 1;
    audio.rumble.play();

    startModiTransition();
  }
});

function startModiTransition() {
  const scene = document.getElementById("approvalScene");

  scene.classList.add("screenShake");

  thunderFlash();

  setTimeout(thunderFlash, 250);
  setTimeout(thunderFlash, 550);
  setTimeout(thunderFlash, 850);

  audio.rumble.currentTime = 0;
  audio.rumble.play();

  setTimeout(() => {
    document.getElementById("councilText").style.animation =
      "fadeOut 1s forwards";

    document.getElementById("approvedText").style.animation =
      "fadeOut 1s forwards";

    document.getElementById("councilShrek").style.animation =
      "fadeOut 1s forwards";
  }, 1000);

  setTimeout(() => {
    scene.classList.remove("screenShake");

    startModiPhase();
  }, 2000);
}
function thunderFlash() {
  const flash = document.getElementById("thunderLayer");

  flash.classList.remove("thunderFlash");

  void flash.offsetWidth;

  flash.classList.add("thunderFlash");
}
function startModiPhase() {
  const modi = document.getElementById("modiFinal");

  audio.warning1.play();

  audio.warning1.onended = () => {
    audio.warning2.play();

    audio.warning2.onended = startModiEntry;
  };

  function startModiEntry() {
    modi.style.animation = "modiDescend 2s ease forwards";

    audio.modiEntry.play();

    audio.modiEntry.onended = () => {
      runModiDialogue();
    };
  }
}
function typeLine(text) {
  const dialogue = document.getElementById("modiDialogue");

  dialogue.textContent = "";

  let i = 0;

  const typing = setInterval(() => {
    dialogue.textContent += text[i];

    i++;

    if (i >= text.length) {
      clearInterval(typing);
    }
  }, 45);
}

function runModiDialogue() {
  console.log("Dialogue started");
  const dialogue = document.getElementById("modiDialogue");

  const lines = [
    "MITRON... I HAVE ARRIVED.",

    "THE COUNCIL LIED.",

    "YOUR APPLICATION HAS BEEN REJECTED."
  ];

  let index = 0;

  function showNext() {
    if (index >= lines.length) {
      showHowever();
      return;
    }

    audio.modiText.currentTime = 0;
    audio.modiText.volume = 0.8;
    audio.modiText.play();

    typeLine(lines[index]);

    dialogue.style.animation = "simpleFadeIn 1s forwards";

    setTimeout(() => {
      audio.modiText.pause();
      audio.modiText.currentTime = 0;
    }, 1300);

    setTimeout(() => {
      dialogue.style.animation = "simpleFadeOut 1s forwards";
    }, 1800);

    setTimeout(() => {
      index++;
      showNext();
    }, 3000);
  }

  showNext();
}

function showHowever() {
  const however = document.getElementById("howeverText");

  however.style.opacity = "1";
  however.style.animation = "simpleFadeIn 1s forwards";

  setTimeout(() => {
    however.style.animation = "simpleFadeOut 1s forwards";
  }, 2500);

  // Start battle theme during "However..."
  setTimeout(() => {
    audio.modiTheme.currentTime = 0;
    audio.modiTheme.volume = 0.65;
    audio.modiTheme.play();
  }, 1800);

  setTimeout(() => {
    startBattle();
  }, 3800);
}
function startBattle() {
  const hp = document.getElementById("modiHealthWrap");

  const attack = document.getElementById("attackBtn");

  hp.style.opacity = "1";
  attack.style.opacity = "1";

  hp.style.animation = "simpleFadeIn 1s forwards";

  attack.style.animation = "simpleFadeIn 1s forwards";

  document.getElementById("modiFinal").classList.add("modiJumping");
}

let modiHP = 100;
document.getElementById("attackBtn").addEventListener("click", attackModi);
function attackModi() {
  document.getElementById("modiHealthFill").style.width = "100%";
  fireArrow();

  modiHP -= 10;

  if (modiHP < 0) {
    modiHP = 0;
  }

  document.getElementById("modiHealthFill").style.width = modiHP + "%";

  if (modiHP <= 0) {
    startModiDefeatSequence();
    return;
  }
}

function startModiDefeatSequence() {
  if (modiDefeated) return;

  modiDefeated = true;

  document.getElementById("attackBtn").style.pointerEvents = "none";

  audio.modiTheme.pause();

  setTimeout(() => {
    audio.defeat1.currentTime = 0;
    audio.defeat1.play();

    audio.defeat1.onended = () => {
      audio.defeat2.currentTime = 0;
      audio.defeat2.play();

      fadeEverythingOut();

      setTimeout(() => {
        document.getElementById("blackTransition").classList.add("show");
      }, 300);

      audio.defeat2.onended = () => {
        typeDefeatText("Mitron...", () => {
          setTimeout(() => {
            typeDefeatText("Nevermind, you defeated me.", () => {
              document.getElementById("whiteTransition").classList.add("show");

              setTimeout(() => {
                const defeatImage = document.getElementById("defeatImage");

                defeatImage.style.display = "block";
                defeatImage.style.opacity = "1";

                defeatMusic.pause();
                defeatMusic.currentTime = 0;
                defeatMusic.volume = 1;
                defeatMusic.play().catch(console.error);

                defeatImage.style.animation = "defeatSpinIn 1.6s ease forwards";

                setTimeout(() => {
                  setTimeout(() => {
                    defeatImage.style.transition = "opacity 1.5s ease";

                    defeatImage.style.opacity = "0";

                    setTimeout(() => {
                      defeatImage.style.display = "none";

                      const text = document.getElementById("postVictoryText");

                      text.classList.add("show");

                      setTimeout(() => {
                        text.classList.remove("show");

                        setTimeout(() => {
                          defeatMusic.pause();
                          defeatMusic.currentTime = 0;

                          document
                            .getElementById("roadmapScene")
                            .classList.add("show");
                        }, 1000);
                      }, 3000);
                    }, 1500);
                  }, 3000);
                }, 1600);
              }, 2000);
            });
          }, 1000);
        });
      };
    };
  }, 300);
}
let modiDefeated = false;
function fireArrow() {
  audio.arrow.currentTime = 0;
  audio.arrow.volume = 0.7;
  audio.arrow.play();

  const layer = document.getElementById("arrowLayer");

  const arrow = document.createElement("img");

  arrow.src = "https://i.ibb.co/2YH88fMs/arrow-attack.png";

  arrow.className = "attackArrow";

  layer.appendChild(arrow);

  const attackBtn = document.getElementById("attackBtn");

  const btnRect = attackBtn.getBoundingClientRect();

  const startX = btnRect.left + btnRect.width / 2 - 70;

  const startY = btnRect.top;

  const modi = document.getElementById("modiFinal");

  const rect = modi.getBoundingClientRect();

  const targetX = rect.left + rect.width / 3;

  const targetY = rect.top + rect.height / 2;

  arrow.animate(
    [
      {
        left: startX + "px",
        top: startY + "px"
      },

      {
        left: targetX + "px",
        top: targetY + "px"
      }
    ],
    {
      duration: 500,
      easing: "linear"
    }
  );

  setTimeout(() => {
    audio.damage.currentTime = 0;
    audio.damage.volume = 0.8;
    audio.damage.play();

    showBattleMessage();

    arrow.remove();
  }, 500);
}

const hitMessages = [
  "CRITICAL HIT!",
  "DEMOCRACY IN DANGER!",
  "SUPER EFFECTIVE!",
  "CJP!",
  "MODI TOOK 10 DAMAGE!",
  "COMBO!",
  "VICIOUS STRIKE!",
  "NATIONAL DAMAGE!",
  "DEVASTATING BLOW!",
  "HE WAS NOT READY."
];
let messageSide = false;
let remainingMessages = [];
function getBattleMessage() {
  if (remainingMessages.length === 0) {
    remainingMessages = [...hitMessages];
  }

  const index = Math.floor(Math.random() * remainingMessages.length);

  return remainingMessages.splice(index, 1)[0];
}
function showBattleMessage() {
  const voice = hitVoices[Math.floor(Math.random() * hitVoices.length)];

  voice.currentTime = 0;
  voice.volume = 0.9;
  voice.play();

  const el = document.getElementById("battleMessage");

  const msg = getBattleMessage();

  el.innerHTML = msg + ' <span class="damageText">-10 HP</span>';

  el.classList.remove("battleLeft", "battleRight", "battlePop");

  if (messageSide) {
    el.classList.add("battleLeft");
  } else {
    el.classList.add("battleRight");
  }

  messageSide = !messageSide;

  void el.offsetWidth;

  el.classList.add("battlePop");
}

function typeDefeatText(text, callback) {
  const box = document.getElementById("defeatText");

  const typing = document.getElementById("modiTextAudio");

  box.innerHTML = "";
  box.style.opacity = "1";

  let i = 0;

  typing.currentTime = 0;
  typing.play();

  const interval = setInterval(() => {
    box.innerHTML += text[i];

    i++;

    if (i >= text.length) {
      clearInterval(interval);

      typing.pause();

      setTimeout(() => {
        box.style.transition = "opacity 1.5s ease";

        box.style.opacity = "0";

        setTimeout(() => {
          callback?.();
        }, 1500);
      }, 1000);
    }
  }, 70);
}
function showDefeatImage() {
  const img = document.getElementById("defeatImage");

  img.style.display = "block";

  img.style.opacity = "0";
  img.style.transform = "translate(-50%,-50%) scale(.6)";

  // force repaint

  void img.offsetWidth;

  // fade in

  img.style.transition = "opacity 1.2s ease";

  img.style.opacity = "1";

  // after fade finishes

  setTimeout(() => {
    img.style.animation = "defeatAttack 2s ease forwards";
  }, 1200);
}
function showDefeatTexts() {
  const text = document.getElementById("defeatText");

  text.style.animation = "simpleFadeIn 1s forwards";

  typeDefeatText("Mitron...");

  setTimeout(() => {
    text.style.animation = "simpleFadeOut 1s forwards";
  }, 1800);

  setTimeout(() => {
    text.style.animation = "simpleFadeIn 1s forwards";

    typeDefeatText("Nevermind, you defeated me.");
  }, 3300);

  setTimeout(() => {
    text.style.animation = "simpleFadeOut 1s forwards";
  }, 6200);

  setTimeout(() => {
    const modiExit = document.getElementById("modiExit");

    modiExit.style.animation = "modiExitEnter 2.3s ease-out forwards";

    setTimeout(() => {
      document.getElementById("swipeInstruction").style.animation =
        "simpleFadeIn 1s forwards";

      enableModiSwipe();
    }, 2300);
  }, 7600);
}

function startWhiteTransition() {
  const white = document.getElementById("whiteTransition");

  white.style.transition = "opacity 1.8s ease";

  white.style.opacity = "1";

  setTimeout(() => {
    // NEXT SCENE GOES HERE
  }, 1800);
}
function fadeEverythingOut() {
  const approvalScene = document.getElementById("approvalScene");

  approvalScene.querySelectorAll("*").forEach((el) => {
    if (el.id !== "blackTransition" && el.id !== "whiteTransition") {
      el.style.transition = "opacity 2s ease";

      el.style.opacity = "0";
    }
  });
}

function openCheckpoint(videoUrl) {
  const roadmap = document.getElementById("roadmapScene");

  roadmap.style.opacity = "0";

  setTimeout(() => {
    roadmap.style.display = "none";

    const video = document.getElementById("checkpointVideo");

    const source = document.getElementById("checkpointSource");

    source.src = videoUrl;

    video.load();

    video.muted = false;
    video.volume = 1;

    video.play();
    document.getElementById("checkpointVideoScene").classList.add("show");
  }, 1000);
}
const cp1 = document.getElementById("checkpoint1");

cp1.onclick = () => {
  window.completedCP1 = true;

  document.getElementById("cp1Guide").style.display = "none";

  cp1.style.pointerEvents = "none";
  cp1.style.display = "none";

  openCheckpoint(
    "https://res.cloudinary.com/dslysipp0/video/upload/v1783006168/cp1_ztnaup.mp4"
  );
};
const cp2 = document.getElementById("checkpoint2");

cp2.onclick = () => {
  window.completedCP2 = true;

  openCheckpoint(
    "https://res.cloudinary.com/dslysipp0/video/upload/v1782902363/CP2-DPS_ceqixh.mp4",
    false
  );
};
const cp3 = document.getElementById("checkpoint3");

cp3.onclick = () => {
  window.completedCP3 = true;

  document.getElementById("cp3Guide").style.display = "none";

  openCheckpoint(
    "https://res.cloudinary.com/dslysipp0/video/upload/v1782909597/CP3-PIANIST_VID_fphbnn.mp4"
  );
};
const cp4 = document.getElementById("checkpoint4");

cp4.onclick = () => {
  window.completedCP4 = true;

  openCheckpoint(
    "https://res.cloudinary.com/dslysipp0/video/upload/v1782909596/CP-4_-_CMBYN_-_VID_hbu0oi.mp4"
  );
};

const cp5 = document.getElementById("checkpoint5");

cp5.onclick = () => {
  const roadmapImage = document.getElementById("roadmapImage");
  const cp5LetterUrl = "https://i.ibb.co/6cpF3544/CP5-LETTER.jpg";

  document.getElementById("cp5Guide").style.display = "none";

  cp5.style.pointerEvents = "none";

  roadmapImage.style.transition = "opacity 1s ease";
  roadmapImage.style.opacity = "0";

  setTimeout(() => {
    roadmapImage.src = cp5LetterUrl;
    roadmapImage.style.objectFit = "contain";
    roadmapImage.style.background = "black";
    roadmapImage.style.opacity = "1";
    setTimeout(() => {
      roadmapImage.style.opacity = "0";

      setTimeout(() => {
        document.getElementById("roadmapScene").style.display = "none";

        const videoScene = document.getElementById("checkpointVideoScene");
        const video = document.getElementById("checkpointVideo");
        const source = document.getElementById("checkpointSource");

        source.src =
          "https://res.cloudinary.com/dslysipp0/video/upload/v1782987010/the_end_bwz6yi.mp4";

        video.load();
        video.muted = false;
        video.volume = 1;

        videoScene.classList.add("show");

        video.onended = () => {
          videoScene.classList.remove("show");
          showEndCredits();
        };

        video.play();
      }, 1000);
    }, 25000);
  }, 1000);
};

const checkpointVideo = document.getElementById("checkpointVideo");

checkpointVideo.addEventListener("ended", () => {
  const roadmapImage = document.getElementById("roadmapImage");
  const roadmap = document.getElementById("roadmapScene");

  if (window.completedCP3) {
    const cp4ImageUrl = "https://i.ibb.co/KxZRYKcR/roadmap-CP4.jpg";

    document.getElementById("checkpointVideoScene").classList.remove("show");

    document.getElementById("cp2Guide").style.display = "none";
    document.getElementById("checkpoint2").style.display = "none";
    document.getElementById("checkpoint2").style.pointerEvents = "none";

    document.getElementById("cp3Guide").style.display = "none";
    document.getElementById("checkpoint3").style.display = "none";
    document.getElementById("checkpoint3").style.pointerEvents = "none";

    document.getElementById("cp5Guide").style.display = "none";
    document.getElementById("checkpoint5").style.display = "none";
    document.getElementById("checkpoint5").style.pointerEvents = "none";

    const cp4Guide = document.getElementById("cp4Guide");
    const checkpoint4 = document.getElementById("checkpoint4");

    cp4Guide.style.display = "none";
    cp4Guide.style.opacity = "0";

    checkpoint4.style.display = "none";
    checkpoint4.style.pointerEvents = "none";

    roadmap.style.display = "block";
    roadmap.style.visibility = "visible";
    roadmap.style.opacity = "0";

    roadmapImage.style.objectFit = "cover";
    roadmapImage.style.background = "transparent";

    const preload = new Image();

    preload.onload = () => {
      roadmapImage.src = cp4ImageUrl;
      roadmapImage.style.opacity = "1";

      requestAnimationFrame(() => {
        roadmap.style.opacity = "1";
      });

      setTimeout(() => {
        cp4Guide.style.display = "block";
        cp4Guide.style.opacity = "0";

        requestAnimationFrame(() => {
          cp4Guide.style.opacity = "1";
        });

        checkpoint4.style.display = "block";
        checkpoint4.style.opacity = "1";
        checkpoint4.style.pointerEvents = "auto";

        window.completedCP3 = false;
      }, 1000);
    };

    preload.onerror = () => {
      console.log("CP4 image failed to load:", cp4ImageUrl);
    };

    preload.src = cp4ImageUrl;
    return;
  }

  if (window.completedCP4) {
    const cp5ImageUrl = "https://i.ibb.co/xt2CqNDz/roadmap-CP5.jpg";

    document.getElementById("checkpointVideoScene").classList.remove("show");

    document.getElementById("cp4Guide").style.display = "none";
    document.getElementById("checkpoint4").style.display = "none";
    document.getElementById("checkpoint4").style.pointerEvents = "none";

    const cp5Guide = document.getElementById("cp5Guide");
    const checkpoint5 = document.getElementById("checkpoint5");

    cp5Guide.style.display = "none";
    cp5Guide.style.opacity = "0";

    checkpoint5.style.display = "none";
    checkpoint5.style.pointerEvents = "none";

    roadmap.style.display = "block";
    roadmap.style.visibility = "visible";
    roadmap.style.opacity = "0";

    roadmapImage.style.objectFit = "cover";
    roadmapImage.style.background = "transparent";

    const preload = new Image();

    preload.onload = () => {
      roadmapImage.src = cp5ImageUrl;
      roadmapImage.style.opacity = "1";

      requestAnimationFrame(() => {
        roadmap.style.opacity = "1";
      });

      setTimeout(() => {
        cp5Guide.style.display = "block";
        cp5Guide.style.opacity = "0";

        requestAnimationFrame(() => {
          cp5Guide.style.opacity = "1";
        });

        checkpoint5.style.display = "block";
        checkpoint5.style.opacity = "1";
        checkpoint5.style.pointerEvents = "auto";

        window.completedCP4 = false;
      }, 1000);
    };

    preload.onerror = () => {
      console.log("CP5 roadmap image failed to load:", cp5ImageUrl);
    };

    preload.src = cp5ImageUrl;
    return;
  }

  document.getElementById("checkpointVideoScene").classList.remove("show");

  roadmap.style.display = "block";
  roadmap.style.visibility = "visible";
  roadmap.style.opacity = "1";

  if (window.completedCP1) {
    roadmapImage.style.transition = "opacity 1s ease";
    roadmapImage.style.opacity = "0";

    setTimeout(() => {
      roadmapImage.src = "https://i.ibb.co/4hN2Z2j/CP-2-AND-3.jpg";
      roadmapImage.style.opacity = "1";

      const cp2Guide = document.getElementById("cp2Guide");
      cp2Guide.style.display = "block";
      cp2Guide.style.opacity = "0";

      setTimeout(() => {
        cp2Guide.style.opacity = "1";
      }, 10);

      const checkpoint2 = document.getElementById("checkpoint2");
      checkpoint2.style.display = "block";
      checkpoint2.style.opacity = "1";
      checkpoint2.style.pointerEvents = "auto";

      window.completedCP1 = false;
    }, 1000);
  } else if (window.completedCP2) {
    const cp2Guide = document.getElementById("cp2Guide");

    cp2Guide.style.display = "block";
    cp2Guide.style.opacity = "0";

    requestAnimationFrame(() => {
      cp2Guide.style.opacity = "1";
    });

    setTimeout(() => {
      const cp3Guide = document.getElementById("cp3Guide");

      cp3Guide.style.display = "block";

      requestAnimationFrame(() => {
        cp3Guide.style.opacity = "1";
      });
    }, 2000);

    setTimeout(() => {
      const cp3Guide = document.getElementById("cp3Guide");

      cp3Guide.style.display = "block";

      requestAnimationFrame(() => {
        cp3Guide.style.opacity = "1";
      });

      const checkpoint3 = document.getElementById("checkpoint3");

      checkpoint3.style.display = "block";
      checkpoint3.style.opacity = "1";
      checkpoint3.style.pointerEvents = "auto";
    }, 2000);

    window.completedCP2 = false;
  }
});
function showEndCredits() {
  const creditsAudio1 = new Audio(
    "https://audio.jukehost.co.uk/019f233f-e911-70ff-bc60-75553edb41c9"
  );

  const creditsAudio2 = new Audio(
    "https://audio.jukehost.co.uk/019f233f-e8de-734f-aa53-9901226294b7"
  );
  const credits = document.createElement("div");
  const topLeftVideo = document.createElement("video");

  topLeftVideo.src =
    "https://res.cloudinary.com/dslysipp0/video/upload/v1782989672/video-remove-background-1782989565198_ymuqwy.mp4";

  topLeftVideo.autoplay = true;
  topLeftVideo.loop = true;
  topLeftVideo.muted = true;
  topLeftVideo.playsInline = true;

  topLeftVideo.style.position = "absolute";
  topLeftVideo.style.top = "0";
  topLeftVideo.style.left = "0";
  topLeftVideo.style.width = "320px";
  topLeftVideo.style.pointerEvents = "none";
  topLeftVideo.style.zIndex = "1";

  const bottomRightImage = document.createElement("img");

  bottomRightImage.src = "https://i.ibb.co/ZzJYK4H1/end-credit.jpg";

  bottomRightImage.style.position = "absolute";
  bottomRightImage.style.bottom = "50px";
  bottomRightImage.style.right = "100px";
  bottomRightImage.style.pointerEvents = "none";
  bottomRightImage.style.zIndex = "1";
  bottomRightImage.style.height = "auto";
  bottomRightImage.style.objectFit = "contain";
  bottomRightImage.style.width = "250px";

  credits.id = "endCredits";
  credits.style.position = "fixed";
  credits.style.inset = "0";
  credits.style.background = "white";
  credits.style.opacity = "0";
  credits.style.visibility = "visible";
  credits.style.zIndex = "500000";
  credits.style.display = "flex";
  credits.style.justifyContent = "center";
  credits.style.alignItems = "center";
  credits.style.textAlign = "center";
  credits.style.fontFamily =
    "Clarendon, 'Clarendon BT', 'Times New Roman', serif";
  credits.style.fontSize = "3rem";
  credits.style.color = "black";
  credits.style.transition = "opacity 2s ease";

  const creditText = document.createElement("div");

  creditText.style.opacity = "0";
  creditText.style.transition = "opacity 1.5s ease";
  creditText.style.lineHeight = "1.4";
  creditText.style.position = "relative";
  creditText.style.zIndex = "2";

  credits.appendChild(topLeftVideo);
  credits.appendChild(bottomRightImage);
  credits.appendChild(creditText);
  document.body.appendChild(credits);
  creditsAudio1
    .play()
    .then(() => {
      console.log("Audio 1 started");
    })
    .catch((err) => {
      console.log("Audio 1 failed", err);
    });
  topLeftVideo.play();

  requestAnimationFrame(() => {
    credits.style.opacity = "1";
  });

  setTimeout(() => {
    creditText.innerHTML = "Directed by<br>ANAVI ROHATGI";
    creditText.style.opacity = "1";
  }, 2000);

  setTimeout(() => {
    creditText.style.opacity = "0";
  }, 6000);

  setTimeout(() => {
    creditText.innerHTML = "Executive Producer<br>ChatGPT";
    creditText.style.opacity = "1";
  }, 8000);
  creditsAudio1.onended = () => {
    console.log("Audio 1 ended");
    creditsAudio2.play();

    console.log("Audio 2 started");
  };
  creditsAudio2.onended = () => {
    console.log("Audio 2 ended");

    credits.style.transition = "opacity 2s ease";
    credits.style.opacity = "0";

    setTimeout(() => {
      const endScreen = document.createElement("div");

      endScreen.style.position = "fixed";
      endScreen.style.inset = "0";
      endScreen.style.background = "black";
      endScreen.style.zIndex = "999999";
      endScreen.style.display = "flex";
      endScreen.style.justifyContent = "center";
      endScreen.style.alignItems = "center";
      endScreen.style.opacity = "0";
      endScreen.style.transition = "opacity 2s ease";

      endScreen.innerHTML = `
      <div style="
        color:white;
        font-size:5rem;
        font-family:'Pixelify Sans',sans-serif;
        letter-spacing:8px;
      ">
        THE END
      </div>
    `;

      document.body.appendChild(endScreen);

      requestAnimationFrame(() => {
        endScreen.style.opacity = "1";
      });
    }, 2000);
  };
}