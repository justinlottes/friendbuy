import { IConsole, IConsoleIF } from './iconsole';
import { parseCommand, CommandIF } from './command';

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

