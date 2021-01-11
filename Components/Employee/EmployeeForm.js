import TextInput from "../../Components/TextInput";
import { API_URLS, componentCss, employeeDesignation } from "../../Constants";
import { useCallback, useEffect, useState } from "react";
import SelectComponent from "../SelectComponent";
import DatePicker from "../DatePicker";
import service from "../../service";

export default function EmployeeForm({
    onClose,
    refreshList,
    data
}) {
    const [email, setEmailId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [designation, setDesignation] = useState('')
    const [dob, setDOB] = useState(new Date())
    const [doj, setDOJ] = useState(new Date())
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [saveDisabled, setSaveDisabled] = useState(true)
    const [apiError, setApiError] = useState('')
    const [errorObj, setErrorObject] = useState({
        email: {
            touched: false,
            error: false,
            errorText: ''
        },
        firstName: {
            touched: false,
            error: false,
            errorText: ''
        },
        lastName: {
            touched: false,
            error: false,
            errorText: ''
        },
        designation: {
            touched: false,
            error: false,
            errorText: ''
        },
        dob: {
            touched: false,
            error: false,
            errorText: ''
        },
        doj: {
            touched: false,
            error: false,
            errorText: ''
        },
        password: {
            touched: false,
            error: false,
            errorText: ''
        },
        confirmPassword: {
            touched: false,
            error: false,
            errorText: ''
        },
    })

    useEffect(() => {
        if(data){
            setEmailId(data?.email || '')
            setDOB(data?.dob ? new Date(data?.dob) : new Date())
            setDOJ(data?.doj ? new Date(data?.doj) : new Date())
            setDesignation(data?.designation || employeeDesignation[0])
            setFirstName(data?.firstName || '')
            setLastName(data?.lastName || '')
        }
    }, [data])

    useEffect(() => {
        let newError = {
            email: {

            },
            designation: {

            },
            firstName: {

            },
            password: {

            },
            confirmPassword: {

            },
            doj: {

            },
            dob: {

            }
        }
        if(email === ''){
            newError.email.error = true
            newError.email.errorText = 'Empty Field!'
        } else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            newError.email.error = true
            newError.email.errorText = 'Invalid Email!'
        } 
        if(firstName === ''){
            newError.firstName.error = true
            newError.firstName.errorText = 'Empty Field!'
        }
        if(designation === ''){
            newError.designation.error = true
            newError.designation.errorText = 'Empty Field!'
        }
        if(password === ''){
            newError.password.error = true
            newError.password.errorText = 'Empty Field!'
        }
        if(confirmPassword === ''){
            newError.confirmPassword.error = true
            newError.confirmPassword.errorText = 'Empty Field!'
        } else if(password !== confirmPassword){
            newError.confirmPassword.error = true
            newError.confirmPassword.errorText = 'Password Not Matched!'
        }
        if(doj.getTime() > dob.getTime()){
            newError.doj.error = true
            newError.doj.errorText = 'DOJ should be greater than DOB.'
        }
        setErrorObject(obj => {
            newError.email.touched = obj.email.touched
            newError.firstName.touched = obj.firstName.touched
            newError.designation.touched = obj.designation.touched
            newError.password.touched = obj.password.touched
            newError.confirmPassword.touched = obj.confirmPassword.touched
            newError.doj.touched = obj.doj.touched
            newError.dob.touched = obj.dob.touched
            return {
                ...newError
            }
        })
        if(newError?.email?.error || newError.designation.error || newError.firstName.error || newError.doj.error){
            setSaveDisabled(true)
        } else if(!data.edit && (newError.password.error || newError.confirmPassword.error)) {
            setSaveDisabled(true)
        } else {
            setSaveDisabled(false)
        }
    }, [
        data.edit,
        email,
        firstName,
        password,
        confirmPassword,
        designation,
        doj,
        dob
    ])

    const saveData = useCallback(async () => {
        const url = data.edit ? API_URLS.updateEmployee : API_URLS.createEmployee

        let dobStr = dob.getFullYear()+'-'+
        (dob.getMonth() < 10 ? '0'+(dob.getMonth()+1) : (dob.getMonth()+1) )+'-'+
        (dob.getDate() < 10 ? '0'+dob.getDate() : dob.getDate())
        let dojStr = doj.getFullYear()+'-'+
        (doj.getMonth() < 10 ? '0'+(doj.getMonth()+1) : (doj.getMonth()+1) )+'-'+
        (doj.getDate() < 10 ? '0'+doj.getDate() : doj.getDate())
        

        const requestData = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dobStr,
            dateOfJoining: dojStr,
            email: email,
            designation: designation
        }
        if(data.edit){
            requestData.userId = data.id
        } else {
            requestData.password = password
        }
        const config = {
            method: data.edit ? 'PUT' : 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(requestData)
        }

        const result = await service(url, config)

        if(result.data){
            onClose()
            refreshList()
        } else {
            setApiError(result.message)
        }

    },[
        firstName,
        lastName,
        designation,
        email,
        dob,
        doj,
        password,
        confirmPassword,
        data
    ])

    return (
    <div className="w-full gap-4 flex flex-col">
        <div className="grid h-10 flex justify-center">
           <label className={componentCss.headingLg}>
               {data.create ? 'Create Employee' : 'Edit Employee'}
           </label>
        </div>
        <div className="grid gap-4 pr-2 overflow-auto" style={{ maxHeight: '81%' }}>
        <div className="grid">
            <TextInput
                id='email_id'
                value={email}
                placeholder={'Email Id'}
                onChange={(value) => { setEmailId(value) }}
                error={errorObj.email.error && errorObj.email.touched}
                errorText={errorObj.email.errorText}
                disabled={data.edit}
                onBlur={() => {
                    errorObj.email.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        <div className="grid">
            <TextInput
                id='first_name'
                value={firstName}
                capitalize
                placeholder={'First Name'}
                onChange={(value) => { setFirstName(value) }}
                error={errorObj.firstName.error && errorObj.firstName.touched}
                errorText={errorObj.firstName.errorText}
                onBlur={() => {
                    errorObj.firstName.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        <div className="grid">
            <TextInput
                id='last_name'
                capitalize
                value={lastName}
                placeholder={'Last Name'}
                onChange={(value) => { setLastName(value) }}
            />
        </div>
        <div className="grid">
            <SelectComponent
                label="Designation"
                data={employeeDesignation}
                onSelect={(value) => {
                    setDesignation(value)
                }}
                selected={designation}
                error={errorObj.designation.error && errorObj.designation.touched}
                errorText={errorObj.designation.errorText}
                onBlur={() => {
                    errorObj.designation.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        <div className="grid">
           <DatePicker
            label="Date Of Joining: "
            selected={doj} 
            disabled={data.edit}
            onChange={date => setDOJ(date)}
            error={errorObj?.doj?.error || errorObj?.doj?.touched}
            errorText={errorObj?.doj?.errorText}
            onBlur={() => {
                errorObj.doj.touched = true
                setErrorObject({
                    ...errorObj
                })
            }}
           />
        </div>
        <div className="grid">
           <DatePicker
                label="Date Of Birth: "
                dateContainerCss="ml-3.5"
                error={errorObj?.dob?.error && errorObj?.dob?.touched}
                errorText={errorObj?.dob?.errorText}
                selected={dob} 
                maxDate={new Date()}
                onChange={date => setDOB(date)}
                onBlur={() => {
                    errorObj.dob.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
           />
        </div>
        {data.create &&
            <div className="grid">
                <TextInput
                id='password'
                value={password}
                placeholder={'Password'}
                type="password"
                onChange={(value) => { setPassword(value) }}
                error={errorObj.password.error && errorObj.password.touched}
                errorText={errorObj.password.errorText}
                onBlur={() => {
                    errorObj.password.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>}
        {data.create &&
        <div className="grid">
           <TextInput
                id='confirm_password'
                value={confirmPassword}
                placeholder={'Confirm Password'}
                type="password"
                onChange={(value) => { setConfirmPassword(value) }}
                error={errorObj.confirmPassword.error && errorObj.confirmPassword.touched}
                errorText={errorObj.confirmPassword.errorText}
                onBlur={() => {
                    errorObj.confirmPassword.touched = true
                    setErrorObject({
                        ...errorObj
                    })
                }}
            />
        </div>
        }
        </div>
        {apiError &&
            <div className="grid h-6">
                <span className={componentCss.errorText}>
                    {apiError}
                </span>
            </div>
        }
        <div className="flex gap-4 py-4 justify-end items-center">
            <button onClick={saveData} className={saveDisabled ? componentCss.disableButton : componentCss.button} disabled={saveDisabled} >
                {data.create ? 'Create' : 'Save'}
            </button>
            <button className={componentCss.button} onClick={onClose} >
                Cancel
            </button>
        </div>
    </div>
    )
}