export interface IBlock {
    confirmations: number;
    version: number;
    merkleroot: string;
    difficulty: number,
    hash: number;
    height: string;
    nTx: number;
    nonce: number;
    time: string;
    size: number;
    tx: string[];
}