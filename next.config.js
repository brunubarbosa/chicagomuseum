module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: [
      "www.artic.edu",
      "https://artic-web.imgix.net",
      "artic-web.imgix.net",
    ],
  },
};
