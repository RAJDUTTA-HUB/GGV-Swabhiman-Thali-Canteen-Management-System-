const userModel = require('../Models/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require("../Models/BlacklistedTokenModel");
const adminModel = require('../Models/admin.Model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message:"Access denied | token not found "})
    }

   const isBlacklisted = await BlacklistedToken.findOne({ token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Access denied  " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = {
        _id: decoded._id,
        role: decoded.role,
        user
    };
    return next();
}

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message:"Access denied | token not found "})
    }
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (!token) {
        return res.status(401).json({message:"Access denied | token not found "})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findById(decoded._id);
    req.admin = admin;
    return next();
}
module.exports.verifyAdmin = (req, res, next) => {
    try {
         const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message:"Access denied | token not found "})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin") {
  return res.status(403).json({ message: "Access denied | Admins only" });
    }
     req.admin = decoded;
    next();
    } catch (error) {
          return res.status(401).json({ message: "Invalid token" });
    }
   
}
module.exports.verifyUser = (req, res, next) => {
    try {
       const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        if (!token) {
            return res.status(401).json({ message: "Access denied | token not found" });

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "user") {
            return res.status(403).json({ message: "Access denied | user only" });
           
        }
         req.user = decoded;
            next();
    } catch (error) {
           return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
