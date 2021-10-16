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