export type Person = {
	fname: string; //picture file name must match name with .png
	lname: string;
	team: string;
	bounty: string;
	imgLink: string;
	linkedin: string;
	website: string;
	github: string;
};
export type Team = {
	team: Person[];
};
