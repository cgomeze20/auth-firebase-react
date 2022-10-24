import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormAdd } from '../components/FormAdd'
import { FormEdit } from '../components/FormEdit'
import { Item } from '../components/Item'
import { AppContext } from '../Context/AppProvider'

import styles from '../Styles/Tasks.module.css'

export const Tasks = () => {

  const { Tasks, Head, Formularios, Cards } = styles
  const navigate = useNavigate()

  const { login, setLogin, selectEdition, setSelectEdition } = useContext(AppContext)
  const initialState = {
    id: '',
    description: ''
  }
  const [task, setTask] = useState(initialState);
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState({
    id: '',
    description: ''
  })

  useEffect(() => {
    if(!localStorage.token) return navigate('/login', {replace:true})
   if(localStorage.token){
    const token = localStorage.getItem('token')
    const tokenParsed = JSON.parse(token)
    setLogin(tokenParsed)
    getDataUno(tokenParsed.localId, tokenParsed.idToken)
   }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave()
    setTask(initialState)
  }

  const handleSave = async () => {

    const id = crypto.randomUUID()
    await fetch(`https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${login.localId}/${id}.json?auth=${login.idToken}`, {
      method: 'PUT',
      'content-type': 'application/json',
      body: JSON.stringify({ ...task, id })
    })
  }

  const getDataUno = async (localId, idToken) => {
    const res = await fetch(`https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${localId}.json?auth=${idToken}`)
    const data = await res.json()
    setTasks(data)
  }

  const deleteItem = async (id) => {
    try {
      await fetch(`https://contactapp-pwa-default-rtdb.firebaseio.com/tareas-api/${login.localId}/${id}.json?auth=${login.idToken}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (id) => {
    deleteItem(id)
  }

  const handleEdit = (task) => {
    setEdit(task)
    setSelectEdition(true)
  }

  const edicion = (e) => {
    const { name, value } = e.target
    setEdit(prev => ({ ...prev, [name]:value }))
  }

  return (
    <div className={Tasks}>
      <div className={Head}>
        <h1>Tasks</h1>
        <h4>{login.email}</h4>
      </div>
      <div className={Formularios}>
        {
          !selectEdition ? (
            <FormAdd handleSubmit={handleSubmit} handleChange={handleChange} task={task} />
          ) : (
            <FormEdit edit={edit} edicion={edicion} onClick={() => setSelectEdition(false)} />
          )
        }
      </div>
      <div className={Cards}>
        {
          tasks && Object.values(tasks).map(task => (
            <Item key={crypto.randomUUID()} item={task.description} onClick={() => handleDelete(task.id)} onEdit={() => handleEdit(task)} />
          ))
        }
      </div>
    </div>
  )
}
