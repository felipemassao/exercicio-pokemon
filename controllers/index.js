const axios = require('axios').default;

const consultaPokemon = async (nome) => {
    const resultado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`)

    if(resultado.status == 200) {
        const pokemon = { 
            abilities: resultado.data.abilities,
            img: resultado.data.sprites.front_default
        }
        return pokemon;
    } else {
        console.error('deu ruim')
    }
}

const executar = async () => {
    const arrayDePokemons = [
        'pikachu',
        'ditto',
        'blastoise',
        'charizard',
        'venusaur',
        'butterfree',
        'pidgeot',
        'fearow',
        'nidoqueen',
        'vulpix'
    ]
    const pokemons = [];

    try {
        for(let i = 0; i < arrayDePokemons.length; i++){
            pokemons.push(await consultaPokemon(arrayDePokemons[i]));
        }
        return pokemons;
    } catch (error) {
        console.error(error);
    }
}

const index = async (req, res, next) => {
    const pokemons = await executar();
    res.render('index', { pokemons });
};

module.exports = {
    index
};
