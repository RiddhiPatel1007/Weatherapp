let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_data_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
 
let W_FeelsLike = document.querySelector(".weather_feelsLike");
let W_humidity = document.querySelector(".weather_humidity");
let W_wind = document.querySelector(".weather_wind");
let W_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// counrty ne pura name convert karva mate

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region"}).of(code);
}

// to get the time and date

const getDateTime = (dt) => {
    const curDate = new Date(dt*1000);
    console.log(curDate);

    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",

    }

    const formatter = new Intl.DateTimeFormat("en-US",options);
    console.log(formatter);
    return formatter.format(curDate);
};
let city = "pune";
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
 let cityInput = document.querySelector(".city_name"); 
 city = cityInput.value;
 console.log(city) ;
 getWeatherData();  
 cityInput.value =" ";
})

const getWeatherData = async () => {
    // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=045630fb97d77d8c760732c640dfa30f `; 
    // const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=045630fb97d77d8c760732c640dfa30f`;
   const weatherUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=045630fb97d77d8c760732c640dfa30f`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data);
        const  { main, name, weather , wind , sys, dt} = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        const weatherCondition = weather[0].main;

if(weatherCondition === "Clear"){
    document.body.style.background =
    "linear-gradient(135deg, #56CCF2, #2F80ED)";
}
else if(weatherCondition === "Clouds"){
    document.body.style.background =
    "linear-gradient(135deg, #BDC3C7, #2C3E50)";
}
else if(weatherCondition === "Rain"){
    document.body.style.background =
    "linear-gradient(135deg, #4B79A1, #283E51)";
}
else if(weatherCondition === "Thunderstorm"){
    document.body.style.background =
    "linear-gradient(135deg, #232526, #414345)";
}
else if(weatherCondition === "Snow"){
    document.body.style.background =
    "linear-gradient(135deg, #E6DADA, #274046)";
}
else{
    document.body.style.background =
    "linear-gradient(135deg, #74ebd5, #ACB6E5)";
}
        w_icon.innerHTML = `
       <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png">
        `;
        w_temperature.innerHTML = `${main.temp.toFixed(1)}°C`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}°C`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}°C`;
        
        W_FeelsLike.innerHTML = `${main.feels_like.toFixed(2)} &#176 `;
        W_humidity.innerHTML = `${main.humidity} % `;
        W_wind.innerHTML = `${wind.speed} m/s`;
        W_pressure.innerHTML = `${main.pressure} hPa`;
        let W_sunrise = document.querySelector(".weather_sunrise");
        let W_sunset = document.querySelector(".weather_sunset");
        W_sunrise.innerHTML =
new Date(sys.sunrise * 1000).toLocaleTimeString();

W_sunset.innerHTML =
new Date(sys.sunset * 1000).toLocaleTimeString();

    } catch (error) {
        console.log(error);
    }
};

window.addEventListener("load", getWeatherData);
