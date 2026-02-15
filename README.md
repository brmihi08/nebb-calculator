# NEBB Calculator

A professional React Native application designed specifically for NEBB (National Environmental Balancing Bureau) certified technicians. This calculator provides essential tools for testing, adjusting, and balancing (TAB) of environmental systems.

## Features

### 🌀 Airflow Calculations
- **CFM to Velocity Conversion**: Convert airflow rate to velocity
- **Velocity to CFM Calculation**: Calculate airflow rate from velocity
- **Duct Area Calculator**: Calculate duct area from dimensions
- **Equivalent Duct Diameter**: Convert rectangular ducts to equivalent round ducts

### 📊 Pressure Calculations
- **Total Pressure**: TP = SP + VP
- **Static Pressure**: SP = TP - VP
- **Velocity Pressure**: VP = TP - SP
- **Velocity from Pressure**: Calculate velocity from velocity pressure
- **Pressure from Velocity**: Calculate velocity pressure from velocity
- **Air Density Reference**: Common air densities at different elevations

### 🌡️ Temperature & Humidity
- **Dew Point Calculation**: Calculate dew point from dry bulb and relative humidity
- **Relative Humidity**: Calculate RH from dry and wet bulb temperatures
- **Wet Bulb Temperature**: Calculate wet bulb from dry bulb and RH
- **Enthalpy**: Calculate air enthalpy in Btu/lb
- **Specific Volume**: Calculate specific volume in ft³/lb
- **Temperature Conversions**: °F/°C, °F/°R, °C/K conversions

### ⚙️ Settings & Preferences
- **Unit System**: Switch between Imperial and Metric units
- **Auto-save**: Automatically save calculation history
- **Formula Display**: Toggle formula visibility
- **NEBB Information**: Direct access to NEBB contact information

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NEBB_Calc
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For Web (dev server)
   npm run web
   ```

## How to update `dist` (web export)

This project uses Expo's static web export.

- `dist/` is **generated output** and is **gitignored** by the repo-level `.gitignore` (`**/dist/`).
- Update it locally when you need to test a production-like static build, or when deploying to a static host.

### Build (export) web to `dist/`

```bash
npm run build:web
# (equivalently)
./scripts/build-web.sh
```

### Preview the static export locally

```bash
npm run preview:web
# (equivalently)
./scripts/preview-dist.sh
```

Then open: http://localhost:4173

### If you *need* to commit `dist/`

By default, `dist/` is ignored. If your deployment workflow requires committing build artifacts, you'll need to:

1. Remove/adjust the ignore rule (currently `**/dist/` in the repo root `.gitignore`), and
2. Commit `NEBB_Calc/dist/` intentionally.

## Project Structure

```
NEBB_Calc/
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── babel.config.js        # Babel configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation
└── src/
    └── screens/
        ├── HomeScreen.tsx      # Main dashboard
        ├── AirflowScreen.tsx   # Airflow calculations
        ├── PressureScreen.tsx  # Pressure calculations
        ├── TemperatureScreen.tsx # Temperature & humidity
        └── SettingsScreen.tsx  # App settings
```

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation between screens
- **React Native Paper**: Material Design components
- **Expo Vector Icons**: Icon library

## NEBB Standards Compliance

This calculator follows NEBB standards and procedures for:
- Testing, Adjusting, and Balancing (TAB) of environmental systems
- Airflow measurement and calculation methods
- Pressure measurement techniques
- Psychrometric calculations
- Unit conversions and standards

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For technical support or questions about NEBB standards:
- **NEBB Website**: [www.nebb.org](https://www.nebb.org)
- **NEBB Phone**: (301) 977-3698
- **NEBB Email**: info@nebb.org

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Version History

- **v1.0.0** - Initial release with core NEBB calculation features
  - Airflow calculations
  - Pressure calculations
  - Temperature and humidity calculations
  - Settings and preferences

## Acknowledgments

- National Environmental Balancing Bureau (NEBB) for standards and procedures
- React Native community for excellent development tools
- Expo team for the development platform

