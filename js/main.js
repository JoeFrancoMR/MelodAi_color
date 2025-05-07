function startAnalysis() {
    // Lógica para iniciar el análisis
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Configuración de los botones de temporada
    document.querySelectorAll('.season-select').forEach(button => {
        button.addEventListener('click', (e) => {
            const season = e.target.closest('.season-card').dataset.season;
            localStorage.setItem('selectedSeason', season);
            window.location.href = 'results.html';
        });
    });
});