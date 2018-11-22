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
    	console.log(chalk.redBright(data))
    	console.log(chalk.green('Automate unusual stuffs on GitHub'))
	});
}

module.exports = showBanner;
