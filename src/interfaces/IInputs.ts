export interface IInputs {
    txid: string;
    coinbase: string;
    sequence: string;
    txinwitness: string[];
    scriptSig : {
        asm: string;
        hex: string;
    }
}