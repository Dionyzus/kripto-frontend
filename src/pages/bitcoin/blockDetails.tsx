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

export default function BlockDetails() {
    const [blockData, setBlockData] = useState<IBlock>();
    const [transactionsData, setTransactionsData] = useState<ITransactionBasicData[]>([]);
    const history = useHistory();
    const { blockHash } = useParams<{ blockHash: string }>();

    useEffect(() => {
        async function getBlockData() {
            const response = await getBlockReq(blockHash);
            if (response && response.data) {
                setBlockData(response.data.result);
            }
        }
        getBlockData();
    }, [setBlockData, blockHash]);

    useEffect(() => {
        async function getBlocksData() {
            let transactionsArray = new Array();
            if (blockData) {
                for (let i = 0; i < blockData.tx.length; i++) {
                    const transaction = await getRawTransactionReq(blockData.tx[i]);
                    if (transaction && transaction.data) {
                        const inputsCount = transaction.data.result.vin.length;
                        const outputsCount = transaction.data.result.vout.length;
                        transactionsArray.push({
                            txid: transaction.data.result.txid,
                            size: transaction.data.result.size,
                            inputsCount: inputsCount,
                            outputsCount: outputsCount,
                        });
                    }
                }
                setTransactionsData(transactionsArray);
            }
        }
        getBlocksData();
    }, [setTransactionsData, blockData]);

    async function handleViewTransaction(rowData: any) {
        history.push(`/bitcoin/transaction/${rowData.txid}`);
    }

    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                {blockData ? (<Table>
                    <TableBody>
                    <TableRow ng-repeat-start="element in items">
                        <TableCell>Confirmations</TableCell>
                        <TableCell>{blockData.confirmations}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Version</TableCell>
                        <TableCell>{blockData.version}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Merkle root</TableCell>
                        <TableCell>{blockData.merkleroot}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>{blockData.difficulty}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell>{blockData.hash}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Height</TableCell>
                        <TableCell>{blockData.height}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Number of transactions</TableCell>
                        <TableCell>{blockData.nTx}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nonce</TableCell>
                        <TableCell>{blockData.nonce}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>{blockData.time}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell>{blockData.size}</TableCell>
                    </TableRow>
                    </TableBody></Table>) : null}
            </TableContainer>
            <Grid item xs>
                <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Block transactions"
                        options={{
                            debounceInterval: 500,
                            actionsColumnIndex: -1,
                        }}
                        columns={[
                            { title: "Transaction Id", field: "txid" },
                            { title: "Size", field: "size" },
                            { title: "Inputs Count", field: "inputsCount" },
                            { title: "Outputs Count", field: "outputsCount" },
                        ]}
                        data={transactionsData}
                        actions={[
                            {
                                icon: "edit",
                                tooltip: "View transaction",
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
                </Grid>
            </Grid>
        </Container>
    );
}
