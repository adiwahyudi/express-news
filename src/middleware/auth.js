import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        console.log("Error try to decode token:",error)
        return res.status(403).json({ message: "Unauthorized" })
    }
}

export const adminOnly = (req, res, next) => {
    authMiddleware(req, res, next, () => {
        if (req.user.role === 'admin') {
            next();
        }
        return res.status(403).json({ message: "Unauthorized" })
    });
}
