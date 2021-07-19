import React from 'react'
 import './lotteryapp.css'
 import  fire from './Components/fire';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
export default function Login(props) {
    const {email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount, 
        emailError, 
        passwordError}=props;

        const paperStyle = { padding: 30, height: '70vh', width: 330, margin: "40px auto" }
        const avatar = { backgroundColor: '#7ec37e' }
        const btnstyle = { margin: "40px 0" }
       
    return (
        <Grid>
             
         <Paper elevation={10} style={paperStyle}>
         <Grid align='center'>
                    <Avatar style={avatar}></Avatar>
                    
                </Grid>
        <div>
       
 <TextField label="Email"  type="text" required value={email} 
 autoComplete='off' placeholder="Enter your Email" fullWidth required onChange={(e)=>setEmail(e.target.value)}></TextField>
 <p>{emailError}</p>


<TextField type="password" label="Password"  required value={password} 
 autoComplete='off' placeholder="Enter your Password" fullWidth required onChange={(e)=>setPassword(e.target.value)}></TextField>

<p>{passwordError}</p>
<div>
    {hasAccount ? (
        <>
        
<Button onClick={handleLogin}  color="primary" variant="contained" style={btnstyle} fullWidth  >Sign In</Button>
<p>Don't have an Account?  <span onClick={()=>setHasAccount(!hasAccount)}>Sing Up</span> </p>
        </>
    ):(
<>

<Button style={btnstyle} onClick={handleSignup}  color="primary" variant="contained" fullWidth>Sign Up</Button>
<p>Have an Account <span onClick={()=>setHasAccount(!hasAccount)}>Sing In</span></p>

</>

    )}
    
    
    </div>

</div>
</Paper>
</Grid>

    )
}
