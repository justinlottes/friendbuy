import { IConsole, IConsoleIF, TestConsole } from './iconsole';
import { parseCommand, CommandIF } from './command';

//const iconsole = new IConsole();
const iconsole = new TestConsole();
while(true) {
	const commandStr = iconsole.readline();
	const command = parseCommand(commandStr);
	if(command) {
		command.execute();
	} else {
		console.error(`failure parsing command: '${commandStr}'`)
	}
}

