import { IBitcoinPrice } from "../interfaces/IBitcoinPrice";
import { baseApi } from "./baseApi";


export async function getBitcoinPricesReq() {
    return baseApi.get("/bitcoin/market/prices");
}

export async function getBlockchainStatsReq() {
    return baseApi.get("/bitcoin/market/stats");
}

export async function getSavedPricesReq(currency: string, criteria: string, order: number) {
    return baseApi.get(`/bitcoin/market/saved-prices/${currency}?criteria=${criteria}&order=${order}`);
}

export async function savePriceReq(currency: string, priceData: IBitcoinPrice) {
    return baseApi.post("/bitcoin/market/save-price", {
        currency: currency,
        buy: priceData.buy,
        sell: priceData.sell,
    });
}