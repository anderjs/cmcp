/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

export const storage = diskStorage({
  destination: (req, file, callback) => {
    try {
      const uploads = path.resolve(__dirname, '..', 'database');

      if (!file.mimetype.startsWith('image')) {
        return callback(new Error('Format not allowed'), '');
      }

      callback(null, uploads);
    } catch (err) {
      console.log(err);

      callback(err as Error, '');
    }
  },
  filename: (req, file, callback) => {
    const uuid = v4();
    const ext = path.extname(file.originalname);
    const filename = `${uuid}${ext}`;

    callback(null, filename);
  },
});
