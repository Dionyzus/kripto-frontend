import React from "react";
import {
    Typography,
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody
} from "@material-ui/core";
import { useStyles } from "./style";
import { IDetailedBitcoinPrice } from "../interfaces/IDetailedBitcoinPrice";

interface IProps {
    searchResults: Array<IDetailedBitcoinPrice>;
}

export default function ResultComponent(props: IProps) {
    const resultStyles = useStyles();

    return (
        <>
            <Typography variant="h6" className={resultStyles.title}>
                Query Result
      </Typography>
            <TableContainer className={resultStyles.demo} component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell align="right">Buy price</TableCell>
                            <TableCell align="right">Sell price</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.searchResults.map((row, index) => (
                            <TableRow key={index}>
                                {index == 0 ? 
                                <TableCell component="th" scope="row">
                                    {row.currency}
                                </TableCell> : <TableCell component = "th" scope="row"></TableCell>}
                                <TableCell align="right">{row.buy}</TableCell>
                                <TableCell align="right">{row.sell}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
