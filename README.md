# Tic-Tac-Toe Game

A simple Tic-Tac-Toe game built to play with my daughter and demonstrate basic web development concepts. This project shows how we can use modern technologies like Next.js, React, Tailwind CSS, and TypeScript to create an interactive and aesthetically pleasing game.

## Features

- **Responsive UI**: Works on all device sizes.
- **Light/Dark Mode Toggle**: Users can switch between light and dark themes.
- **Custom Cursor**: Instead of the default mouse cursor, an icon representing the current player (X or O) follows the mouse.
- **Dynamic Board**: Interactive 3x3 Tic-Tac-Toe board with animated turns and a clear visual style.
- **Score Tracking**: The game keeps track of how many times X or O has won, as well as the number of draws.
- **Persistence**: Win and draw counts are saved to `localStorage`, so scores persist across page reloads.
- **Card Layout**: The board is displayed within a card-like container with a subtle shadow for a polished look.

## Technologies Used

- **Next.js (v15)** with App Router
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid, utility-first styling
- **Local Storage** for persisting scoreboard data

## Getting Started

### Installation

#### Clone the repository:

```bash
git clone https://github.com/gbflores/tic-tac-toe.git
```

#### Navigate to the project directory:

```bash
cd tic-tac-toe
```

#### Install dependencies:

```bash
npm install
```

### Running the Development Server

#### Start the development server:

```bash
npm run dev
```

#### Open http://localhost:3000 in your browser to see the game.

### Building for Production

#### To create an optimized production build:

```bash
npm run build
```

Then, run the production server:

```bash
npm run start
```

#### Your app should now be available at http://localhost:3000.

## How to Play

- The game starts by letting the first player (X) choose a cell.
- Players alternate turns placing their mark (X or O) on an empty cell.
- The first player to align three marks horizontally, vertically, or diagonally wins.
- If all cells are filled and no player has aligned three marks, the game is a draw.
- Click Restart! when the game ends to start a new round.
