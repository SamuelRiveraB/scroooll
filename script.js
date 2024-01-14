let count = 5
const apiKey = ''
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArray = []
let ready = false;
let imagesLoaded = 0
let totalImages = []

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

function imageLoaded() {
    imagesLoaded++
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
        count = 30
        console.log('ready =', ready)
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        const item = document.createElement('a')
        setAttributes(item, {href:photo.links.html,target:'_blank'})
        const img = document.createElement('img')
        setAttributes(img, {src:photo.urls.regular,alt:photo.alt_description,title:photo.alt_description})
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        console.log(photosArray)
        displayPhotos()
    } catch (error) {
        console.log("Error: ", error)
    }
}

window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

getPhotos()