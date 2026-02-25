# 🌳 EcoClicker

Un juego interactivo de clicker donde transformas un mundo árido y contaminado en un ecosistema vibrante y lleno de vida.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 Descripción

**EcoClicker** es un juego de clicker inspirado en la naturaleza donde cada clic cuenta. El objetivo es restaurar el planeta plantando árboles, ganando ecocoins y progresando a través de 10 niveles hasta lograr un mundo completamente verde y saludable.

### Características principales

- 🌱 **Sistema de progresión**: 10 niveles de dificultad creciente
- 🎨 **Transformación visual**: El mundo cambia de colores áridos a verdes vibrantes
- 🌲 **Plantación de árboles**: Cada clic genera árboles con animaciones fluidas
- 💰 **Sistema de ecocoins**: Acumula puntos mientras salvas el planeta
- 🎯 **Dos modos de juego**:
  - **Modo Auto**: Los árboles aparecen en posiciones aleatorias
  - **Modo Manual**: Planta árboles donde hagas clic
- 🌍 **Multiidioma**: Disponible en Inglés, Español y Francés
- 📖 **Tutorial integrado**: Aprende a jugar con una guía paso a paso
- 🎵 **Efectos de sonido**: Audio inmersivo al plantar árboles
- ✨ **Animaciones suaves**: Diseñadas con Framer Motion

## 🚀 Instalación

### Requisitos previos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos de instalación

1. **Clona el repositorio** (o descarga el código):
   ```bash
   git clone <url-del-repositorio>
   cd green-clicker
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** y visita:
   ```
   http://localhost:5173
   ```

## 🎯 Cómo jugar

1. **Inicia el juego** desde el menú principal
2. **Haz clic en la pantalla** para plantar árboles
3. **Gana ecocoins** con cada árbol plantado
4. **Progresa a través de los niveles** mientras el mundo se transforma
5. **Alcanza el nivel 10** para salvar el planeta

### Consejos

- Usa el **Modo Manual** para controlar exactamente dónde aparecen los árboles
- Cambia el **idioma** desde el menú principal
- Consulta el **tutorial** si necesitas ayuda

## 🛠️ Tecnologías utilizadas

- **React 19.2.0** - Librería de UI
- **Vite 7.2.4** - Build tool y dev server
- **Framer Motion 12.23.24** - Animaciones
- **Lucide React 0.554.0** - Iconos
- **CSS3** - Estilos personalizados

## 📁 Estructura del proyecto

El proyecto sigue una arquitectura profesional basada en features, optimizada para escalabilidad:

```
green-clicker/
├── public/
│   └── vite.svg
├── src/
│   ├── app/                      # Componente raíz de la aplicación
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── features/                 # Módulos organizados por funcionalidad
│   │   ├── game/                 # Lógica y componentes del juego
│   │   │   ├── components/
│   │   │   │   ├── World/       # Mundo del juego y árboles
│   │   │   │   └── HUD/         # Interfaz durante el juego
│   │   │   ├── hooks/
│   │   │   │   └── useGameLogic.js  # Lógica principal del juego
│   │   │   ├── constants/
│   │   │   │   └── gameConfig.js    # Configuración y constantes
│   │   │   └── index.js         # Exportación del módulo
│   │   └── ui/                   # Componentes de interfaz
│   │       ├── components/
│   │       │   ├── Menu/         # Menú principal y tutorial
│   │       │   └── WinScreen/    # Pantalla de victoria
│   │       └── index.js
│   ├── shared/                   # Recursos compartidos
│   │   ├── assets/
│   │   │   ├── images/           # Sprites, banderas, fondos
│   │   │   └── sounds/           # Efectos de sonido
│   │   ├── locales/              # Traducciones (EN, ES, FR)
│   │   │   ├── en.js
│   │   │   ├── es.js
│   │   │   ├── fr.js
│   │   │   └── translations.js
│   │   └── styles/               # Estilos globales
│   ├── utils/                    # Funciones utilitarias
│   └── main.jsx                  # Punto de entrada
├── package.json
├── vite.config.js                # Configuración con path aliases
└── README.md
```

### Características de la arquitectura

- **Separación por features**: Código organizado por funcionalidad, no por tipo de archivo
- **Barrel exports**: Cada módulo expone una API clara mediante `index.js`
- **Path aliases**: Imports limpios usando `@/` en lugar de `../../../`
- **Colocation**: Componentes y sus estilos CSS en la misma carpeta
- **Escalabilidad**: Fácil agregar nuevas features sin afectar el código existente

## 🎨 Características del diseño

- **Paleta de colores temática**: Tonos de verde natural y tierra
- **Tipografía**: Fuente "Press Start 2P" inspirada en videojuegos retro
- **Animaciones fluidas**: Transiciones suaves entre estados
- **Diseño responsivo**: Se adapta a diferentes tamaños de pantalla
- **Efectos visuales**: Transformación gradual del fondo según el progreso

## 🌐 Idiomas soportados

- 🇬🇧 **English**
- 🇪🇸 **Español**
- 🇫🇷 **Français**

## 📦 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el juego:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Sergio MT**

Creado con ❤️ por la naturaleza.

---

¡Dale una ⭐ al repositorio si disfrutaste del juego!
