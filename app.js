// Variables globales
let gustosSeleccionados = [];
let gustosPersonalizados = '';
let lugarSeleccionado = null;
let stream = null;
let isScanning = false;

// Datos de lugares turísticos de Zapopan
const lugaresZapopan = {
  'Fútbol': {
    nombre: 'Estadio Akron',
    distancia: '3.2 km',
    descripcion: 'Estadio de fútbol moderno, hogar de las Chivas del Guadalajara',
    precios: 'Boletos desde $150 MXN',
    horarios: 'Eventos según calendario deportivo',
    direccion: 'Av. López Mateos Sur 1950, Zapopan'
  },
  'Go Karts': {
    nombre: 'Kartódromo Zapopan',
    distancia: '2.8 km',
    descripcion: 'Pista de go-karts profesional con circuitos emocionantes',
    precios: 'Desde $200 MXN por sesión',
    horarios: 'Lunes a Domingo 10:00 - 22:00',
    direccion: 'Av. Patria 1891, Zapopan'
  },
  'Cafeterías Vintage': {
    nombre: 'Café de la Parroquia',
    distancia: '1.5 km',
    descripcion: 'Cafetería vintage en el centro histórico con ambiente colonial',
    precios: 'Café desde $45 MXN',
    horarios: 'Lunes a Domingo 7:00 - 22:00',
    direccion: 'Plaza de las Américas, Centro Histórico'
  },
  'Restaurantes Antiguos': {
    nombre: 'La Casa de los Abuelos',
    distancia: '1.2 km',
    descripcion: 'Restaurante tradicional mexicano en casona del siglo XIX',
    precios: 'Platillos desde $120 MXN',
    horarios: 'Martes a Domingo 13:00 - 23:00',
    direccion: 'Calle Hidalgo 45, Centro Histórico'
  },
  'Heladerías': {
    nombre: 'Nevería Roxy',
    distancia: '0.8 km',
    descripcion: 'Heladería artesanal con sabores tradicionales mexicanos',
    precios: 'Helados desde $35 MXN',
    horarios: 'Lunes a Domingo 12:00 - 22:00',
    direccion: 'Av. Hidalgo 234, Zapopan'
  },
  'Gotcha': {
    nombre: 'Gotcha Extreme Zapopan',
    distancia: '4.1 km',
    descripcion: 'Campo de gotcha con escenarios temáticos y equipo profesional',
    precios: 'Desde $300 MXN por persona',
    horarios: 'Sábados y Domingos 9:00 - 18:00',
    direccion: 'Bosque de la Primavera, Zapopan'
  },
  'Museos': {
    nombre: 'Museo de Arte de Zapopan',
    distancia: '1.0 km',
    descripcion: 'Museo de arte contemporáneo con exposiciones rotativas',
    precios: 'Entrada $50 MXN, estudiantes gratis',
    horarios: 'Martes a Domingo 10:00 - 18:00',
    direccion: 'Av. Hidalgo 152, Centro Histórico'
  },
  'Pueblos Mágicos': {
    nombre: 'Tequila (desde Zapopan)',
    distancia: '65 km',
    descripcion: 'Pueblo Mágico famoso por la producción de tequila',
    precios: 'Tours desde $450 MXN',
    horarios: 'Tours diarios 9:00 - 17:00',
    direccion: 'Tequila, Jalisco'
  },
  'Parques Temáticos': {
    nombre: 'Selva Mágica',
    distancia: '8.5 km',
    descripcion: 'Parque de diversiones con juegos mecánicos y zoológico',
    precios: 'Entrada general $180 MXN',
    horarios: 'Miércoles a Domingo 11:00 - 19:00',
    direccion: 'Periférico Norte 5560, Guadalajara'
  },
  'Arquitectura Colonial': {
    nombre: 'Basílica de Zapopan',
    distancia: '0.5 km',
    descripcion: 'Basílica colonial del siglo XVII, santuario de la Virgen de Zapopan',
    precios: 'Entrada gratuita',
    horarios: 'Lunes a Domingo 6:00 - 21:00',
    direccion: 'Plaza de las Américas, Centro Histórico'
  },
  'Mercados Artesanales': {
    nombre: 'Mercado de Artesanías Zapopan',
    distancia: '1.8 km',
    descripcion: 'Mercado con artesanías locales y productos tradicionales',
    precios: 'Productos desde $50 MXN',
    horarios: 'Lunes a Domingo 9:00 - 20:00',
    direccion: 'Av. Laureles 150, Zapopan'
  },
  'Centros Comerciales': {
    nombre: 'Andares Centro Comercial',
    distancia: '5.2 km',
    descripcion: 'Centro comercial de lujo con tiendas internacionales',
    precios: 'Compras variadas',
    horarios: 'Lunes a Domingo 10:00 - 22:00',
    direccion: 'Blvd. Puerta de Hierro 4965, Zapopan'
  },
  'Vida Nocturna': {
    nombre: 'Zona Rosa Zapopan',
    distancia: '2.3 km',
    descripcion: 'Distrito de entretenimiento nocturno con bares y discotecas',
    precios: 'Covers desde $100 MXN',
    horarios: 'Jueves a Sábado 20:00 - 03:00',
    direccion: 'Av. Patria, Zapopan'
  },
  'Gastronomía Local': {
    nombre: 'Mercado San Juan de Dios',
    distancia: '6.8 km',
    descripcion: 'Mercado tradicional con comida típica jalisciense',
    precios: 'Comidas desde $60 MXN',
    horarios: 'Lunes a Domingo 8:00 - 18:00',
    direccion: 'Calzada Independencia Sur, Guadalajara'
  },
  'Arte y Cultura': {
    nombre: 'Casa de la Cultura Zapopan',
    distancia: '1.1 km',
    descripcion: 'Centro cultural con talleres, exposiciones y eventos artísticos',
    precios: 'Actividades desde $80 MXN',
    horarios: 'Lunes a Viernes 9:00 - 20:00',
    direccion: 'Av. Hidalgo 370, Centro Histórico'
  },
  'Naturaleza': {
    nombre: 'Bosque de la Primavera',
    distancia: '12.5 km',
    descripcion: 'Área natural protegida ideal para senderismo y ecoturismo',
    precios: 'Entrada gratuita',
    horarios: 'Lunes a Domingo 6:00 - 18:00',
    direccion: 'Carretera a Nogales, Zapopan'
  },
  // Nuevos gustos turísticos
  'Balnearios': {
    nombre: 'Balneario Agua Caliente',
    distancia: '18.3 km',
    descripcion: 'Aguas termales naturales con propiedades relajantes',
    precios: 'Entrada $120 MXN',
    horarios: 'Lunes a Domingo 8:00 - 20:00',
    direccion: 'Villa Corona, Jalisco'
  },
  'Miradores': {
    nombre: 'Mirador Dr. Atl',
    distancia: '3.7 km',
    descripcion: 'Mirador panorámico con vista espectacular de Guadalajara',
    precios: 'Entrada gratuita',
    horarios: 'Lunes a Domingo 24 horas',
    direccion: 'Av. Dr. Atl, Zapopan'
  },
  'Haciendas Históricas': {
    nombre: 'Hacienda Labor de Rivera',
    distancia: '8.9 km',
    descripcion: 'Hacienda histórica del siglo XVIII con tours guiados',
    precios: 'Tours desde $180 MXN',
    horarios: 'Sábados y Domingos 10:00 - 16:00',
    direccion: 'Tlajomulco de Zúñiga, Jalisco'
  },
  'Templos Antiguos': {
    nombre: 'Templo de San Pedro Apostol',
    distancia: '2.1 km',
    descripcion: 'Templo colonial con arquitectura barroca del siglo XVIII',
    precios: 'Entrada gratuita',
    horarios: 'Lunes a Domingo 7:00 - 20:00',
    direccion: 'Av. San Pedro, Zapopan'
  },
  'Centros Ecológicos': {
    nombre: 'Zoológico Guadalajara',
    distancia: '7.2 km',
    descripcion: 'Zoológico con especies nativas e internacionales',
    precios: 'Entrada $85 MXN',
    horarios: 'Martes a Domingo 10:00 - 17:00',
    direccion: 'Paseo del Zoológico 600, Guadalajara'
  },
  'Talleres Artesanales': {
    nombre: 'Taller de Cerámica Tonalá',
    distancia: '15.4 km',
    descripcion: 'Talleres tradicionales de cerámica y alfarería',
    precios: 'Talleres desde $200 MXN',
    horarios: 'Lunes a Viernes 9:00 - 17:00',
    direccion: 'Tonalá, Jalisco'
  },
  'Rutas Gastronómicas': {
    nombre: 'Ruta del Tequila y Mariachi',
    distancia: '45.8 km',
    descripcion: 'Tour gastronómico por destilerías y restaurantes típicos',
    precios: 'Tours desde $650 MXN',
    horarios: 'Sábados y Domingos 10:00 - 18:00',
    direccion: 'Amatitán - Tequila, Jalisco'
  },
  'Deportes Extremos': {
    nombre: 'Canopy Barranca del Río Santiago',
    distancia: '22.1 km',
    descripcion: 'Tirolesas y deportes extremos en la barranca',
    precios: 'Desde $350 MXN',
    horarios: 'Sábados y Domingos 9:00 - 17:00',
    direccion: 'Barranca del Río Santiago, Zapopan'
  },
  'Festivales Culturales': {
    nombre: 'Festival Cultural de Mayo',
    distancia: '6.5 km',
    descripcion: 'Festival anual con eventos culturales y artísticos',
    precios: 'Eventos desde $100 MXN',
    horarios: 'Mayo - horarios variables',
    direccion: 'Varios venues en Guadalajara'
  },
  'Spas y Wellness': {
    nombre: 'Spa Termal Tlajomulco',
    distancia: '19.7 km',
    descripcion: 'Spa con tratamientos termales y relajación',
    precios: 'Tratamientos desde $450 MXN',
    horarios: 'Lunes a Domingo 9:00 - 21:00',
    direccion: 'Tlajomulco de Zúñiga, Jalisco'
  }
};

