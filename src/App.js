import './App.css';
import Clock from './components/Clock';
import Location from './components/Location';
import Weather from './components/Weather';

function App() {

  const clock = document.querySelector('#clock');
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}`;
  }
  getClock();
  setInterval(getClock, 1000);

  // https://api.openweathermap.org/data/2.5/weather?lat=34.8805498289299&lon=128.620766897026&units=metric&appid=6edee3c2aa182bc44d18ccb204c98a31
  const getData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.1176&lon=129.0451&units=metric&appid=6edee3c2aa182bc44d18ccb204c98a31`;
    const res = await fetch(url);
    const data = await res.json();

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const name = data.name;
    document.querySelector('#location').innerHTML = `${name} / ${lat} / ${lon}`;

    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = data.main.temp;
    const speed = data.wind.speed;
    const main = data.weather[0].main;

    document.querySelector('#weather > span:nth-child(1)').innerHTML = `${main}`;
    document.querySelector('#weather > span:nth-child(2)').innerHTML = `<img src='${icon}'>`;
    document.querySelector('#weather > span:nth-child(3)').innerHTML = `${temp.toFixed(1)}℃`;
    document.querySelector('#weather > span:nth-child(4)').innerHTML = `${speed}m/s`;
  };
  getData();

  return (
    <div className="App">
      <Clock />
      <Location />
      <Weather />
    </div>
  );
}

export default App;
