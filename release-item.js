class ReleaseItem {
    constructor(props) {
        this.title = props.title;
        this.author = props.author.name;
        this.reviewers = props.reviewers;
        this.mr = props.web_url;
    }
}

module.exports = ReleaseItem;
