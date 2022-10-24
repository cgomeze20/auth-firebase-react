import React, { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'
import styles from '../Styles/FormEdit.module.css'

export const FormEdit = ({ edit, onClick, edicion }) => {

  const { ButtonsContainer } = styles

  const { login, setSelectEdition } = useContext(AppContext)



  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await fetch(`https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${login.localId}/${edit.id}.json?auth=${login.idToken}`, {
        method: 'PATCH',
        body: JSON.stringify(edit)
      })
      setSelectEdition(false)
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit task</h1>
      <input type='text' name='description' value={edit.description} onChange={edicion} placeholder='Edit taks' />
      <input name='id' type='hidden' value={edit.id} placeholder='Edit taks' />
      <div className={ButtonsContainer}>
      <button type='submit' onClick={handleUpdate}>Edit</button>
      <button type='submit' onClick={onClick}>Cancel</button>
      </div>
    </form>
  )
}
