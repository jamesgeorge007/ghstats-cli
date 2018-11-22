const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const clear = require('clear');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const showBanner = require('../utils/banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const starCount = (args) => {
  showBanner();

  let frame = elegantSpinner();
  let timer = setInterval( () => {
    logUpdate(frame());
  }, 300);
	setTimeout(() => {

		clearInterval(timer);
		 fetch(`${API_URL}/${args.user}/repos?per_page=100`)
		.then(response => response.json())
		.then(repositories => {
		try{
			console.log(chalk.green.bgRed.bold('\n\n<--Star Count-->'));
			let stars = 0;
			for(let repo of repositories){
				if(!repo.fork){
					stars += repo.stargazers_count;
				}
			}
		console.log(`\n\nNumber of stars received by the user for his personal repositories excluding forks: ${stars}`);
		} catch(err){
			console.log('Invalid username!');
		}
	})
	.catch(err => console.log(err));

	})
}

module.exports = starCount;
