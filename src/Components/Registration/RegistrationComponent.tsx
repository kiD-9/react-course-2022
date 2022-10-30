import React, { FC, useMemo, useRef, useState } from "react";
// import styles from "./RegistrationComponent.module.css";'
import './RegistrationComponent.less';

export const RegistrationComponent: FC = React.memo(() => {
    const [fio, setFio] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    return <div className='registrationComponent'>
        <div className='header'>
            <h1>Регистрация</h1>
        </div>
        <form name="registrationForm">
            <div className='inputDiv'>
                <input type="text" className='input' placeholder="ФИО" required/>
            </div>
            <div className='inputDiv'>
                <input type="text" className='input' placeholder="Телефон" required/>
            </div>
            <div className='inputDiv'>
                <input type="text" className='input' placeholder="Почта" required/>
            </div>
            <div className='inputDiv'>
                <input type="password" className='input' placeholder="Пароль" required/>
            </div>
            <div className='inputDiv'>
                <input type="password" className='input' placeholder="Повторите пароль" required/>
            </div>
            <button type="submit" className='submitButton'>Продолжить</button>
        </form>
    </div>
})