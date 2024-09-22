const path = require("path");
const fs = require('fs');
const pathToUploads = './data/uploads';
async function getEvents(fileName){
	const events = await fs.promises.readFile(path.join(pathToUploads,fileName),'utf-8').catch((error) => {
		console.log(error);
	});
	return events;
}

module.exports = getEvents;