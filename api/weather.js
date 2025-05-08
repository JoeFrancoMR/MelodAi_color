// Configuración de la API
const weatherConfig = {
    apiKey: '1510fbd2dd54bc9519438ff40438cac6', // Reemplaza esto con tu API key real
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
    units: 'metric',
    lang: 'es'
};

// Función para obtener el clima actual por ciudad
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `${weatherConfig.baseUrl}weather?q=${encodeURIComponent(city)}&units=${weatherConfig.units}&lang=${weatherConfig.lang}&appid=${weatherConfig.apiKey}`
        );

        if (!response.ok) {
            throw new Error(`Error al obtener el clima: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al consultar el clima:", error);
        return null;
    }
}

// Función que genera recomendaciones según clima y estación
function getWeatherRecommendations(weatherData, season) {
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main.toLowerCase();
    const description = weatherData.weather[0].description;

    let recommendations = [];

    const tempMessages = {
        cold: {
            rain: "¡Frío y lluvia! Usa capas térmicas bajo tu impermeable",
            snow: "Nieve y temperaturas bajo cero: abrigo grueso y botas antideslizantes",
            default: "¡Hace mucho frío! Abrígate con múltiples capas térmicas"
        },
        cool: {
            rain: "Lleva un paraguas a juego y calzado impermeable",
            drizzle: "Brisa fresca con llovizna: ideal para trench coats",
            default: "Temperatura fresca: perfecta para capas ligeras"
        },
        warm: {
            clear: "Día soleado: usa colores claros y tejidos transpirables",
            clouds: "Cielos nublados: aprovecha para usar tonos mates",
            default: "Clima templado: ideal para mostrar tu paleta de colores"
        }
    };

    let tempRange;
    if (temp < 10) tempRange = 'cold';
    else if (temp < 20) tempRange = 'cool';
    else tempRange = 'warm';

    const specificMessage = tempMessages[tempRange][condition] 
                          || tempMessages[tempRange].default;

    recommendations.push(`Hoy: ${specificMessage}. ${description}`);

    const seasonalDetails = {
        invierno: "🧥 Combina con tonos intensos como borgoña o azul noche",
        primavera: "🌷 Aprovecha los pasteles y estampados florales",
        verano: "🌞 Usa tejidos ligeros en azules claros y blancos rotos",
        otonio: "🍂 Juega con texturas en terracotas y verdes oliva"
    };

    recommendations.push(seasonalDetails[season]);

    if (condition.includes('rain') || condition === 'drizzle') {
        recommendations.push("⚠️ No olvides un paraguas que complemente tu outfit");
    }

    return recommendations;
}

// Exportar funciones para usar en otros archivos
export { fetchWeatherData, getWeatherRecommendations };
