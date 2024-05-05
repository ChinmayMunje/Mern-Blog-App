import  jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
//  const token = req.cookies.accessToken
const token = req.headers.authorization?.split(' ')[1];

 console.log("TOKEN---> "+token);

 if(!token){
    return res.status(401).json({success: false, message: "You are not authorized !"});
 }

 // IF TOKEN EXIST THEN VERIFY TOKEN

 jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
    if(err){
        return res.status(401).json({success: false, message: "Token is invalid"}); 
    }
    req.user = user;
    next();
 })

}

// export const verifyToken = (req, res, next) => {
//     // Get token from headers
//     const token = req.headers.authorization?.split(' ')[1];

//     console.log("TOKEN "+token);

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     // Verify token
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Failed to authenticate token' });
//         }
//         // Token is valid, proceed to next middleware
//         // req.userId = decoded.userId;
//         req.userId = decoded;

//         next();
//     });
// };

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        } else {
           return res.status(401).json({success: false, message: "You are not authenticated"});        }
    })
}


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role === 'admin'){
            next()
        } else {
            return res.status(401).json({success: false, message: "You are not authorized"});  
              }
    })
}


// export const authMiddleware = async(req,res, next)=>{
//     const Authorization = req.headers.Authorization || req.headers.Authorization
//     if(Authorization && Authorization.startsWith('Bearer')){
//         const token = Authorization.split(' ')[1]
//         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
//             if(err){
//                 return res.status(401).json({success: false, message: "Token is invalid"}); 
//             }
//             req.user = user;
//             next();
//          })
//     }else{
//         return res.status(401).json({success: false, message: "You are not authorized"});  
//     }
// }