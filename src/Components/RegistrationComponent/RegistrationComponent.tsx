import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewContest } from "../../Models/Interviews/InterviewContest";
import { getInterviewSolutionForContest, registerUser, ResponseCode, setJWT, startInterviewSolution } from "../../Routes/Queries";
import { emailPattern } from "../Login/LoginComponent";
import './RegistrationComponent.less';

export const RegistrationComponent: FC = React.memo(() => {
    const { id: invitationId } = useParams();
    
    const logo = '/assets/coderev-logo.svg';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registrationResponseCode, setRegistrationResponseCode] = useState<ResponseCode>(ResponseCode.undefinedError);
    const [authResponseCode, setAuthResponseCode] = useState<ResponseCode>(ResponseCode.undefinedError);
    const nav = useNavigate()

    const interviewSolution = useRef<InterviewContest>()
    useQuery('contestInterview', getInterviewSolutionForContest,
        { enabled: authResponseCode === ResponseCode.ok && !interviewSolution.current, onSuccess: (data) => { interviewSolution.current = data }});

    useQuery(['startInterviewSolution', interviewSolution.current],
        () => { return startInterviewSolution(interviewSolution.current) },
        { enabled: authResponseCode === ResponseCode.ok && !!interviewSolution.current, onSuccess: () => navToContest() });

    if (authResponseCode === ResponseCode.ok && !interviewSolution) {
        setInterval(() => {
        }, 2000)
    }

    const navToContest = () => {
        nav(`/contest/${interviewSolution.current.id}`);
    }

    const onSubmit = async (formData: any) => {
        let firstName: string = formData.firstName;
        let surname: string = formData.surname;
        let phoneNumber: string = formData.phoneNumber;
        let email: string = formData.email;
        let password: string = formData.password;
        
        let responseCode = await registerUser(invitationId, firstName, surname, email, password, phoneNumber);
        setRegistrationResponseCode(responseCode);

        if (responseCode !== ResponseCode.ok) {
            return;
        }

        responseCode = await setJWT(email, password);
        setAuthResponseCode(responseCode);

        if (responseCode !== ResponseCode.ok) {
            return;
        }
    }

    return (
    <div className='registrationComponent'>
        <img className='logo' src={logo} alt="pretty logo"/>
        <form name="registrationForm" className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='inputDiv formChild'>
                <input {...register("firstName", {required: true})} type="text" className='input' placeholder="Имя"/>
            </div>
            {errors.firstName && <span className='error'>Необходимо заполнитель это поле</span>}

            <div className='inputDiv formChild'>
                <input {...register("surname", {required: true})} type="text" className='input' placeholder="Фамилия"/>
            </div>
            {errors.surname && <span className='error'>Необходимо заполнитель это поле</span>}

            <div className='inputDiv formChild'>
                <input {...register("phoneNumber", {required: true, pattern: phonePattern})} type="tel" className='input' placeholder="Телефон"/>
            </div>
            {errors.phoneNumber && <span className='error'>Необходимо заполнитель это поле</span>}

            <div className='inputDiv formChild'>
                <input {...register("email", {required: true, pattern: emailPattern})} type="text" className='input' placeholder="Почта"/>
            </div>
            {errors.email && <span className='error'>Необходимо заполнитель это поле</span>}

            <div className='inputDiv formChild'>
                <input {...register("password", {required: true})} type="password" className='input' placeholder="Пароль"/>
            </div>
            {errors.password && <span className='error'>Необходимо заполнитель это поле</span>}

            {/* <div className='inputDiv formChild'>
                <input {...register("confirmPassword", {required: true})} type="password" className='input' placeholder="Повторите пароль"/>
            </div>
            {errors.confirmPassword && <span className='error'>Необходимо заполнитель это поле</span>} */}

            <input type="submit" className='submitButton formChild' value={'Зарегистрироваться'}/>
        </form>
        {registrationResponseCode === ResponseCode.badRequest && <span className='error'>Не удалось зарегистрироваться</span>}
        {authResponseCode === ResponseCode.unauthorized && <span className='error'>Не удалось войти, попробуйте позже</span>}
    </div>)
})

export const phonePattern: RegExp = /[0-9]{10}/;