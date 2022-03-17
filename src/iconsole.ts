import * as readline from 'readline-sync';

export interface IConsoleIF {
	readline() : string
};

export class IConsole implements IConsoleIF {
	readline() {
		return readline.question('Enter command: ');
	};
}

export class TestConsole implements IConsoleIF {
	readonly COMMANDS1 = [
		'SET x 10',
		'GET x',
		'UNSET x',
		'GET x',
		'END',
	];

	readonly COMMANDS2 = [
		'SET a 10',
		'SET b 10',
		'NUMEQUALTO 10',
		'NUMEQUALTO 20',
		'SET b 30',
		'NUMEQUALTO 10',
		'END',
	];


	readline(): string {
		return this.COMMANDS2.splice(0, 1)[0];
	}
}

