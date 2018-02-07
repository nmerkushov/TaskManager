export class Project {
	projectID: number;
	projectName: string;
	bankID: number;
	bankName: string;
	contactPersonID: number;
	contactPersonName: string;
	director: string;
	phoneFaxes: string;
	
	constructor() {
		this.projectID = 0;
		this.projectName = "";
		this.bankID = 0;
		this.bankName = "";
		this.contactPersonID = 0;
		this.contactPersonName = "";
		this.director = "";
		this.phoneFaxes = "";
	}
}

export interface IOneProject {
	project: Project;
}