import GithubSVG from '@/components/GithubSVG/GithubSVG'
import GoogleSVG from '@/components/GoogleSVG/GoogleSVG'
import PasswordInput from '@/components/PasswordInput/PasswordInput'
import PurpleButton from '@/components/PurpleButton/PurpleButton'
import UsernameInput from '@/components/UsernameInput/UsernameInput'
import WhiteButton from '@/components/WhiteButton/WhiteButton'
import Image from 'next/image'

export default function Login() {
  return (
    <main className='flex h-screen'>
      <div className='bg-dark-purple m-auto px-5 h-4/5 w-full max-w-2xl shadow-lg rounded-lg flex flex-col justify-between'>
        <div className='mt-5 mr-0 ml-auto'>
          <span className='mr-5'>You don't have an account?</span>
          <WhiteButton href="/signup" text="SIGN UP"/>
        </div>
        <div>
          <p className='w-full text-center text-3xl mb-6'>LOG IN</p>
          <div className="mx-auto max-w-fit">
            <UsernameInput className='mb-4'/>
            <PasswordInput className='mb-5'/>
            <PurpleButton className='mx-auto w-full text-center' href="/signup" text="LOG IN"/>
            <div className="divider">Or log in via</div>
            <div className="flex flex-row gap-2">
              <WhiteButton className="w-full justify-center" text={<GoogleSVG width="25px" height="25px"/>}/>
              <WhiteButton className="w-full justify-center" text={<GithubSVG width="25px" height="25px"/>}/>
            </div>
          </div>
          
        </div>
        <div></div>
      </div>
    </main>
  )
}
