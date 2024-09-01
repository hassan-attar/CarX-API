import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

interface Options {
    filename: string;
    filePath: string;
}
import {deleteFileIfExists} from "../fileManagement"

const profileImageTransformer = sharp()
    .resize({
        width: 500,
        height: 500,
    }).jpeg({ quality: 70 })

export const deleteProfileImage = async (filename: string): Promise<boolean> => {
    const filePermanentPath = path.join(__dirname, "..", "..", "..", "static", filename);
    return new Promise<boolean>((resolve, _) => {
        deleteFileIfExists(filePermanentPath).then(() => {
            resolve(true)
        }).catch((err) => {
            console.log("Error in deleting the file");
            throw err;
        })
    })
}

export const saveProfileImage = async (options: Options): Promise<string> => {
    const filename = `${options.filename}.jpg`;
    const filePermanentPath = path.join(__dirname, "..", "..", "..", "static", filename);
    return new Promise<string>((resolve, _) => {
        const readStream = fs.createReadStream(options.filePath);
        const writeStream = fs.createWriteStream(filePermanentPath);

        readStream
            .pipe(profileImageTransformer)
            .pipe(writeStream)
            .on('finish', () => {
                resolve(filename);
            })
            .on('error', (error) => {
                console.log("Error in Image processing");
                throw error; // TODO replace with a specific error type
            });
    }).finally(() => {
        deleteFileIfExists(options.filePath).catch((err) => {
            console.log("Error in deleting the file");
            throw err;
        })
    })
};

