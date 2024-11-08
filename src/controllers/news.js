import prisma from "../db/db.js";

export const createNewsController = async (req, res) => {
    const { title, content, categoryId } = req.body
    try {
        if (categoryId) {
            const categories = await prisma.category.findUnique({
                where: {
                    id: categoryId
                },
            })
            if (!categories) {
                return res.status(404).json({ message: "Category not found" })
            }
        }

        const news = await prisma.news.create({
            data: {
                title,
                content,
                categoryId: categoryId || null,
            }
        })
        res.status(201).json(news)
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "News title already exists" })
        }
        res.status(500).json({ message: error.message })
    }
}

export const fetchAllNewsController = async (req, res) => {
    const search = req.query.search
    let filter = {}
    if (search) {
        filter = {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    content: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    }
    try {
        const news = await prisma.news.findMany({
            where: filter,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        res.status(200).json(news)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getNewsByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const news = await prisma.news.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
        })
        if (!news) {
            res.status(404).json({ message: "News not found" })
        }
        res.status(200).json(news)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateNewsController = async (req, res) => {
    const id = req.params.id
    const { title, content, categoryId } = req.body
    try {
        const news = await prisma.news.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!news) {
            res.status(404).json({ message: "News not found" })
        }
        const requestUpdate = {}
        if (title) {
            requestUpdate.title = title
        }
        if (content) {
            requestUpdate.content = content
        }
        if (categoryId) {
            // checking if categoryId is existed
            const categories = await prisma.category.findUnique({
                where: {
                    id: categoryId
                }
            })
            if (!categories) {
                return res.status(404).json({ message: "Category not found" })
            }
            requestUpdate.categoryId = categoryId
        }
        const result = await prisma.news.update({
            where: {
                id: Number(id)
            },
            data: requestUpdate,
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteNewsController = async (req, res) => {
    const { id } = req.params
    try {
        const news = await prisma.news.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!news) {
            res.status(404).json({ message: "News not found" })
        }
        const result = await prisma.news.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            "message": "News deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

