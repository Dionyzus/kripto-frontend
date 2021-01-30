export interface IBlockchainInfo {
    chain: string;
    blocks: number;
    bestblockhash: string;
    difficulty: number;
    mediantime: number;
    size_on_disk: number;
}