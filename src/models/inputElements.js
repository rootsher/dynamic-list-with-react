export default class InputElement {
	constructor(isLast = true, isOrphan = false) {
		this.value  = '';
		this.isLast = isLast;
		this.isOrphan = isOrphan;
		this.key = Math.floor(Math.random()*1000);
	}
};
