export class Person {
	personID: number;
	fio: string;
	phoneFaxes: string;
	emails: string;

	constructor(personID: number, fio: string) {
		this.personID = personID;
		this.fio = fio;
		this.phoneFaxes = "";
		this.emails = "";
	}
}

export interface IOnePerson {
	person: Person;
}