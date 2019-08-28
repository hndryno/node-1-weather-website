
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pesanPertama = document.querySelector('#pesan-1')
const pesanKedua = document.querySelector('#pesan-2')

// pesanPertama.textContent = 'Jakarta'

    weatherForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        const location = search.value

        pesanPertama.textContent = 'Loading ...'
        pesanKedua.textContent = ''

        fetch('/weather?address='+location).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                pesanPertama.textContent = data.error
            }else{
                pesanPertama.textContent = data.location
                pesanKedua.textContent = data.forecast.timezone
            }
        })
    })
})