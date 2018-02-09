export class TaskStatus {
	taskStatusID: number;
	taskStatusName: string;

	constructor(taskStatusID: number, taskStatusName: string) {
		this.taskStatusID = taskStatusID;
		this.taskStatusName = taskStatusName;
	}
}