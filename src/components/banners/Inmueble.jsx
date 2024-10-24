import React from 'react';

export const Inmueble = ({ backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", valor_vivienda, font_size="inherit" }) => {

    return (
        <div className='result-card-content' style={{background: backgroundColor, fontSize: font_size}}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/house.png" className='icons-results' alt="house" />
                </div>
                <div>
                    <h2>Precio del inmueble</h2>
                    <p>Este es el valor de la propiedad que te interesa:</p>
                </div>
            </div>
            <div className='total-card-content'>
                <h2>
                    {valor_vivienda}€
                </h2>
            </div>
        </div>
    )
}