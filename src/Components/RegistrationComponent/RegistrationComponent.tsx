import React, { FC, useMemo, useRef, useState } from "react";
// import styles from "./RegistrationComponent.module.css";'
import './RegistrationComponent.less';

export const RegistrationComponent: FC = React.memo(() => {
    const [firstName, setFirstName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    return <div className='registrationComponent'>
        <h1 className="registrationText">Регистрация</h1>
        <form name="registrationForm" className="registrationForm">
            <div className='inputDiv formChild'>
                <input type="text" className='input' placeholder="Имя" required/>
            </div>
            <div className='inputDiv formChild'>
                <input type="text" className='input' placeholder="Фамилия" required/>
            </div>
            <div className='inputDiv formChild'>
                <input type="text" className='input' placeholder="Телефон" required/>
            </div>
            <div className='inputDiv formChild'>
                <input type="text" className='input' placeholder="Почта" required/>
            </div>
            <div className='inputDiv formChild'>
                <input type="password" className='input' placeholder="Пароль" required/>
            </div>
            <div className='inputDiv formChild'>
                <input type="password" className='input' placeholder="Повторите пароль" required/>
            </div>
            <button type="submit" className='submitButton formChild'>Продолжить</button>
        </form>
    </div>
})