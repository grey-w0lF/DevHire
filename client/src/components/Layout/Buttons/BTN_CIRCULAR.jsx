import React from 'react'

const BTN_CIRCULAR = (props) => {
    return (
        <div>
            <button className="btnCircular" onClick={props.onClick}>{props.title}</button>
        </div>
    )
}

export default BTN_CIRCULAR
