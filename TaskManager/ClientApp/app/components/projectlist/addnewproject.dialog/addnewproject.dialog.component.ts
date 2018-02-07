import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { TaskManagerService } from '../../shared/services/taskManager.service';
import { Project } from '../../shared/models/project';
import { Bank } from '../../shared/models/bank';
import { Person } from '../../shared/models/person';

@Component({
	selector: 'addnewproject-dialog',
	templateUrl: './addnewproject.dialog.component.html'
})

export class AddNewProjectDialogComponent extends DialogComponent<null, Project> {
	newProject: Project;
	isValid: boolean = true;
	banks: Bank[] = new Array<Bank>(new Bank(0, "Не выбран"));
	persons: Person[] = new Array<Person>(new Person(0, "Не выбран"));

	constructor(private service: TaskManagerService, dialogService: DialogService) {
		super(dialogService);
		this.newProject = new Project();
		this.fillDatasource();
	}

	fillDatasource() {
		this.service.getBanks()
			.then(res => {
				this.banks = res;
				this.banks.push(new Bank(0, "Не выбран"));
				this.newProject.bankID = 0;
			})
			.catch(error => console.error(error));
		this.service.getPersons()
			.then(res => {
				this.persons = res;
				this.persons.push(new Person(0, "Не выбран"));
				this.newProject.contactPersonID = 0;
			})
			.catch(error => console.error(error));
	}

	confirm() {
		this.isValid = (this.newProject.projectName.length > 0);
		if (this.isValid) {
			this.result = this.newProject;
			this.close();
		}
	}
}

