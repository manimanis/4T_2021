const moyenne1 = new Vue({
  el: "#moyenne-arithmetique",
  data: {
    n: 5,
    nvals: [],
    t: [],
    moy: 0.0,
    step: -1
  },
  methods: {
    setFocus: function (control) {
      const ctrl = this.$refs[control][0];
      ctrl.focus();
      ctrl.select();
    },
    nextStep: function () {
      if (this.step < 2) {
        this.step++;
      }
      if (this.step == 0) {
        this.nvals = [Math.floor(Math.random() * 7 + 2)];
        Vue.nextTick(() => this.setFocus('nval'));
      } else if (this.step == 1) {
        Vue.nextTick(() => this.setFocus('ti'));
      } else if (this.step == 2) {
        this.moy = this.t.reduce((pv, cv) => pv + +cv, 0) / this.n;
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.nvals[idx] >= 2 && this.nvals[idx] <= 10) {
          this.n = this.nvals[idx];
          this.t = [Math.floor(Math.random() * 50)];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.nvals.push(this.nvals[idx]);
          Vue.nextTick(() => this.setFocus('nval'));
        }
      } else if (this.step == 1) {
        if (this.t.length < this.n) {
          this.t.push(Math.floor(Math.random() * 50));
          Vue.nextTick(() => this.setFocus('ti'));
        } else {
          Vue.nextTick(() => this.nextStep());
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});

const maximum = new Vue({
  el: "#meilleure-note",
  data: {
    n: 5,
    nvals: [],
    tvals: [],
    tidx: [],
    t: [],
    max: 0.0,
    step: -1
  },
  methods: {
    setFocus: function (control) {
      const ctrl = this.$refs[control][0];
      ctrl.focus();
      ctrl.select();
    },
    nextStep: function () {
      if (this.step < 2) {
        this.step++;
      }
      if (this.step == 0) {
        this.nvals = [Math.floor(Math.random() * 28 + 3)];
        Vue.nextTick(() => this.setFocus('nval'));
      } else if (this.step == 1) {
        Vue.nextTick(() => this.setFocus('tval'));
      } else if (this.step == 2) {
        this.max = this.t.reduce((pv, cv) => (+cv > pv) ? cv : pv, 0);
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.nvals[idx] >= 3 && this.nvals[idx] <= 30) {
          this.n = +this.nvals[idx];
          this.tvals = [Math.floor(Math.random() * 81) / 4];
          this.tidx = [0];
          this.t = [];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.nvals.push(this.nvals[idx]);
          Vue.nextTick(() => this.setFocus('nval'));
        }
      } else if (this.step == 1) {
        if (this.tvals[idx] >= 0 && this.tvals[idx] <= 20.0) {
          if (this.t.length + 1 < this.n) {
            this.t.push(+this.tvals[idx]);
            this.tidx.push(this.tidx[idx] + 1);
            this.tvals.push(Math.floor(Math.random() * 81) / 4);
            Vue.nextTick(() => this.setFocus('tval'));
          } else {
            Vue.nextTick(() => this.nextStep());
          }
        } else {
          this.tidx.push(this.tidx[idx]);
          this.tvals.push(Math.floor(Math.random() * 81) / 4);
          Vue.nextTick(() => this.setFocus('tval'));
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});

const estPremier = (n) => {
  if (n <= 1) {
    return false;
  }
  if (n == 2 || n == 3) {
    return true;
  }
  if (n % 2 == 0 || n % 3 == 0) {
    return false;
  }
  let div = 5;
  const rcn = Math.floor(Math.sqrt(n)) + 1;
  while (div <= rcn) {
    if (n % div == 0) {
      return false;
    }
    div += 2;
  }
  return true;
};

const nombrepremier = new Vue({
  el: "#nombre-premier",
  data: {
    n: 5,
    premier: false,
    step: -1
  },
  methods: {
    setFocus: function (control) {
      const ctrl = this.$refs[control][0];
      ctrl.focus();
      ctrl.select();
    },
    nextStep: function () {
      if (this.step < 2) {
        this.step++;
      }
      if (this.step == 0) {
        this.nvals = [Math.floor(Math.random() * 100)];
        Vue.nextTick(() => this.setFocus('nval'));
      } else if (this.step == 1) {
        this.premier = estPremier(this.n);
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.nvals[idx] >= 0) {
          this.n = +this.nvals[idx];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.nvals.push(Math.floor(Math.random() * 100));
          Vue.nextTick(() => this.setFocus('nval'));
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});

const chiffresnombre = new Vue({
  el: "#chiffres-nombre",
  data: {
    n: 5,
    chiffres: "",
    nvals: [],
    step: -1
  },
  methods: {
    setFocus: function (control) {
      const ctrl = this.$refs[control][0];
      ctrl.focus();
      ctrl.select();
    },
    nextStep: function () {
      if (this.step < 2) {
        this.step++;
      }
      if (this.step == 0) {
        this.nvals = [Math.ceil(Math.random() * 1000000)];
        Vue.nextTick(() => this.setFocus('nval'));
      } else if (this.step == 1) {
        this.chiffres = "0123456789".split("").filter(chiffre => this.n.indexOf(chiffre) != -1).join(', ');
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.nvals[idx] > 0) {
          this.n = "" + this.nvals[idx];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.nvals.push(Math.floor(Math.random() * 1000000));
          Vue.nextTick(() => this.setFocus('nval'));
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});