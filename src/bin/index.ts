#!/usr/bin/env node
import app from '../server';
import log = require('webpack-log');

process.stdout.write("\u001b[1m\u001b[34mwebpack UI\u001b[39m\u001b[22m\n");
let logger = log({ name: 'wui'});
app.listen(1234, () => {
    logger.info("Running at http://localhost:1234/ \n");
})