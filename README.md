# SalesCRM

Welcome to SalesCRM! This Expo project is a CRM application built with React Native and Expo Router. It provides features like lead management, user authentication, and dashboard analytics.

## Project Structure

- **app/**: Contains route-based screens including authentication and dashboard screens.
  - `auth/`: Login screen and related assets.
  - `dashboard/`: Dashboard screen for overview and analytics.
- **components/**: Reusable UI components such as navigation headers and containers.
- **data/**: Mock data for testing, e.g., lead data.
- **hooks/**: Custom React hooks like `useLeads` for handling business logic.
- **types/**: TypeScript type definitions (e.g., [`Lead`](e:\SalesCRM\types\lead.ts)).
- **my-expo-app/**: An example or secondary Expo project setup.
- **.vscode/**: IDE configuration settings.
- **package.json**: Project dependencies and scripts.

## Getting Started

1. **Install Dependencies**

   Run the following command from the project root:

   ```sh
   npm install
   ```

2. **Start the App**

   Run the following command to start the development server:

   ```sh
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

