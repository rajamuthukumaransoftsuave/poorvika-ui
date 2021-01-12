import TextInput from "../../Components/TextInput";
import Head from 'next/head'
import { API_URLS, componentCss } from "../../Constants";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";


/**
  * This component is used to show login form also it will redirect user to home page if user authenticate.
  * It also validate the user if it is present in application.
  * By this you can login as admin as well as an employee.
  @returns {*}
  @param {{
  }} props
*/

export default function Login() {
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [loginDisabled, setLoginDisabled] = useState(true)
    const [apiError, setApiError] = useState('')
    const [errorObj, setErrorObject] = useState({
        userId: {
            touched: false,
            error: false,
            errorText: ''
        },
        password: {
            touched: false,
            error: false,
            errorText: ''
        },
    })

    useEffect(() => {
        const newError = {
            userId: {

            },
            password: {

            }
        }
        if(userId !== '' && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userId) && password !== ''){
            setErrorObject({...newError})
            setLoginDisabled(false)
        } else {
            if(userId === ''){
                newError.userId.error = true
                newError.userId.errorText = 'Empty Field!'
            } else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userId))){
                newError.userId.error = true
                newError.userId.errorText = 'Invalid Email!'
            } 
            if(password === ''){
                newError.password.error = true
                newError.password.errorText = 'Empty Field!'
            }
            setErrorObject(obj => {
                newError.password.touched = obj.password.touched
                newError.userId.touched = obj.userId.touched
                return {
                    ...newError
                }
            })
            setLoginDisabled(true)
        }
    }, [
        userId,
        password
    ])

    const doLogin = useCallback(() => {
        fetch(API_URLS.login, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userId,
                password: password
            })
        })
        .then(async res => {
            const result = await res.json()
            if(result.data){
                window.localStorage.setItem('user_details', JSON.stringify({
                    ...result.data.user,
                    id: result.data.user._id,
                    token: result.data.token,
                }))
                router.push('/')
                setApiError('')
            } else {
                setApiError(result.message)
            }
           
        })
        .catch(error => {
            console.log(error)
            setApiError(error.message)
        })
    }, [userId, password, router])

    return (
    <div className={componentCss.mainContainer}>
         <Head>
        <title>Employee Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={componentCss.formContainer}>
        <div className="grid h-10 flex justify-center">
           <label className={componentCss.headingLg}>
               Login
           </label>
        </div>
        <div className="grid h-15 flex justify-center">
           <span className={componentCss.noteLg}>
                Login to your account as an Admin/Employee.
           </span>
        </div>
        <div className="grid h-10">
            <TextInput
                id='user_id'
                value={userId}
                placeholder={'Email Id'}
                onChange={setUserId}
                error={errorObj.userId.error && errorObj.userId.touched}
                errorText={errorObj.userId.errorText}
                onBlur={() => {
                    errorObj.userId.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        <div className="grid h-10">
            <TextInput
                id='password'
                value={password}
                type="password"
                placeholder={'Password'}
                onChange={setPassword}
                error={errorObj.password.error && errorObj.password.touched}
                errorText={errorObj.password.errorText}
                onBlur={() => {
                    errorObj.password.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        {apiError &&
            <div className="grid h-6">
                <span className={componentCss.errorText}>
                    {apiError}
                </span>
            </div>
        }
        <div className="grid gap-6 flex-row py-4 flex justify-end items-center">
            <button onClick={doLogin} className={loginDisabled ? componentCss.disableButton : componentCss.button} disabled={loginDisabled} >
                login
            </button>
        </div>
    </div>
    </div>
    )
}