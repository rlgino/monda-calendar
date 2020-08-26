import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import NewAppoinmentDialog from './components/newdialog';

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
  const [parte, setParte] = useState('dia');

  const [firstDays, setFirstDays] = useState([])
  const [daysOfMonth, setDaysOfMonth] = useState([])

  const [availableHours, setAvailableHours] = useState([])
  const today = new Date()

  const [meetings, setMeetings] = useState([])

  const [showDialog, setShowDialog] = useState(true)

  useEffect(() => {
    loadContainer()
    loadMeetings()
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

  const loadMeetings = () => {
    const meetings = [{
      inicio: '08:00',
      fin: '10:00',
      titulo: 'Reunion con Nahuel',
      descripcion: 'Despedirlo por ir a lo del Baty y no seguir con la página.'
    }, {
      inicio: '14:00',
      fin: '18:00',
      titulo: 'Reunion con mi amigo Marquitos.',
      descripcion: 'Tengo que hablar por un aumento de sueldo a Nahuel. Nota: Pienso que quiere despedir a Nahuel. Espero que safe'
    }]
    setMeetings(meetings)
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

  const isToday = (day) => {
    return today.getDate() === day && date.getMonth() === today.getMonth() && today.getFullYear() === date.getFullYear()
  }

  const openNewDialog = (e) => {
    showSidebar()
    setShowDialog(true)
  }

  const closeNewDialog = (e) => {
    setShowDialog(false)
  }

  const agregar = (e) => {
    let data = {
      fecha: date,
      inicio: "08:00",
      fin: "10:00",
      titulo: "Titulo de pruebas",
      descripcion: "Descripcion de la cosa"
    }
    fetch('/api/agregar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res))
      .catch(reason => console.log(reason))
  }

  const consultar = (e) => {
    fetch('/api/consultar')
      .then(res => console.log(res))
      .catch(reason => console.log(reason))
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
      for (let i = initHour; i <= endHour; i++) {
        hours[i] = i
      }
      setAvailableHours(hours)
    }
  }

  return (<>
    {
      showDialog ? <NewAppoinmentDialog onCloseDialog={(e) => { closeNewDialog(e) }} date={date} /> : null
    }
    <div className="w-full h-full sm:w-2/5 border">
      <div className={parte === 'dia' ? 'w-full h-auto header-day' : parte === 'noche' ? 'w-full h-auto header-night' : 'w-full h-auto header-afternoon'}>
        <div className="w-full px-8 py-6">
          <div className="text-xl font-medium text-white flex items-center">
            <div className="mr-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-left-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
                />
              </svg>
            </div>
            <span>{date.getFullYear()} {MESES[date.getMonth() + 1]}</span>
            <div className="ml-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-right-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </div>
          </div>
        </div>


        <div className="calendario-header font-bold">
          <div className="flex justify-center items-center text-white">
            D
          </div>
          <div className="flex justify-center items-center text-white">
            L
          </div>
          <div className="flex justify-center items-center text-white">
            M
          </div>
          <div className="flex justify-center items-center text-white">
            X
          </div>
          <div className="flex justify-center items-center text-white">
            J
          </div>
          <div className="flex justify-center items-center text-white">
            V
          </div>
          <div className="flex justify-center items-center text-white">
            S
          </div>
        </div>
      </div >

      <div className="calendario-body">
        {
          firstDays.map(d => {
            return (
              <button className="border-r border-b text-gray-500 px-2 py-2" key={d}>X</button>
            )
          })
        }
        {
          daysOfMonth.map(day => {
            return (
              <button
                className={isToday(day) ? "border-2 border-blue-900 shadow bg-orange-100 px-2 py-2 add-task" : "border-r border-b px-2 py-2"}
                key={day}
                onClick={e => changeDate(e, day)}
              >{day}</button>
            )
          })
        }
      </div>
    </div>

    <div className="flex h-full w-full p-4 sidebar" aria-hidden="true" id="sidebar1">
      <div className="h-full w-2 border-r-2 border-blue-300"></div>
      <div className="h-full w-full ml-2">
        <input type="button" onClick={e => openNewDialog(e)} className="primary-btn" value="Agregar" />
        {
          meetings.map(meet => {
            return (
              <div className="flex bg-gray-200 border border-gay-300 rounded text-sm p-1  mt-4">
                <div className="flex flex-col justify-between h-full">
                  <span className="text-gray-700">{meet.inicio}</span>
                  <span
                    className="bg-blue-300 rounded-full w-3 h-3 hour-item"
                  ></span>
                  <span className="text-gray-700">{meet.fin}</span>
                </div>

                <div className="ml-2 text-xs">
                  <strong>{meet.titulo}</strong>
                  <div className="mt-2">
                    {meet.descripcion}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </>
  );
}

export default App;
