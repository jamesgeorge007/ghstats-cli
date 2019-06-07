const chalk = require('chalk');
const showBanner = require('node-banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const popularRepos = async username => {
	await showBanner('GHstats CLI');

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

				console.log(chalk.yellowBright('\n\n<-- Popular Repositories -->'));
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
				console.log('Invalid username!');
			}
		})
		.catch(err => console.log(err));
};

module.exports = popularRepos;
