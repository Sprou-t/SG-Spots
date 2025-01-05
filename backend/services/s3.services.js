// import s3 from '../cloudflare-config.js';
import imageType from 'image-type';
import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'; // for v3(aws-sdk for v2)
import { createS3Client } from '../s3-config.js';

const imageDownloadPath =
    'https://api.stb.gov.sg/media/download/v2/101ffc63dfe013848d39f6511f8848ff923';

// TODO: need to separate the image array
// read the file and put it in the body
export const uploadImageToS3 = async (imageUuid, imageData) => {
    try {
        const s3 = createS3Client();

        // change to Buffer for imageType to work
        const imageBuffer = Buffer.from(imageData, 'base64');
        // console.log('Is Buffer:', Buffer.isBuffer(imageBuffer));
        // console.log('First 20 bytes of imageBuffer:', imageBuffer.slice(0, 20));
        const fileType = await imageType(imageBuffer); //eg. => {ext: 'png', mime: 'image/png'}

        if (fileType) {
            const contentType = fileType.mime; // 'image/jpeg', 'image/png', etc.
            const fileExtension = fileType.ext;

            const uploadParams = {
                Bucket: 'sgspots', // bucket name
                Key: `reviewImages/${imageUuid}`, // id of the uploaded file used in bucket
                Body: imageBuffer, // actual data of obj uploaded, usually in Buffer, Stream or Blob
                ContentType: contentType, // type of content
            };
            // procced w uploading
            await s3.send(new PutObjectCommand(uploadParams));
            console.log('image successfully uploaded to cloudflare R2');
        } else {
            console.error('unable to upload to r2');
        }
    } catch (err) {
        console.error('Error uploading image:', err);
    }

};

export const extractImageFromS3 = async (imgUuid) => {
    // Create S3 client instance
    const s3 = createS3Client();

    // Define parameters for the image (bucket and object key)
    const bucket = 'sgspots'
    const key = `reviewImages/${imgUuid}`

    try {
        // Get the public URL of the image
        const imageUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        // Return the public URL of the image
        return imageUrl;
    } catch (err) {
        console.error('Error fetching image from R2:', err);
    }
};
