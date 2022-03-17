export interface CommandIF {
	execute(): void;
};

class Command implements CommandIF {
	execute() {
		console.log('executing');
	}
};

const COMMAND_BUILDERS = new Map<string, () => CommandIF>();
COMMAND_BUILDERS.set('SET', () => new Command());
COMMAND_BUILDERS.set('GET', () => new Command());
COMMAND_BUILDERS.set('UNSET', () => new Command());
COMMAND_BUILDERS.set('NUMEQUALTO', () => new Command());
COMMAND_BUILDERS.set('END', () => new Command());
COMMAND_BUILDERS.set('BEGIN', () => new Command());
COMMAND_BUILDERS.set('ROLLBACK', () => new Command());
COMMAND_BUILDERS.set('COMMIT', () => new Command());

export const parseCommand = (cmdStr: string) => {
	const segments = cmdStr.split(' ');

	if(segments.length === 0) {
		console.error('bad command');
		return null;
	}

	const commandBuilder = COMMAND_BUILDERS.get(segments[0]);
	if(commandBuilder) {
		return commandBuilder();
	}

	console.error('bad command name');
	return null;
}