const spawn = require('child_process').spawn;

module.exports = class NodeDevServer {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin('compilation', this.onCompile.bind(this));
        compiler.plugin('done', this.onDone.bind(this));
        compiler.plugin('watch-close', this.onCompile.bind(this));
    }

    onCompile() {
        if (this.watcher) {
            this.watcher.kill();
        }
    };

    onDone() {
        const args = [process.env.NODE_DEBUG_OPTION || '', this.options.entry].filter((a) => a);

        this.watcher = spawn('node', args, {
            stdio: 'inherit'
        });
    };
};
