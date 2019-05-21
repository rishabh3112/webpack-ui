import * as express from 'express';
import { webpackConfigMiddleware } from './middlewares/config'
import * as bodyParser from 'body-parser';
import {execSync} from 'child_process';
import {join, resolve} from 'path';
import { writeFileSync, existsSync } from 'fs';
import runAction from '../utils/run-action';
import defaultGenerator from '../utils/generators/default';


const USER_DIRECTORY = process.env.PWD ? process.env.PWD : process.cwd();
const app = express();
process.env.CONFIG_PATH = 'webpack.config.js';

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

app.post('/api/init', async (req, res) => {
    if(req.body.type === "refresh"){
        res.json({value: true});
        return;
    }
    if (req.body.type === 'defaults') {
        runAction('init', defaultGenerator).then(() => {
            res.json({value: true});
        });
        return;
    }

    if (!existsSync(resolve(`${USER_DIRECTORY}/node_modules/${req.body.type}`))) {
        await execSync(`cd ${USER_DIRECTORY} && npm install --save-dev ${req.body.type}`);
    }
    
    const Generator = require(`${USER_DIRECTORY}/node_modules/${req.body.type}`);

    Generator.prototype.templatePath = (file: string) => {
		return `${USER_DIRECTORY}/node_modules/${req.body.type}/templates/${file}`
    }
    Generator.prototype.destinationPath = (file: string) => {
		return `${USER_DIRECTORY}/${file}`
	}
    runAction('init', Generator, req.body.type);
    res.json({value: true});
});

app.post('/api/npm', async (req, res) => {
    if (req.body.command === 'build') {
        try {
            await execSync(`cd ${USER_DIRECTORY} && npx webpack --config ${process.env.CONFIG_PATH}`);
            res.json({value: true});
        } catch (err) {
            res.json({value: err.message})
        }
    }
})
export default app;