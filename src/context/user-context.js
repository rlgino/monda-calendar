import React, { useState } from 'react'

const UserContext = React.createContext()

export function UserProvider(props) {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    const loginUser = (username, password) => {
        setUser(username)
        setLoadingUser(password !== "")
    }

    const value = React.useMemo(() => {
        return ({
            user, loadingUser, loginUser
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