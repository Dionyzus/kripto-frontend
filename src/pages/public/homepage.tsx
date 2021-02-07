/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  withStyles,
  Button,
} from "@material-ui/core";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useStyles } from "./style";
import { useHistory, Link } from "react-router-dom";
import ManuIcon from "../../images/bitcoin.jpg";
import { IBitcoinPrice } from "../../interfaces/IBitcoinPrice";
import { getAllTransactionsReq, getBlockchainInfoReq, getMempoolInfoReq } from "../../api/bitcoinApi";
import { IBlockchainInfo } from "../../interfaces/IBlockchainInfo";
import { IMempoolInfo } from "../../interfaces/IMempoolInfo";
import MaterialTable from "material-table";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import SaveIcon from '@material-ui/icons/Save';
import { ITransactionBasicData } from "../../interfaces/ITransactionBasicData";
import { IBlockchainStats } from "../../interfaces/IBlockchainStats";
import { getBitcoinPricesReq, getBlockchainStatsReq, savePriceReq } from "../../api/marketApi";
import moment from "moment";

export default function AppHome() {
  const [bitcoinPrices, setBitcoinPrices] = useState<IBitcoinPrice[]>([]);
  const [blockchainStats, setBlockchainStats] = useState<IBlockchainStats>();
  const [blockchainInfo, setBlockchainInfo] = useState<IBlockchainInfo>();
  const [mempoolTransactions, setMempoolTransactions] = useState<ITransactionBasicData[]>([]);
  const [mempoolInfo, setMempoolInfo] = useState<IMempoolInfo>();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const isAuthorized = localStorage.getItem("accessToken");
  const history = useHistory();
  const appHomeStyles = useStyles();

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  useEffect(() => {
    async function getBitcoinPrices() {
      const response = await getBitcoinPricesReq();
      if (response && response.data) {
        let allPrices = [];
        let allCurrencies = [];
        for (let key in response.data) {
          // eslint-disable-next-line no-prototype-builtins
          if (response.data.hasOwnProperty(key)) {
            allCurrencies.push(key);
            allPrices.push(response.data[key]);
          }
        }
        setCurrencies(allCurrencies);
        setBitcoinPrices(allPrices);
      }
    }
    getBitcoinPrices();
  }, [setCurrencies, setBitcoinPrices]);

  useEffect(() => {
    async function getBlockchainStats() {
      const response = await getBlockchainStatsReq();
      if (response && response.data) {
        setBlockchainStats(response.data);
      }
    }
    getBlockchainStats();
  }, [setBlockchainStats]);

  useEffect(() => {
    async function getBlockchainInfo() {
      const response = await getBlockchainInfoReq();
      if (response && response.data) {
        setBlockchainInfo({
          chain: response.data.result.chain,
          blocks: response.data.result.blocks,
          bestblockhash: response.data.result.bestblockhash,
          difficulty: response.data.result.difficulty,
          mediantime: response.data.result.mediantime,
          verificationprogress: response.data.result.verificationprogress,
          size_on_disk: response.data.result.size_on_disk
        });
      }
    }
    getBlockchainInfo();
  }, [setBlockchainInfo]);

  useEffect(() => {
    async function getMempoolInfo() {
      const response = await getMempoolInfoReq();
      if (response && response.data) {
        setMempoolInfo({
          size: response.data.result.size,
          bytes: response.data.result.bytes,
          usage: response.data.result.usage,
          maxmempool: response.data.result.maxmempool,
          mempoolminfee: response.data.result.mempoolminfee,
        });
      }
    }
    getMempoolInfo();
  }, [setMempoolInfo]);

  useEffect(() => {
    async function getMempoolTransactions() {
      const response = await getAllTransactionsReq();
      if (response && response.data) {
        let transactionIds = [];
        for (let i = 0; i < response.data.result.length; i++) {
          transactionIds.push({
            txid: response.data.result[i],
          });
        }
        setMempoolTransactions(transactionIds);
      }
    }
    getMempoolTransactions();
  }, [setMempoolTransactions]);

  async function handleSavePrice(currency: string, price: IBitcoinPrice) {
    try {
      await savePriceReq(currency, price);
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  }

  async function handleLogin() {
    history.push("/login");
  }

  async function handleViewLatestBlocks() {
    history.push("/bitcoin/latest-blocks");
  }

  async function handleViewTransaction(rowData: any) {
    history.push(`/bitcoin/transaction/${rowData.txid}`);
  }

  return (
    <Container maxWidth="lg" className={appHomeStyles.paper}>
      <Grid item xs className={appHomeStyles.pageTitleGrid}>
        <Typography variant="h3">Bitcoin explorer</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 15 }}>
            <CardMedia
              style={{ maxWidth: "100%", maxHeight: 200, margin: "auto" }}
              component="img"
              alt="Alt"
              image={ManuIcon}
              title="Application Logo"
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 50 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Price
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Currency</TableCell>
                      <TableCell align="right">Buy price</TableCell>
                      <TableCell align="right">Sell price</TableCell>
                      {isAuthorized ? 
                      <TableCell align="right">Action</TableCell> : null }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bitcoinPrices.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {currencies[index]}
                        </TableCell>
                        <TableCell align="right">{row.buy}</TableCell>
                        <TableCell align="right">{row.sell}</TableCell>
                        {isAuthorized ? 
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleSavePrice(currencies[index], row)}
                            startIcon={<SaveIcon />}
                          >
                          </Button>
                        </TableCell> : null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 50 }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Mempool details
              </Typography>
              <TableContainer component={Paper}>
                {mempoolInfo ? (<Table>
                  <TableBody>
                    <StyledTableRow ng-repeat-start="element in items">
                      <TableCell>Size</TableCell>
                      <TableCell>{mempoolInfo.size}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Bytes</TableCell>
                      <TableCell>{mempoolInfo.bytes}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Usage</TableCell>
                      <TableCell>{mempoolInfo.usage}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Max-mempool</TableCell>
                      <TableCell>{mempoolInfo.maxmempool}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Minimum mempool fee</TableCell>
                      <TableCell>{mempoolInfo.mempoolminfee}</TableCell>
                    </StyledTableRow>
                  </TableBody></Table>) : null}
              </TableContainer>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Blockchain stats
              </Typography>
              <TableContainer component={Paper}>
                {blockchainStats ? (<Table>
                  <TableBody>
                    <StyledTableRow ng-repeat-start="element in items">
                      <TableCell>Market price USD</TableCell>
                      <TableCell>{blockchainStats.market_price_usd}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Hash rate</TableCell>
                      <TableCell>{blockchainStats.hash_rate}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>BTC total fees</TableCell>
                      <TableCell>{blockchainStats.total_fees_btc}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>BTC mined</TableCell>
                      <TableCell>{blockchainStats.n_btc_mined}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Number of transactions</TableCell>
                      <TableCell>{blockchainStats.n_tx}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Blocks mined</TableCell>
                      <TableCell>{blockchainStats.n_blocks_mined}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Total bitcoins</TableCell>
                      <TableCell>{blockchainStats.totalbc}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Miners revenue - BTC</TableCell>
                      <TableCell>{blockchainStats.miners_revenue_btc}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Miners revenue - USD</TableCell>
                      <TableCell>{blockchainStats.miners_revenue_usd}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Trade volume - BTC</TableCell>
                      <TableCell>{blockchainStats.trade_volume_btc}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Trade volume - USD</TableCell>
                      <TableCell>{blockchainStats.trade_volume_usd}</TableCell>
                    </StyledTableRow>
                  </TableBody></Table>) : null}
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 50 }}>
            <CardContent>
              <MaterialTable
                icons={tableIcons}
                title="Mempool transactions"
                options={{
                  debounceInterval: 500,
                  actionsColumnIndex: -1,
                }}
                columns={[
                  { title: "Transaction Id", field: "txid" },
                ]}
                data={mempoolTransactions}
                actions={[
                  {
                    icon: "edit",
                    tooltip: "View block",
                    onClick: (event, rowData) => handleViewTransaction(rowData),
                  },
                ]}
                //onSearchChange={handleSearchChange}
                components={{
                  Action: (props) =>
                    props.action.icon === "edit" ? (
                      <IconButton
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        style={{ textTransform: "none" }}
                        size="small"
                      >
                        <DetailsIcon fontSize="inherit" />
                      </IconButton>
                    ) : null
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card style={{ margin: "auto", maxWidth: "85%", maxHeight: "100%", marginTop: 50 }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Latest block
              </Typography>
                {blockchainInfo ?
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Block</TableCell>
                          <TableCell>Chain</TableCell>
                          <TableCell>Best blockhash</TableCell>
                          <TableCell>Difficulty</TableCell>
                          <TableCell>Median time</TableCell>
                          <TableCell>Verification progress</TableCell>
                          <TableCell>Size on disk</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{blockchainInfo.blocks}</TableCell>
                          <TableCell>{blockchainInfo.chain}</TableCell>
                          <TableCell>{blockchainInfo.bestblockhash}</TableCell>
                          <TableCell>{blockchainInfo.difficulty}</TableCell>
                          <TableCell>{moment.unix(blockchainInfo.mediantime).format("HH:mm")}</TableCell>
                          <TableCell>{blockchainInfo.verificationprogress}</TableCell>
                          <TableCell>{blockchainInfo.size_on_disk}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer> : null}
                <br></br>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Link href="#" onClick={handleViewLatestBlocks} to="/bitcoin/latest-blocks">
                    View latest blocks
                </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container spacing={2} className={appHomeStyles.pageContentGrid}>
          <Grid item xs={6}>
            <Typography variant="h6">Have account? Sign in to access advanced options.</Typography>
            <IconButton color="primary" size="medium" onClick={handleLogin}>
              <TransitEnterexitIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">New user? Sign up to access advanced options.</Typography>
            <IconButton color="primary" size="medium" component={Link} to='/signup'>
              <LockOpenIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
