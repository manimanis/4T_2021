function randint(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

const app1 = new Vue({
  el: "#rech-seq",
  data: {
    arr: [],
    value1: 0,
    current: 0,
    trouve: false,
    message: ""
  },
  mounted: function () {
    this.resetExistant();
    this.current = this.arr.indexOf(this.value1);
    this.handleClick(this.current);
  },
  methods: {
    initArray: function () {
      this.arr = [];
      for (let i = 0; i < 10; i++) {
        this.arr.push(randint(100, 999));
      }
    },
    selectExistingValue: function () {
      return this.arr[randint(0, this.arr.length - 1)];
    },
    selectAnotherValue: function () {
      let val;
      do {
        val = randint(100, 999);
      } while (this.arr.includes(val));
      return val;
    },
    handleClick: function (idx) {
      if (this.trouve || this.message) {
        alert(this.message);
        return;
      }
      if (idx != this.current) {
        alert(`Vous devez cliquer sur la boîte numéro ${this.current}.`)
        return;
      }
      if (this.arr[idx] == this.value1) {
        this.trouve = true;
        this.message = `${this.value1} est trouvée à la position ${idx}.`;
      } else if (idx == 9) {
        this.message = `${this.value1} est introuvable.`;
      }
      this.current++;
    },
    resetValue: function (existant) {
      this.initArray();
      this.value1 = existant ? this.selectExistingValue() : this.selectAnotherValue();
      this.current = 0;
      this.trouve = false;
      this.message = "";
    },
    resetExistant: function () {
      this.resetValue(true);
    },
    resetInexistant: function () {
      this.resetValue(false);
    }
  }
});

const app2 = new Vue({
  el: "#rech-dicho",
  data: {
    arr: [],
    open: [],
    value1: 0,
    current: 0,
    trouve: false,
    message: "",
    left: 0,
    right: 0,
    step: 0
  },
  mounted: function () {
    this.resetExistant();
    do {
      this.handleClick(this.current);
    } while (!this.message);
  },
  methods: {
    initArray: function () {
      this.arr = [];
      this.open = [];
      for (let i = 0; i < 11; i++) {
        this.arr.push(randint(100, 999));
        this.open.push(0);
      }
      this.arr.sort();
    },
    selectExistingValue: function () {
      return this.arr[randint(0, this.arr.length - 1)];
    },
    selectAnotherValue: function () {
      let val;
      do {
        val = randint(100, 999);
      } while (this.arr.includes(val));
      return val;
    },
    handleClick: function (idx) {
      if (this.trouve || this.message) {
        alert(this.message);
        return;
      }
      if (idx != this.current) {
        alert(`Vous devez cliquer sur la boîte numéro ${this.current}.`)
        return;
      }
      this.open[idx] = ++this.step;
      if (this.arr[idx] == this.value1) {
        this.trouve = true;
        this.message = `${this.value1} est trouvée à la position ${idx}.`;
      } else if (this.arr[idx] < this.value1) {
        this.left = idx + 1;
      } else if (this.arr[idx] > this.value1) {
        this.right = idx - 1;
      }
      if (this.left <= this.right) {
        this.current = (this.left + this.right) >> 1;
      } else {
        this.message = `${this.value1} est introuvable.`;
      }
    },
    resetValue: function (existant) {
      this.initArray();
      this.value1 = existant ? this.selectExistingValue() : this.selectAnotherValue();
      this.current = (this.arr.length - 1) >> 1;
      this.left = 0;
      this.right = this.arr.length - 1;
      this.trouve = false;
      this.message = "";
      this.step = 0;
    },
    resetExistant: function () {
      this.resetValue(true);
    },
    resetInexistant: function () {
      this.resetValue(false);
    }
  }
});

const app3 = new Vue({
  el: "#tri-selection",
  data: {
    arr: [],
    open: [],
    message: "",
    i: 0,
    j: 0,
    sorted: false
  },
  mounted: function () {
    this.resetSort();
    do {
      this.performSwap();
      this.nextIteration();
    } while (this.i < this.arr.length);
  },
  methods: {
    initArray: function () {
      this.arr = [];
      this.open = [];
      for (let i = 0; i < 10; i++) {
        this.arr.push(randint(100, 999));
        this.open.push(false);
      }
    },
    resetSort: function () {
      this.initArray();
      this.i = 0;
      this.j = 1;
      this.sorted = false;
      this.message = "";
    },
    performSwap: function () {
      if (this.arr[this.j] < this.arr[this.i]) {
        this.swapItems(this.i, this.j);
      }
    },
    swapItems: function (i, j) {
      const v1 = this.arr[i];
      const v2 = this.arr[j];
      this.arr[i] = v2;
      this.arr[j] = v1;
      this.$forceUpdate();
    },
    nextIteration: function () {
      this.j++;
      if (this.j >= this.arr.length) {
        this.open[this.i] = true;
        this.i++;
        if (this.i == this.arr.length - 1) {
          this.sorted = true;
          this.message = "Le tableau est maintenant trié.";
        }
        this.j = this.i + 1;
      }
    }
  }
});

const app4 = new Vue({
  el: "#tri-bulles",
  data: {
    arr: [],
    open: [],
    message: "",
    i: 0,
    j: 0,
    sorted: false
  },
  mounted: function () {
    this.resetSort();
    do {
      this.performSwap();
      this.nextIteration();
    } while (!this.sorted);
  },
  methods: {
    initArray: function () {
      this.arr = [];
      this.open = [];
      for (let i = 0; i < 10; i++) {
        this.arr.push(randint(100, 999));
        this.open.push(false);
      }
    },
    resetSort: function () {
      this.initArray();
      this.i = 0;
      this.j = 1;
      this.sorted = false;
      this.message = "";
    },
    performSwap: function () {
      if (this.arr[this.j] < this.arr[this.j - 1]) {
        this.swapItems(this.j - 1, this.j);
      }
    },
    swapItems: function (i, j) {
      const v1 = this.arr[i];
      const v2 = this.arr[j];
      this.arr[i] = v2;
      this.arr[j] = v1;
      this.$forceUpdate();
    },
    nextIteration: function () {
      this.j++;
      if (this.j >= this.arr.length - this.i) {
        this.i++;
        this.open[this.arr.length - this.i] = true;
        this.j = 1;
        if (this.i == this.arr.length - 1) {
          this.sorted = true;
          this.message = "Le tableau est maintenant trié.";
          this.open[0] = true;
          this.i = -1;
          this.j = -1;
        }
      }
    }
  }
});

const app5 = new Vue({
  el: "#tri-insert",
  data: {
    arr: [],
    sorted: false,
    message: "",
    sortedToIndex: -1,
    showItem: false,
    positionned: false,
    item: null,
    i: -1,
    j: -1,
    step: -1,
    numberShifted: -1,
    numberShiftedToPosition: -1
  },
  mounted: function () {
    this.resetSort();
  },
  methods: {
    initArray: function () {
      this.arr = [];
      for (let i = 0; i < 10; i++) {
        this.arr.push(randint(100, 999));
      }
    },
    resetSort: function () {
      this.initArray();
      this.sorted = false;
      this.message = "";
      this.selectItem(1);
    },
    selectItem: function (idx) {
      if (idx < this.arr.length) {
        this.i = idx;
        this.j = idx - 1;
        this.item = this.arr[this.i];
        this.sortedToIndex = this.i - 1;
        this.step = 0;
        this.positionned = false;
      } else {
        this.sorted = true;
      }
    },
    sortAll: function () {
      do {
        this.nextStep();
      } while (!this.sorted);
    },
    nextStep: function () {
      if (this.step == 0) {
        this.showItem = true;
        this.step = 1;
      } else if (this.step == 1) {
        this.step = 2;
      } else if (this.step == 2) {
        this.positionned = this.j < 0 || this.arr[this.j] <= this.item;
        if (this.positionned) {
          this.step = 4;
        } else {
          this.numberShifted = this.arr[this.j];
          this.numberShiftedToPosition = this.j + 1;
          this.step = 3;
        }
      } else if (this.step == 3) {
        this.arr[this.j + 1] = this.arr[this.j];
        this.j--;
        this.step = 2;
      } else if (this.step == 4) {
        this.arr[this.j + 1] = this.item;
        this.showItem = false;
        this.step = 5;
      } else if (this.step == 5) {
        this.selectItem(this.i + 1);
      }
      this.$forceUpdate();
    }
  }
});