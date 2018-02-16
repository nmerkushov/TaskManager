export class TaskFile {
	taskFileID: number;
	taskID: number;
	fileName: string;
	isAdded: boolean;
	isDeleted: boolean;
	fileData: any;

	constructor() {
		this.taskFileID = 0;
		this.taskID = 0;
		this.fileName = "";
		this.isAdded = false;
		this.isDeleted = false;
	}
}

export interface IOneTaskFile {
	taskFile: TaskFile;
}