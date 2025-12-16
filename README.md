# GTCIS 2026 Website

Welcome to the GTCIS 2026 website project! This project is designed to promote the 1st Ghana Tree Crops Investment Summit (GTCIS) scheduled for February 17th - 20th, 2026, at the Accra International Conference Centre (AICC). The website aims to provide information about the event, facilitate registration, and engage stakeholders in the tree crops sector.

## Project Structure

The project is organized into the following main directories:

- **src/**: Contains the source code for the application.
  - **app/**: Main application files including pages and API routes.
    - **api/**: Contains API endpoints for handling registration.
    - **register/**: Contains the registration page component.
    - **globals.css**: Global styles for consistent look and feel.
    - **layout.tsx**: Defines the layout structure of the application.
    - **page.tsx**: Main entry point for the single-page application.
  - **components/**: Reusable components for various sections of the website.
    - **sections/**: Contains components for different sections like Audience, Background, Contact, etc.
    - **ui/**: UI components like Button, Card, Input, etc.
    - **Countdown.tsx**: Countdown timer for the event.
      - **GreenGoldLoader.tsx**: Animated SVG loading screen.
    - **Navbar.tsx**: Navigation bar for the website.
    - **RegistrationForm.tsx**: Component for the registration form.
  - **data/**: Static content and program details for the event.
  - **styles/**: CSS files for theming and styling.
  - **types/**: TypeScript types and interfaces.

- **public/**: Contains static files like `robots.txt`.

- **Configuration Files**: Includes `.env.example`, `.eslintrc.json`, `.gitignore`, `next.config.js`, `package.json`, `postcss.config.js`, `tailwind.config.js`, and `tsconfig.json`.

## Features

- **Elegant and Modern Design**: The website will feature a sleek and modern design with smooth animations to enhance user experience.
- **Countdown Timer**: A countdown timer will be implemented to create excitement leading up to the event.
- **Registration Page**: Users can easily register for the event through a dedicated registration page.
- **Informative Sections**: The website will include sections detailing the audience, background, expected outcomes, organizers, program, and venue details.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd gtcif-2026-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the website.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for your interest in the GTCIF 2026 website project! We look forward to a successful event and appreciate your support in making it happen.