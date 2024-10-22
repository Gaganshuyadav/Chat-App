import multer from "multer";

export const multerUpload = multer({
    limits: {
        filesize: 1024 * 1024 * 5,
    }
})

