import { Lilita_One } from 'next/font/google'
const lilitaOne = Lilita_One({ subsets: ['latin'], weight: '400' });

export default function Logo(props) {
    return (
        <div className={"flex ml-4 " + props.className}> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="#fff"
            stroke="#fff"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
          >
            <path d="M30.7 5.2c-.3-.1-.6-.2-.8-.2-9.2 1.3-18.6 1.3-27.8 0-.3 0-.6 0-.8.2-.2.2-.3.5-.3.8v18c0 .3.1.6.3.8s.6.2.8.2c2.2-.3 4.5-.6 6.7-.7-1.2.9-2.1 2.1-2.5 3.4-.2.5.1 1.1.6 1.3.5.2 1.1-.1 1.3-.6.8-2.4 3.9-4.2 7.4-4.3h.7c3.5.1 6.6 1.9 7.4 4.3.1.4.5.7 1 .7.1 0 .2 0 .3-.1.5-.2.8-.7.6-1.3-.4-1.3-1.3-2.5-2.5-3.4 2.2.2 4.5.4 6.7.7h.1c.2 0 .5-.1.7-.2.2-.2.3-.5.3-.8V6c.1-.3 0-.6-.2-.8zM20.1 16.7l-5 3c-.3.2-.7.3-1 .3-.3 0-.7-.1-1-.3-.6-.4-1-1-1-1.7v-6c0-.7.4-1.3 1-1.7.6-.4 1.4-.3 2 0l5 3c.6.4.9 1 .9 1.7s-.4 1.3-.9 1.7z"></path>
          </svg>
          <span className={lilitaOne.className + " text-2xl ml-3"}>MyEntertainList</span>
        </div>
    )
}

