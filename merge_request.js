/*import { request } from './fetcher.js';

async function compareBranches(source, target) {
    return await request(
        process.env.GITLAB_HOST + process.env.PROJECT_ID + "/repository/compare?from=" + source + "&to=" + target,
        "GET",
        process.env.GITLAB_TOKEN
    );
}

export function compare(source, target) {
    return compareBranches(source, target);
}
*/