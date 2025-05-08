document.addEventListener("DOMContentLoaded", () => {
    const season = localStorage.getItem("selectedSeason");
  
    const palettes = {
      invierno: ['#2C3E50', '#34495E', '#BDC3C7', '#ECF0F1'],
      primavera: ['#F1C40F', '#2ECC71', '#E67E22', '#F39C12'],
      verano: ['#AEDFF7', '#48C9B0', '#F5B7B1', '#D6EAF8'],
      otoño: ['#D35400', '#A04000', '#DC7633', '#FAD7A0']
    };
  
    const prendas = {
      invierno: ['Abrigo largo', 'Bufanda gruesa', 'Botas altas', 'Gorro de lana'],
      primavera: ['Chaqueta ligera', 'Jeans', 'Tenis cómodos', 'Camisetas frescas'],
      verano: ['Shorts', 'Blusas de tirantes', 'Sandalias', 'Gafas de sol'],
      otoño: ['Suéter de lana', 'Botines', 'Pantalones beige', 'Camisas de cuadros']
    };
  
    function mostrarPaletaYPrendas(season) {
      const colorContainer = document.getElementById('colores');
      const prendasList = document.getElementById('lista-prendas');
      
      // Paleta
      colorContainer.innerHTML = '';
      palettes[season].forEach(color => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.borderRadius = '8px';
        div.title = color;
        colorContainer.appendChild(div);
      });
  
      // Prendas
      prendasList.innerHTML = '';
      prendas[season].forEach(item => {
        const li = document.createElement('li');
        li.textContent = '👕 ' + item;
        prendasList.appendChild(li);
      });
    }
  
    if (season) {
      mostrarPaletaYPrendas(season);
    }
  
    // Clima
    window.getWeather = async function () {
      const city = document.getElementById('cityInput').value;
      const mensajeClima = document.getElementById('mensaje-clima');
      if (!city) return alert("Ey, dime de qué ciudad eres 😉");
  
      try {
        const apiKey = "tu_api_key_aqui"; // Reemplaza con tu clave de OpenWeather
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();
  
        if (data.cod !== 200) {
          mensajeClima.textContent = "Ups, no encontré esa ciudad 😥";
          return;
        }
  
        const temp = Math.round(data.main.temp);
        const weather = data.weather[0].description.toLowerCase();
  
        let comentario = `Hoy en ${city} está haciendo ${temp}°C, y parece que ${weather.includes("lluvia") ? "va a llover, así que no salgas sin paraguas ☔" : temp > 25 ? "hace calorcito, así que ponte algo fresco 😎" : temp < 15 ? "está fresco, mejor sal bien abrigado 🧥" : "está tranqui, viste como te guste 😄"}.`;
  
        mensajeClima.innerHTML = `<p style="font-size: 1.2rem;">${comentario}</p>`;
      } catch (error) {
        console.error("Error al obtener clima:", error);
        mensajeClima.textContent = "Algo falló al buscar el clima 😢";
      }
    };
  });
  