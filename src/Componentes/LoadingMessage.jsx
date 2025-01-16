import React from "react";

export const LoadingMessage = React.memo(() => {
  return (
    <section style={{height: 200}}>
        <h2 className="loading-message">Cargando...</h2>
    </section>
  )
})
