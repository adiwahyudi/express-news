import express from "express";
import { adminOnly,requestValidation } from "./middleware/index.js";
import {
    loginSchema,
    categorySchema,
    createNewsSchema,
    updateNewsSchema,
    getPathById,
    registerSchema
} from "./schema/index.js";
import { loginController, registerController } from "./controllers/auth.js";
import {
    fetchAllNewsController,
    getNewsByIdController,
    createNewsController,
    updateNewsController,
    deleteNewsController
} from "./controllers/news.js";
import {
    fetchAllCategoryController,
    createCategoryController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController
} from "./controllers/index.js";

const router = express.Router()
// Auth
router.post('/auth/login', requestValidation(loginSchema, 'body'), loginController )
router.post('/auth/register', requestValidation(registerSchema, 'body'), registerController )

// Category
router.get('/categories', adminOnly, fetchAllCategoryController)
router.post('/categories', adminOnly, requestValidation(categorySchema, 'body'), createCategoryController)
router.get('/categories/:id', adminOnly,requestValidation(getPathById, 'params') , getCategoryByIdController)
router.put('/categories/:id', adminOnly, requestValidation(getPathById, 'params'), requestValidation(categorySchema, 'body'), updateCategoryController)
router.delete('/categories/:id', adminOnly, requestValidation(getPathById, 'params'), deleteCategoryController)

// News
router.get('/news', fetchAllNewsController)
router.get('/news/:id', requestValidation(getPathById, 'params'), getNewsByIdController)
router.post('/news', adminOnly, requestValidation(createNewsSchema, 'body'), createNewsController)
router.put('/news/:id', adminOnly, requestValidation(getPathById, 'params'), requestValidation(updateNewsSchema, 'body'), updateNewsController)
router.delete('/news/:id', adminOnly, requestValidation(getPathById, 'params'), deleteNewsController)
export default router