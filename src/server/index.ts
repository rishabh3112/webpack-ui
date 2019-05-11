import * as express from 'express';
import { webpackConfigMiddleware } from './middlewares/config'
import * as bodyParser from 'body-parser';
import {join, resolve} from 'path';
import { writeFileSync } from 'fs';
import runAction from '../utils/run-action';
import defaultGenerator from '../utils/generators/default';

const USER_DIRECTORY = process.env.PWD ? process.env.PWD : process.cwd();
const app = express();


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackConfigMiddleware);
app.use(express.static(join(__dirname,'../client/')));

// Routes
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/api/save', (req, res) => {
    writeFileSync( resolve(USER_DIRECTORY, "webpack.config.js"), req.body.webpack);
    res.json({
        status: '200',
    });
});

app.post('/api/init', (req, res) => {
    if (req.body.type === 'defaults') {
        runAction('init', defaultGenerator);
        res.json({value: true});
    }
    res.json({value: "WIP"});
});

export default app;