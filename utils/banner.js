const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const showBanner = () => {
  clear();
  figlet('GHStats-cli', (err, data) => {
    	if (err) {
      	console.log('Something went wrong...');
      	console.dir(err);
      	return;
    	}
    	console.log(chalk.yellow(data))
    	console.log(chalk.greenBright(' Automate unusual stuffs on GitHub'))
	});
}

module.exports = showBanner;
