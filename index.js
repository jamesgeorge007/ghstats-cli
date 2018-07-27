#!/usr/bin/env node

'use strict'

const fetch = require('isomorphic-unfetch');
const program = require('commander');
const ProgressBar = require('progress'); 
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');

let progressBarAnimation = () => {
	let bar = new ProgressBar(':bar', { total: 50 });
	let timer = setInterval(function () {
  	bar.tick();
  	if (bar.complete) {
    	console.log('\ncomplete\n');
    	clearInterval(timer);
  }
}, 50);
}

let	popular_repositories = (args) => { 
	console.log(args.user);
	fetch(`https://api.github.com/users/${args.user}/repos?per_page=100`)
	.then( response =>  response.json() )
	.then( repositories => {
		try{
			console.log(chalk.blue('\n\n<-- Popular Repositories -->'));
			progressBarAnimation();
			let largest_star_count = repositories[0].stargazers_count;
			console.log(`Star count for the very first repository:  ${largest_star_count}`);
 	 		for(let repo of repositories){
 				if(repo.stargazers_count > largest_star_count){
 					largest_star_count = repo.stargazers_count;
 				}
 			} 
 			console.log(`Largest star count is ${largest_star_count}`);
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
}

let star_count = (args) => {
	fetch(`https://api.github.com/users/${args.user}/repos?per_page=100`)
	.then(response => response.json())
	.then(repositories => {
		try{
			console.log('\n\n<--Star Count-->');
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
}	

program
  .version('1.0.0', '-v, --version')
  .description('Automate the unusual stuffs on GitHub');

program
  .command('popular_repos')
  .option('-u, --user <username>', 'Username')
  .description('Fetch the popular repostories by star count.')
  .action(popular_repositories);

program
  .command('stars')
  .option('-u, --user <username>', 'Username')
  .description('Stars received for the repositories that user owns.')
  .action(star_count);

program
.command('progress')
.action(progressBarAnimation);  

program.parse(process.argv);  