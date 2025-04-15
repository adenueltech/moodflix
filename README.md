# MoodFlix - Mood-Based Movie Discovery App

MoodFlix is a web application that helps users discover movies based on their current mood. It integrates with YouTube to allow users to watch movie trailers and full movies directly.

## Features

- Discover movies based on your mood
- Search for movies directly
- Watch movies on YouTube with a single click
- Save movies to your watchlist
- Dark/Light mode toggle
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- A YouTube API key (optional, but recommended for full functionality)

### Installation

1. Clone this repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env.local` file in the root directory and add your YouTube API key:
   \`\`\`
   YOUTUBE_API_KEY=your_youtube_api_key_here
   \`\`\`
4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Mood-Based Discovery

1. Select a mood from the homepage grid
2. Browse movies that match your mood
3. Click on any movie to watch it on YouTube

### Search Functionality

1. Use the search bar at the top of the homepage
2. Enter a movie title or keywords
3. Browse search results
4. Click on any result to watch it on YouTube

### Watchlist

1. Click the bookmark icon on any movie card to add it to your watchlist
2. Access your watchlist from the navigation bar
3. Remove items from your watchlist by clicking the bookmark icon again

## Customization

### Adding Your YouTube API Key

Replace `YOUR_YOUTUBE_API_KEY` in `lib/youtube-api.ts` with your actual YouTube API key.

### Modifying Mood Categories

Edit the `moods` array in `lib/mood-mapping.ts` to add, remove, or modify mood categories.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Movie data provided by mock data (in production, you would use a real movie API)
- YouTube API for video content
- Next.js and React for the frontend framework
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn/ui for UI components
