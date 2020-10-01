import React, { useState } from 'react'
import { signIn, signUp } from '../firebase/firebase'
import './login.css'

function LoginPage() {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const [errorMsg, setErrorMsg] = useState()
    const [isRegister, setIsRegister] = useState(false)

    const changeAction = () => {
        setIsRegister(isRegister ? false : true)
    }

    const login = (e) => {
        e.preventDefault()
        signIn(mail, pass).then(res => {
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
        signUp(mail, pass).then(res => {
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

    return (
        <div className="container">
            <div className="main">
                <form onSubmit={e => { isRegister ? register(e) : login(e) }}>
                    <img src="/logo.jpeg" alt="Monda Logo" />
                    <h1>Bienvenido</h1>
                    <input type="email" placeholder="Email" onChange={e => setMail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} required />
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
