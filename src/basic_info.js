const chalk = require('chalk');
const cliTable = require('cli-table');
const fetch = require('isomorphic-unfetch');

const showBanner = require('node-banner');
const API_URL = 'https://api.github.com/users';

const displayInfo = new cliTable();

const basicInfo = async (username) => {
  await showBanner('GHstats-CLI');

  // Taking in just the argument part
  const args = process.argv.slice(3);

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
}

module.exports = basicInfo;
