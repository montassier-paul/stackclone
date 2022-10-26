import { Button } from '@mui/material'
import React from 'react'
import "./Login.css"
import {auth, googleProvider} from "../firebase"
import { useStateValue} from './StateProvider';
import { actionTypes } from "./reducer";
import {signInWithPopup} from 'firebase/auth'

function Login() {

  const [{user}, dispatch] = useStateValue();

  const UserSignIn = async() => {


    await signInWithPopup(auth, googleProvider)
      .then((result) => {
  
        console.log(result)
  
        dispatch({type : actionTypes.SET_USER, user : result.user
        })
  
      }).catch((error) => {
  
        console.log(error)
  
      })
  
  }

  const handleOnClick = (e) => {
    // e.preventDefault()
    UserSignIn()

  }
  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://upload.wikimedia.org/wikipedia/fr/thumb/7/7e/Slack_logo.svg/1200px-Slack_logo.svg.png' alt=''/>
        
        <h1>Sign in to slack clone HQ</h1>
        <p>hq.slackclone.com</p>
        <Button onClick={handleOnClick}>Sign in with Google</Button>
        </div>
    </div>
  )
}

export default Login