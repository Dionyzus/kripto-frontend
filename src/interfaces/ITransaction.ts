import { IInputs } from "./IInputs";
import { IOutputs } from "./IOutputs";

export interface ITransaction {
    txid: string;
    hash: string;
    size: number;
    weight: number;
    locktime: number;
    vin: IInputs[];
    vout: IOutputs[];
}