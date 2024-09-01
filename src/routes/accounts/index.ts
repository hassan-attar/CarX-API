import { Router } from 'express';
import {getProfile, patchProfile, removeProfileImage} from "../../controllers/accounts";
import isAuthenticatedMiddleware from "../../middlewares/isAuthenticatedMiddleware";
import multer from "multer";
import InvalidFileTypeError from "../../errors/ClientError/InvalidFileTypeError";
import path from "node:path";
const allowedTypes = ['image/jpeg', 'image/png'];
const router = Router();
const storage = multer.diskStorage({
    destination: function (__, _, cb) {
        console.log("1")
        cb(null, path.join(__dirname, "..", "..", "..", "tmp"))
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter(_, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new InvalidFileTypeError({
                details: [{
                    message: "supported format for images: image/jpeg, image/png"
                }]
            }));
        }
        callback(null, true);
    }
})

router.use(isAuthenticatedMiddleware)

router.get("/profile", getProfile)
router.patch("/profile", upload.single("profileImage"), patchProfile)
router.delete("/profile/image", removeProfileImage)

export default router;