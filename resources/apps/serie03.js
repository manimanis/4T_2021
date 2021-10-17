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

const moyenne2 = new Vue({
  el: "#moyenne-arithmetique-2",
  data: {
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
        this.t = [Math.floor(Math.random() * 50)];
        Vue.nextTick(() => this.setFocus('ti'));
      } else if (this.step == 1) {
        this.moy = this.t.reduce((pv, cv) => pv + +cv, 0) / (this.t.length - 1);
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.t[idx] > 0) {
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
          this.nvals.push(Math.ceil(Math.random() * 1000000));
          Vue.nextTick(() => this.setFocus('nval'));
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});

const convertDecToBase = (n, base) => {
  const digits = "0123456789ABCDEF";
  let s = '';
  while (n > 0) {
    s = digits[n % base] + s;
    n = Math.floor(n / base);
  }
  return s;
};

const conversionhexa = new Vue({
  el: "#conversion-hexa",
  data: {
    n: 5,
    nhexa: "",
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
        this.nvals = [Math.floor(Math.random() * 65536)];
        Vue.nextTick(() => this.setFocus('nval'));
      } else if (this.step == 1) {
        this.nhexa = convertDecToBase(this.n, 16);
        while (this.nhexa.length < 4) {
          this.nhexa = '0' + this.nhexa;
        }
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.nvals[idx] >= 0 && this.nvals[idx] <= 65535) {
          this.n = +this.nvals[idx];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.nvals.push(Math.floor(Math.random() * 65536));
          Vue.nextTick(() => this.setFocus('nval'));
        }
      }
    },
    reset: function () {
      this.step = -1;
    }
  }
});

const lettrescommunes = new Vue({
  el: "#lettres-communes",
  data: {
    mot1: "",
    mot2: "",
    mots1: [],
    mots2: [],
    common: [],
    spec1: [],
    spec2: [],
    step: -1
  },
  methods: {
    setFocus: function (control) {
      try {
        const ctrl = this.$refs[control][0];
      ctrl.focus();
      ctrl.select();
      } catch (e) {
        console.log(control, e);
      }
    },
    nextStep: function () {
      if (this.step < 2) {
        this.step++;
      }
      if (this.step == 0) {
        this.mots1 = ["Sami"];
        Vue.nextTick(() => this.setFocus('mot1'));
      } else if (this.step == 1) {
        this.mots2 = ["Sahbi"];
        Vue.nextTick(() => this.setFocus('mot2'));
      } else if (this.step == 2) {
        let chars1 = this.mot1.toUpperCase().split('');
        let chars2 = this.mot2.toUpperCase().split('');
        this.common = chars1.filter(car => chars2.indexOf(car) != -1);
        this.common = this.common.filter((car, idx) => this.common.indexOf(car) == idx);
        this.spec1 = chars1.filter(car => this.common.indexOf(car) == -1);
        this.spec1 = this.spec1.filter((car, idx) => this.spec1.indexOf(car) == idx);
        this.spec2 = chars2.filter(car => this.common.indexOf(car) == -1);
        this.spec2 = this.spec2.filter((car, idx) => this.spec2.indexOf(car) == idx);
      }
    },
    validate: function (idx) {
      if (this.step == 0) {
        if (this.mots1[idx].length > 0) {
          this.mot1 = this.mots1[idx];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.mots1.push("Sahbi");
          Vue.nextTick(() => this.setFocus('mot1'));
        }
      } else if (this.step == 1) {
        if (this.mots2[idx].length > 0) {
          this.mot2 = this.mots2[idx];
          Vue.nextTick(() => this.nextStep());
        } else {
          this.mots2.push("Sahbi");
          Vue.nextTick(() => this.setFocus('mot2'));
        }
      } 
    },
    reset: function () {
      this.step = -1;
    }
  }
});