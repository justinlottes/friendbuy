interface DatabaseIF {
	SET(name: string, value: string) : void;
	GET(name: string) : string;
	UNSET(name: string) : void;
	NUMEQUALTO(value: string) : number;
};

//TODO - have a better mapping function so names can be pretty
class Database implements DatabaseIF
{
	SET(name: string, value: string) : void {
		console.log('set');
	}

	GET(name: string) : string {
		console.log('get');

		return 'get';
	}

	UNSET(name: string) : void {
		console.log('unset');
	}

	NUMEQUALTO(value: string) : number {
		console.log('numEqualTo');

		return 5;
	}

	BEGIN() {
		console.log('begin');
	}

	ROLLBACK() {
		console.log('rollback');
	}

	COMMIT() {
		console.log('commit');
	}
};

export const DefaultDatabase = new Database();