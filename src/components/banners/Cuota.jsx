import React from 'react';

export const Cuota = ({backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", mensualidad, font_size="inherit"}) => {

    return (
        <div className='result-card-content' style={{ background: backgroundColor, fontSize: font_size }}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/card.png" className='icons-results' alt="card" />
                </div>
                <div>
                    <h2>Cuota periodica mensual</h2>
                </div>
            </div>
            <div className='total-card-content'>
                <h2 >
                    {mensualidad}€
                </h2>
            </div>
        </div>
    )
}