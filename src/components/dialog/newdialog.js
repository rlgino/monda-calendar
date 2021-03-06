import React, { useState } from 'react'
import './newdialog.css'
import { formatDate } from '../../utils'

const NewAppoinmentDialog = ({ onCloseDialog, date, sendAppointment }) => {
    const [timeFrom, setTimeFrom] = useState("")
    const [timeTo, setTimeTo] = useState("")
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const createNewAppointment = (e) => {
        e.preventDefault()
        let data = {
            fecha: date,
            inicio: timeFrom,
            fin: timeTo,
            titulo: title,
            descripcion: description
        }
        sendAppointment(data)
    }
    return (
        <div className="main-dialog">
            <div className="dialog-actions" onClick={e => onCloseDialog()}>
                X
            </div>
            <form className="container-dialog" onSubmit={createNewAppointment}>
                <h1 className="item1">Nueva Cita - {formatDate(date)}</h1>

                <span className="item2">Hora inicio:</span>
                <input type="time" id="myTimeStart" className="item3" value={timeFrom} onChange={e => setTimeFrom(e.target.value)}></input>
                <span className="item4">Hora fin:</span>
                <input type="time" id="myTimeEnd" className="item5" value={timeTo} onChange={e => setTimeTo(e.target.value)}></input>

                <span className="item6">Titulo:</span>
                <input type="Text" className="item7" value={title} onChange={e => setTitle(e.target.value)} />

                <span className="item8">Descripcion:</span>
                <input type="Text" className="item9" value={description} onChange={e => setDescription(e.target.value)} />

                <input type="submit" value="Agendar" className="item10" />
            </form>
        </div>
    )
}

export default NewAppoinmentDialog
