const Ability = require('../ability');
const Gang = require('../gang');
const Werewolf = require('./Werewolf');

module.exports = class Evilseer extends Werewolf {
	constructor(options) {
		super({
			...options,
			...{}
		});
	}

	async onNight() {
		return this.isAlone() ? [] : [await this.request(Ability.RoleReveal)];
	}
	
	async voteBite() {
		if(this.died) return []
		return this.isAlone() ? await super.voteBite() : [];
	}

	isAlone() {
		const werewolfs = this.world.items.filter(
			player => player.role == Werewolf
		);
		const alives = werewolfs.filter(werewolf => !werewolf.died);
		return alives.length <= 0;
	}
};


//abbbabab