// Base de datos de reconocimiento de imágenes del Estadio Akron
const estadioAkronDB = {
  keywords: ['estadio', 'akron', 'chivas', 'futbol', 'soccer', 'guadalajara', 'zapopan'],
  description: 'Estadio Akron - Casa de las Chivas del Guadalajara',
  info: {
    nombre: 'Estadio Akron',
    capacidad: '49,850 espectadores',
    inauguracion: '30 de julio de 2010',
    equipo: 'Club de Fútbol Guadalajara (Chivas)',
    arquitecto: 'Populous',
    caracteristicas: [
      'Techo retráctil',
      'Césped natural',
      'Pantallas LED gigantes',
      'Palcos VIP',
      'Restaurantes y tiendas'
    ],
    eventos: 'Partidos de fútbol, conciertos, eventos especiales',
    ubicacion: 'Av. López Mateos Sur 1950, Ciudad del Sol, Zapopan',
    transporte: 'Línea 3 del Tren Ligero - Estación Estadio Akron'
  }
};

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado exitosamente:', registration.scope);
      })
      .catch(error => {
        console.log('Error al registrar Service Worker:', error);
      });
  });
}

// Solicitar permisos de notificación
if ('Notification' in window && navigator.serviceWorker) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permisos de notificación concedidos');
    }
  });
}

