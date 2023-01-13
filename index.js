let state = {
  breweries: []
};
const theUL = document.querySelector(".breweries-list");



const setUpListeners = () => {
  const userSearch = document.querySelector("#select-state-form");
  userSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const userState = document
      .querySelector("#select-state")
      .value.replace(" ", "_")
      .toLowerCase();
    //alert(userState)
    getData(userState);
  });
};


function getData(USState) {
  

  

  fetch(`https://api.openbrewerydb.org/breweries?by_state=${USState}`)
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
             //console.log(breweries);
             setState(breweries)
            render()
           });
}

function setState(breweries) {
    
    state.breweries = breweries
 
}

function render() {
    // TODO: RENDER ALL BREWERIES STATE 
    //console.log('render: num of breweries is ', state.breweries.length)
    //createBrewery(state.breweries)
    state.breweries.forEach(brewery => {

      if( brewery.brewery_type === 'micro'  || brewery.brewery_type === "brewpub" || brewery.brewery_type === 'regional' ) {
        createBrewery(brewery)
        filterPub(brewery)

      } else {
        console.log('Not a micro' )
      }
      

        
            
    });

}

const createBrewery = (brewery) => {
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

    breweryName.textContent = brewery.name
    typeOfBrewery.textContent = brewery.brewery_type

    addressHeader.textContent = 'Address'
    addresstext.textContent = brewery.street
    addresstextStrong.textContent = brewery.city



    phoneNumHeader.textContent = 'Phone'
    phoneNumber.textContent = brewery.phone

    let websiteHref = brewery.website_url
    websiteLink.href= websiteHref
    websiteLink.textContent = 'website'

    theUL.append(listItem)
    listItem.append(breweryName,typeOfBrewery, addressOfBrewery, phoneNumSection, linkSection)

    addressOfBrewery.append(addressHeader,addresstext,addresstextStrong)

    phoneNumSection.append(phoneNumHeader)
    phoneNumSection.append(phoneNumber)

    linkSection.append(websiteLink)  
}

const filterPub = (brewery) => {
  const pubFilter = document.querySelector('#filter-by-type')

  pubFilter.addEventListener('change', (event) => {
    const breweryType = event.target.value
    //console.log(breweryType)

    fetch(`https://api.openbrewerydb.org/breweries?by_type=${breweryType}`)
    .then(function (response) {
      return response.json()
    })
    .then(function(data){
      //console.log('this is data', data)
      setState(data)
      render()
    })
    
  })
}



const init = () => {
  // createCard()
  //thisIsRawData();
  setUpListeners();
  filterPub()
  //getData('ohio')
};

init();
