const chalk = require('chalk');
const showBanner = require('node-banner');
const fetch = require('isomorphic-unfetch');
const ora = require('ora');

const API_URL = 'https://api.github.com/users';

const popularRepos = async username => {
	await showBanner('GHstats CLI');

	const spinner = ora('Fetching details');
	spinner.start();

	fetch(`${API_URL}/${username}/repos?per_page=100`)
		.then(response => response.json())
		.then(repositories => {
			try {
				let largestStarCount = repositories[0].stargazers_count;
				for (const repo of repositories) {
					if (repo.stargazers_count > largestStarCount) {
						largestStarCount = repo.stargazers_count;
					}
				}
				spinner.stop();
				console.log(chalk.bold.yellow('\n\n<-- Popular Repositories -->'));
				const popularRepositories = [];
				for (const repo of repositories) {
					if (repo.stargazers_count === largestStarCount) {
						popularRepositories.push(repo);
					}
				}

				for (const repo of popularRepositories) {
					console.log(
						`\n\nName: ${repo.name}\nDescription: ${repo.description}\nForks: ${repo.forks}\nStar gazers: ${repo.stargazers_count}`
					);
				}
			} catch (err) {
				spinner.fail('Invalid username!');
			}
		})
		.catch(err => {
			spinner.fail('Something went wrong');
			throw err;
		});
};

module.exports = popularRepos;
