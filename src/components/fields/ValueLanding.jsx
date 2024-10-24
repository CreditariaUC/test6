import React from 'react'

export const ValueLanding = ({title="", value="", img="", wdt="25px"}) => {
    return (
        <div className="grid grid-cols-7">
            {img != "" ? <img src={"./img/"+img} alt={title} width={wdt}/> : <div className="col-span-1"></div>}
            <span className="col-span-3 text-landing" style={{fontSize: "smaller"}}>{title}</span>
            <span className="col-span-3 field-landing" style={{fontSize: "smaller"}}>{value}</span>
        </div>
    )
}
