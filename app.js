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

/*juan navarrete*/ 

function agregarBotonHabilidades () {
try {
    const tarjetas = document.querySelectorAll(".tarjetaPokemon"); 
    tarjetas.forEach ((card,index)=> {
       const idPokemon = index +1;
       const containerActions = document.getElementById (`card-actions-${idPokemon}`);
       const BotonHabilidades = document.createElement ("button");
       BotonHabilidades.classList.add ("btn");
       BotonHabilidades.innerText = "Habilidades";
       BotonHabilidades.addEventListener ("click",async ()=>{
       await mostrarModalHabilidades (idPokemon);

       });
       containerActions.appendChild (BotonHabilidades);
    });
} catch (error) {
   console.log ("error en el modulo de Juan Navarrete") 
}
}   

async function mostrarModalHabilidades (id){
    const modal = document.getElementById ("modal-overlay");
    const modalBody = document.getElementById ("modal-body");
    try {
        modal.classList.remove ("hidden");
        modalBody.innerHTML = `<div class= "spinner"> Cargando Habilidades </div>`;
        const resp = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if(!resp.ok){
    console.log ("Error al obtener las habilidades");
}
const data = await resp.json (); 
const listaHabilidades = data.abilities.map(item => `<li><strong>${item.ability.name.toUpperCase()}</strong>${item.is_hidden ?'(oculta)':''}</li>`).join("");
modalBody.innerHTML =  `<h2> Habilidades de ${data.name.toUpperCase()} </h2>
<ul> ${listaHabilidades} </ul>`;
    } catch (error) {
        console.log ("no se cargaron las habilidades")
    } 
}
document.getElementById ("close-modal").addEventListener ("click",()=>{
    document.getElementById ("modal-overlay").classList.add("hidden");
});
setTimeout (agregarBotonHabilidades,1500);



/*Rama Diego Galvis. Módulo experiencia*/

function baseExperiencia() {
    try {
       const tarjetas = document.querySelectorAll(".tarjetaPokemon");
       tarjetas.forEach ((card,index)=> {
       const idPokemon = index +1;
       const containerActions = document.getElementById (`card-actions-${idPokemon}`);
       const botonExperiencia = document.createElement ("button");
           botonExperiencia.classList.add("btn");
           botonExperiencia.style.backgroundColor = "#25592D";
       botonExperiencia.innerText = "Experiencia";
           botonExperiencia.addEventListener("click", async () => {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const recepcionDatos = await respuesta.json();
               
               const nivelDeExperiencia = recepcionDatos.base_experience > 100 ? " Experiencia  alta " : "Experiencia básica";
               const textoCompleto = ` Base Experiencia :  ${recepcionDatos.base_experience} -${nivelDeExperiencia}`;
               
               let printExperiencia = card.querySelector(".experiencia");
               if (!printExperiencia) {
                   printExperiencia = document.createElement("p");
                   printExperiencia.className = "experiencia";
                   printExperiencia.style.color = "#B2D6B9";
                   printExperiencia.style.fontWeight = "bold";
                   card.appendChild(printExperiencia);
               }
               printExperiencia.innerText = "";
               let i = 0;
               const time = setInterval(() => {
                   if (i < textoCompleto.length) {
                       printExperiencia.innerText += textoCompleto.charAt(i);
                       i++;
                   } else {
                       clearInterval(time);
                   }
                
               }, 50);

       });
       containerActions.appendChild (botonExperiencia);
    });
    } catch (error) {
        console.log("Error en el módulo de Diego");
    }
}

setTimeout(baseExperiencia, 1500);