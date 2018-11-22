const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const figlet = require('figlet');
const clear = require('clear');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const showBanner = require('../utils/banner');
const fetch = require('isomorphic-unfetch');

const API_URL = 'https://api.github.com/users';

const popularRepos = (args) => {
	showBanner();

  let frame = elegantSpinner();
  let timer = setInterval( () => {
    logUpdate(frame());
}, 300);
  setTimeout(() => {

  	clearInterval(timer);
	fetch(`${API_URL}/${args.user}/repos?per_page=100`)
	.then( response =>  response.json() )
	.then( repositories => {
		try{
			let largest_star_count = repositories[0].stargazers_count;
			for(let repo of repositories){
 				if(repo.stargazers_count > largest_star_count){
 					largest_star_count = repo.stargazers_count;
 				}
 			}
 			console.log(chalk.red.bgBlue.bold('\n\n<-- Popular Repositories -->'));
 			let popular_repositories = [];
 			for(let repo of repositories){
 				if(repo.stargazers_count == largest_star_count){
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
