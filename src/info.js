const axios = require('axios');
const showBanner = require('node-banner');
const ora = require('ora');
const Table = require('cli-table3');

const {description} = require('../package');

const tableView = new Table();

const query = `
        query getRepo($login: String!) {
          user(login: $login) {
          	name
          	followers {
          		totalCount
          	}
          	following {
          		totalCount
          	}
            repositoriesContributedTo(contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
              totalCount
            }
            pullRequests {
              totalCount
            }
            issues {
              totalCount
            }
            organizations {
              totalCount
            }
            commitComments {
              totalCount
            }
            issueComments {
              totalCount
            }
            gists {
              totalCount
            }
          }
        }
      `;

const axiosConfig = {
	url: 'https://api.github.com/graphql',
	method: 'post',
	data: {
		query
	}
};

const toSentenceCase = (string) => {
	const result = string.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

const displayStats = async (username) => {
	await showBanner('GHStats', description);
	// Holds the items to be displayed in tabular format
	const data = [];

	const spinner = ora('Fetching details');
	spinner.start();

	axiosConfig.data.variables = {
		login: username
	};

	const result = await axios(axiosConfig);
	spinner.stop();

	const userInfo = result.data.data.user;

	Object.keys(userInfo)
		.filter((key) => key !== 'pinnedItems')
		.forEach((key) =>
			data.push({
				[toSentenceCase(key)]: Object.prototype.hasOwnProperty.call(
					userInfo[key],
					'totalCount'
				)
					? userInfo[key].totalCount
					: userInfo[key]
			})
		);
	tableView.push(...data);
	console.log(tableView.toString());
};

module.exports = displayStats;
