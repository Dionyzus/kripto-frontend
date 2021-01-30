import { baseApi } from "./baseApi";

export async function getBlockchainInfoReq() {
  return baseApi.get("/bitcoin/blockchain-info");
}

export async function getBlockHashReq(blockHeight: number) {
  return baseApi.get(`/bitcoin/block-hash/${blockHeight}`);
}

export async function getBlockReq(blockHash: string) {
  return baseApi.get(`/bitcoin/block/${blockHash}`);
}

export async function getAllTransactionsReq() {
  return baseApi.get("/bitcoin/transactions");
}

export async function getRawTransactionReq(rawTxHash: string) {
    return baseApi.get(`/bitcoin/raw-transaction/${rawTxHash}`);
}