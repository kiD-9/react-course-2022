import axios from "axios";
import { Md5 } from "ts-md5";
import { CodeExecutionRequest } from "../Models/CodeExecution/CodeExecutionRequest";
import { EntryPoint } from "../Models/CodeExecution/EntryPoint";
import { InvitationRequest } from "../Models/Invitation/InvitationRequest";
import { UserRegistrationParameters } from "../Models/UserRegistration/UserRegistrationParameters";

export const getCards = () => {
    checkToken();
    return axios.get('https://localhost:5001/api/cards')
        .then(response => response.data);
};

export const getInterviewSolutionInfo = (interviewSolutionId: string | undefined) => {
    checkToken();
    return axios.get(`https://localhost:5001/api/interviews/solution?id=${ interviewSolutionId }`)
        .then(response => response.data);
}

export const getInterviews = () => {
    checkToken();
    return axios.get(`https://localhost:5001/api/interviews`)
        .then(response => response.data);
}

export const getTaskSolutionsInfos = (interviewSolutionId: string | undefined) => {
    checkToken();
    return axios.get(`https://localhost:5001/api/contest/task-slns-info?id=${ interviewSolutionId }`)
        .then(response => response.data);
}

export const createInvitation = (role: string, interviewId: string) => {
    checkToken();
    const invitationRequst: InvitationRequest = {role: role, interviewId: interviewId};
    return axios.post(`https://localhost:5001/api/invitations/create`, invitationRequst)
        .then(response => response.data.invitation);
}

export const registerUser = (registerParams: UserRegistrationParameters) => {
    let responseResult;
    axios.post(`https://localhost:5001/api/users/register`, registerParams)
        .then(response => {
            responseResult = response.data;
        });
    console.log(responseResult) //доделать нормально
    //setJWT(); дотюнить авторизацию сразу
}

export const executeCode = (code: string, entryPoint: EntryPoint) => {
    checkToken();
    const executionRequst: CodeExecutionRequest = {code: code, entryPoint: entryPoint};
    return axios.put(`https://localhost:5001/api/compile/execute`, executionRequst)
        .then(response => response.data);
}

export const setJWT = (email: string, password: string) => {
    return axios.post(`https://localhost:5001/api/auth/login`, { email: email, passwordHash: md5EncryptString(password) })
        .then(response => {
            const token = response.data.accessToken;
            localStorage.setItem("token", token);
            setAuthorizationHeader(token);
            return ResponseCode.ok;
        })
        .catch(error => {
            if (error.response.status === 401)
                return ResponseCode.unauthorized;
            return ResponseCode.undefinedError;
        })
}

export const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthorizationHeader(token);
        return true;
    }
    return false;
}

const setAuthorizationHeader = (token: string) => {
    if (token)
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    else
        delete axios.defaults.headers["Authorization"];
}

const md5EncryptString = (str: string) => Md5.hashStr(str).toString();

export enum ResponseCode {
    undefinedError = -1,
    ok = 200,
    unauthorized = 401,
}
