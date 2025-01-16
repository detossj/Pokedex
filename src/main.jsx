import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { PokemonApp } from './PokemonApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonApp></PokemonApp>
  </StrictMode>,
)
