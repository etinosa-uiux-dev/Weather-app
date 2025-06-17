const form = document.querySelector ('.js-weather-form');
const cityInput = document.querySelector ('.js-city-input');
const cityBtn = document.querySelector ('.js-city-btn');
const displayCity = document.querySelector ('.js-display-input');
const WeatherResults = document.querySelector ('.js-weather-results');

const apiKey = '93a31abd9f9dfc0d0ae193bddb83dd12';

form.addEventListener ('submit', async (event) => {
    event.preventDefault ();

    const city = cityInput.value.trim ();

    if (!city) {
        alert ('Please enter a City or Country.');
        // displayCity.innerHTML = 'Please enter a Country.'
        return;
    } 
     
    // Get spinner element
    const spinner = document.querySelector('.js-spinner');
    spinner.style.display = 'block'; // Show spinner
    WeatherResults.innerHTML = '🌥️';   // Clear old results
    displayCity.innerHTML = '';
    
    try {
        const response = await fetch (
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {

            throw Error ('City or Country not found');
        }

        const data = await response.json ();

        updateWeatherVideo(data.weather[0].main);

        displayCity.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        `
        WeatherResults.innerHTML = `
            <div class="weather-results js-weather-results">
                <div class="wthrslts">
                    <i class="fa-solid fa-temperature-three-quarters"></i>
                    <p>Temperature: ${data.main.temp}°C</p>
                </div>
                <div class="wthrslts">
                    <i class="fa-solid fa-cloud-sun"></i>
                    <p>Weather: ${data.weather[0].description}</p>
                </div>
                <div class="wthrslts">
                    <i class="fa-solid fa-hand-holding-droplet"></i>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
                <div class="wthrslts">
                    <i class="fa-solid fa-wind"></i>
                    <p>Wind: ${data.wind.speed} m/s</p>
                </div>
            </div>
        `
    } catch (error) {
        WeatherResults.innerHTML = `
            <p style="color: red;">Error: ${error.message}</p>
        `
    } finally {
        spinner.style.display = 'none'; // Always hide spinner
    }
});

function updateWeatherVideo(weatherMain) {
    const video = document.querySelector('.js-bg-video');
    const source = video.querySelector('source');

    const weather = weatherMain.toLowerCase();

    let videoFile = 'default.mp4'; // fallback video

    if (weather.includes('clear')) {
        videoFile = 'clear.mp4';
    } else if (weather.includes('clouds')) {
        videoFile = 'clouds.mp4';
    } else if (weather.includes('rain')) {
        videoFile = 'rain.mp4';
    } else if (weather.includes('snow')) {
        videoFile = 'snow.mp4';
    } else if (weather.includes('thunder')) {
        videoFile = 'thunderstorm.mp4';
    } else if (weather.includes('mist') || weather.includes('fog') || weather.includes('haze')) {
        videoFile = 'mist.mp4';
    }

    source.setAttribute('src', `videos/${videoFile}`);
    video.load(); // reload video with new source

    video.play().catch(() => {
        console.warn('Autoplay might be blocked.');
    });
}
