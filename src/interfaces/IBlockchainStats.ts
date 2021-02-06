export interface IBlockchainStats {
    market_price_usd: number,
    hash_rate: number;
    total_fees_btc: number;
    n_btc_mined: number;
    n_tx: number;
    n_blocks_mined: number;
    totalbc: number;
    estimated_transaction_volume_usd: number;
    miners_revenue_usd: number;
    miners_revenue_btc: number;
    trade_volume_btc: number;
    trade_volume_usd: number;
}