const chalk = require('chalk');
const showBanner = require('node-banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const starCount = async (username) => {
  await showBanner('GHstats CLI');

  // Taking in just the argument part
  const args = process.argv.slice(3);


		 fetch(`${API_URL}/${username}/repos?per_page=100`)
		.then(response => response.json())
		.then(repositories => {
		try{
			console.log(chalk.green.bgRed.bold('\n\n<--Star Count-->'));
			let stars = 0;
			for(let repo of repositories){
				if (!repo.fork){
					stars += repo.stargazers_count;
				}
			}
		console.log(`\n\nNumber of stars received by the user for his personal repositories excluding forks: ${stars}`);
		} catch(err){
			console.log('Invalid username!');
		}
	})
	.catch(err => console.log(err));
}

module.exports = starCount;
