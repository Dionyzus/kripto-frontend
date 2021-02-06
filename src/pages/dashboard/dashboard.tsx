import React, { useState, useEffect } from "react";
import {
    Grid,
    Container,
    Typography,
    CssBaseline,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import { useStyles } from "./style";
import ResultComponent from "../../components/resultComponent";
import { IDetailedBitcoinPrice } from "../../interfaces/IDetailedBitcoinPrice";
import { getSavedPricesReq } from "../../api/marketApi";
// eslint-disable-next-line no-unused-vars
import moment from "moment";

export default function Dashboard() {
    const advancedSearchStyles = useStyles();
    const [searchTerm, setSearchTerm] = useState({
        currency: "USD",
        criteria: "date",
        order: 1,
    });
    const [searchResults, setSearchResults] = useState<IDetailedBitcoinPrice[]>(
        []
    );

    useEffect(() => {
        async function getQueryResult() {
            const result = await getSavedPricesReq(
                searchTerm.currency,
                searchTerm.criteria,
                searchTerm.order
            );
            if (result && result.data) {
                result.data.forEach((element: { date: string; }) => {
                    const time = moment(element.date).format("DD-MM-YYYY HH:mm");
                    element.date = time;
                });
                setSearchResults(result.data);
            }
        }
        getQueryResult();
    }, [setSearchResults, searchTerm]);

    function handleChange(event: any) {
        if (event.target.name === "currency") {
            const searchTermVal = { ...searchTerm };
            searchTermVal.currency = event.target.value;
            setSearchTerm(searchTermVal);
        }
        if (event.target.name === "criteria") {
            const searchTermVal = { ...searchTerm };
            searchTermVal.criteria = event.target.value;
            setSearchTerm(searchTermVal);
        }
        if (event.target.name === "order") {
            const searchTermVal = { ...searchTerm };
            searchTermVal.order = event.target.value;
            setSearchTerm(searchTermVal);
        }
    }

    return (
        <Container maxWidth="md">
            <CssBaseline />
            <Grid item xs={12}>
                <Typography variant="h5">View saved prices</Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl
                        variant="outlined"
                        className={advancedSearchStyles.formControl}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Currency
            </InputLabel>
                        <Select
                            value={searchTerm.currency || "USD"}
                            onChange={(e) => handleChange(e)}
                            label="Currency"
                            inputProps={{
                                name: "currency",
                                id: "currency",
                            }}
                        >
                            <MenuItem key={0} value="USD">
                                USD
              </MenuItem>
                            <MenuItem key={1} value="EUR">
                                EUR
              </MenuItem>
                            <MenuItem key={2} value="GBP">
                                GBP
              </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={advancedSearchStyles.formControl}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Criteria
            </InputLabel>
                        <Select
                            value={searchTerm.criteria || "date"}
                            onChange={(e) => handleChange(e)}
                            label="Criteria"
                            inputProps={{
                                name: "criteria",
                                id: "criteria",
                            }}
                        >
                            <MenuItem key={10} value="buy">
                                Buy price
              </MenuItem>
                            <MenuItem key={11} value="sell">
                                Sell price
              </MenuItem>
                            <MenuItem key={12} value="date">
                                Date saved
              </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={advancedSearchStyles.formControl}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Sort order
            </InputLabel>
                        <Select
                            value={searchTerm.order || 1}
                            onChange={(e) => handleChange(e)}
                            label="Sort order"
                            inputProps={{
                                name: "order",
                                id: "order",
                            }}
                        >
                            <MenuItem key={20} value={1}>
                                Ascending
              </MenuItem>
                            <MenuItem key={21} value={-1}>
                                Descending
              </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <ResultComponent searchResults={searchResults}></ResultComponent>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
