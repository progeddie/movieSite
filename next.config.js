/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/w500/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:lang/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?language=:lang&api_key=${API_KEY}`,
      },
      {
        source: "/:lang/api/genres",
        destination: `http://api.themoviedb.org/3/genre/movie/list?language=:lang&api_key=${API_KEY}`,
      },
      {
        source: "/:lang/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?language=:lang&api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
