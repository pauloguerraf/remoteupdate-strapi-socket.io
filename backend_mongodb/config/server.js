module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env("URL", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '99a1fec632f15cc9726b714814af541a'),
    },
  },
});