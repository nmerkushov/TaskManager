export class ProjectFile {
	projectFileID: number;
	projectID: number;
	filePath: string;
	isAdded: boolean;
	isDeleted: boolean;
	fileData: any;

	constructor() {
		this.projectFileID = 0;
		this.projectID = 0;
		this.filePath = "";
		this.isAdded = false;
		this.isDeleted = false;
	}
}

export interface IOneProjectFile {
	projectFile: ProjectFile;
}