/*import { getWeatherByCity, getWeatherRecommendations } from '../api/weather.js';*/
import { fetchWeatherData, getWeatherRecommendations } from './api/weather.js';


// Datos REALES de ejemplo (debes completar con tus imágenes)
const seasonsData = {
    invierno: {
        colors: ['#2D3047', '#4ECDC4', '#FF6B6B', '#FFE66D', '#F7FFF7'],
        recommendations: {
            ropa: [
                { title: 'Abrigo de Lana', description: 'Perfecto para días fríos', image: 'img/invierno-ropa1.jpg' }
            ],
            maquillaje: [
                { title: 'Labial Vino', description: 'Tonos intensos', image: 'img/invierno-makeup1.jpg' }
            ],
            accesorios: [
                { title: 'Bufanda Gruesa', description: 'Lana merino', image: 'img/invierno-accesorio1.jpg' }
            ]
        },
        guide: {
            'Temporada': 'Invierno',
            'Paleta': 'Colores fríos y saturados'
        }
    },
    primavera: {
        colors: ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#A8D5BA', '#F9DCC4'],
        recommendations: {
            ropa: [
                { title: 'Vestido Floral', description: 'Telas ligeras', image: 'img/primavera-ropa1.jpg' }
            ],
            maquillaje: [
                { title: 'Rubor Melocotón', description: 'Tonos cálidos', image: 'img/primavera-makeup1.jpg' }
            ],
            accesorios: [
                { title: 'Sombrero de Paja', description: 'Estilo bohemio', image: 'img/primavera-accesorio1.jpg' }
            ]
        },
        guide: {
            'Temporada': 'Primavera',
            'Paleta': 'Pasteles y tonos frescos'
        }
    },
    verano: {
        colors: ['#B8F2E6', '#AED9E0', '#93B5C6', '#C9A690', '#FE5F55'],
        recommendations: {
            ropa: [
                { title: 'Short Lino', description: 'Verano fresco', image: 'img/verano-ropa1.jpg' }
            ],
            maquillaje: [
                { title: 'Brillo Labial', description: 'Efecto húmedo', image: 'img/verano-makeup1.jpg' }
            ],
            accesorios: [
                { title: 'Gafas de Sol', description: 'Protección UV', image: 'img/verano-accesorio1.jpg' }
            ]
        },
        guide: {
            'Temporada': 'Verano',
            'Paleta': 'Tonos brillantes'
        }
    },
    otonio: {
        colors: ['#A68A64', '#C2C092', '#E6D5C3', '#B6465F', '#483D3D'],
        recommendations: {
            ropa: [
                { title: 'Chaleco de Cuero', description: 'Estilo otoñal', image: 'img/otonio-ropa1.jpg' }
            ],
            maquillaje: [
                { title: 'Sombra Dorada', description: 'Reflejos cálidos', image: 'img/otonio-makeup1.jpg' }
            ],
            accesorios: [
                { title: 'Botines', description: 'Cuero marrón', image: 'img/otonio-accesorio1.jpg' }
            ]
        },
        guide: {
            'Temporada': 'Otoño',
            'Paleta': 'Tonos terrosos'
        }
    }
};

// FUNCIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', async () => {
    const season = localStorage.getItem('selectedSeason') || 'invierno';
    const data = seasonsData[season];
    
    // 1. Mostrar temporada seleccionada
    document.getElementById('seasonTitle').textContent = `Tu paleta ideal es ${season}`;
    document.getElementById('seasonBadge').textContent = season;
    
    // 2. Generar paleta de colores
    generateColorPalette(data.colors);
    
    // 3. Generar recomendaciones
    generateRecommendations(data.recommendations);
    
    // 4. Generar guía
    generateSeasonGuide(data.guide);
    
    // 5. Cargar clima inicial (Madrid por defecto)
    const initialWeather = await getWeatherByCity('Madrid');
    if(initialWeather) {
        displayWeather(initialWeather);
        updateWeatherRecommendations(initialWeather, season);
    }
});

// FUNCIONES AUXILIARES
function generateColorPalette(colors) {
    const paletteContainer = document.getElementById('colorPalette');
    paletteContainer.innerHTML = colors.map(color => `
        <div class="color-item" style="background-color: ${color}">
            <span>${color}</span>
        </div>
    `).join('');
}

function generateRecommendations(recommendations) {
    Object.entries(recommendations).forEach(([category, items]) => {
        const container = document.querySelector(`[data-category="${category}"]`);
        container.innerHTML = items.map(item => `
            <div class="recommendation-card">
                ${item.image ? `<div class="recommendation-image" style="background-image: url(${item.image})"></div>` : ''}
                <div class="recommendation-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    });
}

function generateSeasonGuide(guide) {
    const guideContainer = document.getElementById('seasonGuide');
    guideContainer.innerHTML = Object.entries(guide).map(([key, value]) => `
        <div class="guide-item">
            <h3>${key}</h3>
            <p>${value}</p>
        </div>
    `).join('');
}

// FUNCIONES DEL CLIMA
window.updateWeather = async function() {
    const city = document.getElementById('cityInput').value || 'Madrid';
    const weatherData = await getWeatherByCity(city);
    
    if(weatherData) {
        displayWeather(weatherData);
        updateWeatherRecommendations(weatherData, localStorage.getItem('selectedSeason'));
    }
};

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <div class="weather-item">
            <h3>Temperatura</h3>
            <p>${Math.round(data.main.temp)}°C</p>
        </div>
        <div class="weather-item">
            <h3>Condición</h3>
            <div class="weather-icon" style="background-image: url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)"></div>
            <p>${data.weather[0].description}</p>
        </div>
    `;
}

function updateWeatherRecommendations(weatherData, season) {
    const recommendations = getWeatherRecommendations(weatherData, season);
    const alertContainer = document.getElementById('weatherAlert');
    
    alertContainer.innerHTML = `
        <div class="weather-alert">
            <p>${recommendations.join('</p><p>')}</p>
        </div>
    `;
}

// MANEJO DE PESTAÑAS
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.category-btn.active').classList.remove('active');
        button.classList.add('active');
        
        const category = button.dataset.category;
        document.querySelectorAll('.recommendations-grid').forEach(grid => {
            grid.classList.remove('active');
            if(grid.dataset.category === category) grid.classList.add('active');
        });
    });
});