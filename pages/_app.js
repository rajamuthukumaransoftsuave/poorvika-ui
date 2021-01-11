import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
