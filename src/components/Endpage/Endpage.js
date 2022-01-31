import React from "react";
import styles from "../Style/Endpage.module.css"
import logo from '../../Image/logo.png';

function endPage(props) {
    return(
        <div className={styles.container}>
                        <img src={logo} className={styles.logo} />
            <h1 className={styles.saludo}>Muchas gracias por utilizar nuestros servicios</h1>
        </div>
    )
}

export default endPage