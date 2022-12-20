import React, { useState } from 'react';
import './LoginComponent.less';
import { useForm } from 'react-hook-form';
import { ResponseCode, setJWT } from '../../Routes/Queries';
import { useNavigate } from 'react-router-dom';

export const LoginComponent: React.FC = React.memo(() => {
    const logo = '/assets/coderev-logo.svg';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [authResponseCode, setAuthResponseCode] = useState<ResponseCode>(ResponseCode.undefinedError);
    const nav = useNavigate()

    const onSubmit = async (formData: any) => {
        let email: string = formData.email;
        let password: string = formData.password;
        
        let code = await setJWT(email, password);
        setAuthResponseCode(code);

        if (code === ResponseCode.ok)
            nav('/cards');
    }

    return <div className='loginComponent'>
        <img className='logo' src={logo} alt="pretty logo"/>
        <form name="loginForm" className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='inputDiv formChild'>
                <input {...register("email", {required: true, pattern: emailPattern})} type="text" className='input' placeholder="Почта"/>
            </div>
            {errors.email && <span className='error'>Необходимо заполнитель это поле</span>}

            <div className='inputDiv formChild'>
                <input {...register("password", {required: true})} type="password" className='input' placeholder="Пароль"/>
            </div>
            {errors.password && <span className='error'>Необходимо заполнитель это поле</span>}

            <input type="submit" className='submitButton formChild' value={'Войти'}/>
        </form>
        {authResponseCode === ResponseCode.unauthorized && <span className='error'>Неверный логин или пароль</span>}
    </div>
})

export const emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;