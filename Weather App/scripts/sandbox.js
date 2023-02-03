const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img")




const updateUI = (data) =>{

    console.log(data)
    //const cityDets = data.cityDets;
    //const weather = data.weather;

    // destructuring 
    const {cityDets, weather} = data;

    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    </div>    
    `;

    const iconScr = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconScr);


    let timeScr = null;
    if(weather.IsDayTime){
        timeScr = "img/day.svg";
    }
    else{
        timeScr = "img/night.svg";
    }

    time.setAttribute("src", timeScr);


    if (card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
}


const UI = async (area) =>{
    const cityDets = await getCity(area);
    const weather = await getWeather(cityDets.Key);
    return {

        cityDets : cityDets,
        weather : weather
    }
}

cityForm.addEventListener("submit", e =>{
    e.preventDefault();

    const area = cityForm.city.value.trim();
    cityForm.reset();
    console.log(area)

    UI(area).then(data => {updateUI(data)}).catch(err => {console.log(err)})

    localStorage.setItem("area", area)
    
});

const getLocalStorage = localStorage.getItem("area");

if(localStorage.getItem("area")) {
    UI(getLocalStorage).then(data =>{updateUI(data)}).catch(err => {console.log(err)})
}