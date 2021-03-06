import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, HorizontalLoader} from '../../ui'
import './SignInForm.scss'
import {Redirect} from 'react-router-dom'
import {getCaptchaRequest} from '../../dal/dal'
const SignInForm = props => {
    const [captchaSrc, setcaptchaSrc] = useState(null)
    useEffect(() => {
        if (props.signInFailed) defineCaptcha()
    }, [props.signInFailed])
    useEffect(() => {
        defineCaptcha()
    }, [])
    const defineCaptcha = () => {
        getCaptchaRequest().then(response => setcaptchaSrc(response.url))
    }

    const {register, handleSubmit, errors} = useForm({
        mode: 'onBlur',
    })
    const onSumbit = data => {
        props.logIn(data)
    }
    if (props.signInComplete) {
        return <Redirect to='/' />
    }
    return (
        <form className='sign-in-form' onSubmit={handleSubmit(onSumbit)}>
            {props.requestSent && !(props.signInFailed || props.signInComplete) ? (
                <HorizontalLoader />
            ) : null}
            <h1 className='sign-in-form__title'>Sign in</h1>
            <p className='sign-in-form__alert'>
                {props.signInFailed ? 'incorect password and/or email' : null}
            </p>
            <p className='sign-in-form__help-info'>
                Sing-in as gest usung this:
                <br />
                <b>Email:</b> free@samuraijs.com
                <br />
                <b>Password:</b> free
            </p>
            <Input
                name='email'
                register={register({
                    required: 'Required',
                    minLength: {value: 3, message: 'Minimum 3 characters'},
                    maxLength: {value: 35, message: 'Maximum 5 characters'},
                    pattern: {value: /^\S+@\S+\.\S+$/, message: 'invalid email'},
                })}
                error={errors.email}
                placeholder='Email'
            />
            <Input
                name='password'
                type={'password'}
                register={register({
                    required: 'Required',
                    minLength: {value: 3, message: 'Minimum 3 characters'},
                    maxLength: {value: 35, message: 'Maximum 5 characters'},
                })}
                error={errors.password}
                placeholder='Password'
            />
            <img className='sign-in-form__captcha' alt='' src={captchaSrc}></img>
            <div className='sign-in-form__captcha-refresh' onClick={defineCaptcha}>
                Refresh image
            </div>
            <Input
                name='captcha'
                register={register({
                    required: 'Required',
                })}
                placeholder='Enter the symbols from the image'
            />
            <label className='sign-in-form__checkbox'>
                <input type='checkbox' ref={register} name='rememberMe' />
                Remember me
            </label>
            <Button className='sign-in-form__button'>Sign in</Button>
        </form>
    )
}

export default SignInForm
