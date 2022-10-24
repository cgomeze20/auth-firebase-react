import React from 'react'
import styles from '../Styles/Card.module.css'

export const Item = ({item, onClick, onEdit}) => {

  const { Card, ButtonsContainer } = styles

  return (
    <div className={Card}>
        <p>{item}</p>
        <div className={ButtonsContainer}>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onClick}>Delete</button>
        </div>
    </div>
  )
}
