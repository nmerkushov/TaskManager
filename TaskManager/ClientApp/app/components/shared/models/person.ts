export class Person {
	personID: number;
	fio: string;
	phoneFaxes: string;
	email: string;

	constructor(personID: number, fio: string) {
		this.personID = personID;
		this.fio = fio;
		this.phoneFaxes = "";
		this.email = "";
	}
}

export interface IOnePerson {
	person: Person;
}