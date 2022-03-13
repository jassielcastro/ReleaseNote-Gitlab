const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

Array.prototype.distinct = function () {
    return this.filter((it, i) => this.indexOf(it) === i);
};

const query_LastReleaseCursor = function (version) { return`/repository/tags/${version}` };

const query_PullsBetween = function (fromTag, toTag) {
    return `/merge_requests?state=merged&created_after=${fromTag}&created_before=${toTag}&target_branch=develop`;
};

module.exports = class MilestoneSource {
    constructor(org, token) {
        this.owner = org;
        this.accessToken = token;
    }

    async buildQuery(query) {
        var data = await fetch(process.env.GITLAB_HOST + this.owner + query, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
                "Content-type": 'application/json'
            }
        });
    
        return await data.json();
    }

    async getTagCursor(version) {
        const result = await this.buildQuery(query_LastReleaseCursor(version));
        const date = new Date(result.commit.created_at);
        return date.toISOString();;
    }

    async getPullsSinceLastRelease(fromTag, toTag) {
        const result = await this.buildQuery(query_PullsBetween(fromTag, toTag));
        return result
            .distinct()
            .map((item) => item.title)
            .distinct();
    }
};
