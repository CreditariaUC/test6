import React from 'react';

export const Importe = ({ backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", monto_credito, font_size="inherit" }) => {

    return (
        <div className='result-card-content' style={{ background: backgroundColor, fontSize: font_size }}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/dollar.png" className='icons-results' alt="importe" />
                </div>
                <div>
                    <h2>Importe de la hipoteca</h2>
                    <p>El prestamo que Pignus te podria conseguir:</p>
                </div>
            </div>
            <div className='total-card-content'>
                <h2>
                    {monto_credito}€
                </h2>
            </div>
        </div>
    )
}