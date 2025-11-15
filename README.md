# Weather App

A modern, responsive weather application built with React that provides current weather information, forecasts, and interactive maps.

## Features

- Current weather display with animated icons
- 5-day weather forecast
- Interactive map integration with Google Maps
- Search functionality for cities worldwide
- Responsive design for mobile and desktop
- Real-time weather data updates

## Technologies Used

### Languages
- **JavaScript** - Main programming language using React JSX
- **CSS** - Styling and responsive design
- **HTML** - Markup structure

### Frameworks & Libraries
- **React 19.2.0** - UI framework for building the user interface
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Google Maps React Wrapper** - Map integration
- **React Icons** - Icon library
- **React Animated Weather** - Animated weather icons
- **React Use Animations** - Additional animations

### Development Tools
- **ESLint** - Code linting
- **Vite Plugin React** - React integration for Vite

## Screenshots

### Main Weather Display
![Main Weather Display](screenshots/main-weather.png)

### Forecast View
![Forecast View](screenshots/forecast.png)

### Map Integration
![Map View](screenshots/map.png)

*Note: Replace the image paths with actual screenshot files in the `screenshots/` directory.*

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your Google Maps API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

- Enter a city name in the search bar to get weather information
- View current weather conditions and 5-day forecast
- Use the interactive map to explore weather patterns
- Navigate between different sections using the sidebar

## Build

To build the project for production:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
