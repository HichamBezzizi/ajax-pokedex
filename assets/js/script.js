

const searchPok = document.getElementById('search')
//console.log(searchPok)
const handleKeyupInput = (e) => {
  // console.log('het werkt')
  console.log(e.keyCode)
  if (e.keyCode == 13) {
    research();
    e.target.value = "";
  }
}

const research = () => {  
  //console.log('het 2e werkt ook')
  let searchedPok = searchPok.value
  //console.log(searchedPok)
  fetch('https://pokeapi.co/api/v2/generation/1/')    // verwijzen naar de url!!!
  .then(response => response.json())    // er een json object van maken
  .then(myJson => findPokemons(myJson)) 
  // .catch(error => alert(error))


const findPokemons = (myJson) => {
  //console.log(myJson)
  let species = myJson.pokemon_species
  //console.log(species)  
 
  species.forEach(pokemon => {
    // console.log(pokemon.name)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
    .then(r => r.json())  // er een json object van maken
    .then(myJson2 => {
      // console.log(myJson2.id, myJson2.name)

      //enkel van de juiste pokemon de gegevens opvragen
      if (searchedPok === myJson2.name) {      
            
      let pokId = myJson2.id
      let pokName = myJson2.name
      let pokMove01 = myJson2.moves[0].move.name
      let pokMove02 = myJson2.moves[1].move.name
      let pokMove03 = myJson2.moves[2].move.name
      let pokMove04 = myJson2.moves[3].move.name
      let pokImage = myJson2.sprites.front_default    


      //console.log(pokImage, pokId, pokName, pokMove01)
      //console.log(myJson2)
      //console.log(document.getElementsByClassName("pokeID")[0])
      document.getElementsByClassName("pokeID")[0].innerText = pokId
      document.getElementsByClassName("pokeName")[0].innerText = pokName
      document.getElementById("move01").innerText = pokMove01
      document.getElementById("move02").innerText = pokMove02
      document.getElementById("move03").innerText = pokMove03
      document.getElementById("move04").innerText = pokMove04
      document.getElementById("pokeImage").src = pokImage


      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokId}/`)
      .then(res => res.json())
      .then(myJson3 => {
        //let pokUrl = myJson3.evolves_from_species
        //let pokPrev = pokUrl.name
        //console.log(pokUrl)
        //console.log(pokPrev)

        let pokPrev = myJson3.evolves_from_species.url
        let pokPrevId = pokPrev.split("/")[6]
        let pokPrevIdNoIndex = pokPrev.split("/")
        console.log(pokPrevIdNoIndex)
        console.log(pokPrevId)
        let pokPrevFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokPrevId}.png`        
        console.log(pokPrevFoto)

        document.getElementById("pokePrevImage").src = pokPrevFoto


        /*fetch(`https://pokeapi.co/api/v2/pokemon/${pokPrev}/`)
        .then(r => r.json())
        .then(myJson4 =>{
          let pokPicture = myJson4.sprites.front_default
  
          //console.log(pokPicture)

          let pokPrev = myJson3.evolves_from_species.url
          let pokPrevId = pokPrev.split("/")[6]
          console.log(pokPrevId)
          let pokPrevFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/${pokPrevId}.png"`
          // document.getElementById("pokePrevious").src = pokPrevFoto          
          console.log(pokPrevFoto)
  
  
        })*/
      })
      //catch here
      .catch((error)=>{
        console.log(error)
        document.getElementById("pokePrevImage").src ="assets/img/question_mark.png"
      })


      


      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png"
      "https://pokeapi.co/api/v2/pokemon-species/5/"

    }
    })
    
    
  });
  
  
}


}

searchPok.addEventListener('keyup', handleKeyupInput)





