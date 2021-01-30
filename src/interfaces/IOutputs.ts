export interface IOutputs {
    value: number;
    scriptPubKey: {
        asm: string;
        hex: string;
        reqSigs: number;
        type: string;
        addresses: string[]
    }
}