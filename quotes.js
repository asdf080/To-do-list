// 명언
const quotes = document.querySelector('#quotes')

fetch('https://api.adviceslip.com/advice')
.then(res => res.json())
.then(data => {
    const word = data.slip.advice;
    quotes.innerText = `"${word}"`
  })

// 날씨
const weather = document.querySelector('#weather');
function onSu(position){
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const API = 'cf7b2cf5d9459d0374323134c46a2819'
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.weather[0].main == 'Clear'){
    weather.innerHTML = '<i class="fa-regular fa-sun"></i> ' + data.main.temp + " ºC"
    }
    else weather.innerText = data.weather[0].main + " " + data.main.temp + " ºC"
  })
}

navigator.geolocation.getCurrentPosition(onSu, () => weather.innerText ="위치 권한을 허용해주세요.");
