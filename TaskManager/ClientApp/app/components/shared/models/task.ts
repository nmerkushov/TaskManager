import { Project } from './project';

export class Task {
	taskID: number;
	projectID: number;
	taskName: string;
	priority: number;
	responsiblePersonID: number | null;
	responsiblePersonName: string;
	responsiblePersonPhoneFaxes: string;
	responsiblePersonEmails: string;
	upToDate: Date | null;
	statusID: number | null;
	statusName: string;
	notes: string;
	responseAction: string;
	rowColor: string;

	constructor() {
		this.taskID = 0;
		this.projectID = 0;
		this.taskName = "";
		this.priority = 1;
		this.responsiblePersonID = null;
		this.responsiblePersonName = "";
		this.responsiblePersonPhoneFaxes = "";
		this.responsiblePersonEmails = "";
		this.upToDate = null;
		this.statusID = null;
		this.statusName = "";
		this.notes = "";
		this.responseAction = "";
		this.rowColor = "#ffffff";
	}
}

export interface IOneTask {
	task: Task;
}

export interface IOneProjectTask {
	project: Project;
	task: Task;
}