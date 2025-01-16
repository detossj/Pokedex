import React from "react";

export const Form = React.memo(({onSubmit,onInputChange,input}) => {


  return (

     <form onSubmit={onSubmit} >
                
                <input 
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={onInputChange}
                />
                <button type="submit" >
                  <img src="./src/assets/lupa.png" alt="buscar" />
                </button>
    </form>
    
  )
})
