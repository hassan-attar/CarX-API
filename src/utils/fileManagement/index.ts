import fs from 'node:fs';

/**
 * Deletes a file if it exists at the specified path.
 * @param filePath - The path to the file to be deleted.
 * @returns A Promise that resolves if the file was deleted or did not exist, and rejects if an error occurred.
 */
export const deleteFileIfExists = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File does not exist
                resolve();
                return;
            }

            // File exists, attempt to delete
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    reject(new Error(`Error deleting file: ${unlinkErr.message}`));
                } else {
                    resolve();
                }
            });
        });
    });
};
