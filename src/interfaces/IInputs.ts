export interface IInputs {
    txid: string;
    coinbase: string;
    sequence: string;
    txinwitness: number;
    scriptSig : {
        asm: string;
        hex: string;
    }
}