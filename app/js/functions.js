
//Change type search STICKY/GIPHY
function changeType() {
    let dropTitle = document.querySelector(".dropdown-toggle")

    conf.type = this.dataset.type
    dropTitle.innerHTML = this.innerHTML
}

//Search giphy
function search() {
    let input_value = document.querySelector(".form-control")

    if (input_value !== null || input_value !== "") {

        fetch(`http://api.giphy.com/v1${conf.type}?q=${input_value.value}&api_key=${conf.api}`)
            .then(resp => resp.json(),
                error => console.log(error)
            )
            .then(resp => {
                let photos = [],
                    height = 0

                resp.data.forEach(e => {
                    photos.push({
                        url: e.images.original.url,
                        height: e.images.original.height
                    })
                    height += parseInt(e.images.original.height)
                })

                loadPhotos(photos, height)
            })
    }
}


//Load recived photos
function loadPhotos(photos, height) {
    let photos_container = document.querySelector(".giphy-container")
    photos_container.innerHTML = ""

    for (let i = 0; i < photos.length; i++) {
        let photo_container = document.createElement("div"),
            photo = document.createElement("img")

        photo_container.classList.add("giphy-item")
        photo_container.classList.add("load")
        photo.src = photos[i].url
        photo.style.opacity = 0
        photo_container.append(photo)
        photos_container.append(photo_container)

    }
    checkGiphyLoad()
}

//Preloader to giphy
function checkGiphyLoad() {
    let photo_containers = document.querySelectorAll(".giphy-item img"),
        height = 0

    for (let i = 0; i < photo_containers.length; i++) {
        if (photo_containers[i].complete) {
            photo_containers[i].parentNode.classList.remove("load")
            photo_containers[i].parentNode.style.minHeight = "auto"
            photo_containers[i].style.opacity = 1
            height += photo_containers[i].height
            changeRowHeight(photo_containers[i].parentElement)
        }

        else {
            photo_containers[i].addEventListener("load", function () {
                this.parentNode.classList.remove("load")
                this.parentNode.style.minHeight = "auto"
                this.style.opacity = 1
                height += photo_containers[i].height
                changeRowHeight(photo_containers[i].parentElement)
            })
        }
    }
}

//Load trendings on home page
function trendings() {
    let api = `https://api.giphy.com/v1/gifs/trending?api_key=${conf.api}`,
        xhr = new XMLHttpRequest()

    xhr.open("GET", api, true)

    xhr.addEventListener('load', function () {
        let photos = [],
            height = 0,
            data = JSON.parse(this.response).data

        data.forEach(e => {
            photos.push({
                url: e.images.original.url,
                height: e.images.original.height
            })
            height += parseInt(e.images.original.height)
        })

        loadPhotos(photos, height)

    })

    xhr.addEventListener('error', function (e) {
        alert(`Error: ${e}`)
    })

    xhr.send()
}


//Change position one image
function changeRowHeight(item) {
    let grid = document.querySelector(".giphy-container"),
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap")),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")),
        rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
    item.style.gridRowEnd = "span " + rowSpan
}

//Trigger to change position all images
function changeAllItemsRowHeight() {
    let allItems = document.querySelectorAll(".giphy-item")
    allItems.forEach(a => {
        changeRowHeight(a)
    })
}

