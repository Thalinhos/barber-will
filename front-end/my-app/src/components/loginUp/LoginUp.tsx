import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { url } from "../../utils/url";

export default function LoginUp() {
    
    const styles = {
      container: {
        width: '100%',
        maxWidth: '400px',
        margin: '40px auto',
        padding: '30px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      },
      label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        color: '#333',
      },
      input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginTop: '5px',
      },
      btn: {
        padding: '10px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
      btnOutline: {
          padding: '10px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
      },
      divider: {
        textAlign: 'center',
        margin: '20px 0',
        position: 'relative',
        fontSize: '12px',
        color: '#666',
      },
      terms: {
        fontSize: '12px',
        color: '#888',
        textAlign: 'center',
        marginTop: '15px',
      },
      textTitle: {
          textAlign: 'center',
      },
      signupBtn:{
        all: 'unset',
        cursor: 'pointer',
        color: '#000',
        textDecoration: 'underline',
        fontWeight: '12px'
      }
    }

    const navigate = useNavigate();

    function signupModal(){
        navigate('/register')
    }

    const [loginForm, setLoginForm] = useState({
      email: '',
      senha: '',
    });
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const res = await fetch(`${url}/credentialsAuth/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      })

      if(res.ok){
        navigate('/dashboard')
      }
      else{
        alert("Erro ao fazer login")
      }
    }

    async function googleAuth() {
        window.location.href = `${url}/googleAuth`; 
    }
    
  
    return (
      <div id="SignUpForm" style={styles.container}>
  
          <h2 style={styles.textTitle}>Login up</h2>
  
        <form style={styles.form}>
          <label style={styles.label}>
            Email
            <input type="email" placeholder="hi@yourcompany.com" required style={styles.input} 
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </label>
  
          <label style={styles.label}>
            Password
            <input type="password" placeholder="Enter your password" required style={styles.input} 
            onChange={(e) => setLoginForm({ ...loginForm, senha: e.target.value })}
            />
          </label>
  
          <button type="submit" style={styles.btn} onClick={handleSubmit}>Login up</button>
        </form>
  
        <div style={styles.divider}>Or</div>
  
        <button style={styles.btnOutline} onClick={googleAuth} >Login with Google</button>
  
        <p style={styles.terms}>
        If you don't have an account, <button style={styles.signupBtn} onClick={signupModal}>Sign up</button>
        </p>
      </div>
    )
  }
  