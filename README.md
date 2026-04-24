# Travel Planner

A modern, full-featured travel planning application built with React, TypeScript, and Vite. Plan your trips effortlessly with destination search, attraction discovery, weather information, and trip management capabilities.

## 🚀 Features

- **Mock Authentication**: Access the system using mock authentication
- **Interactive Dashboard**: Overview of trip statistics, recent trips, and upcoming adventures
- **Destination Search**: Powerful search functionality for cities and countries
- **Attraction Discovery**: Explore nearby attractions using Foursquare Places API
- **Weather Integration**: Real-time weather information for trip planning
- **Trip Management**: Save, organize, and manage your travel itineraries
- **Trip Details**: Detailed views with maps, dates, and custom notes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Modern UI**: Built with Material-UI and Tailwind CSS for a polished experience

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### State Management & Data
- **Redux Toolkit** - Efficient state management
- **Axios** - HTTP client for API requests

### UI & Styling
- **Material-UI (MUI)** - Component library with Material Design
- **Tailwind CSS** - Utility-first CSS framework
- **Emotion** - CSS-in-JS for styled components

### Forms & Interactions
- **React Hook Form** - Performant forms with easy validation
- **React Router** - Client-side routing
- **Flatpickr** - Date/time picker component

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your API keys:
   ```env
    VITE_FOURSQUARE_BASE_URL=https://places-api.foursquare.com
    VITE_FOURSQUARE_API_KEY=your_foursquare_api_key
   
    VITE_RAPIDAPI_BASE_URL=https://wft-geo-db.p.rapidapi.com/v1/geo
    VITE_RAPIDAPI_HOST=wft-geo-db.p.rapidapi.com
    VITE_RAPIDAPI_KEY=your_rapid_api_key

    VITE_COUNTRY_API_URL=https://restcountries.com/v3.1/alpha

    VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
    VITE_WEATHER_KEY=your_weather_api_key

   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

## 📖 Usage

1. **Login**: Access the application with your credentials (Mock authentication)
2. **Dashboard**: View your trip statistics and recent activities
3. **Search**: Find destinations and explore attractions
4. **Plan Trips**: Create and save your travel itineraries
5. **View Details**: Check trip details with maps and weather info

## 🔧 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 🏗️ Project Structure

```
travel-planner/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service functions
│   │   ├── axiosInstance.ts
│   │   ├── cityApi.ts
│   │   ├── countryApi.ts
│   │   ├── foursquareApi.ts
│   │   └── weatherApi.ts
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   └── search/        # Search-related components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── routes/            # Routing configuration
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── tsconfig.json          # TypeScript config
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Foursquare Places API](https://developer.foursquare.com/) for location data
- [OpenWeatherMap](https://openweathermap.org/) for weather information
- [Material-UI](https://mui.com/) for UI components

---

Built with ❤️ using React, TypeScript, and Vite.
