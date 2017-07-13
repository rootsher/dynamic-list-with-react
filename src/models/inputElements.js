class InputElement {
	constructor() {
		this.value  = '';
		this.isLast = true;
		this.isOrphan = false;
		this.key = Math.floor(Math.random()*1000);
	}
}

export { InputElement };
