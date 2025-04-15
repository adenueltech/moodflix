// YouTube API key stored in environment variables (Next.js)
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Function to search for movies on YouTube
export async function searchMovieTrailer(
  searchQuery: string,
  isFullMovie = false
): Promise<string | null> {
  if (!YOUTUBE_API_KEY) {
    console.log("No YouTube API key provided, returning default video");
    return "dQw4w9WgXcQ"; // Rick Astley default video
  }

  try {
    const query = isFullMovie
      ? `${searchQuery} full movie`
      : `${searchQuery} official trailer`;

    const url = `${BASE_URL}/search?part=snippet&maxResults=1&q=${encodeURIComponent(
      query
    )}&type=video&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from YouTube API");

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      console.log("No video found for:", searchQuery);
      return null;
    }
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return "dQw4w9WgXcQ"; // Fallback to default video
  }
}

// Function to search for movies with more results
export async function searchMovies(
  searchQuery: string,
  maxResults = 8
): Promise<any[]> {
  if (!YOUTUBE_API_KEY) {
    console.log("No YouTube API key provided, returning mock results");
    return Array(maxResults)
      .fill(null)
      .map((_, i) => ({
        id: { videoId: "dQw4w9WgXcQ" },
        snippet: {
          title: `${searchQuery} Result ${i + 1}`,
          description:
            "This is a mock result because no YouTube API key was provided.",
          thumbnails: {
            high: { url: `https://picsum.photos/seed/${i + 1}/480/360` },
          },
        },
      }));
  }

  try {
    const url = `${BASE_URL}/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
      searchQuery + " full movie"
    )}&type=video&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from YouTube API");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return Array(maxResults)
      .fill(null)
      .map((_, i) => ({
        id: { videoId: "dQw4w9WgXcQ" },
        snippet: {
          title: `${searchQuery} Result ${i + 1}`,
          description: "This is a mock result due to an API error.",
          thumbnails: {
            high: { url: `https://picsum.photos/seed/${i + 1}/480/360` },
          },
        },
      }));
  }
}

// Function to get video details (title, thumbnail, etc.)
export async function getVideoDetails(videoId: string) {
  if (!YOUTUBE_API_KEY) {
    return {
      title: "Movie",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }

  try {
    const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch video details");

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const snippet = data.items[0].snippet;
      return {
        title: snippet.title,
        thumbnail: snippet.thumbnails.high.url,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}
