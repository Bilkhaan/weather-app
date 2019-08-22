const fetchWeather = (city) => {
    fetch('/weather?city='+city).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                meg_1.textContent = data.error
            } else {
                meg_1.textContent = city
                meg_2.textContent = data.forecast
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const city = document.querySelector('#city')
const meg_1 = document.querySelector('#msg-1')
const meg_2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    meg_2.textContent = ""
    meg_1.textContent = "Loading ...."

    if(city.value == "") {
        meg_1.textContent = "City is required"
    } else {
        fetchWeather(city.value)
    }
})