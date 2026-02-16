import Joi from "joi";

export const validationSchema = Joi.object({
    PORT: Joi.number().port().default(3001),

    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required().hostname(),
    POSTGRES_PORT: Joi.number().port().required(),
    POSTGRES_DB: Joi.string().required(),
    DATABASE_URL: Joi.string().uri({scheme: ['postgres', 'postgresql']}).required(),

    BCRYPT_SALT: Joi.number().integer().min(4).max(20).required(),

    JWT_SECRET_KEY: Joi.string().required().min(64),

    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.number().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),

    FRONTEND_URL: Joi.string().default("http://localhost:3000").uri().required()
})