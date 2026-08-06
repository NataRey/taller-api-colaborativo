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
