interface DatabaseIF {
	SET(name: string, value: string) : void;
	GET(name: string) : void;
	UNSET(name: string) : void;
	NUMEQUALTO(value: string) : void;
};

//TODO - have a better mapping function so names can be pretty
class Database implements DatabaseIF
{
	private readonly keyValueMap = new Map<string, string>();
	private readonly valueKeyMap = new Map<string, number>();

	SET(name: string, value: string) : void {
		this.UNSET(name);

		this.keyValueMap.set(name, value);
		this.valueKeyMap.set(value, 1 + (this.valueKeyMap.get(value) ?? 0));
	}

	GET(name: string) : void {
		console.log(this.keyValueMap.get(name) ?? 'NULL');
	}

	UNSET(name: string) : void {
		const value = this.keyValueMap.get(name);

		if(value !== undefined) {
			this.keyValueMap.delete(name);
			const count = (this.valueKeyMap.get(value) ?? 0) - 1;//This wont ever be undefined

			if(count == 0) {
				this.valueKeyMap.delete(value);
			} else {
				this.valueKeyMap.set(value, count)
			}
		}
	}

	NUMEQUALTO(value: string) : void {
		console.log(this.valueKeyMap.get(value) ?? 0);
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