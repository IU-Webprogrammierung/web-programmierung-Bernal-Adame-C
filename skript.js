function changePortion(delta) {
    const input = document.getElementById('portionen');
    const currentValue = parseInt(input.value) || 1;
    const newValue = currentValue + delta;

    // Mindestwert sicherstellen (z. B. 1 Portion)
    if (newValue >= parseInt(input.min)) {
        input.value = newValue;
        updateZutaten(newValue);
    }
}

function updateZutaten(portionen) {
    const mengen = document.querySelectorAll('.menge, .menge-fraction');

    mengen.forEach(menge => {
        // Basiswert aus dem Attribut lesen und berechnen
        const base = parseFloat(menge.getAttribute('data-base'));
        const total = base * portionen;
         // Prüfen, ob das Element Brüche benötigt
         if (menge.classList.contains('menge-fraction')) {
            menge.textContent = formatFraction(total); // Bruch anzeigen
        } else {
            menge.textContent = formatNumber(total); // Normale Anzeige
        }
    });
}

// Funktion, um Dezimalzahlen in Brüche umzuwandeln
function formatFraction(number) {
    if (number % 1 === 0) {
        return number; // Ganze Zahl
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Größter gemeinsamer Teiler
    const precision = 100; // Genauigkeit für Brüche
    const numerator = Math.round(number * precision);
    const denominator = precision;
    const divisor = gcd(numerator, denominator);

    const fractionNumerator = numerator / divisor;
    const fractionDenominator = denominator / divisor;

    // Bruch zurückgeben
    return `${fractionNumerator}/${fractionDenominator}`;
}
// Funktion, um Zahlen ohne unnötige Dezimalstellen anzuzeigen
function formatNumber(number) {
    return number % 1 === 0 ? number : number.toFixed(2);
}

// Initialisierung: Zutatenmengen für die Standard-Portion berechnen
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('portionen');
    const portionen = parseInt(input.value) || 1; // Aktuellen Input-Wert auslesen
    updateZutaten(4); // Standardwert: 4 Portionen
});


