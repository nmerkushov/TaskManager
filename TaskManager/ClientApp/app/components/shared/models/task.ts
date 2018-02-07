export class Task {
	taskID: number;
	projectID: number;
	taskName: string;
	priority: number;
	responsiblePersonID: number | null;
	upToDate: Date | null;
	statusID: number | null;
	notes: string;
	responseAction: string;

	constructor() {
		this.taskID = 0;
		this.projectID = 0;
		this.taskName = "";
		this.priority = 1;
		this.responsiblePersonID = null;
		this.upToDate = null;
		this.statusID = null;
		this.notes = "";
		this.responseAction = "";
	}
}

export interface IOneTask {
	task: Task;
}