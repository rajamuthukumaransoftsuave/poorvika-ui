import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { componentCss } from "../Constants";


export default function Header() {
    const [userDetails, setUserDetails] = useState({})
    const router = useRouter()
    
    useEffect(() => {
        setUserDetails(JSON.parse(window.localStorage.getItem('user_details')))
    },[])

    return (
        <div className={componentCss.headerContainer}>
           <div>
                <span className={componentCss.headingLg} style={{ color: 'white'}}>
                    Welcome, {userDetails.firstName + ' ' + userDetails.lastName}
                </span>
           </div>
           <div>
               <button className={componentCss.button}
                onClick={() => {
                    window.localStorage.clear()
                    router.push('/login')
                }}
               >
                   Log Out
               </button>
           </div>
        </div>
    )
}