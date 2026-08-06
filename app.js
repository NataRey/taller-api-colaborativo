const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
const pintarGrid = document.getElementById("pokedex-grid");

async function cargarPokedexInicial() {
    try {
        pintarGrid.innerHTML=`<div class="spinner"></div>
        <p style="text-align:center;">Cargando pokedex</p>`
        const respuesta = await fetch(apiBaseUrl);
        if(!respuesta.ok ){
            console.log("Error en la consulta");
        }
        const data = await respuesta.json();
        pintarGrid.innerHTML=" ";
        data.results.forEach((pokemon,indice)=>{
            const card = document.createElement("article");
            card.classList.add("tarjetaPokemon");
            card.id=`tarjetaPokemon-${indice + 1} `;
            card.innerHTML=`
            <h3>#${indice+1}${pokemon.name.toUpperCase()}</h3>
            <div class = "card-body" id="card-body-${indice+1}"></div>
            <div class = "card-actions" id="card-actions-${indice+1}"></div>`;
            pintarGrid.appendChild(card);

        });
    } catch (error) {
        console.log("error en modulo Adriana");
        pintarGrid.innerHTML=`<p>Error al conectar</p>`
    }    
}
cargarPokedexInicial();

async function cargarImagenes(){

try {
const tarjetas = document.querySelectorAll(".tarjetaPokemon");
// console.log (tarjetas);
for (let i = 0; i<tarjetas.length; i++){
const idPokemon = i+1; 
// console.log (idPokemon);
const cardBody = document.getElementById(`card-body-${idPokemon}`);
// console.log (cardBody);
cardBody.innerHTML =`<div class= "spinner"></div>`
const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
// console.log (res)
if(!res.ok){
    console.log ("Error al obtener el detalle de la imagen")
}
const detalle = await res.json();
// console.log (detalle)
const imgUrl = detalle.sprites.other["official-artwork"].front_default;
// console.log(imgUrl)
cardBody.innerHTML=`
 <img src="${imgUrl} " alt="${detalle.name}">`;
}  


} catch (error) {
   console.log ("Error en el modulo de Andrés Cortés"); 
}  

}

setTimeout (cargarImagenes,1000);

