export interface DatabaseIF {
	SET(name: string, value: string) : void;
	GET(name: string) : void;
	UNSET(name: string) : void;
	NUMEQUALTO(value: string) : void;
	BEGIN() : void;
	ROLLBACK(): void;
	COMMIT(): void;
};

interface DatabaseInternalIF {
	SET(name: string, value: string) : void;
	GET(name: string) : void;
	UNSET(name: string) : void;
	NUMEQUALTO(value: string) : void;
	BEGIN() : void;
	ROLLBACK(): void;
	COMMIT(): void;

	getInternal(name: string, checkTransactions: boolean) : void;
};

class Transaction implements DatabaseInternalIF {
	private readonly modifications = new Map<string, string | null>();

	constructor(private database: DatabaseInternalIF) {}

	SET(name: string, value: string) : void {
		this.modifications.set(name, value);
	}

	GET(name: string) : void {
		this.getInternal(name, false);
	}

	getInternal(name: string, checkTransactions: boolean): void {
		if(this.modifications.has(name)) {
			console.log(this.modifications.get(name) ?? 'NULL');
		} else {
			this.database.getInternal(name, false);
		}
	}

	UNSET(name: string) : void {
		this.modifications.set(name, null);
	}

	NUMEQUALTO(value: string) : void {

	}

	BEGIN() : void {
	}

	ROLLBACK(): void {
	}

	COMMIT(): void {
		for(let entry of this.modifications.entries()) {
			if(entry[1] === null) {
				this.database.UNSET(entry[0]);
			} else {
				this.database.SET(entry[0], entry[1]);
			}
		};
	}
};

//TODO - have a better mapping function so names can be pretty
class Database implements DatabaseInternalIF
{
	private readonly keyValueMap = new Map<string, string>();
	private readonly valueKeyMap = new Map<string, number>();
	private readonly transactions: Transaction[] = [];

	SET(name: string, value: string) : void {
		if(this.tryLastTransaction('SET', name, value)) {
			return;
		}

		this.UNSET(name);

		this.keyValueMap.set(name, value);
		this.valueKeyMap.set(value, 1 + (this.valueKeyMap.get(value) ?? 0));
	}

	GET(name: string) : void {
		this.getInternal(name, true);
	}

	getInternal(name: string, checkTransactions: boolean = true) : void {
		if(checkTransactions && this.tryLastTransaction('GET', name)) {
			return;
		}

		console.log(this.keyValueMap.get(name) ?? 'NULL');
	}

	UNSET(name: string) : void {
		if(this.tryLastTransaction('UNSET', name)) {
			return;
		}

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
		if(this.tryLastTransaction('NUMEQUALTO', value)) {
			return;
		}

		console.log(this.valueKeyMap.get(value) ?? 0);
	}

	BEGIN() {
		if(this.transactions.length === 0) {
			this.transactions.push(new Transaction(this));
		} else {
			this.transactions.push(new Transaction(this.transactions[this.transactions.length - 1]));
		}
	}

	ROLLBACK() {
		if(this.transactions.length > 0) {
			this.transactions.pop();
		} else {
			console.log('NO TRANSACTION');
		}
	}

	COMMIT() {
		if(this.transactions.length > 0) {
			this.transactions.pop()?.COMMIT();
		} else {
			console.log('NO TRANSACTION');
		}
	}

	private tryLastTransaction(operation: string, ...args: any[]) {
		if(this.transactions.length > 0) {
			const tx = this.transactions[this.transactions.length - 1] as any;
			tx[operation].apply(tx, args);
			return true;
		}

		return false;
	}
};

export const DefaultDatabase = new Database();