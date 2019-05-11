import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Request, Response, NextFunction } from 'express';

const DEFAULT_WEBPACK_CONFIG_NAME = 'webpack.config.js';

export function webpackConfigMiddleware(req: Request, res: Response, next: NextFunction) {
    
    const configPath = resolve(process.cwd(), DEFAULT_WEBPACK_CONFIG_NAME);
    const res_json = res.json;

    ( res.json as (body: any) => void ) = function(body){
        body.webpack = null;

        if (existsSync(configPath)) {
            body.webpack = readFileSync(configPath).toString();
        }

        try {
            res_json.call(this, body);   
        } catch (error) {}

        return;
    }

    next();
}