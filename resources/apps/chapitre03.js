
const app = new Vue({
  el: '#exemple-for',
  data: {
    counter: -1,
    lamps: [0, 0, 0, 0, 0, 0, 0, 0]
  },
  methods: {
    start: function () {
      if (this.counter != -1) {
        return;
      }
      this.counter = -1;
      const callback = () => {
        if (this.counter >= 0 && this.counter < this.lamps.length) {
          this.lamps[this.counter] = 0;
        }
        if (this.counter + 1 < this.lamps.length) {
          this.counter++;
          this.lamps[this.counter] = 1;
          setTimeout(callback, 300);
        } else {
          this.counter = -1;
        }
        this.$forceUpdate();
      };
      callback();
    }
  }
});

const operations = [
  'Pour i de 0 à 7 Faire',
  'Allumer(i)',
  'Attendre(200)',
  'Eteindre(i)',
  'Fin Pour'
];
const app2 = new Vue({
  el: '#solution-voyants',
  data: {
    nbre_essais: 0,
    operations: operations,
    selected: operations.map(idx => -1),
    is_correct: false
  },
  methods: {
    verifier: function () {
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i] == -1) {
          alert("Veuillez remplir tous les champs!");
          return;
        }
      }

      if (this.nbre_essais <= 5) {
        this.nbre_essais++;
        this.is_correct = false;
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i] != i) {
            alert("Réponse incorrecte, ré-essayer!");
            return;
          }
        }
        this.is_correct = true;
        alert("Bonne réponse, félicitations!")
      } else {
        for (let i = 0; i < this.selected.length; i++) {
          this.selected = operations.map((op, idx) => idx);
        }
        this.is_correct = true;
        this.$forceUpdate();
      }
    }
  }
});

const choix2 = [
  { op: "Jusqu'à pos = 10", pos: 5 },
  { op: "aléa(1, 2)", pos: 1 },
  { op: "pos+nbm ≤ 10", pos: 2 },
  { op: "répéter", pos: 0 },
  { op: "pos + nbm", pos: 4 },
  { op: "cpt + 1", pos: 3 },
];
const app3 = new Vue({
  el: '#jeu-echelle',
  data: {
    operations: choix2,
    selected: choix2.map(c => -1),
    winner: false
  },
  methods: {
    verifier: function () {
      const score = this.selected.reduce((pv, cv, idx) => pv + +(cv == idx), 0);
      if (score == this.selected.length) {
        alert("Félicitations, vous avez deviné!");
        this.winner = true;
      } else {
        alert("Zut! C'est incorrect, réessayer.");
      }
    }
  }
});

const choix3 = [
  { op: "\"Le nombre caché est\", secret", pos: 5 },
  { op: "aléa(0, 99)", pos: 0 },
  { op: "nombre < secret", pos: 2 },
  { op: "répéter", pos: 1 },
  { op: "nombre = secret", pos: 4 },
  { op: "nombre > secret", pos: 3 },
];
const app4 = new Vue({
  el: '#jeu-devinette',
  data: {
    operations: choix3,
    selected: choix3.map(c => -1),
    winner: false
  },
  methods: {
    verifier: function () {
      const score = this.selected.reduce((pv, cv, idx) => pv + +(cv == idx), 0);
      if (score == this.selected.length) {
        alert("Félicitations, vous avez deviné!");
        this.winner = true;
      } else {
        alert("Zut! C'est incorrect, réessayer.");
      }
    }
  }
});

const app5 = new Vue({
  el: '#simulation-jeu-devinette',
  data: {
    nombre: 0,
    secret: 0,
    message: "",
    iswinner: false
  },
  mounted: function () {
    this.selectSecret();
  },
  methods: {
    selectSecret: function () {
      this.message = "Devine mon nombre";
      this.secret = Math.floor(Math.random() * 100);
      this.iswinner = false;
    },
    verifier: function () {
      if (this.nombre == this.secret) {
        this.iswinner = true;
        this.message = "Félicitations, vous avez gagné!";
      } else if (this.nombre > this.secret) {
        this.message = "Plus petit que " + this.nombre + " !";
      } else {
        this.message = "Plus grand que " + this.nombre + " !";
      }
    }
  }
});


const choix6 = [
  { op: "tr div t2", pos: 5 },
  { op: "1", pos: 0 },
  { op: "nt1 ← nt1 + 1", pos: 2 },
  { op: "TantQue (nt1 * t1 mod t2 ≠ 0) Faire", pos: 1 },
  { op: "nt1 * t1", pos: 4 },
  { op: "Fin TantQue", pos: 3 },
];
const app6 = new Vue({
  el: '#ex-entrainement',
  data: {
    operations: choix6,
    selected: choix6.map(c => -1),
    winner: false
  },
  methods: {
    verifier: function () {
      const score = this.selected.reduce((pv, cv, idx) => pv + +(cv == idx), 0);
      if (score == this.selected.length) {
        alert("Félicitations, vous avez deviné!");
        this.winner = true;
      } else {
        alert("Zut! C'est incorrect, réessayer.");
      }
    }
  }
});