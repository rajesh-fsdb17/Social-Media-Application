const PASSWORD = "confidential";
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer")){
        return res.status(403).json({
            message: "Missing authorization"
        })
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, PASSWORD);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } 
    } catch (err) {
        return res.status(403).json({
            error: err.message
        });
    }
};

module.exports = {
    authMiddleware
}
    
