const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
function myWatch() {
  let watch = document.querySelector(".time");
  let counter = document.querySelector(".seconds");
  let date = document.querySelector(".date");
  let amPm = document.querySelector(".amPm");
  let changeMode = document.querySelector(".change_mode");
  let actionButton = document.querySelector(".action_button");
  let pauseButton = document.querySelector(".pause_button");
  let resetButton = document.querySelector(".reset_button");
  let toggle1 = document.querySelector(".toggle1");
  let chronoDisplay = document.querySelector(".chrono");
  let centsDisplay = document.querySelector(".hundredths");

  let mainScreen = setInterval(clock, 1000);

  function clock() {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = week[currentTime.getDay()];
    let dayNum = currentTime.getDate();
    if (dayNum < 10) {
      dayNum = `0${dayNum}`;
    }
    let hours = currentTime.getHours();
    let momentAMPM;
    if (hours === 0) {
      hours = `${hours + 12}`;
    }
    if (hours === 12) {
      momentAMPM = "PM";
    }
    if (hours > 12) {
      momentAMPM = "PM";
      hours = `${hours - 12}`;
    } else {
      momentAMPM = "AM";
      hours = `${hours}`;
    }
    if (hours === 12) {
      momentAMPM = "PM";
    }

    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let seconds = currentTime.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    amPm.innerHTML = momentAMPM;
    watch.innerHTML = `${hours}:${minutes}`;
    counter.innerHTML = `${seconds}`;
    date.innerHTML = `${month}/${day}${dayNum}/${year}`;
  }

  function UtcTime() {
    let currentTime = new Date();
    let utcHour = currentTime.getUTCHours();
    let utcMin = currentTime.getUTCMinutes();
    if (utcMin < 10) {
      utcMin = `0${utcMin}`;
    }

    return "UTC" + "  " + utcHour + ":" + utcMin;
  }

  actionButton.addEventListener("click", () => {
    date.innerHTML = UtcTime();
  });

  changeMode.addEventListener("click", () => {
    clearInterval(mainScreen);
    watch.innerHTML = "";
    toggle1.style.visibility = "hidden";
    chronoDisplay.style.visibility = "visible";
    centsDisplay.style.visibility = "visible";
    chronoDisplay.style.display = "flex";
    centsDisplay.style.display = "flex";
    date.innerHTML = "chronometer";
    chronoDisplay.innerHTML = "0.0";
    centsDisplay.innerHTML = ".00";
    counter.innerHTML = "Time";
    amPm.innerHTML = "";

    let cseg = 0;
    let seg = 0;
    let min = 0;
    let crono = 0;
    function cronometro() {
      let currentTime = new Date();
      let myMin = currentTime.getMinutes();
      let myHour = currentTime.getHours();
      if (myMin < 10) {
        myMin = `0${myMin}`;
      }
      if (myHour === 0) {
        myHour = `${myHour + 12}`;
      }
      if (myHour > 12) {
        myHour = `${myHour - 12}`;
      }
      if (cseg < 10) {
        cseg = `0${cseg}`;
      }
      if (min > 60) {
        min = 0;
        seg = 0;
      }
      cseg++;
      if (cseg === 100) {
        seg++;
        cseg = 0;
        if (seg === 60) {
          min++;
          seg = 0;
        }
      }
      if (cseg < 10) {
        cseg = `0${cseg}`;
      }

      date.innerHTML = "chronometer";
      chronoDisplay.innerHTML = min + "." + seg;
      centsDisplay.innerHTML = "." + cseg;
      counter.innerHTML = myHour + ":" + myMin;
    }
    actionButton.addEventListener("click", (e) => {
      crono = setInterval(cronometro, 10);
      e.target.setAttribute(`disabled`, ``);
    });
    pauseButton.addEventListener("click", () => {
      clearInterval(crono);
      actionButton.removeAttribute(`disabled`);
    });
    resetButton.addEventListener("click", () => {
      clearInterval(crono);
      actionButton.removeAttribute(`disabled`);
      chronoDisplay.innerHTML = "0.0";
      centsDisplay.innerHTML = "0.0";
      counter.innerHTML = "Time";
      cseg = 0;
      seg = 0;
      min = 0;
    });
    changeMode.addEventListener("click", () => {
      location.reload();
    });
  });
}
myWatch();
