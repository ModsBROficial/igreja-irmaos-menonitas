module.exports  = {
    versionApi: "v1",
    api: process.env.NODE_ENV === "production" ? "https://igreja-irmaos-menonitas.vercel.app/api" : "http://localhost:3000/api"
}