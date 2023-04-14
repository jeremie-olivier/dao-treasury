import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    minWidth: 200,
    margin: 0,
    marginBottom: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 20px",
  },
});

function Dashboard() {
  const classes = useStyles();
  const location = useLocation();
  const address = location.pathname.split("/").pop();

  const [balances, setBalances] = useState([]);
  const [totalFiat, setTotalFiat] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      const response = await fetch(
        `https://safe-client.safe.global/v1/chains/1/safes/${address}/balances/usd`
      );
      const data = await response.json();
      setBalances(data.items);
      setTotalFiat(data.fiatTotal);
    };
    fetchBalances();
  }, [address]);

  return (
    <div>
      {totalFiat && (
        <Card className={classes.card}>
          <CardContent
            className={classes.content}
            style={{ backgroundColor: blue[500] }}
          >
            <Typography variant="h6" style={{ color: "white" }}>
              Total in USD
            </Typography>
            <Box color="white">
              <Typography variant="subtitle2">
                {parseFloat(totalFiat).toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {balances && balances.length > 0 && (
        <TableContainer component={Card} className={classes.card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balances.map((balance, index) => (
                <TableRow key={index}>
                  <TableCell>{balance.tokenInfo.name}</TableCell>
                  <TableCell>
                    {parseFloat(
                      (
                        balance.balance /
                        10 ** balance.tokenInfo.decimals
                      ).toFixed(5)
                    )}{" "}
                    {balance.tokenInfo.symbol}
                  </TableCell>
                  <TableCell>
                    {parseFloat(balance.fiatBalance).toFixed(2)} USD
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Dashboard;
