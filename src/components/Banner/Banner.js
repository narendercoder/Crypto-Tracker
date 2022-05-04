import React from 'react';
import { Container, makeStyles, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@material-ui/core';
import Carousel from './carousel';


const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(https://wallpaperaccess.com/full/4578760.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "50%"
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline:{
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    }
}))
let theme = createTheme();
   theme = responsiveFontSizes(theme);

const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
       <ThemeProvider theme={theme}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
             <Typography 
             variant='h2'
             style={{
                 fontWeight: "bold",
                 marginBottom: 15,
                 fontFamily: "Montserrat",
             }}>
             Crypto Tracker
             </Typography>
             <Typography 
             variant='subtitle2'
             style={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
             }}>
             Get all the info regarding your favorite Crypto Currency
             </Typography>
            </div>
            <Carousel/>
        </Container>
        </ThemeProvider>
    </div>
  )
}

export default Banner;