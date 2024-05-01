const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

async function fetchData(){

    try{

        const pokemonName = document.getElementById("input").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            const closestTerm = findClosestTerm(pokemonName);
            console.log(`Closest term to '${pokemonName}' is '${closestTerm}'`);
            return;
        }

        const data = await response.json();
        console.log(data);

        const pokemonSprite = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        const pokemonSprite2 = data['sprites']['versions']['generation-v']['black-white']['back_default'];
        const imgElement = document.getElementById("pokemonSprite");

        const themeColor = typeColor[data.types[0].type.name];

        

        const MAX_POKEMONS = 875;
        const pokemonID = data.id;
        const id = parseInt(pokemonID, 10);
        if (id < 1 || id > MAX_POKEMONS) {
            return
        }

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const height = data.height / 10
        const weight = data.weight / 10

        card.innerHTML = `
            <div class="hp" id="hp">
                <div id="hp-number"><span>HP</span> ${data.stats[0].base_stat}</div> </span>
            </div>
            <div class="details" id="details">
            <div id="image">
                <img src="${pokemonSprite}" id="pokemonSprite">
                <img src="${pokemonSprite2}" id="pokemonSprite2">
            </div>
            <h2 class="name">${data.name}</h2>
            <div class="id" id="id">
                <p class="id2">#${data.id}</p>
            </div>
            <div class="types" id="types">
            </div>
            <div class="stats" id="stats">
                <div class="attack" id="attack">
                    <h3>${data.stats[1].base_stat}</h3>
                    <p>Attack</p>
                </div>
                <div class="defense" id="defense">
                    <h3>${data.stats[2].base_stat}</h3>
                    <p>Defense</p>
                </div>
                <div class="speed" id="speed">
                    <h3>${data.stats[5].base_stat}</h3>
                    <p>Speed</p>
                </div>
            </div>
            <div class="personal-info" id="personal-info">
                <div class="Height" id="height">
                    <h3>${height} m</h3>
                    <p>Height</p>
                </div>
                <div class="Weight" id="weight">
                    <h3>${weight} kg</h3>
                    <p>Weight</p>
                </div>
            </div>
        

        `;
        appendTypes(data.types);
    }
    catch(error){
        console.error(error);
    }
};
let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        const themeColor = typeColor[item.type.name];
        span.style.backgroundColor = themeColor;
        span.style.paddingLeft = "10px";
        span.style.paddingRight = "10px";
        span.style.borderRadius = "5px";
        span.style.border = "2px solid rgba(0, 0, 0, 0.2)";
        document.querySelector(".types").appendChild(span);
        
        const primaryType = types[0].type.name;
        const themeColor2 = typeColor[primaryType];
        const card = document.querySelector(".card");
        card.style.background = `radial-gradient(${themeColor2}, white)`;


        const body = document.querySelector("body");
        body.style.background = `radial-gradient(white, ${themeColor2})`;
    });
};