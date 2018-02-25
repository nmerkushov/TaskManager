import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Bank, IOneBank } from '../../shared/models/shared.models';

@Component({
	selector: 'deletebank-dialog',
	templateUrl: './deletebank.dialog.component.html'
})
export class DeleteBankDialogComponent extends DialogComponent<IOneBank, boolean> implements IOneBank {
	bank: Bank;

	constructor(dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.result = true;
		this.close();
	}
}

