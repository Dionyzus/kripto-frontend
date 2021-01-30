/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import { useHistory, useParams } from "react-router-dom";
import { IBlock } from "../../interfaces/IBlock";
import { getBlockchainInfoReq, getBlockHashReq, getBlockReq, getRawTransactionReq } from "../../api/bitcoinApi";
import { IBlockchainInfo } from "../../interfaces/IBlockchainInfo";
import moment from "moment";
import { ITransaction } from "../../interfaces/ITransaction";
import { ITransactionBasicData } from "../../interfaces/ITransactionBasicData";
import classes from "*.module.css";
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
            if(inputs && inputs.length != 0 && inputs[0].coinbase) {
                setCoinbaseTransaction(true);
            }
        }
        isCoinbaseTransaction();
    }, [setCoinbaseTransaction, inputs]);

    useEffect(() => {
        async function getTotalOutputs() {
            if(outputs && outputs.length != 0) {
                let outputValues = 0;
                for (let i=0; i<outputs.length; i++){
                    outputValues+=outputs[i].value;
                }
                setTotalOutputValue(outputValues);
            }
        }
        getTotalOutputs();
    }, [setTotalOutputValue, outputs]);

    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                {transactionData ? (<Table>
                    <TableBody>
                    <TableRow ng-repeat-start="element in items">
                        <TableCell>Transaction Id</TableCell>
                        <TableCell>{transactionData.txid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell>{transactionData.hash}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell>{transactionData.size}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{transactionData.weight}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Locktime</TableCell>
                        <TableCell>{transactionData.locktime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Outputs</TableCell>
                        <TableCell>{totalOutputValue}</TableCell>
                    </TableRow>
                    </TableBody></Table>) : null}
            </TableContainer>
            <Grid container>
                <Grid item xs={6} style={{ paddingLeft: 5, paddingTop: 15, paddingBottom: 15, paddingRight: 5 }}>
                    <MaterialTable
                        style={{minHeight: 500}}
                        icons={tableIcons}
                        title="Inputs"
                        options={{
                            debounceInterval: 500,
                            actionsColumnIndex: -1,
                        }}
                        columns={[
                            coinbaseTransaction ? 
                            { title: "Coinbase", field: "coinbase" } :
                            { title: "Transaction Id", field: "txid" },
                            { title: "Sequence", field: "sequence" },
                        ]}
                        data={inputs}
                        actions={[
                            {
                                icon: "edit",
                                tooltip: "View transaction",
                                onClick: (event, rowData) => console.log(rowData),
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
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: 5, paddingTop: 15, paddingBottom: 15, paddingRight: 5 }}>
                    <MaterialTable
                        style={{minHeight: 500}}
                        icons={tableIcons}
                        title="Outputs"
                        options={{
                            debounceInterval: 500,
                            actionsColumnIndex: -1,
                        }}
                        columns={[
                            { title: "Value", field: "value" },
                            { title: "Type", field: "scriptPubKey.type" },
                        ]}
                        data={outputs}
                        actions={[
                            {
                                icon: "edit",
                                tooltip: "View transaction",
                                onClick: (event, rowData) => console.log(rowData),
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
                </Grid>
            </Grid>
        </Container>
    );
}
