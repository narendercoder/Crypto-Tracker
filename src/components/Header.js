import React from 'react'
import {useNavigate} from 'react-router-dom'
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider} from "@material-ui/core"
import { CryptoState } from '../cryptoContext'
const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}))
const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {currency, setCurrency} = CryptoState();
  const darkTheme = createTheme({
    palette: {
      primary:{
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
   <AppBar color='transparent' position='static'>
   <Container>
     <Toolbar>
       <Typography varient='h6' onClick={()=>navigate("/")} className={classes.title}>
         Crypto Tracker
       </Typography>
       <Select 
       varient="outlined"
       style={{
         width: 100,
         height: 40,
         marginRight: 15,
       }}
       value={currency}
       onChange={(e)=>setCurrency(e.target.value)}>
         <MenuItem value={"USD"}>USD</MenuItem>
         <MenuItem value={"INR"}>INR</MenuItem>
       </Select>
     </Toolbar>
   </Container>
   </AppBar>
   </ThemeProvider>
  )
}

export default Header;