import * as fs from 'fs'

const INPUT_FILE = process.argv[2];


const OUTPUT_STREAM = process.argv.length === 4 ?
	async (data: any) => {
		return new Promise<void>((resolve, reject) => {
			fs.writeFile(process.argv[3], JSON.stringify(data), (err) => {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	} : async(data: any) => console.log.bind(console);

await OUTPUT_STREAM(process.argv);
