import React from 'react'

export const Gastos = ({backgroundColor="linear-gradient(90deg, var(--primay-color-ipoteca), 35%, white)", inpuestos_gastos, font_size="inherit"}) => {
    return (
        <div className='result-card-content' style={{background: backgroundColor, fontSize: font_size}}>
            <div className='banner-card-content'>
                <div className='border-icons-results'>
                    <img src="./icons/percent.png" className='icons-results' alt="gastos" />
                </div>
                <div>
                    <h2>Impuestos y gastos</h2>
                </div>
            </div>
            <div className='total-card-content'>
                <h2>
                    {inpuestos_gastos}€
                </h2>
            </div>
        </div>
    )
}
