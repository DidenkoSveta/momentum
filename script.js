 const time = document.querySelector('.time')
 const day = document.querySelector('.day')
 const weekday = document.querySelector('.weekday')
 const greeting = document.querySelector('.greeting')
 const bgReload = document.querySelector('.bg-reload')
 const blockquote = document.querySelector('blockquote')
 const btnQuote = document.querySelector('.btn-quote')
 const weatherIcon = document.querySelector('.weather-icon')
 const temperature = document.querySelector('.temperature')
 const wind = document.querySelector('.wind')
 const humidity = document.querySelector('.humidity')
 const weatherDescription = document.querySelector('.weather-description')
 const city = document.querySelector('.city')
 const nameInput = document.querySelector('.name_input')
 const nameText = document.querySelector('.name_text')
 const focusInput = document.querySelector('.focus_input')
 const focusText = document.querySelector('.focus_text')
 const cityInput = document.querySelector('.city_input')
 const cityText = document.querySelector('.city_text')
 const quote = document.querySelector('.quote')
 const cityLabel = document.querySelector('.city_label')
 let vh = window.innerHeight * 0.01;
 let bgrArr = []
 let isChangeBgAble = true

 document.documentElement.style.setProperty('--vh', `${vh}px`);

 function showTime() {
   const today = new Date()
   const hour = today.getHours()
   const min = today.getMinutes()
   const sec = today.getSeconds()
   day.innerHTML = rusDay()
   weekday.innerHTML = rusWeekday()
   time.innerHTML = `<span class="time_block">  ${hour} </span> <span> : </span><span class="time_block">${addZerro(min)} </span> <span> : </span><span class="time_block"> ${addZerro(sec)} </span>`
   if (sec == 00 && min == 00) {
     setGreet()
     setBg()
     getWeather()
   }
   setTimeout(showTime, 1000)
 }

 function addZerro(n) {
   if (n < 10) {
     return `0${n}`
   } else return n
 }

 function rusDay() {
   const date = new Date()
   const options = {
     day: 'numeric',
     month: 'long'
   }
   return date.toLocaleDateString('ru-RU', options)
 }

 function rusWeekday() {
   const date = new Date()
   const options = {
     weekday: 'long'
   }
   return date.toLocaleDateString('ru-RU', options)
 }

 function setGreet() {
   let today = new Date(),
     hour = today.getHours()
   if (hour < 6 || hour > 23) {
     greeting.textContent = 'Бурной ночи,  '
   } else if (hour < 12) {
     greeting.textContent = 'Доброе утречко,  '
   } else if (hour < 18) {
     greeting.textContent = 'Хорошего дня,  '
   } else {
     greeting.textContent = 'Веселого вечера,  '
   }
 }

 function newName(el) {
   nameInput.value = ''
   setName(el)
 }

 function newCity(el) {
   cityInput.value = ''
   setCity(el)
 }

 function newFocus(el) {
   focusInput.value = ''
   setFocus(el)
 }

 function blurName() {
   if (nameInput.value.trim() === '') {
     console.log('из блура')
     nameText.innerText = localStorage.getItem('name')
     nameInput.classList.add('hidden')
     nameText.classList.remove('hidden')
     getName()
   } else {
     localStorage.setItem('name', nameInput.value)
     nameText.innerText = localStorage.getItem('name')
     nameInput.classList.add('hidden')
     nameText.classList.remove('hidden')
     getName()
     nameInput.setAttribute('placeholder', 'Введите имя')
     nameInput.blur()
   }

 }

 function blurFocus() {
   if (focusInput.value.trim() === '') {
     focusText.innerText = localStorage.getItem('focus')
     focusInput.classList.add('hidden')
     focusText.classList.remove('hidden')
     getFocus()
   } else {
     localStorage.setItem('focus', focusInput.value)
     focusText.innerText = localStorage.getItem('focus')
     focusInput.classList.add('hidden')
     focusText.classList.remove('hidden')
     getFocus()
     focusInput.setAttribute('placeholder', 'Введите дело')
     focusInput.blur()
   }

 }

 function blurCity() {
   if (cityInput.value.trim() === '') {
     cityText.innerText = localStorage.getItem('city')
     cityInput.classList.add('hidden')
     cityText.classList.remove('hidden')
     getCity()
   } else {
     localStorage.setItem('city', cityInput.value)
     cityText.innerText = localStorage.getItem('city')
     cityInput.classList.add('hidden')
     cityText.classList.remove('hidden')
     getCity()
     cityInput.setAttribute('placeholder', 'Вaш город')
     cityInput.blur()
   }

 }

 function clearName() {
   nameInput.setAttribute('placeholder', '')
 }

 function clearFocus() {
   focusInput.setAttribute('placeholder', '')
 }

 function clearCity() {
   cityInput.setAttribute('placeholder', '')
 }

 function setName(el) {
   if (el.type === 'keypress') {
     if (el.keyCode === 13) {
       if (nameInput.value.trim() === '') {
         nameText.innerText = localStorage.getItem('name')
         nameInput.classList.add('hidden')
         nameText.classList.remove('hidden')
         getName()
       } else {
         localStorage.setItem('name', nameInput.value)
         nameText.innerText = localStorage.getItem('name')
         nameInput.classList.add('hidden')
         nameText.classList.remove('hidden')
         nameInput.blur()
       }
     }
   } else {
     nameText.classList.add('hidden')
     nameInput.classList.remove('hidden')
   }
 }

 function setFocus(el) {
   if (el.type === 'keypress') {
     if (el.keyCode === 13) {
       if (focusInput.value.trim() === '') {
         focusText.innerText = localStorage.getItem('focus')
         focusInput.classList.add('hidden')
         focusText.classList.remove('hidden')
         getFocus()
       } else {
         localStorage.setItem('focus', focusInput.value)
         focusText.innerText = localStorage.getItem('focus')
         focusInput.classList.add('hidden')
         focusText.classList.remove('hidden')
         focusInput.blur()
       }
     }
   } else {
     focusText.classList.add('hidden')
     focusInput.classList.remove('hidden')
   }
 }

 function setCity(el) {
   if (el.type === 'keypress') {
     if (el.keyCode === 13) {
       if (cityInput.value.trim() === '') {
         cityText.innerText = localStorage.getItem('city')
         cityInput.classList.add('hidden')
         cityText.classList.remove('hidden')
         getCity()
       } else {
         localStorage.setItem('city', cityInput.value)
         cityText.innerText = localStorage.getItem('city')
         cityInput.classList.add('hidden')
         cityText.classList.remove('hidden')
         cityInput.blur()
       }
     }
   } else {
     cityText.classList.add('hidden')
     cityInput.classList.remove('hidden')
   }
 }


 function getFocus() {
   if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
     focusText.classList.add('hidden')
     focusInput.classList.remove('hidden')
     focusInput.setAttribute('placeholder', 'Введите дело')
   } else {
     focusInput.classList.add('hidden')
     focusText.classList.remove('hidden')
     focusText.textContent = localStorage.getItem('focus')
   }
 }

 function getName() {
   if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
     console.log('я туточки getName')
     nameText.classList.add('hidden')
     nameInput.classList.remove('hidden')
     nameInput.setAttribute('placeholder', 'Введите имя')
   } else {
     nameInput.classList.add('hidden')
     nameText.classList.remove('hidden')
     nameText.textContent = localStorage.getItem('name')
   }
 }

 function getCity() {
   if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
     cityText.classList.add('hidden')
     cityInput.classList.remove('hidden')
     cityInput.setAttribute('placeholder', 'Вaш город')
   } else {
     cityInput.classList.add('hidden')
     cityText.classList.remove('hidden')
     cityText.textContent = localStorage.getItem('city')
     getWeather()
   }
 }


 function makeBgArr() {
   let i = 0
   while (i < 6) {
     let randomBg = `images/night/${Math.floor(Math.random()*20 + 1)}.jpg`
     if (!bgrArr.includes(randomBg)) {
       bgrArr.push(randomBg)
       i++
     }
   }
   while (i < 12) {
     let randomBg = `images/morning/${Math.floor(Math.random()*20 + 1)}.jpg`
     if (!bgrArr.includes(randomBg)) {
       bgrArr.push(randomBg)
       i++
     }
   }
   while (i < 18) {
     let randomBg = `images/day/${Math.floor(Math.random()*20 + 1)}.jpg`
     if (!bgrArr.includes(randomBg)) {
       bgrArr.push(randomBg)
       i++
     }
   }
   while (i < 24) {
     let randomBg = `images/evening/${Math.floor(Math.random()*20 + 1)}.jpg`
     if (!bgrArr.includes(randomBg)) {
       bgrArr.push(randomBg)
       i++
     }
   }
 }

 makeBgArr()

 function setBg() {
   const today = new Date()
   const hour = today.getHours()
   document.body.style.backgroundImage = `url(${bgrArr[hour]})`
 }

 function changeBgr() {
   if(isChangeBgAble){
    isChangeBgAble = false
    console.log(isChangeBgAble)
    const img = document.createElement('img')
    const urlBg = document.body.style.backgroundImage
    let numberBgImg = bgrArr.indexOf(urlBg.slice(5, -2))
    numberBgImg = (numberBgImg + 1) % 24
    const src = bgrArr[numberBgImg]
    img.src = src
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
      setTimeout(()=>isChangeBgAble=true, 700)
    }
   }
 
 }
 async function getQuote() {
   const url = `quote.json`
   const res = await fetch(url)
   const data = await res.json()
   quote.textContent = data.quoteText[Math.floor(Math.random() * data.quoteText.length)]
 }



 async function getWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`
   const res = await fetch(url)
   const data = await res.json()
   try {
     weatherIcon.className = 'weather-icon owf'
     weatherIcon.classList.add(`owf-${data.weather[0].id}`)
     temperature.textContent = `темпер ${data.main.temp}°C`
     wind.textContent = `ветер ${data.wind.speed} м/с`
     humidity.textContent = `влажность ${data.main.humidity} %`
     weatherDescription.textContent = data.weather[0].description
   } catch (e) {
     if (localStorage.getItem('city') !== null && localStorage.getItem('city') !== '') {
       cityInput.classList.add('hidden')
       cityText.classList.remove('hidden')
       cityText.textContent = 'Введите настоящий город'
       cityInput.value = ''
       cityInput.setAttribute('placeholder', 'введите город')
     }
   }
 }



 showTime()
 setGreet()
 setBg()
 getName()
 getFocus()
 getQuote()
 getCity()





 bgReload.addEventListener('click', changeBgr)
 btnQuote.addEventListener('click', getQuote)
 document.addEventListener('DOMContentLoaded', getWeather)
 nameInput.addEventListener('keypress', setName)
 nameInput.addEventListener('click', clearName)
 nameInput.addEventListener('blur', blurName)
 nameText.addEventListener('click', newName)
 cityInput.addEventListener('keypress', setCity)
 cityInput.addEventListener('blur', blurCity)
 cityInput.addEventListener('click', clearCity)
 cityText.addEventListener('click', newCity)
 focusInput.addEventListener('keypress', setFocus)
 focusInput.addEventListener('blur', blurFocus)
 focusInput.addEventListener('click', clearFocus)
 focusText.addEventListener('click', newFocus)