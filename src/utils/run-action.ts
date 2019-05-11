import * as fs from "fs";
import * as path from "path";
import * as yeoman from "yeoman-environment";
import * as Generator from "yeoman-generator";


import runTransform from "./scaffold";
import Questioner from "./questioner";

export interface Config extends Object {
	item?: {
		name: string;
	};
	topScope?: string[];
	configName?: string;
	merge: object;
	webpackOptions: object;
}

export interface TransformConfig extends Object {
	configPath?: string;
	configFile?: string;
	config?: Config;
}

const DEFAULT_WEBPACK_CONFIG_FILENAME = "webpack.config.js";

/**
 *
 * Looks up the webpack.config in the user's path and runs a given
 * generator scaffold followed up by a transform
 *
 * @param {String} action — action to be done (add, remove, update, init)
 * @param {Class} generator - Yeoman generator class
 * @param {String} configFile - Name of the existing/default webpack configuration file
 * @param {Array} packages - List of packages to resolve
 * @returns {Function} runTransform - Returns a transformation instance
 */

export default function runAction(
	action: string,
	generator: Generator,
	configFile: string = DEFAULT_WEBPACK_CONFIG_FILENAME,
	packages?: string[],
)
	: boolean{

	let configPath: string | null = null;

	if (action !== "init") {
		configPath = path.resolve(process.cwd(), configFile);
        const webpackConfigExists: boolean = fs.existsSync(configPath);
	}

	const env = yeoman.createEnv("webpack", null);
	const generatorName = `webpack-${action}-generator`;

	if (!generator) {
		generator = class extends Generator {
			public initializing(): void {
				packages.forEach(
					(pkgPath: string): Generator => {
						return this.composeWith(require.resolve(pkgPath), {});
					}
				);
			}
		};
	}

    const questioner = new Questioner();
	generator.prototype.prompt = questioner.question;

	env.registerStub(generator, generatorName);

	return env.run(generatorName).then(() => {
		let configModule: object;
		try {
			const confPath = path.resolve(process.cwd(), ".yo-rc.json");
			configModule = require(confPath);
			// Change structure of the config to be transformed
			const tmpConfig: object = {};
			Object.keys(configModule).forEach((prop: string): void => {
				const configs = Object.keys(configModule[prop].configuration);
				configs.forEach((conf: string): void => {
					tmpConfig[conf] = configModule[prop].configuration[conf];
				});
			});
			configModule = tmpConfig;
		} catch (err) {
			return false;
		}
		const transformConfig: TransformConfig = Object.assign(
			{
				configFile: !configPath ? null : fs.readFileSync(configPath, "utf8"),
				configPath,
			},
			configModule,
		);
		runTransform(transformConfig, action);
		return true;
	}).catch((err) => {
		return false;
    });
}