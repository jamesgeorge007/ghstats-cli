const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const showBanner = require('../utils/banner');
const fetch = require('isomorphic-unfetch');

const basicInfo = (args) => {
  showBanner();

  let frame = elegantSpinner();
  let timer = setInterval( () => {
    logUpdate(frame());
  }, 300);
  setTimeout(() => {
  	clearInterval(timer);
  	fetch(`https://api.github.com/users/${args.user}`)
  	.then(response => response.json())
  	.then(info => {
  		try{
  			console.log(chalk.green.bgRed.bold('\n<-- Basic Info -->'));
  			console.log(`\n\nName: ${info.name}\nFollowers: ${info.followers}\nFollowing: ${info.following}\nRepositories: ${info.public_repos}\nGists: ${info.public_gists}`)
  		} catch(err){
  			console.log('Invalid username!');
  		}
  	})
  	.catch(err => console.log(err))
  }, 1000)
}

module.exports = basicInfo;
