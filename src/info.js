const chalk = require('chalk');
const Table = require('cli-table3');
const fetch = require('isomorphic-unfetch');

const showBanner = require('node-banner');

const API_URL = 'https://api.github.com/users';

const displayInfo = new Table();

const basicInfo = async username => {
	await showBanner('GHstats-CLI');

	fetch(`${API_URL}/${username}`)
		.then(response => response.json())
		.then(info => {
			try {
				console.log(chalk.yellowBright('\n <-- Basic Info -->'));
				displayInfo.push(
					{'Name: ': info.name},
					{Followers: info.followers},
					{Following: info.following},
					{'Repositories:': info.public_repos},
					{Gists: info.public_gists}
				);
				console.log(displayInfo.toString());
			} catch (err) {
				console.log('Invalid username!');
			}
		})
		.catch(err => console.log(err));
};

module.exports = basicInfo;
