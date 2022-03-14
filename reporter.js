module.exports = class Reporter {
    generate(tasks) {
        var text = "";
        tasks
            .filter((a) => a)
            .forEach((i) => {
                text += `### [${i.title}](${i.mr})\n`;
                text += `   Author: ${i.author}\n`;
                i.reviewers.forEach((reviewer) => {
                    text += `   Reviewer: ${reviewer.name}\n`;
                });
            });
        return text;
    }
};
