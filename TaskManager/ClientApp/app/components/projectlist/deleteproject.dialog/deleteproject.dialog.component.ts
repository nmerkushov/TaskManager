import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Project, IOneProject } from '../../shared/models/shared.models';

@Component({
	selector: 'deleteproject-dialog',
	templateUrl: './deleteproject.dialog.component.html'
})
export class DeleteProjectDialogComponent extends DialogComponent<IOneProject, boolean> implements IOneProject {
	project: Project;

	constructor(dialogService: DialogService) {
		super(dialogService);
	}

	confirm() {
		this.result = true;
		this.close();
	}
}

