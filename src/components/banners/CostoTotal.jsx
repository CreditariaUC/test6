import React from 'react';

export const CostoTotal = ({ backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", text_total, font_size="inherit" }) => {

    return (
        <div className='result-card-content' style={{ background: backgroundColor, fontSize: font_size }}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/dollar.png" className='icons-results' alt="gastos" />
                </div>
                <div>
                    <h2>Costo total:</h2>
                </div>
            </div>
            <div className='total-card-content'>
                <h2>
                    {text_total}€
                </h2>
            </div>
        </div>
    )
}