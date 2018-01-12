var tbody = document.getElementById('tbody'),
    xi = document.getElementById('xi'),
    yi = document.getElementById('yi'),
    dydx = document.getElementById('dydx'),
    dx = document.getElementById('dx'),
    iterations = document.getElementById('iterations'),
    update = document.getElementById('update');

oninput = function() {
    update.style.display = 'inline';
};

update.onclick = function() {
    var x = parseFloat(xi.value);
    var y = parseFloat(yi.value);
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    for (i = 0; i < iterations.value; i++) {
        var tr = document.createElement('tr');
        var tds = [];
        for (ii = 0; ii < 5; ii++) tds[ii] = document.createElement('td');
        tds[0].textContent = '(' + pretty(x) + ', ' + pretty(y) + ')';
        var deriv = eval(dydx.value
            .replace(/([a-z])([a-z])/g, '$1*$2')
            .replace(/(\d)([a-z])/g, '$1*$2')
            .replace(/([a-z])(\d)/, '$1*$2')
            .replace(/([a-z])/g, 'parseFloat($1)')); // Yes. Yes, I know.
        tds[1].textContent = pretty(deriv);
        tds[2].textContent = dx.value;
        increase = pretty(deriv * dx.value);
        tds[3].textContent = increase;
        x += parseFloat(dx.value);
        y += increase;
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
