import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { componentCss } from "../Constants";

/**
  * This component is used to show header of the application.
  * We have logout button in this from that you can logout from the application.
  @returns {*}
  @param {{
  }} props
*/
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