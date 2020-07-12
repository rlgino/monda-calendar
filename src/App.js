import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const MESES = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre"
  }
  const [date, setDate] = useState(new Date());
  
  const [firstDays, setFirstDays] = useState([])
  const [daysOfMonth, setDaysOfMonth] = useState([])
  useEffect(() => {
    
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    console.log(lastDay);
    let list = [];
    for (var i = 1; i <= lastDay; i++) {
      list.push(i);
    }
    setDaysOfMonth(list);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    console.log(firstDay);
    let firstDays = [];
    for (var i = 1; i <= firstDay; i++) {
      firstDays.push(i);
    }
    setFirstDays(firstDays)

    return () => { }
  }, [])
  return (
    <main>
      <h1>{date.getFullYear()}</h1>

      <h2>{MESES[date.getMonth()]}</h2>
      <h3>{date.getDate()}</h3>
      <div className="container">
        <div className="day-header">Domingo</div>
        <div className="day-header">Lunes</div>
        <div className="day-header">Martes</div>
        <div className="day-header">Miercoles</div>
        <div className="day-header">Jueves</div>
        <div className="day-header">Viernes</div>
        <div className="day-header">Sábado</div>
        {
          firstDays.map(d => {
            return(
              <div className="day">X</div>
            )
          })
        }
        {daysOfMonth.map(day => {
          return(
            <div className="day">
              <div className={day === date.getDate() ? "day-selected" : ""}>{day}</div>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default App;
