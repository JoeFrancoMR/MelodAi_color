// document.addEventListener('DOMContentLoaded', () => {

//     // Función para iniciar el análisis
//     function startAnalysis() {
//         window.location.href = 'results.html';
//     }

//     // Manejo del menú móvil
//     const mobileMenu = document.querySelector('.mobile-menu');
//     const navLinks = document.querySelector('.nav-links');

//     if (mobileMenu && navLinks) {
//         mobileMenu.addEventListener('click', () => {
//             navLinks.classList.toggle('active');
//         });

//         document.querySelectorAll('.nav-link').forEach(link => {
//             link.addEventListener('click', () => {
//                 navLinks.classList.remove('active');
//             });
//         });
//     }

//     // Manejo de las tarjetas de estación
//     const seasonCards = document.querySelectorAll('.season-card');

//     seasonCards.forEach(card => {
//         card.addEventListener('click', () => {
//             // Feedback visual
//             card.style.transform = 'scale(0.95)';
//             setTimeout(() => {
//                 card.style.transform = 'scale(1)';
//             }, 200);

//             // Almacenar estación seleccionada
//             const season = card.dataset.season;
//             if (season) {
//                 localStorage.setItem('selectedSeason', season);
//                 window.location.href = 'results.html';
//             }
//         });
//     });

// });
document.addEventListener('DOMContentLoaded', () => {
    // Función para iniciar el análisis (por si lo usas en otro botón)
    function startAnalysis() {
        window.location.href = 'results.html';
    }

    // Manejo del menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Manejo de las tarjetas de estación
    const seasonCards = document.querySelectorAll('.season-card');

    seasonCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedSeason = card.getAttribute('data-season');

            if (selectedSeason) {
                // Guardar estación seleccionada en localStorage
                localStorage.setItem('estacion', selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1));


                // Feedback visual (opcional)
                card.classList.add('selected');
                setTimeout(() => {
                    card.classList.remove('selected');
                    // Redirigir a la página de resultados
                    window.location.href = 'results.html';
                }, 200); // Espera breve para ver el efecto visual
            } else {
                console.warn('No se encontró el atributo data-season en la tarjeta.');
            }
        });
    });
});
