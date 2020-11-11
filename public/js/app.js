const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const weathericon =document.querySelector('#weather-icon')




weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent='Loading'
    message2.textContent = ''
    weathericon.src = ''
    if (location){
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent=data.error
            }
            else {
                message1.textContent = location 
                message2.textContent = data.forecast
                weathericon.src = data.icon[0]
                console.log(data.icon[0])
            }
        })
    })
    }
    else {
        message1.textContent='Please provide a location'
    }
   
   
})