/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, withStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import { useHistory, useParams } from "react-router-dom";
import { IBlock } from "../../interfaces/IBlock";
import { getBlockReq, getRawTransactionReq } from "../../api/bitcoinApi";
import { ITransactionBasicData } from "../../interfaces/ITransactionBasicData";
import moment from "moment";

export default function BlockDetails() {
    const [blockData, setBlockData] = useState<IBlock>();
    const [transactionsData, setTransactionsData] = useState<ITransactionBasicData[]>([]);
    const history = useHistory();
    const { blockHash } = useParams<{ blockHash: string }>();

    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

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
            let transactionsArray = [];
            if (blockData) {
                //This probably could of been avoided, slows down page reading.
                //Used to view additional details, but displaying only txId would
                //be better idea.
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
            <Grid item xs={12}>
                <Typography variant="h5">Block details</Typography>
            </Grid>
            <TableContainer component={Paper}>
                {blockData ? (<Table>
                    <TableBody>
                    <StyledTableRow ng-repeat-start="element in items">
                        <TableCell>Confirmations</TableCell>
                        <TableCell>{blockData.confirmations}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Version</TableCell>
                        <TableCell>{blockData.version}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Merkle root</TableCell>
                        <TableCell>{blockData.merkleroot}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>{blockData.difficulty}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Hash</TableCell>
                        <TableCell>{blockData.hash}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Height</TableCell>
                        <TableCell>{blockData.height}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Number of transactions</TableCell>
                        <TableCell>{blockData.nTx}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Nonce</TableCell>
                        <TableCell>{blockData.nonce}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>
                            {moment.unix(parseInt(blockData.time)).format("DD-MM-YYYY HH:mm")}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Size</TableCell>
                        <TableCell>{blockData.size}</TableCell>
                    </StyledTableRow>
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
