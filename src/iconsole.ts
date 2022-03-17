import * as readline from 'readline-sync';
import { Subject } from 'rxjs';

export interface IConsoleIF {
	readline() : string
};

export class IConsole implements IConsoleIF {
	readline() { 
		return readline.question('Enter command: ');
	};
}


