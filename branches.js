/*import { request } from './fetcher.js';

async function getBranches() {
    return await request(
        process.env.GITLAB_HOST + process.env.PROJECT_ID + "/repository/branches?sort=updated_desc&search=release",
        "GET",
        process.env.GITLAB_TOKEN
    );
}

export function branches() {
    return getBranches();
}
*/