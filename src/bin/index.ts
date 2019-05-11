#!/usr/bin/env node
import app from '../server';

process.stdout.write("[wui] Starting webpack UI... \n");

app.listen(1234, () => {
    process.stdout.write("[wui] Running at http://localhost:1234/ \n");
})