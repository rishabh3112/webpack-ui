export default class User {

	constructor() {
		this.socket = new WebSocket(`ws://127.0.0.1:4321`);
	}

	answer(ans) {
		const user = this.socket;
		user.send(JSON.stringify(ans));
	}

	async question() {
		const ques = await this.getQuestion().catch((err) => {
			console.error(err);
		});
		return JSON.parse(ques);
	}

	async getQuestion() {
		return await new Promise((resolve, reject) => {
			const user = this.socket;
			if (user.readyState === user.CLOSED || user.readyState === user.CLOSING) {
				resolve(undefined);
			}
			user.onmessage = (data) => {
				resolve(data.data);
			}
			user.onerror = (err) => {
				reject(err);
			}
		});
	}
}