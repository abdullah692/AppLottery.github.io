import React from 'react'
import {Grid, Paper,Avatar,TextField,Button} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import fire from './Components/fire';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LoginScreen=({handleLogout}) =>{

    const paperStyle={padding:30 , height:'75vh',width:280, margin:"40px auto" }
    const text={ padding:'5px 0', margin: '25px 0'}
    const heading={fontFamily:'Sans-serif' , color: ""}
    const link={ textDecoration:'none'}
    const classes = useStyles();
    return (
        <div>
             <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={handleLogout}>LogOut</Button>
        </Toolbar>
      </AppBar>
             <Grid className="grid">
       <Paper elevation={10} style={paperStyle}>
<Grid align='center'>
    <h2 style={heading}>LOTTERY APP</h2>

    <TextField style={text} label="Username" variant="outlined" placeholder="Enter your Username" fullWidth required/>
 <TextField  style={text} label="Phone No " variant="outlined"  placeholder="Enter your Phone No" fullWidth required/>
<Link to='/Winner' style={link}>
<Button type="submit"  color="primary" variant="contained">CONTINUE <ArrowForwardIosIcon/></Button>
</Link>
</Grid>

</Paper>

</Grid>
        </div>
    )
}
export default LoginScreen
