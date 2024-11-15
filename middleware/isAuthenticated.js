import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Please Provide Token" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        // console.log("decode", decode);

        req.id = decode.userId;

        next();
    } catch (error) {
        console.log("Unauthorized", error);
        return res.status(500).json({ message: "Unauthorized", error });
    }
}

export default isAuthenticated;