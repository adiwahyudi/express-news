import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
    await seedUsers()
    await seedCategories()
    await seedNews()
}
const seedUsers = async () => {
    const password = '123123'
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            name: 'Admin',
            password: hashedPassword,
            role: 'admin'
        },
    })

    const user = await prisma.user.upsert({
        where: { username: 'user' },
        update: {},
        create: {
            username: 'user',
            name: 'user',
            password: hashedPassword,
            role: 'user'
        },
    })
    console.log("Success generate data users")
}

const seedCategories = async () => {
    await prisma.category.upsert({
        where: { name: 'Sport' },
        update: {},
        create: {
            name: 'Sport'
        },
    })

   await prisma.category.upsert({
        where: { name: 'Entertainment' },
        update: {},
        create: {
            name: 'Entertainment'
        },
    })
    console.log("Success generate data categories")
}

const seedNews = async () => {
    await prisma.news.upsert({
        where: { title: 'Tennis Tournament Updates' },
        update: {},
        create: {
            title: 'Tennis Tournament Updates',
            content: 'The Australian Open has announced its schedule for the upcoming season. Top seeds include Novak Djokovic and Ashleigh Barty.',
            categoryId: 1
        },
    })
    await prisma.news.upsert({
        where: { title: 'Taylor Swift Concert in Jakarta' },
        update: {},
        create: {
            title: 'Taylor Swift Concert in Jakarta',
            content: 'Taylor Swift will be having a concert in Jakarta soon!',
            categoryId: 2
        },
    })

    console.log("Success generate data news")
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })