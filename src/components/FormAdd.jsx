import React from 'react'
import styles from '../Styles/FormAdd.module.css'

export const FormAdd = ({ handleSubmit, handleChange, task}) => {

  const { btnAdd } = styles

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add task</h1>
      <input type='text' name='description' value={task.description} onChange={handleChange} placeholder='Add taks' />
      <button className={btnAdd} type='submit'>Add</button>
    </form>
  )
}
