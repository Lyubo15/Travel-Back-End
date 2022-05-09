module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongodb",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    PORT: process.env.PORT || 3000,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME, 
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}