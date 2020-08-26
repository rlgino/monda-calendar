import React from 'react'
import './newdialog.css'

const NewAppoinmentDialog = ({ onCloseDialog, date }) => {
    return (
        <div className="main-dialog">
            <div className="dialog-actions" onClick={e => onCloseDialog()}>
                X
            </div>
            <div className="container-dialog">
                <h1 className="item1">Nueva Cita - {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</h1>

                <span className="item2">Hora inicio:</span>
                <input type="time" id="myTimeStart" value="22:15:00" className="item3"></input>
                <span className="item4">Hora fin:</span>
                <input type="time" id="myTimeEnd" value="22:15:00" className="item5"></input>

                <span className="item6">Titulo:</span>
                <input type="Text" className="item7" />

                <span className="item8">Descripcion:</span>
                <input type="Text" className="item9" />

                <input type="button" value="Agendar" className="item10" />
            </div>
        </div>
    )
}

export default NewAppoinmentDialog
