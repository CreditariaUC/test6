import React from 'react'

export const DobleValueLanding = ({title="", value_one="", value_two="", img="", w=""}) => {
    return (
        <div className="grid grid-cols-7" style={{fontSize: "smaller"}}>
            <img src={"./img/"+img} alt={title} width={w}/>
            <span className="col-span-2 text-landing">{title}</span>
            <span className="col-span-2 field-landing">{value_one}</span>
            <span className="col-span-2 field-landing">{value_two}</span>
        </div>
    )
}
