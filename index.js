require('dotenv').config();

const MilestoneSource = require("./milestone-source");
const Reporter = require("./reporter");

async function run() {
    let owner = process.env.PROJECT_ID;
    let token = process.env.GITLAB_TOKEN;

    let reporter = new Reporter();

    // Create instances
    let fromReleaseTagVersion = 'v4.2.1'; // previous tag
    let toReleaseTagVersion = 'v4.2.2'; // next tag
    let client = new MilestoneSource(owner, token);

    // Collecting information to produce the report
    let fromDate = await client.getTagCursor(fromReleaseTagVersion);
    console.log(`From release date identified: ${fromDate}`);
    let toDate = await client.getTagCursor(toReleaseTagVersion);
    console.log(`To release date identified: ${toDate}`);
    let pulls = await client.getPullsSinceLastRelease(
        fromDate,
        toDate
    );
    console.log(
        `${pulls.length} PRs collected between ${fromDate} and ${toDate}`
    );
    pulls.forEach(element => {
        console.log(element);
    });

    // Producing report
    let output = reporter.generate(pulls);
    console.log(output);
}

run();
