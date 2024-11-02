import prisma from "../db/db.js";

export const createCategoryController = async (req, res) => {
    const { name } = req.body
    try {
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const fetchAllCategoryController = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCategoryByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCategoryController = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        }
        const result = await prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCategoryController = async (req, res) => {
 const { id } = req.params
    try {
        const newsCount = await prisma.news.count({
            where: {
                categoryId: Number(id)
            }
        });

        if (newsCount > 0) {
            return res.status(400).json({
                message: "Cannot delete category. There are news items associated with this category."
            });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        }
        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            "message": "Category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

