"use strict";

const timer = document.getElementById("timer");
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const btn_reset = document.getElementById("btn_reset");
const target_message = document.getElementById("target_message");

let startTime; // Startボタンクリック時の時刻
let timeoutid; // ID
let stopTime = 0; // Stopまでの経過時間
let targetSecond; // ストップする秒数

// sound
const sound_start = new Audio("./sound/start.mp3");
const sound_stop1 = new Audio("./sound/stop1.mp3");
const sound_stop2 = new Audio("./sound/stop2.mp3");
const sound_reset = new Audio("./sound/reset.mp3");

////////////////////////
// ストップする秒数を入力
////////////////////////
function setTargetSecond() {
  targetSecond = Number(prompt("何秒でストップしますか？", "10"));

  // 正しい数字が入力されなかった場合
  if (isNaN(targetSecond) || targetSecond <= 0) {
    targetSecond = 10;
  }

  // メッセージを変更
  target_message.textContent = `ちょうど${targetSecond}秒でストップしてね！`;
}

// 最初にストップする秒数を入力
setTargetSecond();

// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
btn_start.addEventListener(
  "click",
  function () {
    // Start音を再生
    sound_start.currentTime = 0;
    sound_start.play();

    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },
  false
);

////////////////////////
// Stopボタンクリック
////////////////////////
btn_stop.addEventListener(
  "click",
  function () {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;

    // 設定した秒数台でストップできた場合
    if (
      stopTime >= targetSecond * 1000 &&
      stopTime < (targetSecond + 1) * 1000
    ) {
      // Stop音を再生
      sound_stop2.currentTime = 0;
      sound_stop2.play();

      // 花火をうちあげる
      document.body.classList.add("fireworks");
    } else {
      // 設定した秒数台でストップできなかった場合

      // Stop音を再生
      sound_stop1.currentTime = 0;
      sound_stop1.play();

      // ピンク色の画面のままとする
      document.body.classList.remove("fireworks");
    }
  },
  false
);

////////////////////////
// Resetボタンクリック
////////////////////////
btn_reset.addEventListener(
  "click",
  function () {
    // Reset音を再生
    sound_reset.currentTime = 0;
    sound_reset.play();

    // ボタンを"初期"状態とする
    setButtonStateInitial();
    timer.textContent = "00:00.000";
    stopTime = 0;

    // 花火を消す
    document.body.classList.remove("fireworks");

    // ストップする秒数をもう一度入力
    setTargetSecond();
  },
  false
);

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);

  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");

  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  btn_start.classList.remove("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.remove("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  btn_start.classList.add("js-inactive"); // 非活性
  btn_stop.classList.remove("js-inactive"); // 活性
  btn_reset.classList.add("js-inactive"); // 非活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.remove("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add("timer_appear"); //時間をゆっくり表示
  btn_start.classList.add("js-inactive"); // 非活性
  btn_stop.classList.add("js-inactive"); // 非活性
  btn_reset.classList.remove("js-inactive"); // 活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.remove("js-unclickable");
}
