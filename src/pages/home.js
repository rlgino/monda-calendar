import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import NewAppoinmentDialog from '../components/dialog/newdialog';
import Header from '../components/header/header';
import { useUser } from '../context/user-context';
import { revertDate } from '../utils';

function Home() {
    const [date, setDate] = useState(new Date());
    const [parte, setParte] = useState('dia');

    const [firstDays, setFirstDays] = useState([])
    const [daysOfMonth, setDaysOfMonth] = useState([])

    const today = new Date()

    const [meetings, setMeetings] = useState([])

    const [showDialog, setShowDialog] = useState(false)

    const [userID, setUserID] = useState(null)

    const { user, signOut } = useUser()

    useEffect(() => {
        if (date.getHours() <= 17 && date.getHours() >= 8) {
            setParte('dia')
        } else if (date.getHours() >= 17 && date.getHours() <= 20) {
            setParte('tarde')
        } else {
            setParte('noche')
        }
        setUserID(user ? user.uid : null)
        loadContainer()
        return () => { }
    }, [user, date])

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
        const meetings = []
        const encodeDate = encodeURIComponent(revertDate(date))
        fetch(`/api/consultar?user_id=${userID}&fecha=${encodeDate}`).catch(reason => {
            console.log(reason);
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            Object.entries(myJson).forEach(value => {
                meetings.push(value[1])
            })
            setMeetings(meetings)
        });
    }

    const changeDate = (e, day) => {
        setDate(new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes()))
        showSidebar(e)
    }

    const changeMonth = e => {
        const month = parseInt(e.target.value)
        setDate(new Date(date.getFullYear(), month, date.getDate(), date.getHours(), date.getMinutes()))
    }

    const moveYear = (i) => {
        setDate(new Date(date.getFullYear() + i, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()))
    }

    const goToToday = e => {
        setDate(new Date());
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

    const sendAppointment = (data) => {
        fetch(`/api/agregar?user_id=${userID}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setShowDialog(false)
        })
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

            loadMeetings()
        }
    }

    const showSectionMenu = () => {
        document.querySelector(".user-section").classList.add("show");
    }

    return (<>
        {
            showDialog ? <NewAppoinmentDialog
                onCloseDialog={(e) => { closeNewDialog(e) }}
                date={date}
                sendAppointment={sendAppointment} /> : null
        }
        <div className="w-full h-full sm:w-2/5 border">
            <div className={parte === 'dia' ? 'w-full h-auto header-day' : parte === 'noche' ? 'w-full h-auto header-nigth' : 'w-full h-auto header-afternoon'}>
                <div className="user-section" onClick={e => showSectionMenu()}>
                    {user ?
                        <>
                            <span>
                                {user.name}
                            </span>
                            <ul>
                                <li>Opciones</li>
                                <li>
                                    <a onClick={e => signOut()}>
                                        Cerrar sesión
                                    </a>
                                </li>
                            </ul>
                        </>
                        : <Link to="/login">Logguearse</Link>
                    }
                </div>
                <Header date={date} changeMonth={changeMonth} moveYear={moveYear} />
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
                                    <span className="text-gray-700">{meet.desde}</span>
                                    <span
                                        className="bg-blue-300 rounded-full w-3 h-3 hour-item"
                                    ></span>
                                    <span className="text-gray-700">{meet.hasta}</span>
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

export default Home;
