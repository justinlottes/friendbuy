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

	readonly COMMANDS3 = [
		'BEGIN',
		'SET a 10',
		'GET a',
		'BEGIN',
		'SET a 20',
		'GET a',
		'ROLLBACK',
		'GET a',
		'ROLLBACK',
		'GET a',
		'END',
	];

	readonly COMMANDS4 = [
		'BEGIN',
		'SET a 30',
		'BEGIN',
		'SET a 40',
		'COMMIT',
		'GET a',
		'ROLLBACK',
		'ROLLBACK',
		'END',
	]

	readonly COMMANDS5 = [
		'SET a 50',
		'BEGIN',
		'GET a',
		'SET a 60',
		'BEGIN',
		'UNSET a',
		'GET a',
		'ROLLBACK',
		'GET a',
		'COMMIT',
		'GET a',
		'END',
	];

	readonly COMMANDS6 = [
		'SET a 10',
		'BEGIN',
		'NUMEQUALTO 10',
		'BEGIN',
		'UNSET a',
		'NUMEQUALTO 10',
		'ROLLBACK',
		'NUMEQUALTO 10',
		'COMMIT',
		'END',
	];

	readline(): string {
		return this.COMMANDS6.splice(0, 1)[0];
	}
}

