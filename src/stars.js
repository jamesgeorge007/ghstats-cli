const chalk = require('chalk');
const showBanner = require('node-banner');
const fetch = require('isomorphic-unfetch');
const ora = require('ora');

const API_URL = 'https://api.github.com/users';

const starCount = async username => {
	await showBanner('GHstats CLI');

	const spinner = ora('Fetching details');
	spinner.start();

	fetch(`${API_URL}/${username}/repos?per_page=100`)
		.then(response => response.json())
		.then(repositories => {
			try {
				spinner.stop();
				console.log(chalk.bold.green('\n\n<--Star Count-->'));
				let stars = 0;
				for (const repo of repositories) {
					if (!repo.fork) {
						stars += repo.stargazers_count;
					}
				}

				console.log(
					`\n\nNumber of stars received by the user for his personal repositories excluding forks: ${stars}`
				);
			} catch (err) {
				spinner.fail('Invalid username!');
			}
		})
		.catch(err => {
			throw err;
			spinner.fail('Something went wrong');
		});
};

module.exports = starCount;
