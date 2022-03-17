import { DefaultDatabase } from './database';

export interface CommandIF {
	execute(): void;
};

class Command implements CommandIF {
	execute() {
		console.log('executing');
	}
};

class GenericCommand implements CommandIF {
	constructor(private func: () => void) {}

	execute() { this.func();}
}

const createCommand = (expectedArgCount: number) => {
	return (segments: string[]): CommandIF | null => {
		if(segments.length !== expectedArgCount) {
			return null;
		}

		if(segments[0] === 'END') {
			return new GenericCommand(() => {
				process.exit(0);
			});
		}

		return new GenericCommand(() => {
			//I would clean this up somehow so I'm not casting to an any
			(DefaultDatabase as any)[segments[0]](segments[1], segments[2]);
		});
	};
};

const COMMAND_BUILDERS = new Map<string, (segments: string[]) => CommandIF | null>();
COMMAND_BUILDERS.set('SET', createCommand(3));
COMMAND_BUILDERS.set('GET', createCommand(2));
COMMAND_BUILDERS.set('UNSET', createCommand(2));
COMMAND_BUILDERS.set('NUMEQUALTO', createCommand(2));
COMMAND_BUILDERS.set('END', createCommand(1));
COMMAND_BUILDERS.set('BEGIN', createCommand(1));
COMMAND_BUILDERS.set('ROLLBACK', createCommand(1));
COMMAND_BUILDERS.set('COMMIT', createCommand(1));

export const parseCommand = (cmdStr: string) => {
	const segments = cmdStr.split(' ');

	if(segments.length === 0) {
		console.error('bad command');
		return null;
	}

	const commandBuilder = COMMAND_BUILDERS.get(segments[0]);
	if(commandBuilder) {
		return commandBuilder(segments);
	}

	console.error('bad command name');
	return null;
}