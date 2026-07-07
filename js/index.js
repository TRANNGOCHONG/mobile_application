window.addEventListener(
  "DOMContentLoaded",
  function () {
    // ページ本体が読み込まれたタイミングで実行するコード

    const item = document.querySelectorAll(".item01, .item02"); // icon

    item.forEach(function (element, index) {
      // 0.1s 毎にずれて表示
      setTimeout(function () {
        element.classList.add("fade-in");

        setTimeout(function () {
          element.classList.add("show");
        }, 800);
      }, 100 * index);
    });
  },
  false
);
