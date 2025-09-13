import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const isImage = (file: Express.Multer.File): boolean => {
    return !!file.mimetype.match(/^image\/(jpeg|png|gif)$/);
};

export const isVideo = (file: Express.Multer.File): boolean => {
    return !!file.mimetype.match(/^video\/(mp4|avi|mkv)$/);
};

export const isPdf = (file: Express.Multer.File): boolean => {
    return file.mimetype === 'application/pdf';
};

export const getFileSizeLimit = (file: Express.Multer.File): number => {
    if (isImage(file)) {
        return 10 * 1024 * 1024;
    } else if (isVideo(file)) {
        return 50 * 1024 * 1024;
    } else if (isPdf(file)) {
        return 20 * 1024 * 1024;
    }
    return 2 * 1024 * 1024;
};

export const destination = (req, file, callback) => {
    if (isImage(file)) {
        callback(null, path.join(process.cwd(), 'public', 'images'));
    } else if (isVideo(file)) {
        callback(null, path.join(process.cwd(), 'public', 'videos'));
    } else if (isPdf(file)) {
        callback(null, path.join(process.cwd(), 'public', 'pdfs'));
    } else {
        callback(new BadRequestException('Invalid file type'), false);
    }
};

export const generateFileName = (req, file, callback) => {
    const fileName = `${Date.now()}-${Math.random() * 1000}${path.extname(file.originalname)}`;
    callback(null, fileName);
};

export const fileFilter = (req, file, callback) => {
    if (!isImage(file) && !isVideo(file) && !isPdf(file)) {
        return callback(new Error('Invalid file type'), false);
    }
    callback(null, true);
};



export const multerOptions:MulterOptions = {
    storage: diskStorage({
        destination: destination,
        filename: generateFileName,
    }),
    // limits: {
    //     fileSize: (req, file, callback) => {
    //         const sizeLimit = getFileSizeLimit(file);
    //         callback(null, sizeLimit);
    //     },
    // },
    fileFilter: fileFilter,
};