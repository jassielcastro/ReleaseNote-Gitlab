class ReleaseItem {
    constructor(props) {
        this.title = props.title;
        this.author = props.author.name;
        this.reviewers = props.reviewers;
        this.mr = props.web_url;
        try {
            this.task = this.title.match(/\w+-\d+/g)[0];
        } catch (error) {
            this.task = "";
        }
    }
}

module.exports = ReleaseItem;
