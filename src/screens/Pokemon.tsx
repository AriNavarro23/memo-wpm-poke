import { useState } from "react";

const POKEMONS = [
    'Bulbasaur',
    'Ivysaur',
    'Venusaur',
    'Charmander',
    'Charmeleon',
    'Charizard',
    'Squirtle',
    'Wartortle',
    'Blastoise',
    'Caterpie',
    'Metapod',
    'Butterfree',
    'Weedle',
    'Kakuna',
    'Beedrill',
    'Pidgey',
    'Pidgeotto',
    'Pidgeot',
    'Rattata',
    'Raticate',
    'Spearow',
    'Fearow',
    'Ekans',
    'Arbok',
    'Pikachu',
    'Raichu',
    'Sandshrew',
    'Sandslash'
]

const MATCH = Math.floor(Math.random() * POKEMONS.length);

type Form = HTMLFormElement & {
    pokemon: HTMLInputElement;
}

export default function Pokemon() {
    //para saber si gano o no, ver que almacena
    const [ hasWon, toggleWon ] = useState(false);

    function handleSubmit(event:React.FormEvent<Form>) {
        event.preventDefault();

        const { pokemon } = event.currentTarget;

        if( pokemon.value.toLowerCase() === POKEMONS[MATCH].toLocaleLowerCase() ) {
            toggleWon(true);
            alert('you won!');
        } else {
            alert('try again')
        }
    }

    return ( 
        <div>
            <img 
            height={512}
            width={512}
            style={{imageRendering: 'pixelated', filter: hasWon ? '' : 'brightness(0) invert(1)'}}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                MATCH + 1
                }.png`}
                />
                {hasWon ? (
                    <button style={{width:'100%'}} onClick={() => location.reload()}>
                        Play again
                    </button>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input name="pokemon" type="text" />
                        <button type="submit">Submit</button>
                    </form>
                )}
        </div>
    );
}

//minuto 1.19.40