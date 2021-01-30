import { baseApi } from "./baseApi";

export async function allTransactions() {
  return baseApi.get("/bitcoin/transactions");
}

export async function getRawTransaction(rawTxHash: string) {
    return baseApi.get(`/bitcoin/raw-transaction/${rawTxHash}`);
}