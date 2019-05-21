import * as http from "http";
import * as ws from 'websocket';
import * as Generator from 'yeoman-generator';
import {Answers} from 'inquirer';

export default class Questioner {

	public hasStarted: boolean;
	private httpServer: http.Server;
	public client: ws.connection;
	public server: ws.server;

	public constructor() {
		this.hasStarted = false;
	}

	public question(ques: Generator.Question|Generator.Question[]): Promise<Answers> {
		if(!ques){
			return;
		}
		return new Promise((resolve, reject) => {
			if (!this.hasStarted) {
				// Create Web socket Server
				this.hasStarted = true;
				this.httpServer = http.createServer(()=>{});
				this.httpServer.listen(4321,'localhost');
				this.server = new ws.server({
					httpServer: this.httpServer,
					keepalive: true
				});

				this.server.on('request', (req) => {
					this.client = req.accept(null, req.origin);
					this.client.sendUTF(JSON.stringify(ques));
					this.client.on("message", (data: ws.IMessage) => {
						resolve(JSON.parse(data.utf8Data).answer);
					});
					this.client.on("close", (err) => {
						reject(err);
					});
				});
			} else {
				if (!ques) {
					this.client.close();
					this.server.unmount();
					this.httpServer.close();
					resolve();
				}
				this.client.sendUTF(JSON.stringify(ques));
				this.client.on("message", (data: ws.IMessage) => {
					resolve(JSON.parse(data.utf8Data).answer);
				});
				this.client.on("close", (err) => {
					this.client.close();
					this.server.unmount();
					this.httpServer.close();
					console.error(err);
					resolve();
				});
			}
		});
	}
}