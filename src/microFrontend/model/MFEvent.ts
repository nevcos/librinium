export class MFEvent<T> extends CustomEvent<{ name: string, data: T }> {
    constructor(name: string, data: T) {
        super("MFEvent", {detail: {name, data}});
    }
}
