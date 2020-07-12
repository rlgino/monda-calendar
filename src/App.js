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

  const [availableHours, setAvailableHours] = useState([])


  useEffect(() => {
    loadContainer()
    return () => { }
  }, [])

  const loadContainer = () => {
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let list = [];
    for (var i = 1; i <= lastDay; i++) {
      list.push(i);
    }
    setDaysOfMonth(list);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let firstDays = [];
    for (var x = 1; x <= firstDay; x++) {
      firstDays.push(x);
    }
    setFirstDays(firstDays)
  }

  const changeDate = (e, day) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), day))
    showSidebar(e)
  }

  const changeMonth = e => {
    setDate(new Date(date.getFullYear(), e.target.value, date.getDate()))
    loadContainer()
  }

  const moveYear = (i) => {
    setDate(new Date(date.getFullYear() + i, date.getMonth(), date.getDate()))
    loadContainer()
  }

  const goToToday = e => {
    setDate(new Date());
    loadContainer()
  }

  const showSidebar = (e) => {
    // get the sidebar ID from the current element data attribute
    const sidebarID = "sidebar1";
    // check if there is an element on the doc with the id
    const sidebarElement = sidebarID ? document.getElementById(sidebarID) : undefined;
    // if there is a sidebar with the passed id (data-toggle-sidebar)
    if (sidebarElement) {
      // toggle the aria-hidden state of the given sidebar
      let sidebarState = sidebarElement.getAttribute('aria-hidden');
      sidebarElement.setAttribute('aria-hidden', sidebarState === 'true' ? false : true);

      let hours = []
      const initHour = 8
      const endHour = 24
      for(let i = initHour; i <= endHour; i++){
        hours[i] = i
      }
      setAvailableHours(hours)
    }
  }

  return (
    <main>

      <div id="sidebar1" className="sidebar" aria-hidden="true">
        <div className="sidebar_header">
          <button data-toggle-sidebar="sidebar1" onClick={e => showSidebar(e)}>Close</button>
          <p>{date.getDate() + "/" + MESES[date.getMonth()] + "/" + date.getFullYear()}</p>
        </div>
        <div className="sidebar__content">
        {
          availableHours.map(hour => {
            return(
            <div className="hour-section">{hour}</div>
            )
          })
        }
        </div>
      </div>

      <div className="date-header">
        <div className="year-header">
          <div onClick={e => moveYear(-1)}> {"<"} </div>
          <h1>{date.getFullYear()}</h1>
          <div onClick={e => moveYear(1)}> {">"} </div>
        </div>
        <select value={date.getMonth()} onChange={e => { changeMonth(e) }}>
          {
            Object.keys(MESES).map((key, index) => {
              return <option value={key} key={index}>{MESES[key]}</option>
            })
          }
        </select>
        <input type="button" onClick={e => goToToday()} value="Hoy" />
      </div>
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
            return (
              <div className="init-days" key={d}>X</div>
            )
          })
        }
        {daysOfMonth.map(day => {
          return (
            <div className="day" key={day} onClick={e => changeDate(e, day)}>
              <div className={day === date.getDate() ? "day-selected" : ""} key={day}>{day}</div>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default App;
