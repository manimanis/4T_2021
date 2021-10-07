randomValue = function (a, b, precision) {
  if (!precision) {
    precision = 0.1;
  }
  var range = (b - a + 1) / precision;
  return a + Math.floor(range * Math.random()) * precision;
};
setValue = function (id, value) {
  var el = document.querySelector('#' + id);
  var spanEl = document.querySelector('#' + id.replace('_par', '_par_span'));
  el.value = value;
  spanEl.innerHTML = value;
};
isIntegerInt = function (v, signed) {
  if (v == '') {
    return 0;
  }
  for (var i = 0; i < v.length; i++) {
    var c = v.charAt(i);
    var valid = (c >= '0' && c <= '9') || (signed && i == 0 && (c == '+' || c == '-'));
    if (!valid) return i;
  }
  return -1;
};
isRealInt = function (v) {
  v = v.toUpperCase();
  var pp = v.indexOf('.');
  var pe = v.indexOf('E');
  if (pe != -1 && pp != -1 && (pp > pe || pp + 1 == pe)) {
    return pe;
  }
  var res;
  if (pp == -1 && pe == -1) {
    return isIntegerInt(v, true);
  } else if (pe == -1) {
    res = isIntegerInt(v.substring(0, pp), true);
    if (res >= 0) return res;
    res = isIntegerInt(v.substring(pp + 1));
    if (res >= 0) return pp + 1 + res;
    return -1;
  } else if (pp == -1) {
    res = isIntegerInt(v.substring(0, pe), true);
    if (res >= 0) return res;
    res = isIntegerInt(v.substring(pe + 1), true);
    if (res >= 0) return pe + 1 + res;
    return -1;
  } else {
    res = isIntegerInt(v.substring(0, pp), true);
    if (res >= 0) return res;
    res = isIntegerInt(v.substring(pp + 1, pe));
    if (res >= 0) return pp + 1 + res;
    res = isIntegerInt(v.substring(pe + 1), true);
    if (res >= 0) return pe + 1 + res;
    return -1;
  }
};
isInteger = function (v, signed) {
  if (v == '') {
    return false;
  }
  for (var i = 0; i < v.length; i++) {
    var c = v.charAt(i);
    var valid = (c >= '0' && c <= '9') || (signed && i == 0 && (c == '+' || c == '-'));
    if (!valid) return false;
  }
  return true;
};
isReal = function (v) {
  v = v.toUpperCase();
  var pp = v.indexOf('.');
  var pe = v.indexOf('E');
  if (pe != -1 && pp != -1 && (pp > pe || pp + 1 == pe)) {
    return false;
  }
  if (pp == -1 && pe == -1) {
    return isInteger(v, true);
  } else if (pe == -1) {
    return isInteger(v.substring(0, pp), true) && isInteger(v.substring(pp + 1));
  } else if (pp == -1) {
    return isInteger(v.substring(0, pe), true) && isInteger(v.substring(pe + 1), true);
  } else {
    return isInteger(v.substring(0, pp), true) && isInteger(v.substring(pp + 1, pe)) && isInteger(v.substring(pe + 1), true);
  }
};
isChar = function (v) {
  return v.length == 1;
};
isOfType = function (vstr, type) {
  if (type === 'entier') {
    return isInteger(vstr, true);
  } else if (type === 'réel') {
    return isReal(vstr);
  } else if (type === 'caractère') {
    return isChar(vstr);
  }
  return false;
};
isOneOfTypes = function (vstr, types) {
  for (var i = 0; i < types.length; i++) {
    if (isOfType(vstr, types[i])) return true;
  }
  return false;
};
quotient = function (v) {
  var divs = [];
  const eps = 1e-7;
  do {
    var pe = Math.floor(v);
    var pf = v - pe;
    divs.push(pe);
    if (Math.abs(pf) > eps) {
      v = 1 / pf;
    }
  } while (Math.abs(pf) > eps && divs.length < 10);
  divs = divs.reverse();
  var num = divs[0];
  var denom = 1;
  for (var i = 1; i < divs.length; i++) {
    var onum = num;
    num = divs[i] * onum + denom;
    denom = onum;
  }
  return [num, denom, pf];
};
nbre_remarquable = function (v) {
  const eps = 1e-7;
  //v est un entier
  if (Math.abs(v - Math.round(v)) < eps) return Math.round(v);
  // racine(v1)
  var v1 = v * v;
  if (Math.abs(v1 - Math.round(v1)) < eps) return 'racine(' + nbre_remarquable(v1) + ')';
  // v1/v2
  v1 = quotient(v);
  if (Math.abs(v1[2]) < eps) {
    return nbre_remarquable(v1[0]) + '/' + nbre_remarquable(v1[1]);
  }
  // v1²/v2²
  v1 = quotient(v * v);
  if (Math.abs(v1[2]) < eps) {
    return nbre_remarquable(Math.sqrt(v1[0])) + '/' + nbre_remarquable(Math.sqrt(v1[1]));
  }
  // PI / v1
  v1 = Math.PI / v;
  if (Math.abs(v1 - Math.round(v1)) < eps) {
    return 'PI/' + Math.round(v1);
  }
  return v;
};
func_abs = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier', 'réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.abs(x);
};
func_carre = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier', 'réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = x * x;
};
func_racine = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier', 'réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.sqrt(x);
};
func_cos = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  var v = Math.cos(x);
  var nr = nbre_remarquable(v);
  resEl.innerHTML = v + ((v != nr) ? ' = ' + nr : '');
};
func_sin = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  var v = Math.sin(x);
  var nr = nbre_remarquable(v);
  resEl.innerHTML = v + ((v != nr) ? ' = ' + nr : '');
};
func_tan = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  var v = Math.tan(x);
  var nr = nbre_remarquable(v);
  resEl.innerHTML = v + ((v != nr) ? ' = ' + nr : '');
};
func_atan = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  var v = Math.atan(x);
  var nr = nbre_remarquable(v);
  resEl.innerHTML = v + ((v != nr) ? ' = ' + nr : '');
};
func_ln = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.log(x);
};
func_log = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.log10(x);
};
func_exp = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.exp(x);
};
func_tronc = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = parseInt(x);
};
func_round = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique.';
    return;
  }
  resEl.innerHTML = Math.round(x);
};
func_random = function (elClass, res_id) {
  var resEl = document.querySelector('#' + res_id);
  resEl.innerHTML = Math.random();
};
func_alea = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur entière.';
    return;
  }
  resEl.innerHTML = Math.floor(Math.random() * x);
};
func_alea2 = function (elClass1, elClass2, res_id) {
  var params = document.querySelectorAll('.' + elClass1);
  var xEl = params[0];
  var x = xEl.value;
  params = document.querySelectorAll('.' + elClass2);
  var yEl = params[0];
  var y = yEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur entière.';
    return;
  }
  if (!isOneOfTypes(y, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur entière.';
    return;
  }
  resEl.innerHTML = Math.floor(Math.random() * (y - x + 1) + x);
};
func_odd = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur entière.';
    return;
  }
  resEl.innerHTML = (x % 2 != 0) ? 'VRAI' : 'FAUX';
};
func_chr = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur entière.';
    return;
  }
  resEl.innerHTML = '"' + String.fromCharCode(x) + '"';
};
func_ord = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['caractère'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer un caractère ASCII.';
    return;
  }
  resEl.innerHTML = x.charCodeAt(0);
};
func_majus = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(x, ['caractère'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer un caractère ASCII.';
    return;
  }
  resEl.innerHTML = '"' + x.toUpperCase() + '"';
};
func_long = function (elClass, res_id) {
  var xEl = document.querySelectorAll('.' + elClass)[0];
  var x = xEl.value;
  var resEl = document.querySelector('#' + res_id);
  resEl.innerHTML = x.length;
};
func_pos = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var ch2 = chEls[1].value;
  var resEl = document.querySelector('#' + res_id);
  resEl.innerHTML = ch2.indexOf(ch1) + 1;
};
func_copy = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var pos = chEls[1].value;
  var nbc = chEls[2].value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(pos, ['entier']) || !isOneOfTypes(nbc, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une chaîne et deux entiers positifs';
    return;
  }
  resEl.innerHTML = '"' + ch1.substr(parseInt(pos - 1), parseInt(nbc)) + '"';
};
func_delete = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var pos = chEls[1].value;
  var nbc = chEls[2].value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(pos, ['entier']) || !isOneOfTypes(nbc, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une chaîne et deux entiers positifs';
    return;
  }
  resEl.innerHTML = 'ch = "' + ch1.substring(0, parseInt(pos)-1) + ch1.substring(parseInt(pos) + parseInt(nbc) - 1) + '"';
};
func_insert = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var ch2 = chEls[1].value;
  var pos = chEls[2].value;
  if (!isOneOfTypes(pos, ['entier'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer deux chaînes et un entier positif';
    return;
  }
  var resEl = document.querySelector('#' + res_id);
  resEl.innerHTML = 'ch2 = "' + ch2.substring(0, pos-1) + ch1 + ch2.substring(pos-1) + '"';
};
func_val = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var resEl = document.querySelector('#' + res_id);

  var x = 0;
  var e = isRealInt(ch1) + 1;
  if (e == 0) {
    x = ch1;
  }
  resEl.innerHTML = 'x = ' + x + ' - e = ' + e;
};
func_vale = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var resEl = document.querySelector('#' + res_id);

  var x = 0;
  var e = isIntegerInt(ch1) + 1;
  if (e == 0) {
    x = ch1;
  }
  resEl.innerHTML = 'x = ' + x + ' - e = ' + e;
};
func_str = function (elClass, res_id) {
  var chEls = document.querySelectorAll('.' + elClass);
  var ch1 = chEls[0].value;
  var resEl = document.querySelector('#' + res_id);
  if (!isOneOfTypes(ch1, ['entier','réel'])) {
    resEl.className = 'error';
    resEl.innerHTML = 'Entrer une valeur numérique';
    return;
  }
  resEl.innerHTML = 'ch = "' + ch1 + '"';
};