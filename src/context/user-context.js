import React, { useState, useEffect } from 'react'
import { signIn, signUp, onAuthStateChange, signOut as firebaseSignOut } from '../firebase/firebase'

const UserContext = React.createContext()

export function UserProvider(props) {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        onAuthStateChange(function (userResult) {
            console.log(userResult);
            if (userResult) {
                setUser(userResult.email)
            } else {
                setUser(null)
            }
        })
        return () => { }
    }, [])

    const loginUser = (mail, password) => {
        return signIn(mail, password)
    }

    const createUser = (mail, password) => {
        return signUp(mail, password)
    }

    const signOut = () => {
        return firebaseSignOut()
    }

    const value = React.useMemo(() => {
        return ({
            user, loadingUser, loginUser, createUser, signOut
        })
    }, [user, loadingUser])

    return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
    const context = React.useContext(UserContext)
    if (!context) {
        throw new Error("Content not exists!")
    }
    return context
}