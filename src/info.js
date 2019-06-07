const chalk = require('chalk');
const Table = require('cli-table3');
const fetch = require('isomorphic-unfetch');
const ora = require('ora');

const showBanner = require('node-banner');

const API_URL = 'https://api.github.com/users';

const displayInfo = new Table();

const basicInfo = async username => {
	await showBanner('GHstats-CLI');

	const spinner = ora('Fetching details');
	spinner.start();

	fetch(`${API_URL}/${username}`)
		.then(response => response.json())
		.then(info => {
			try {
				spinner.stop();
				console.log(chalk.bold.yellow('\n <-- Basic Info -->'));
				displayInfo.push(
					{'Name: ': info.name},
					{Followers: info.followers},
					{Following: info.following},
					{'Repositories:': info.public_repos},
					{Gists: info.public_gists}
				);
				console.log(displayInfo.toString());
			} catch (err) {
				spinner.fail('Invalid username!');
			}
		})
		.catch(err => {
			spinner.fail('Something went wrong');
			throw err;
		});
};

module.exports = basicInfo;
