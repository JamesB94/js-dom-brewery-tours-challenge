let state = {
  breweries: []
};
const theUL = document.querySelector(".breweries-list");

const setUpListeners = () => {
  const userSearch = document.querySelector("#select-state-form");
  userSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    state.breweries = [];
    theUL.innerHTML = ''; 
    const userState = document.querySelector("#select-state").value.replace(" ", "_").toLowerCase();
    const typeOf = document.querySelector("#filter-by-type").value.toLowerCase();

    const filterByType = document.querySelector("#filter-by-type")

    if(typeOf) {
      theUL.innerHTML = ''; 
      getData(userState, typeOf);
    } else {
      getState(userState)
    }

    filterByType.addEventListener("change", (e) => {
      state.breweries = [];
      theUL.innerHTML = '';
      const userState = document.querySelector("#select-state").value.replace(" ", "_").toLowerCase();
      const typeOf = e.target.value.toLowerCase();
      if(typeOf) {
        getData(userState, typeOf);
      } else {
        getState(userState);
      }

  });
});
}



function getData(USState, breweryType ) {
 fetch(`https://api.openbrewerydb.org/breweries?by_state=${USState}&by_type=${breweryType}`)
    .then((response) => {
      return response.json();
    })
    .then((breweries) => {
             setState(breweries)
            render()
           });
}

function getState(USState ) {
  
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${USState}`)
     .then((response) => {
       return response.json();
     })
     .then((breweries) => {
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

const init = () => {
  setUpListeners();
};

init();
