/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Container, Grid, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItem, ListItemText, Typography, Divider, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getRawTransactionReq } from "../../api/bitcoinApi";
import { ITransaction } from "../../interfaces/ITransaction";
import { IInputs } from "../../interfaces/IInputs";
import { IOutputs } from "../../interfaces/IOutputs";

export default function TransactionDetails() {
    const [transactionData, setTransactionData] = useState<ITransaction>();
    const [inputs, setInputs] = useState<IInputs[]>([]);
    const [outputs, setOutputs] = useState<IOutputs[]>([]);
    const [coinbaseTransaction, setCoinbaseTransaction] = useState<boolean>();
    const [totalOutputValue, setTotalOutputValue] = useState<number>();
    const history = useHistory();
    const { txid } = useParams<{ txid: string }>();

      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
      const StyledTableBody = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableBody);

    useEffect(() => {
        async function getTransactionData() {
            const response = await getRawTransactionReq(txid);
            if (response && response.data) {
                setTransactionData(response.data.result);
            }
        }
        getTransactionData();
    }, [setTransactionData, txid]);

    useEffect(() => {
        async function getInputs() {
            if (transactionData) {
                setInputs(transactionData.vin);
            }
        }
        getInputs();
    }, [setInputs, transactionData]);

    useEffect(() => {
        async function getOutputs() {
            if (transactionData) {
                setOutputs(transactionData.vout);
            }
        }
        getOutputs();
    }, [setOutputs, transactionData]);

    useEffect(() => {
        async function isCoinbaseTransaction() {
            if (inputs && inputs.length != 0 && inputs[0].coinbase) {
                setCoinbaseTransaction(true);
            }
        }
        isCoinbaseTransaction();
    }, [setCoinbaseTransaction, inputs]);

    useEffect(() => {
        async function getTotalOutputs() {
            if (outputs && outputs.length != 0) {
                let outputValues = 0;
                for (let i = 0; i < outputs.length; i++) {
                    outputValues += outputs[i].value;
                }
                setTotalOutputValue(outputValues);
            }
        }
        getTotalOutputs();
    }, [setTotalOutputValue, outputs]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h5">Transaction details</Typography>
            <TableContainer component={Paper}>
                {transactionData ? (<Table>
                    <TableBody>
                        <StyledTableRow ng-repeat-start="element in items">
                            <TableCell>Transaction Id</TableCell>
                            <TableCell>{transactionData.txid}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>Hash</TableCell>
                            <TableCell>{transactionData.hash}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>Size</TableCell>
                            <TableCell>{transactionData.size}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>Weight</TableCell>
                            <TableCell>{transactionData.weight}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>Locktime</TableCell>
                            <TableCell>{transactionData.locktime}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>Total Outputs</TableCell>
                            <TableCell>{totalOutputValue}</TableCell>
                        </StyledTableRow>
                    </TableBody></Table>) : null}
            </TableContainer>
            <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Typography variant="h4" component="h5">Inputs</Typography>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        {inputs.map((input, index) => (
                            <StyledTableBody key={index}>
                                {input.coinbase ? <TableRow>
                                    <TableCell>Coinbase</TableCell>
                                    <TableCell>{input.coinbase}</TableCell>
                                </TableRow> :
                                    <TableRow ng-repeat-start="element in items">
                                        <TableCell>Transaction Id</TableCell>
                                        <TableCell>{input.txid}</TableCell>
                                    </TableRow>}
                                <TableRow>
                                    <TableCell>Sequence</TableCell>
                                    <TableCell>{input.sequence}</TableCell>
                                </TableRow>
                                {input.txinwitness && input.txinwitness.length != 0 ?
                                    <TableRow>
                                        <TableCell>Transaction witnesses</TableCell>
                                        <td>
                                            <List>
                                                {input.txinwitness.map((witness, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemText>
                                                            <div style={{ fontSize: "13px" }}>{witness}</div>
                                                        </ListItemText>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </td>
                                    </TableRow> : null}
                                {input.scriptSig && input.scriptSig.asm ?
                                    <TableRow>
                                        <TableCell>Script sig</TableCell>
                                        <td>
                                            <List>
                                                <ListItem key={0}>
                                                    <ListItemText>
                                                        <div style={{ fontSize: "13px" }}>Asm: {input.scriptSig.asm}</div>
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem key={1}>
                                                    <ListItemText>
                                                        <div style={{ fontSize: "13px" }}>Hex: {input.scriptSig.hex}</div>
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        </td>
                                    </TableRow> : null}
                            </StyledTableBody>
                        ))}
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Typography variant="h4" component="h5">Outputs</Typography>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        {outputs.map((output, index) => (
                            <StyledTableBody key={index}>
                                <TableRow>
                                    <TableCell>Value</TableCell>
                                    <TableCell>{output.value}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Asm</TableCell>
                                    <TableCell>{output.scriptPubKey.asm}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Hex</TableCell>
                                    <TableCell>{output.scriptPubKey.hex}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Required signatures</TableCell>
                                    <TableCell>{output.scriptPubKey.reqSigs}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{output.scriptPubKey.type}</TableCell>
                                </TableRow>
                                {output.scriptPubKey.addresses && output.scriptPubKey.addresses.length != 0 ?
                                    <TableRow>
                                        <TableCell>Addresses</TableCell>
                                        <td>
                                            <List>
                                                {output.scriptPubKey.addresses.map((address, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemText>
                                                            <div style={{ fontSize: "13px" }}>{address}</div>
                                                        </ListItemText>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </td>
                                    </TableRow> : null}
                            </StyledTableBody>
                        ))}
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    );
}
