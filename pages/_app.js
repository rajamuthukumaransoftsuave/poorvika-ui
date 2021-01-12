import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
  * This is The starting component of the app.
  * Client side rendering will start from this.
  * In this component we are checking if user is logged in or not. If not we are redirecting them to /login.
  @returns {*}
  @typedef Component next page component which is determined by the route. 
  @typedef PageProps props which will be passed to the component 
  @param {{
    Component Component,
    pageProps PageProps
  }} props
*/

function MyApp({ Component, pageProps }) {

  const router = useRouter()

    useEffect(() => {
        try{
            const userDetails = JSON.parse(window.localStorage.getItem('user_details'))
            if((!userDetails || !userDetails?.token) && router.pathname !== '/login'){
              router.push('/login', undefined)
            }
        } catch(error) {
            console.log(error)
            if(router.pathname !== '/login')
            router.push('/login', undefined)
        }
    }, [router])

  return <Component {...pageProps} />
}

export default MyApp
