import React from "react";
import  'bootstrap/dist/css/bootstrap.min.css' 
import {Card} from 'react-bootstrap'
import styles from './Card.module.css'

// let idGame = 3 
export default function Individual ({name, image}){

    return (
        <div className={styles.container} >
            <Card className={styles.card} style={{color: '#000', marginBottom: 65, background:"rgba(81, 0, 187, 0.164)", borderBottom: "rgba(81, 0, 187, 0.164)" }}>
            <Card.Img className={styles.img} src={image} alt="img not found"/>
            <Card.Body  style={{width: 250, height: 70, borderRadius: 25}}>
            <Card.Title className="title-text" >
                <a className={styles.text} >{name}</a>                 
            </Card.Title>           
          </Card.Body>
          <Card></Card>
      </Card>
        </div>
      
    )
}

