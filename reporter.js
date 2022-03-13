Array.prototype.groupBy = function (func) {
    let groups = {};
    this.forEach((it) => {
        let v = func(it);
        if (!groups[v]) groups[v] = [];
        groups[v].push(it);
    });
    return Object.keys(groups).map((it) => {
        return { name: it, items: groups[it] };
    });
};

module.exports = class Reporter {
    generate(tasks) {
        var text = "";
        tasks
            .forEach((i) => {
                text += `### ${i}\n`;
            });
        return text;
    }
};
