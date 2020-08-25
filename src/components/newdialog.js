import React from 'react'
import './newdialog.css'

const NewAppoinmentDialog = () => {
    return (
        <div className="main-dialog">
            <div className="dialog-actions">
                <a href="#"> X </a>
            </div>
            <div className="container-dialog">
                <h1 className="item1">Nueva Cita</h1>

                <span className="item2">Hora inicio:</span>
                <input type="number" name="inicio" className="item3" />
                <span className="item4">Hora fin:</span>
                <input type="number" name="fin" className="item5" />

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
