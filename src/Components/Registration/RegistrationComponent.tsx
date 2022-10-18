import React, { FC, useMemo, useRef, useState } from "react";
import styles from "./RegistrationComponent.module.css";

export const RegistrationComponent: FC = React.memo(() => {
    const registrationForm = "registrationForm";

    const [fio, setFio] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    return <div className={styles.registrationComponent}>
        <div className={styles.registrationComponentHeader}>
            <h1 className={styles.h1}>Регистрация</h1>
        </div>
        <form name={registrationForm}>
            <div className={styles.inputDiv}>
                <input type="text" className={styles.input} placeholder="ФИО" required/>
            </div>
            <div className={styles.inputDiv}>
                <input type="text" className={styles.input} placeholder="Телефон" required/>
            </div>
            <div className={styles.inputDiv}>
                <input type="text" className={styles.input} placeholder="Почта" required/>
            </div>
            <div className={styles.inputDiv}>
                <input type="password" className={styles.input} placeholder="Пароль" required/>
            </div>
            <div className={styles.inputDiv}>
                <input type="password" className={styles.input} placeholder="Повторите пароль" required/>
            </div>
            <button type="submit" className={styles.button}>Продолжить</button>
        </form>
    </div>
})