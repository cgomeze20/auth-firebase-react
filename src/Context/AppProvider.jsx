import { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const [login, setLogin] = useState('');
  const [selectEdition, setSelectEdition] = useState(false)

  return (
    <AppContext.Provider value={{ login, setLogin, selectEdition, setSelectEdition }}>
      {children}
    </AppContext.Provider>
  )
}