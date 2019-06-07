const chalk = require('chalk');
const showBanner = require('node-banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const popularRepos = async (username) => {
  await showBanner('GHstats CLI');

  // Taking in just the argument part
  const args = process.argv.slice(3);

	fetch(`${API_URL}/${username}/repos?per_page=100`)
	.then( response =>  response.json() )
	.then( repositories => {
		try{
			let largest_star_count = repositories[0].stargazers_count;
			for(let repo of repositories){
 				if (repo.stargazers_count > largest_star_count){
 					largest_star_count = repo.stargazers_count;
 				}
 			}
 			console.log(chalk.yellowBright('\n\n<-- Popular Repositories -->'));
 			let popular_repositories = [];
 			for(let repo of repositories){
 				if (repo.stargazers_count == largest_star_count){
 					popular_repositories.push(repo);
 				}
 			}
 			for(let repo of popular_repositories){
 				console.log(`\n\nName: ${repo.name}\nDescription: ${repo.description}\nForks: ${repo.forks}\nStar gazers: ${repo.stargazers_count}`);
 			}
 		}catch(err){
 			console.log('Invalid username!');
 		}
	})
	.catch(err => console.log(err));
}

module.exports = popularRepos;
