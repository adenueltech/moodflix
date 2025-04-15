// Define the mood types and their mapping to TMDB genre IDs
// TMDB Genre IDs: https://developers.themoviedb.org/3/genres/get-movie-list

export interface Mood {
  id: string
  title: string
  emoji: string
  genres: number[] // TMDB genre IDs
}

export const moods: Mood[] = [
  {
    id: "happy",
    title: "I want to laugh",
    emoji: "😂",
    genres: [35, 10751], // Comedy, Family
  },
  {
    id: "sad",
    title: "I'm heartbroken",
    emoji: "💔",
    genres: [18, 10749], // Drama, Romance
  },
  {
    id: "thrill",
    title: "I want something thrilling",
    emoji: "😱",
    genres: [27, 53, 9648], // Horror, Thriller, Mystery
  },
  {
    id: "cry",
    title: "I want to cry",
    emoji: "🥲",
    genres: [18], // Drama
  },
  {
    id: "romantic",
    title: "I feel romantic",
    emoji: "❤️",
    genres: [10749], // Romance
  },
  {
    id: "bored",
    title: "I'm bored",
    emoji: "💤",
    genres: [28, 12, 14], // Action, Adventure, Fantasy
  },
  {
    id: "mindblown",
    title: "Blow my mind",
    emoji: "🤯",
    genres: [878, 9648], // Science Fiction, Mystery
  },
  {
    id: "nostalgic",
    title: "Feeling nostalgic",
    emoji: "🕰️",
    genres: [36, 10751], // History, Family
  },
]

// Helper functions to get mood data
export function getMoodGenres(moodId: string): number[] {
  const mood = moods.find((m) => m.id === moodId)
  return mood ? mood.genres : []
}

export function getMoodEmoji(moodId: string): string {
  const mood = moods.find((m) => m.id === moodId)
  return mood ? mood.emoji : "🎬"
}

export function getMoodTitle(moodId: string): string {
  const mood = moods.find((m) => m.id === moodId)
  return mood
    ? mood.title.toLowerCase().replace("i want to ", "").replace("i'm ", "").replace("i feel ", "")
    : "unknown"
}
