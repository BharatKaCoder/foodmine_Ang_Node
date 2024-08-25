import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHERIZED } from "../constant/http_status";

// export default (req:any, res:any, next:any) => {
//     const token = req.headers.access_token as string;
//     if(!token) return res.status(HTTP_UNAUTHERIZED).send();

//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;
//     } catch(error) {
//         res.status(HTTP_UNAUTHERIZED).send();
//     }
//     return next();   
// }   

// export default (req: any, res: any, next: any) => {
//     const token = req.header('access_token');
//     if (!token) {
//         return res.status(HTTP_UNAUTHERIZED).send('Unauthorized: Missing access token');
//     }

//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;
//         next();
//     } catch (error) {
//         res.status(HTTP_UNAUTHERIZED).send('Unauthorized: Invalid access token');
//     }
// };