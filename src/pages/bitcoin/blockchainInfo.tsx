/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Container, Grid, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { tableIcons } from "../../utils/materialTableIcons";
import DetailsIcon from "@material-ui/icons/Details";
import { useHistory } from "react-router-dom";
import { IBlock } from "../../interfaces/IBlock";
import { getBlockchainInfoReq, getBlockHashReq, getBlockReq } from "../../api/bitcoinApi";
import { IBlockchainInfo } from "../../interfaces/IBlockchainInfo";
import moment from "moment";

export default function BlockchainInfo() {
    const [blockchainInfo, setBlockchainInfo] = useState<IBlockchainInfo>();
    const [blocksData, setBlocksData] = useState<IBlock[]>([]);
    const history = useHistory();

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
                    size_on_disk: response.data.result.size_on_disk
                });
            }
        }
        getBlockchainInfo();
    }, [setBlockchainInfo]);

    useEffect(() => {
        async function getBlocksData() {
            let blocksArray = new Array();
            if (blockchainInfo) {
                let blockHeight = blockchainInfo.blocks;
                for (let i = 0; i < 5; i++) {
                    const blockHash = await getBlockHashReq(blockHeight);
                    if (blockHash && blockHash.data) {
                        const block = await getBlockReq(blockHash.data.result);
                        if (block && block.data) {
                            const time = moment.unix(parseInt(block.data.result.time)).format("DD-MM-YYYY HH:mm");
                            block.data.result.time = time;
                            blocksArray.push(block.data.result);
                            blockHeight-=1;
                        }
                    }
                }
                setBlocksData(blocksArray);
            }
        }
        getBlocksData();
    }, [setBlocksData, blockchainInfo]);

    async function handleViewBlock(rowData: any) {
        history.push(`/bitcoin/block/${rowData.hash}`);
    }

    return (
        <Container maxWidth="lg">
            <Grid item xs>
                <Grid item xs={12} style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <MaterialTable
                        icons={tableIcons}
                        title="Latest blocks"
                        options={{
                            debounceInterval: 500,
                            actionsColumnIndex: -1,
                        }}
                        columns={[
                            { title: "Height", field: "height" },
                            { title: "Time", field: "time" },
                            {
                                title: "Transactions count",
                                field: "nTx" /**type: "numeric" **/,
                            },
                            {
                                title: "Size",
                                field: "size",
                            },
                        ]}
                        data={blocksData}
                        actions={[
                            {
                                icon: "edit",
                                tooltip: "View block",
                                onClick: (event, rowData) => handleViewBlock(rowData),
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
