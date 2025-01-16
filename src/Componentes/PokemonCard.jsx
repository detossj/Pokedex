import React from "react";

export const PokemonCard = React.memo(({ id, name, height, weight, sprites = [],sprites_shiny = [], types = [], stats = [], descripcion, abilities = [] }) => (
    <div className="card">
       
       <div className="name">
            <h2>{name} N.º {id}</h2>
       </div>

        
       <div className="images">
            <div className="sprites1">
                <h2>Normal</h2>
                    {sprites.map(sprite => sprite && <img key={sprite} src={sprite} alt={name} />)}
            </div>

            <div className="sprites2">
                <h2>Shiny</h2>
                {sprites_shiny.map(sprites_shiny => sprites_shiny && <img key={sprites_shiny} src={sprites_shiny} alt={name} />)}
            </div>
       </div>
        

        <div className="Info">

            
            <p>{descripcion}</p>  
            <p>Altura: {height/10} m </p>
        
            <p>Peso: {weight/10} kg</p>
            <p>Estadísticas</p>
                <ul>
                    {stats.map((stat, index) => (
                        <li key={index}>{stat.name}: {stat.value}</li>
                    ))}
                </ul>

            
        </div>

        <div className="types">
            <h3>Tipos</h3>
                <ul>
                    {types.map((type, index) => <li key={index}>{type}</li>)}
                </ul>
        </div>

        <div className="abilities">
            <h3>Habilidades</h3> 
                <ul>
                    {abilities.map((ability, index) => <li key={index}>{ability}</li>)}
                </ul>
        </div>


        
    </div>
));
