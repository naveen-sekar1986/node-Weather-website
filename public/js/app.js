//const { response } = require("express")

console.log('client side java script')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent='Loading'
    message2.textContent=''
    if (location){
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent=data.error
            }
            else {
                message1.textContent = location 
                message2.textContent =data.forecast
            }
        })
    })
    }
    else {
        message1.textContent='Please provide a location'
    }
   
   
})