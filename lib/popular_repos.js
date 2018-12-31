const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const showBanner = require('../utils/banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const popularRepos = (username) => {
  showBanner();

  // Taking in just the argument part
  const args = process.argv.slice(3);

  let frame = elegantSpinner();
  let timer = setInterval( () => {
    logUpdate(frame());
  }, 300);
  
  setTimeout(() => {

  	clearInterval(timer);

  	if (args.length > 1){
  		console.log(chalk.red('\n Only 1 argument is allowed'));
  		process.exit(1);
  	}

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
	}, 1000);
}

module.exports = popularRepos;
