module.exports = class Reporter {
    generate(jira, tasks) {
        var text = "";
        tasks
            .forEach((i) => {
                text += `### [${i.title}](${jira}${i.task})\n`;
                text += `   MergeRequest: ${i.mr}\n`;
                text += `   Author: ${i.author}\n`;
                i.reviewers.forEach((reviewer) => {
                    text += `   Reviewer: ${reviewer.name}\n`;
                });
            });
        return text;
    }
};