// Funciones de navegación
function irAGustos() {
  const email = document.getElementById('email').value;
  const edad = document.getElementById('edad').value;
  const sexo = document.getElementById('sexo').value;
  const terminos = document.getElementById('terminos').checked;

  if (!email || !edad || !sexo || !terminos) {
    alert('Por favor complete todos los campos y acepte los términos y condiciones para acceder a la cámara.');
    return;
  }

  // Solicitar permisos de cámara al aceptar términos y condiciones
  solicitarPermisosCamara();

  document.getElementById('pantallaInicio').classList.add('hidden');
  document.getElementById('pantallaGustos').classList.remove('hidden');
}

function volverInicio() {
  document.getElementById('pantallaGustos').classList.add('hidden');
  document.getElementById('pantallaInicio').classList.remove('hidden');
}

function irARecomendaciones() {
  gustosPersonalizados = document.getElementById('gustosPersonalizados').value;
  
  if (gustosSeleccionados.length === 0) {
    alert('Por favor seleccione al menos un gusto personal.');
    return;
  }

  generarRecomendaciones();
  document.getElementById('pantallaGustos').classList.add('hidden');
  document.getElementById('pantallaRecomendaciones').classList.remove('hidden');
}

function volverGustos() {
  document.getElementById('pantallaRecomendaciones').classList.add('hidden');
  document.getElementById('pantallaGustos').classList.remove('hidden');
}

