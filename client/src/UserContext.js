import React from 'react'
import { createContext, useState } from 'react'

export const UserContext =  createContext({});
export const UserContextProvider=({children})=>{
    const [userinfo, setUserinfo] = useState({})
    return(
        <UserContext.Provider value={{userinfo, setUserinfo}}>
            {children}
            </UserContext.Provider>
    )
}