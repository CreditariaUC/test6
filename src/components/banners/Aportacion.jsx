import React from 'react';

export const Aportacion = ({ backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", monto_ahorro, font_size="inherit" }) => {

    return (
        <div className='result-card-content' style={{ background: backgroundColor, fontSize: font_size }}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/money.png" className='icons-results' alt="money" />
                </div>
                <div>
                    <h2>Aportación inicial</h2>
                    <p>Son los recursos propios que proporcionas de pago inicial:</p>
                </div>
            </div>
            <div className='total-card-content'>
                <h2>
                    {monto_ahorro}€
                </h2>
            </div>
        </div>
    )
}