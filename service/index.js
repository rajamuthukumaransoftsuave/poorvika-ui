import { API_URLS } from "../Constants"


export default async function service (url, config){
    const token = JSON.parse(window.localStorage.getItem('user_details')).token
    if(config.headers){
        config.headers.auth = token
    } else {
        config.headers = {
            auth: token
        }
    }

    let res = await fetch(url, config)
    let result = await res.json()
    if(result.data){
        return {
            data: result.data
        }
    } else if(result.statusCode === 402){
       res = await fetch(API_URLS.refreshToken, {
            method: 'GET',
            headers: {
                "auth": token
            }
        })
        result = await res.json()
        if(result.data){
            const user = JSON.parse(window.localStorage.getItem('user_details'))
            user.token = result.data.token
            window.localStorage.setItem('user_details', JSON.stringify(user))
            config.headers.auth = result.data.token
            res = await fetch(url, config)
            result = await res.json()
            if(result.data){
                return {
                    data: result.data
                }
            } else {
               return {
                   message: result.message
               }
            }
        } else {
          return {
                message: result.message
            }
        }
    } else {
        return {
            messsage: result.message
        }
    }
}