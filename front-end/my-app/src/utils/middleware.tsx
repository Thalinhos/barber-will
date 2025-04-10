import { url } from "./url";


export async function middlewareToken(navigate: Function){  

        const res = await fetch(`${url}/credentialsAuth/verifyToken/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        if(!res.ok){
          navigate('/')
        }

        return true
        
      }
