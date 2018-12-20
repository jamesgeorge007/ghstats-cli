const chalk = require('chalk');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const cliTable = require('cli-table'); 
const fetch = require('isomorphic-unfetch');

const showBanner = require('../utils/banner');
const API_URL = 'https://api.github.com/users';

const displayInfo = new cliTable();

const basicInfo = (username) => {
  showBanner();

  let frame = elegantSpinner();
  let timer = setInterval( () => {
    logUpdate(frame());
  }, 300);
  setTimeout(() => {
  	clearInterval(timer);
  	fetch(`${API_URL}/${username}`)
  	.then(response => response.json())
  	.then(info => {
  		try{
  			console.log(chalk.yellowBright('\n <-- Basic Info -->'));
  			displayInfo.push({'Name: ': info.name},
          {'Followers': info.followers},
          {'Following': info.following},
          {'Repositories:': info.public_repos},
          {'Gists': info.public_gists}
        );
        console.log(displayInfo.toString());
  		} catch(err){
  			console.log('Invalid username!');
  		}
  	})
  	.catch(err => console.log(err))
  }, 1000)
}

module.exports = basicInfo;
