module.exports = class Reporter {
    generate(url, tasks) {
        var text = "";
        tasks
            .forEach((i) => {
                text += `### [${i.title}](${url}${i.task})\n\n`;
                text += `**MergeRequest:** ${i.mr}\n\n`;
                text += `**Author:** ${i.author}\n\n`;
                text += `**Reviewers:** \n\n`;
                i.reviewers.forEach((reviewer) => {
                    text += `* ${reviewer.name}\n`;
                });
                text += `\n`;
            });
        return text;
    }
};
