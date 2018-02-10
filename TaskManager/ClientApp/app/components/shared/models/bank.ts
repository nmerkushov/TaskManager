export class Bank {
	bankID: number;
	bankName: string;

	constructor(bankID: number, bankName: string) {
		this.bankID = bankID;
		this.bankName = bankName;
	}
}

export interface IOneBank {
	bank: Bank;
}