function volverRecomendaciones() {
  document.getElementById('pantallaDetalles').classList.add('hidden');
  document.getElementById('pantallaRecomendaciones').classList.remove('hidden');
}

function volverDetalles() {
  document.getElementById('pantallaMapa').classList.add('hidden');
  document.getElementById('pantallaDetalles').classList.remove('hidden');
}

// Función para solicitar permisos de cámara
async function solicitarPermisosCamara() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    });
    
    // Detener el stream inmediatamente, solo queríamos verificar permisos
    stream.getTracks().forEach(track => track.stop());
    
    console.log('Permisos de cámara concedidos');
    
    // Mostrar notificación de éxito
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ON TRAVEL', {
        body: 'Cámara habilitada. Ya puedes escanear objetos turísticos.',
        icon: '/icons/icon-192x192.png'
      });
    }
    
  } catch (error) {
    console.error('Error al solicitar permisos de cámara:', error);
    alert('Para usar todas las funciones de la app, necesitamos acceso a tu cámara. Por favor, permite el acceso cuando se solicite.');
  }
}

// Función para alternar selección de intereses
function toggleInteres(element) {
  const interes = element.textContent;
  
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    gustosSeleccionados = gustosSeleccionados.filter(g => g !== interes);
  } else {
    element.classList.add('selected');
    gustosSeleccionados.push(interes);
  }
}

// Función para generar recomendaciones
function generarRecomendaciones() {
  const container = document.getElementById('recomendacionesContainer');
  container.innerHTML = '';

  gustosSeleccionados.forEach(gusto => {
    if (lugaresZapopan[gusto]) {
      const lugar = lugaresZapopan[gusto];
      const card = document.createElement('div');
      card.className = 'recommendation-card';
      card.onclick = () => mostrarDetalles(gusto);
      
      card.innerHTML = `
        <div class="recommendation-title">${lugar.nombre}</div>
        <div class="recommendation-distance">📍 ${lugar.distancia}</div>
        <div class="recommendation-description">${lugar.descripcion}</div>
      `;
      
      container.appendChild(card);
    }
  });

  // Si no hay recomendaciones, mostrar mensaje
  if (container.children.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #666;">No se encontraron recomendaciones para tus gustos seleccionados.</p>';
  }
}

// Función para mostrar detalles del lugar
function mostrarDetalles(gusto) {
  lugarSeleccionado = lugaresZapopan[gusto];
  
  document.getElementById('detallesTitulo').textContent = lugarSeleccionado.nombre;
  document.getElementById('detallesPrecios').textContent = lugarSeleccionado.precios;
  document.getElementById('detallesHorarios').textContent = lugarSeleccionado.horarios;
  
  document.getElementById('pantallaRecomendaciones').classList.add('hidden');
  document.getElementById('pantallaDetalles').classList.remove('hidden');
}

