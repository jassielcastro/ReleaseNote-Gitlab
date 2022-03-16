const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ReleaseItem = require("./release-item");

Array.prototype.distinct = function () {
    return this.filter((it, i) => this.indexOf(it) === i);
};

const query_getTags = "/repository/tags";

const query_PullsBetween = function (fromDate, toDate, targetBranch) {
    return `/merge_requests?state=merged&updated_after=${fromDate}&updated_before=${toDate}&target_branch=${targetBranch}`;
};

module.exports = class Gitlab {
    constructor(org, token) {
        this.owner = org;
        this.accessToken = token;
        this.baseUrl = "https://gitlab.com/api/v4/projects/";
    }

    async buildQuery(query) {
        var data = await fetch(this.baseUrl + this.owner + query, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
                "Content-type": 'application/json'
            }
        });

        return await data.json();
    }

    async getLastReleaseDate() {
        const result = await this.buildQuery(query_getTags);
        let release = result[0];
        console.log(`Last Release tag: ${release.name}`);
        const date = new Date(release.commit.created_at);
        return date.toISOString();
    }

    async getPullsSinceLastRelease(fromDate, toDate, targetBranch) {
        const result = await this.buildQuery(query_PullsBetween(fromDate, toDate, targetBranch));
        return result
            .distinct()
            .map((item) => new ReleaseItem(item))
            .distinct();
    }
};
