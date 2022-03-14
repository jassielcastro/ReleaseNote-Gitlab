require('dotenv').config();

const Gitlab = require("./gitlab-source");
const Reporter = require("./reporter");

async function run() {
    let owner = process.env.PROJECT_ID;
    let token = process.env.GITLAB_TOKEN;

    let reporter = new Reporter();

    // Create instances
    let client = new Gitlab(owner, token);

    // Collecting information to produce the report

    // Get last release tag date
    let lastReleaseDate = await client.getLastReleaseDate();
    console.log(`Last release date: ${lastReleaseDate}`);

    // To current date
    let toNow = new Date().toISOString();

    let pulls = await client.getPullsSinceLastRelease(
        lastReleaseDate,
        toNow
    );

    console.log(
        `\n\n${pulls.length} PRs collected between ${lastReleaseDate} and ${toNow} \n`
    );

    // Producing report
    let output = reporter.generate(pulls);
    console.log(output);
}

run();