// Función para ver mapa
function verMapa() {
  if (lugarSeleccionado) {
    document.getElementById('direccionLugar').textContent = lugarSeleccionado.direccion;
    document.getElementById('distanciaLugar').textContent = lugarSeleccionado.distancia;
  }
  
  document.getElementById('pantallaDetalles').classList.add('hidden');
  document.getElementById('pantallaMapa').classList.remove('hidden');
}

// Función para procesar pago
function procesarPago() {
  alert('Funcionalidad de pago en desarrollo. Pronto podrás realizar pagos seguros desde la app.');
}

// Función para realizar reserva
function realizarReserva() {
  const fecha = document.getElementById('fechaReserva').value;
  const hora = document.getElementById('horaReserva').value;
  
  if (!fecha || !hora) {
    alert('Por favor seleccione fecha y hora para la reserva.');
    return;
  }
  
  alert(`Reserva confirmada para ${fecha} a las ${hora}. Recibirás un email de confirmación.`);
}

// Función para iniciar navegación
function iniciarNavegacion() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        alert(`Iniciando navegación desde tu ubicación (${lat.toFixed(4)}, ${lng.toFixed(4)}) hacia ${lugarSeleccionado.nombre}`);
      },
      error => {
        alert('No se pudo obtener tu ubicación. Verifica los permisos de geolocalización.');
      }
    );
  } else {
    alert('Tu dispositivo no soporta geolocalización.');
  }
}

// Funciones del escáner
function abrirEscaner() {
  document.querySelectorAll('.container').forEach(container => {
    if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
    }
  });
  
  document.getElementById('pantallaEscaner').classList.remove('hidden');
  document.getElementById('resultadoEscaneo').classList.add('hidden');
}

function cerrarEscaner() {
  // Detener la cámara si está activa
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  
  document.getElementById('pantallaEscaner').classList.add('hidden');
  document.getElementById('pantallaInicio').classList.remove('hidden');
  
  // Resetear el botón de escaneo
  document.getElementById('escaneoTexto').textContent = 'Iniciar Escaneo';
  document.getElementById('escaneoSpinner').classList.add('hidden');
  isScanning = false;
}

// Función para simular escaneo con reconocimiento de imágenes
async function simularEscaneo() {
  if (isScanning) return;
  
  isScanning = true;
  document.getElementById('escaneoTexto').textContent = 'Escaneando...';
  document.getElementById('escaneoSpinner').classList.remove('hidden');
  
  try {
    // Intentar acceder a la cámara real
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    });
    
    // Crear elemento de video para mostrar la cámara
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.style.width = '100%';
    videoElement.style.maxWidth = '300px';
    videoElement.style.borderRadius = '15px';
    
    // Reemplazar el placeholder con el video
    const placeholder = document.querySelector('.form-container div[style*="border: 3px dashed"]');
    if (placeholder) {
      placeholder.innerHTML = '';
      placeholder.appendChild(videoElement);
      placeholder.style.border = 'none';
      placeholder.style.background = 'transparent';
    }
    
    // Simular procesamiento de imagen después de 3 segundos
    setTimeout(() => {
      procesarImagenEscaneada();
    }, 3000);
    
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
    
    // Si no se puede acceder a la cámara, simular el escaneo
    setTimeout(() => {
      procesarImagenEscaneada();
    }, 2000);
  }
}

