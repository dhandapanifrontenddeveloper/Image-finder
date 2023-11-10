const accesskey = "hAaQ1hNCsn-hDee3D0PObwKzrZb3YoH07qg60vg4E0s"


const formbox = document.querySelector("form")
const inputbox = document.querySelector(".searchbox")
const searchresults = document.querySelector(".imageresult")
const viewmore = document.querySelector(".morebtn")




let inputdata = ""
let page = 1;

async function searchimage() {
    inputdata = inputbox.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}` ;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
   

    if (page === 1){
        searchresults.innerHTML = "";
    }

    results.map((result) => {
         
        const imagewrapper = document.createElement('div')
        imagewrapper.classList.add("images")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imagelink = document.createElement('a')
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchresults.appendChild(imagewrapper);
    })

    page++;
    if(page > 1){
        viewmore.style.display = "block"
    }
}

formbox.addEventListener("submit", (event) =>{
    event.preventDefault()
    page = 1;
    searchimage();
});

viewmore.addEventListener("click", () =>{
   
    searchimage();
});