import * as readline from 'readline';
import { Subject } from 'rxjs';

export interface IConsoleIF {
	getInput() : Subject<string>;
};

export class IConsole implements IConsoleIF {
	private readonly subject = new Subject<string>();

	getInput() { return this.subject; };
}


