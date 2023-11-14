"use client";

import EmailInput from '@/components/form/EmailInput/EmailInput'
import { FormRequirement } from '@/components/form/FormRequirement/FormRequirement'
import GithubSVG from '@/components/icons/GithubSVG/GithubSVG'
import GoogleSVG from '@/components/icons/GoogleSVG/GoogleSVG'
import Logo from '@/components/global/Logo/Logo';
import PasswordInput from '@/components/form/PasswordInput/PasswordInput'
import PurpleButton from '@/components/global/ElectricButton/ElectricButton'
import UsernameInput from '@/components/form/UsernameInput/UsernameInput'
import WhiteButton from '@/components/global/WhiteButton/WhiteButton'
import { validatePasswordHasLowercase, validatePasswordHasNumber, validatePasswordHasSpecialChar, validateUsernameCharacters, validateUsernameLength, validatePasswordHasUppercase, validateEmail } from '@/features/signup/validation';
import handleInputChange from '@/utils/handleInputChange';
import Image from 'next/image'
import { useState } from 'react'

export default function Signup() {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [confirmEmailValue, setConfirmEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    
    return (
        <main className='flex'>
            <div className='fixed background h-full w-full -z-10'></div>
            <div className='bg-haiti my-24 m-auto px-5 w-full max-w-2xl shadow-lg rounded-lg flex flex-col justify-between'>
                <div className='mx-auto mt-2 pr-6'>
                    <Logo/>
                </div>
                <div>
                    <p className='w-full text-center text-3xl mb-6 mt-16'>SIGN UP</p>
                    <div className="mx-auto max-w-fit">
                        <UsernameInput className='mb-2' value={nameValue} onChange={(e) => handleInputChange(setNameValue, e)}/>
                        <FormRequirement text="Length between 3 and 20 characters." isMet={validateUsernameLength(nameValue)} isEmpty={nameValue.length == 0}/>
                        <FormRequirement text="Only alphanumeric characters." isMet={validateUsernameCharacters(nameValue)} isEmpty={nameValue.length == 0}/>
                        <EmailInput className='mb-3 mt-5' value={emailValue} onChange={(e) => handleInputChange(setEmailValue, e)}/>
                        <EmailInput placeholder="Confirm email" className='mb-2' value={confirmEmailValue} onChange={(e) => handleInputChange(setConfirmEmailValue, e)}/>
                        <FormRequirement text="Correct format." isMet={validateEmail(emailValue)} isEmpty={emailValue.length == 0}/>
                        <FormRequirement text="Emails match." isMet={emailValue === confirmEmailValue} isEmpty={confirmEmailValue.length == 0}/>
                        <PasswordInput className='mb-3 mt-5' value={passwordValue} onChange={(e) => handleInputChange(setPasswordValue, e)}/>
                        <PasswordInput placeholder="Confirm password" className='mb-2' value={confirmPasswordValue} onChange={(e) => handleInputChange(setConfirmPasswordValue, e)}/>
                        <FormRequirement text="Length between 8 and 64 characters." isMet={validateUsernameLength(passwordValue)} isEmpty={passwordValue.length == 0}/>
                        <FormRequirement text="Uppercase letters (A-Z)." isMet={validatePasswordHasUppercase(passwordValue)} isEmpty={passwordValue.length == 0}/>
                        <FormRequirement text="Lowercase letters (a-z)." isMet={validatePasswordHasLowercase(passwordValue)} isEmpty={passwordValue.length == 0}/>
                        <FormRequirement text="Numbers (0-9)." isMet={validatePasswordHasNumber(passwordValue)} isEmpty={passwordValue.length == 0}/>
                        <FormRequirement text="Special characters (e.g., !, @, #, $, %)." isMet={validatePasswordHasSpecialChar(passwordValue)} isEmpty={passwordValue.length == 0}/>
                        <FormRequirement text="Passwords match." isMet={passwordValue === confirmPasswordValue} isEmpty={confirmPasswordValue.length == 0}/>
                        <PurpleButton className='mt-5 mx-auto w-full text-center' href="/" text="SIGN UP"/>
                    </div>
                </div>
                <div className='mb-5 mr-0 ml-auto mt-16'>
                    <span className='mr-5'>Already have an account?</span>
                    <WhiteButton href="/" text="LOG IN"/>
                </div>
            </div>
        </main>
    )
}