// Función para procesar imagen escaneada
function procesarImagenEscaneada() {
  // Detener la cámara
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  
  // Simular reconocimiento del Estadio Akron
  const esEstadioAkron = Math.random() > 0.3; // 70% de probabilidad de reconocer el estadio
  
  document.getElementById('escaneoTexto').textContent = 'Iniciar Escaneo';
  document.getElementById('escaneoSpinner').classList.add('hidden');
  isScanning = false;
  
  const resultadoDiv = document.getElementById('resultadoEscaneo');
  
  if (esEstadioAkron) {
    // Mostrar información del Estadio Akron
    resultadoDiv.innerHTML = `
      <div class="scanner-title">🏟️ ¡Estadio Akron Detectado!</div>
      <div class="scanner-info">
        <p><strong>Nombre:</strong> ${estadioAkronDB.info.nombre}</p>
        <p><strong>Capacidad:</strong> ${estadioAkronDB.info.capacidad}</p>
        <p><strong>Equipo:</strong> ${estadioAkronDB.info.equipo}</p>
        <p><strong>Inauguración:</strong> ${estadioAkronDB.info.inauguracion}</p>
        <p><strong>Ubicación:</strong> ${estadioAkronDB.info.ubicacion}</p>
        <p><strong>Características especiales:</strong></p>
        <ul>
          ${estadioAkronDB.info.caracteristicas.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <p><strong>Transporte:</strong> ${estadioAkronDB.info.transporte}</p>
        <br>
        <button class="btn-primary" onclick="verDetallesEstadio()" style="margin-top: 15px;">
          Ver más detalles y horarios
        </button>
      </div>
    `;
  } else {
    // Objeto no reconocido
    resultadoDiv.innerHTML = `
      <div class="scanner-title">🔍 Objeto Escaneado</div>
      <div class="scanner-info">
        <p>No se pudo identificar este objeto en nuestra base de datos de atractivos turísticos de Zapopan.</p>
        <p>Intenta escanear:</p>
        <ul>
          <li>El Estadio Akron</li>
          <li>La Basílica de Zapopan</li>
          <li>Monumentos del Centro Histórico</li>
          <li>Señalizaciones turísticas</li>
        </ul>
        <button class="btn-primary" onclick="simularEscaneo()" style="margin-top: 15px;">
          Intentar de nuevo
        </button>
      </div>
    `;
  }
  
  resultadoDiv.classList.remove('hidden');
  
  // Restaurar el placeholder de la cámara
  const placeholder = document.querySelector('.form-container div[style*="background: transparent"]') || 
                     document.querySelector('.form-container div');
  if (placeholder) {
    placeholder.innerHTML = '<span style="font-size: 48px;">📷</span>';
    placeholder.style.border = '3px dashed #00c896';
    placeholder.style.background = 'rgba(255,255,255,0.1)';
  }
}

// Función para ver detalles del estadio desde el escáner
function verDetallesEstadio() {
  // Simular selección del estadio
  mostrarDetalles('Fútbol');
  cerrarEscaner();
}

// Función para instalar la PWA
function instalarPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuario aceptó la instalación');
      } else {
        console.log('Usuario rechazó la instalación');
      }
      deferredPrompt = null;
    });
  } else {
    // Mostrar instrucciones manuales de instalación
    alert('Para instalar la app:\n\n• En Chrome: Menú → Instalar ON TRAVEL\n• En Safari: Compartir → Añadir a pantalla de inicio\n• En Firefox: Menú → Instalar');
  }
}

// Event listener para el evento beforeinstallprompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA instalable detectada');
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar botón de instalación personalizado
  const installButton = document.createElement('button');
  installButton.textContent = '📱 Instalar App';
  installButton.className = 'btn-secondary';
  installButton.style.position = 'fixed';
  installButton.style.top = '60px';
  installButton.style.right = '20px';
  installButton.style.zIndex = '1001';
  
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Resultado de instalación: ${outcome}`);
      deferredPrompt = null;
      installButton.remove();
    }
  });
  
  document.body.appendChild(installButton);
});

// Event listener para cuando la PWA se instala
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA instalada exitosamente');
  
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('ON TRAVEL instalado', {
      body: '¡La app se instaló correctamente en tu dispositivo!',
      icon: '/icons/icon-192x192.png'
    });
  }
});

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  console.log('ON TRAVEL PWA cargada');
  
  // Verificar si la app se está ejecutando como PWA instalada
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Ejecutándose como PWA instalada');
  }
  
  // Configurar fecha mínima para reservas (hoy)
  const fechaInput = document.getElementById('fechaReserva');
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;
  }
});

