import React, { useState } from 'react'
import './login.css'
import { useUser } from '../context/user-context'
import { Redirect } from 'react-router-dom'

function LoginPage() {
    const { user, loginUser, createUser } = useUser()

    const [displayName, setDisplayName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const [errorMsg, setErrorMsg] = useState()
    const [isRegister, setIsRegister] = useState(false)

    if (user) {
        return <Redirect to="/home" />
    }

    const changeAction = () => {
        setIsRegister(isRegister ? false : true)
    }

    const login = (e) => {
        e.preventDefault()
        loginUser(mail, pass).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
            if (error.code === "auth/user-not-found") {
                setErrorMsg("Usuario no registrado")
            } else {
                setErrorMsg(error.message)
            }
        })
    }

    const register = (e) => {
        e.preventDefault()
        createUser(mail, pass, displayName).then(res => {
            setMail("")
            setPass("")
            setDisplayName("")
            changeAction();
        }).catch(error => {
            console.error(error);
            if (error.code === "auth/user-not-found") {
                setErrorMsg("Usuario no registrado")
            } else {
                setErrorMsg(error.message)
            }
        })
    }

    return (
        <div className="container">
            <div className="main">
                <form onSubmit={e => { isRegister ? register(e) : login(e) }}>
                    <img src="/logo.jpeg" alt="Monda Logo" />
                    <h1>Bienvenido</h1>
                    {
                        isRegister ? <input type="text" placeholder="Name" value={displayName} onChange={e => setDisplayName(e.target.value)} required /> : <></>
                    }
                    <input type="email" placeholder="Email" value={mail} onChange={e => setMail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
                    <input type="submit" value={isRegister ? "Registrarse" : "Login"} />
                    <div onClick={() => changeAction()} className="action">
                        {!isRegister ? "Registrarse" : "Logguearse"}
                    </div>
                    {errorMsg ? <div className="error-msg">{errorMsg}</div> : null}
                </form>
            </div>
        </div>
    )
}

export default LoginPage
