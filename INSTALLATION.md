# Aircall Phone App

This is a React application that displays a list of calls with the ability to view call details, archive/unarchive individual calls, and archive/unarchive all calls at once.

## Features

- Activity Feed - A list of all non-archived calls
- Archived Calls - A list of all archived calls
- Call Details - View detailed information about a specific call
- Archive/Unarchive - Toggle archive status for individual calls
- Archive All - Archive all calls in the activity feed
- Unarchive All - Unarchive all calls in the archived tab
- Smooth Transitions - Elegant animations between views and actions

## UI/UX Features

- Staggered animations for call list items
- Smooth transitions between tabs
- Hover effects on interactive elements
- Ripple effect on buttons
- Scale and transform animations for a modern feel
- Minimalist design with subtle animations
- Virtualized lists for optimal performance with large datasets

## Performance Optimizations

- Virtualized lists using react-window for efficient rendering of large lists
- Proper cleanup of timeouts and effects to prevent memory leaks
- Use of will-change CSS property for better animation performance
- Optimized state updates to prevent unnecessary re-renders
- Memoized callback functions with useCallback for better performance
- Animation-fill-mode: forwards to ensure animations complete properly

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Steps to Install and Run

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```
   yarn install
   ```

   or

   ```
   npm install
   ```

3. Start the development server:

   ```
   yarn start
   ```

   or

   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Information

The app uses the Aircall API with the following endpoints:

- `GET /activities` - Get all calls
- `GET /activities/<call_id>` - Get details for a specific call
- `PATCH /activities/<call_id>` - Update a call's archive status
- `PATCH /reset` - Reset all calls to their initial state

Note: The API is hosted on a free server that may go to sleep after periods of inactivity. If you encounter errors on the first API call, please wait 30-60 seconds and try again.

## Technologies Used

- React
- TypeScript
- CSS (with animations and transitions)
- Font Awesome (for icons)

## Project Structure

```
src/
├── api/
│   └── activities.ts - API service functions
├── components/
│   ├── ActivityFeed.tsx - Displays non-archived calls
│   ├── ActivityDetail.tsx - Shows details of a selected call
│   ├── Archive.tsx - Displays archived calls
│   ├── Header.tsx - App header
│   ├── Footer.tsx - App footer
│   └── CallItem.tsx - Individual call item component
├── types/
│   └── index.ts - TypeScript type definitions
├── App.tsx - Main application component
└── index.tsx - Entry point
```
