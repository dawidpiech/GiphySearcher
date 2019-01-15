let conf = {
    api: "oZK4fZ9FBoInucG7HJr9LNdgvlElUENW",
    type: "/gifs/search"
},
    search_button = document.querySelector(".search-button")

document.addEventListener("DOMContentLoaded", () => {

    let type_handle = document.querySelectorAll(".dropdown-item")

    //Change type search STICKER/GIPHY
    type_handle.forEach(a => {
        a.addEventListener("click", changeType)
    })

    //TRIGER SEARCH
    search_button.addEventListener("click", search)

    //Triger search when press enter
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 13)
            search()
    })

    //Load trendings GIPHY on home page
    trendings()

    //Change position image when size container is resize
    window.addEventListener('resize', changeAllItemsRowHeight)

})