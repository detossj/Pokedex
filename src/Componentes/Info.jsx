import { useForm } from '../hooks/useForm'
import { useFetch } from '../hooks/useFetch'
import { LoadingMessage } from '../../../PokemonApp/src/Componentes/LoadingMessage'
import { PokemonCard } from '../../../PokemonApp/src/Componentes/PokemonCard';
import React,{useMemo} from "react";
import { Form } from './Form';



export const Info = React.memo(() => {


    const {input, onInputChange, onSubmit, name} = useForm({
        name: ''
    })

    const apiUrl = useMemo( () => name ? `https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}` : null,[name]);
    

    const { data, isLoading,error } = useFetch(apiUrl);

    
    return (
        <div className="pokedex">

            <div className="header">
                <div>
                    <img src="./src/assets/Pokeball2.png" alt="Pokebola" />
                </div>
                <div>
                    <h1 className="title">Pokédex</h1>
                </div>

            </div>


            <div className="search">
                <h1 className="subtitle" >Nombre o número</h1>
                <Form onSubmit={onSubmit} onInputChange={onInputChange} input={input}></Form>
                <h2>Busca un Pokémon por su nombre o <br /> usando su número de la Pokédex.</h2>
            </div>



            {isLoading && <LoadingMessage />}

            {error && 
            <div className="error-message">
                <h2>{error}</h2>
                <h4>Intenta hacer lo siguiente para encontrar resultados:</h4>
                <li>Verifica que el nombre o numero este correctamente escrito.</li>
                <li>Revisa que el Pokemon realmente exista.</li>
            </div>}

            {data && data.name && !error && (
                <PokemonCard 
                    id={data.id}
                    name={data.name}
                    height={data.height}
                    weight={data.weight}
                    sprites={[
                        data.sprites.front_default,
                        data.sprites.back_default
                    ]}
                    sprites_shiny={[
                        data.sprites.front_shiny,
                        data.sprites.back_shiny,
                    ]}
                    abilities={data.abilities}
                    types={data.types}
                    stats={data.stats}
                    descripcion={data.descripcion}  
                />
            )}

        </div>
  )
})
