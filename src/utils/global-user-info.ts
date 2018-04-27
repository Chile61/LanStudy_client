

export class GlobalUserInfo {
    public static readonly Instance: GlobalUserInfo = new GlobalUserInfo();
    private items: { [key: string]: any } = {}

    private constructor() {
    }

    set(key: string, value: any) {
        this.items[key] = value;
        console.log(`====> set item: '${key}'' : ${value}`);
    }

    get(key: string): any {
        let value = this.items[key];

        console.log(`====> get item: '${key}'' : ${value}`);

        return value;

    }

    clear() {
        // localStorage.clear();
        this.items = {};
    }

    print() {
        console.log(this.items);
    }
}