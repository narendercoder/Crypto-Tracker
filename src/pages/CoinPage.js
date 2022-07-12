import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseCryptoState } from "../cryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, makeStyles, ThemeProvider, Typography, createTheme, responsiveFontSizes } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/Banner/carousel";
import {ErrorBoundary} from "react-error-boundary"
import ErrorFallback from "../components/ErrorBoundary"
const CoinInfo = React.lazy(()=>import("../components/CoinInfo"));

let theme = createTheme();
theme = responsiveFontSizes(theme);

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = UseCryptoState();

  const fetchCoin = async () => {
    try{
    const url = SingleCoin(id);
    const res = await fetch(url);
    const data = await res.json();
    setCoin(data);
  }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData:{
      width: "100%",
      alignItems: "start",
      paddingTop: 10,
      padding: 25,
      //making it responsive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
       flexDirection: "column",
       alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
       alignItems: "start"
      },
    }
  }));
  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          max-width="50%"
          height="auto"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
      <Suspense fallback={<div>Loading..</div>}>
      <CoinInfo coin={coin} />
      </Suspense>
      </ErrorBoundary>
    </div>
    </ThemeProvider>
  );
};

export default CoinPage;
