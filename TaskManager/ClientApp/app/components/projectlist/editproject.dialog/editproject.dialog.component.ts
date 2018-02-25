import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Project, IOneProject, Bank, Person } from '../../shared/models/shared.models';

@Component({
	selector: 'editproject-dialog',
	templateUrl: './editproject.dialog.component.html'
})
export class EditProjectDialogComponent extends DialogComponent<IOneProject, Project> implements IOneProject {
	project: Project;
	isValid: boolean = true;
	banks: Bank[] = new Array<Bank>(new Bank(0, "Не выбран"));
	persons: Person[] = new Array<Person>(new Person(0, "Не выбран"));

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getBanks()
			.then(res => {
				this.banks = res;
				this.banks.push(new Bank(0, "Не выбран"));
			})
			.catch(error => console.error(error));
		this.service.getPersons()
			.then(res => {
				this.persons = res;
				this.persons.push(new Person(0, "Не выбран"));
			})
			.catch(error => console.error(error));
	}

	confirm() {
		this.isValid = (this.project.projectName.length > 0);
		if (this.isValid) {
			this.result = this.project;
			this.close();
		}
	}
}

