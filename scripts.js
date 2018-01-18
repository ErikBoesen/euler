var tbody = document.getElementById('tbody'),
    inputs = {
        xi: document.getElementById('xi'),
        yi: document.getElementById('yi'),
        dydx: document.getElementById('dydx'),
        dx: document.getElementById('dx'),
        iterations: document.getElementById('iterations'),
    },
    update = document.getElementById('update'),
    error = document.getElementById('error');

oninput = function() {
    update.style.display = 'inline';
};

update.onclick = function() {
    if (/^[()xye\d+\-*/^]$/.test(inputs.dydx.value)) error.textContent = 'Invalid input data.';
    var x = parseFloat(inputs.xi.value),
        y = parseFloat(inputs.yi.value),
        seed = {
            dydx: inputs.dydx.value.replace(/(\d)([a-z])/g, '$1*$2')
                                   .replace(/([a-z])([a-z])/g, '$1*$2')
                                   .replace(/([a-z])([a-z])/g, '$1*$2')
                                   .replace(/([a-z])(\d)/g, '$1*$2')
                                   .replace(/\^/g, '**')
                                   .replace(/([a-z])/g, 'parseFloat($1)'),
            dx: inputs.dx.value,
            iterations: inputs.iterations.value,
        };
    error.textContent = (seed.dx * seed.iterations > 20) ? 'Warning: Linearization\'s efficacy may decrease with many iterations or a large increment!' : '';
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    for (i = 0; i < seed.iterations; i++) {
        var tr = document.createElement('tr');
        var tds = [];
        for (ii = 0; ii < 5; ii++) tds[ii] = document.createElement('td');
        tds[0].textContent = '(' + pretty(x) + ', ' + pretty(y) + ')';
        var deriv = eval(seed.dydx); // Yes. Yes, I know.
        tds[1].textContent = pretty(deriv);
        tds[2].textContent = seed.dx;
        var dy = deriv * seed.dx;
        tds[3].textContent = pretty(dy);
        x += parseFloat(seed.dx);
        y += dy;
        tds[4].textContent = '(' + pretty(x) + ', ' + pretty(y) + ')';
        for (ii = 0; ii < 5; ii++) tr.appendChild(tds[ii]);
        tbody.appendChild(tr);
    }
    this.style.display = 'none';
};

function pretty(n) {
    var D = 100000000000;
    return n.toString().length <= 10 ? n : Math.round(n * D) / D;
}

update.click();
