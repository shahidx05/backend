const redisClient = require("../config/redis");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("No token found");
        }
        const payload = jwt.verify(token, 'secret_key');
        console.log(payload);
        const user = await User.findById(payload.id)
        if (!user) {
            throw new Error("No user found");
        }

        const isTokenBlocked = await redisClient.exists(`token:${token}`);

        if (isTokenBlocked) {
            throw new Error("Token is blocked. Please login again.");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
}

module.exports = userAuth;