let state = {
    breweries :[]
}
const theUL = document.querySelector('.breweries-list')

//console.log(theUL)
//console.log(search)

// const breweryData = fetch('https://api.openbrewerydb.org/breweries')
// .then((response) => response.json())
// .then((data) => console.log(data));

// console.log(breweryData)

// search.addEventListener("submit", e => {
//    e.preventDefault()
//  const mytState = userinput
//  getData(myState) // the us state that the user has submitted
//     alert("it works");
//   })

function setState(breweries) {
     //state.breweries = filteredBreweryData
    const listBreweries =[...breweries]
    // const listBreweries = state.breweries = breweries
    state = listBreweries.filter(breweries)
    console.log(state)
    //console.log(listBreweries)

}

function getData(USState) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${USState}`)
         //.then((response) => response.json())
         .then((response) => {
            return response.json()
         })
         .then((breweries) => {
        console.log('server breweries', breweries)
            setState(breweries)
         });
}


function submit() {
    const userSearch = document.querySelector('#select-state-form')
    userSearch.addEventListener('submit', e =>{
        e.preventDefault()
        //const userState = e.target.value.toLowerCase()
       const userState = document.querySelector("#select-state").value.replace(" ", "_").toLowerCase()
        //console.log(userState)
        getData(userState)
    })
}


const createCard = () => {
    const listItem = document.createElement('li')
    const breweryName = document.createElement('h2')
    const typeOfBrewery = document.createElement('div')
    const addressOfBrewery = document.createElement('section')
    const addressHeader = document.createElement('h3')
    const addresstext = document.createElement('p')
    const addresstextStrong = document.createElement('p') //still have to add the strong tag to this
    const phoneNumSection = document.createElement('section')
    const phoneNumHeader = document.createElement('h3')
    const phoneNumber = document.createElement('p')
    const linkSection = document.createElement('section')
    const websiteLink = document.createElement('a')

    typeOfBrewery.classList = 'type'
    addressOfBrewery.classList = 'address'
    phoneNumSection.classList = 'phone'
    linkSection.classList = 'link'

    theUL.append(listItem)
    listItem.append(breweryName,typeOfBrewery, addressOfBrewery, phoneNumSection, linkSection)
    // listItem.append(typeOfBrewery)
    // listItem.append(addressOfBrewery)
    // listItem.append(phoneNumSection)
    // listItem.append(linkSection)

    addressOfBrewery.append(addressHeader)
    addressOfBrewery.append(addresstext)
    addressOfBrewery.append(addresstextStrong)

    phoneNumSection.append(phoneNumHeader)
    phoneNumSection.append(phoneNumber)

    linkSection.append(websiteLink)  
}

const init = () => {
    createCard()
    submit()
    getData()
}

init()









// function submit() {
//     const userSearch = document.querySelector('#select-state-form')
//     userSearch.addEventListener('click', () =>{
//         //e.preventDefault()
//         alert('hello')
//     //     //const userState = e.target.value.toLowerCase()
//     //    const userState = document.querySelector("#select-state").value.replace(" ", "_").toLowerCase()
//     //     //console.log(userState)
//     //     getData(userState)
//     })
// }