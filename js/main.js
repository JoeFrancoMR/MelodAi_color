function startAnalysis() {
    // Lógica para iniciar el análisis
    window.location.href = 'results.html';
}
// Manejo del menú móvil
document.querySelector('.mobile-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Cierre automático del menú al hacer click en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Mejor feedback al seleccionar estación
document.querySelectorAll('.season-select').forEach(button => {
    button.addEventListener('click', function() {
        // Animación de feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Almacenar selección
        const season = this.closest('.season-card').dataset.season;
        localStorage.setItem('selectedSeason', season);
        
        // Redirección suave
        window.location.href = 'results.html';
    });
});

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