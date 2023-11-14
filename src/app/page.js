import GithubSVG from '@/components/icons/GithubSVG/GithubSVG'
import GoogleSVG from '@/components/icons/GoogleSVG/GoogleSVG'
import Logo from '@/components/global/Logo/Logo'
import PasswordInput from '@/components/form/PasswordInput/PasswordInput'
import PurpleButton from '@/components/global/ElectricButton/ElectricButton'
import UsernameInput from '@/components/form/UsernameInput/UsernameInput'
import WhiteButton from '@/components/global/WhiteButton/WhiteButton'
import Image from 'next/image'

export default function Login() {
  return (
    <main className='flex'>
      <div className='fixed background h-full w-full -z-10'></div>
      <div className='bg-haiti my-24 m-auto px-5 w-full max-w-2xl shadow-lg rounded-lg flex flex-col justify-between'>
        <div className='mx-auto mt-2 pr-6'>
          <Logo/>
        </div>
        <div>
          <p className='w-full text-center text-3xl mb-6 mt-16'>LOG IN</p>
          <div className="mx-auto max-w-fit">
            <UsernameInput className='mb-4'/>
            <PasswordInput className='mb-5'/>
            <PurpleButton className='mx-auto w-full text-center' href="" text="LOG IN"/>
            <div className="divider before:bg-opacity-100 after:bg-opacity-100">Or log in via</div>
            <div className="flex flex-row gap-2">
              <WhiteButton className="w-full justify-center" text={<GoogleSVG width="25px" height="25px"/>}/>
              <WhiteButton className="w-full justify-center" text={<GithubSVG width="25px" height="25px"/>}/>
            </div>
          </div>
          
        </div>
        <div className='mb-5 mr-0 ml-auto mt-16'>
          <span className='mr-5'>You don't have an account?</span>
          <WhiteButton href="/signup" text="SIGN UP"/>
        </div>
      </div>
      
    </main>
  )
}
