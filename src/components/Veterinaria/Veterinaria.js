import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
import calendario2 from '../../Image/calendario1.jpg';

const Veterinaria = () => {
      const [turn, setTurn] = useState({
          centro: '',
          dia: "",
          hora:""
      });
  
      const handleUser = (e) => {
          setTurn({
              ...turn,
              [e.target.name]: e.target.value,
          });
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault();
  
          const res = await fetch('http://localhost:3001/turn', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(turn),
          });
          
          const data = await res.json();
          console.log(data);
      };
        //este no esta terminado del todo, porque queria modificarlo cuando apliquemos css
//renderizo todo
        return (
       <div className = {styles.container}>
           <div className = {styles.logo}>  
          <img src={logo} alt="description of image" className = {styles.logo}/>
          </div>
           <h2 className = {styles.title}>Servicios de Veterinaria</h2>
           <div className = {styles.formulario}>
                   <div>
                   <h1>Elige tu horario!</h1>
             <div className={styles.item}>
            <label>Seleccione el centro:
            <select onChange={handleUser} className = {styles.selecServicio}>
                  <option value="all">Alimentos</option>
                  <option value="all">Accesorios</option>
                  <option value="all">Consultas</option>
           </select> 
            </label>

             </div>
             <div className={styles.item1}>
            <label>Dia:
            <select onChange={handleUser} className = {styles.selecHorario1}>
                  <option value="all">Lunes</option>
                  <option value="all">Martes</option>
                  <option value="all">Miercoles</option>
                  <option value="all">Jueves</option>
                  <option value="all">Viernes</option>
                  <option value="all">Sabado</option>
           </select> 
            </label>

             </div>
             <div className={styles.item2}>
            <label>Horario:
            <select onChange={handleUser} className = {styles.selecHorario}>
                  <option value="all">8:00 a 9:00</option>
                  <option value="all">9:00 a 10:00</option>
                  <option value="all">10:00 a 11:00</option>
                  <option value="all">11:00 a 12:00</option>
                  <option value="all">12:00 a 13:00</option>
                  <option value="all">13:00 a 14:00</option>
                  <option value="all">14:00 a 15:00</option>
                  <option value="all">15:00 a 16:00</option>
                  <option value="all">16:00 a 17:00</option>
                  <option value="all">17:00 a 18:00</option>
                  <option value="all">18:00 a 19:00</option>
           </select> 
            </label>

             </div>
                   </div>

             </div>

             <NavLink to = "/Turncreated"><button className = {styles.btn1} onClick={handleSubmit}>Crear turno</button></NavLink>

             <div className= {styles.sitioBtn}>
                <NavLink to = "/Home">
                <button className = {styles.btn}>Regresar</button>
                </NavLink>
             </div>

            </div>
        )
}
export default Veterinaria