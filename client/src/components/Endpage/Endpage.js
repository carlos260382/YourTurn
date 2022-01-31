import React from "react";
import styles from "../Style/Endpage.module.css"
import logo from '../../Image/logo.png';
import despedida from '../../Image/despedida.png';

function endPage(props) {
    return(
        <div className={styles.container}>
                        <img src={logo} className={styles.logo} />
        
        <h1 className={styles.saludo}>Muchas gracias por utilizar nuestros servicios</h1>
 
        <div className={styles.desp}>
          <img src={despedida}/>
        </div>
       
        </div>

    )
}

export default endPage