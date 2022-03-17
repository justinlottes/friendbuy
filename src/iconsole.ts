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
	readonly COMMANDS = [
		'SET x 10',
		'GET x',
		'UNSET x',
		'GET x',
		'END',
	];


	readline(): string {
		return this.COMMANDS.splice(0, 1)[0];
	}
}

