export default function throttle(func: Function, time: number): Function {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let old = 0

    return function F(this: any, ...args: any[]) {
        let now = new Date().valueOf();
        let that = this;

        if (now - old > time) {
            func.apply(that, args)
            old = now;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(that, args)
                old = new Date().valueOf();
                timer = null;
            }, time)
        }
    }
}