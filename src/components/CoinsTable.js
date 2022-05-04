import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { makeStyles} from "@material-ui/styles";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../cryptoContext";
import { numberWithCommas } from "./Banner/carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const Navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const url = CoinList(currency);
    const res = await fetch(url);
    const data = await res.json();
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
      row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          fontFamily: "Montserrat",
          "&:hover": {
              backgroundColor: "#131111"
          },
      },
      pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold",
        },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h %", "7d %","24h Volume","Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "center"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch().slice((page-1)*10,(page-1)*10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const profit1 = row.price_change_percentage_7d_in_currency > 0;
                    return (
                      <TableRow
                        onClick={() => Navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="40"
                            style={{
                              marginBottom: 10,
                            }}
                          />
                          <div 
                          style={{
                              display: "flex",
                              flexDirection: "column"
                          }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "1.5rem",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                        align="center">
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                        align="center"
                        style={{
                            color: profit>0?"rgb(14,203,129)":"red",
                            fontWeight: 500,
                        }}>
                         {profit && "+"}
                         {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                        align="center"
                        style={{
                            color: profit1>0?"rgb(14,203,129)":"red",
                            fontWeight: 500,
                        }}>
                         {profit1 && "+"}
                         {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                        </TableCell>
                        <TableCell align="center">
                        {symbol}
                        {numberWithCommas(row.total_volume)}
                        </TableCell>
                        <TableCell align="center">
                        {symbol}
                        {numberWithCommas(row.market_cap)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination 
          style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
          }}
          classes={{ul: classes.pagination}}
          count={(handleSearch()?.length/10).toFixed(0)}
          onChange={(_, value)=>{
              setPage(value);
              window.scroll(0, 450);
          }}>
          </Pagination>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinsTable;
