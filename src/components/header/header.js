import React from 'react'

const Header = ({ date, changeMonth, moveYear }) => {
    const MESES = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    return (
        <div className="w-full px-8 py-6">
            <div className="text-xl font-medium text-white flex items-center">
                <div className="mr-2">
                    <svg
                        onClick={e => moveYear(-1)}
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
                <span>
                    {date.getFullYear()}
                    <select dir="rtl" value={date.getMonth()} onChange={e => { changeMonth(e) }} className="combo-months" disabled>
                        {
                            MESES.map((value, index) => {
                                return <option value={index} key={index}>{value}</option>
                            })
                        }
                    </select>
                </span>
                <div className="ml-2">
                    <svg
                        onClick={e => moveYear(+1)}
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
    )
}

export default Header
