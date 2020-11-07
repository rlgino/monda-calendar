import React, { useState, useEffect } from 'react'
import { signIn, signUp, onAuthStateChange, signOut as firebaseSignOut, getCurrentUser } from '../firebase/firebase'

const UserContext = React.createContext()

export function UserProvider(props) {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        onAuthStateChange(function (userResult) {
            if (userResult) {
                setUser({
                    name: userResult.displayName,
                    email: userResult.email,
                    uid: userResult.uid
                })
            } else {
                setUser(null)
            }
            setLoadingUser(false)
        })
        return () => { }
    }, [])

    const loginUser = (mail, password) => {
        return signIn(mail, password)
    }

    const createUser = (mail, password, displayName) => {
        return signUp(mail, password).then(function (result) {
            return result.user.updateProfile({
                displayName: displayName
            })
        });
    }

    const updateUser = (displayName) => {
        var user = getCurrentUser();

        return user.updateProfile({
            displayName: displayName
        })
    }

    const signOut = () => {
        return firebaseSignOut()
    }

    const value = React.useMemo(() => {
        return ({
            user, loadingUser, loginUser, createUser, signOut, updateUser
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