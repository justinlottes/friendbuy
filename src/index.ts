import { IConsole, IConsoleIF } from './iconsole';
import { parseCommand, CommandIF } from './command';


interface DatabaseIF {
	set(name: string, value: string) : void;
	get(name: string) : string;
	unset(name: string) : void;
	numEqualTo(value: string) : number;
};

class Database implements DatabaseIF
{
	set(name: string, value: string) : void {
		console.log('set');
	}

	get(name: string) : string {
		console.log('get');

		return 'get';
	}

	unset(name: string) : void {
		console.log('unset');
	}

	numEqualTo(value: string) : number {
		console.log('numEqualTo');

		return 5;
	}
};

const db = new Database();

db.set('test set', 'set value');
db.get('test get');
db.unset('test unset');
console.log(db.numEqualTo('test numequalto'));


const iconsole = new IConsole();
while(true) {
	const commandStr = iconsole.readline();
	const command = parseCommand(commandStr);
	if(command) {
		command.execute();
	} else {
		console.error(`failure parsing command: '${commandStr}'`)
	}
}

