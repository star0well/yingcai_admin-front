export const store = {
  info: {},
  timer: null,
  isChange: false,
  set(value) {
    this.info = value;
    this.isChange = true;
    console.log("set", value);
  },
  get() {
    return new Promise((resolve, reject) => {
      this.timer = setInterval(() => {
        if (this.isChange) {
          if (!Object.keys(this.info).length) {
            reject(false);
          } else {
            resolve(this.info);
          }
          clearInterval(this.timer);
          this.isChange = false;
        }
      }, 500);
    });
  },
};
