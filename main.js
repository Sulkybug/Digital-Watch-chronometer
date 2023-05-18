const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
function myWatch() {
  let reloj = document.querySelector(".time");
  let contador = document.querySelector(".segundos");
  let date = document.querySelector(".fecha");
  let amPm = document.querySelector(".amPm");
  let changeMode = document.querySelector(".change_mode");
  let actionButton = document.querySelector(".action_button");
  let pauseButton = document.querySelector(".pause_button");
  let resetButton = document.querySelector(".reset_button");
  let toggle1 = document.querySelector(".toggle1");
  let chronoDisplay = document.querySelector(".chrono");
  let centsDisplay = document.querySelector(".centesimas");

  let mainScreen = setInterval(clock, 1000);

  function clock() {
    let horaActual = new Date();
    let year = horaActual.getFullYear();
    let mes = horaActual.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    let dia = week[horaActual.getDay()];
    let diaNum = horaActual.getDate();
    if (diaNum < 10) {
      diaNum = `0${diaNum}`;
    }
    let horas = horaActual.getHours();
    let momentoAMPM;
    if (horas === 0) {
      horas = `${horas + 12}`;
    }
    if (horas === 12) {
      momentoAMPM = "PM";
    }
    if (horas > 12) {
      momentoAMPM = "PM";
      horas = `${horas - 12}`;
    } else {
      momentoAMPM = "AM";
      horas = `${horas}`;
    }
    if (horas === 12) {
      momentoAMPM = "PM";
    }

    let minutos = horaActual.getMinutes();
    if (minutos < 10) {
      minutos = `0${minutos}`;
    }

    let segundos = horaActual.getSeconds();
    if (segundos < 10) {
      segundos = `0${segundos}`;
    }

    amPm.innerHTML = momentoAMPM;
    reloj.innerHTML = `${horas}:${minutos}`;
    contador.innerHTML = `${segundos}`;
    date.innerHTML = `${mes}/${dia}${diaNum}/${year}`;
  }

  function UtcTime() {
    let horaActual = new Date();
    let utcHour = horaActual.getUTCHours();
    let utcMin = horaActual.getUTCMinutes();
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
    reloj.innerHTML = "";
    toggle1.style.visibility = "hidden";
    chronoDisplay.style.visibility = "visible";
    centsDisplay.style.visibility = "visible";
    chronoDisplay.style.display = "flex";
    centsDisplay.style.display = "flex";
    date.innerHTML = "chronometer";
    chronoDisplay.innerHTML = "0.0";
    centsDisplay.innerHTML = ".00";
    contador.innerHTML = "Time";
    amPm.innerHTML = "";

    let cseg = 0;
    let seg = 0;
    let min = 0;
    let crono = 0;
    function cronometro() {
      let horaActual = new Date();
      let myMin = horaActual.getMinutes();
      let myHour = horaActual.getHours();
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
      contador.innerHTML = myHour + ":" + myMin;
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
      contador.innerHTML = "Time";
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
