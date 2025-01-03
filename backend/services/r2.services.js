// import s3 from '../cloudflare-config.js';
import imageType from 'image-type';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // for v3(aws-sdk for v2)

const imageDownloadPath =
    'https://api.stb.gov.sg/media/download/v2/101ffc63dfe013848d39f6511f8848ff923';
// TODO: need to separate the image array
// read the file and put it in the body
export const uploadImageToR2 = async (imageUuid, imageData) => {
    const cloudflareEndpoint = process.env.CLOUDFLARE_BUCKET_ENDPOINT;
    // console.log('cloudflareEndpoint ==> ', cloudflareEndpoint);
    const cloudflareAccessKey = process.env.CLOUDFLARE_ACCESS_KEY;
    // console.log('cloudflareAccessKey  ==> ', cloudflareAccessKey);
    const cloudflareSecretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
    // console.log('cloudflareSecretAccessKey ==> ', cloudflareSecretAccessKey);

    const s3 = new S3Client({
        endpoint: cloudflareEndpoint, // Replace with your R2 endpoint
        credentials: {
            accessKeyId: cloudflareAccessKey, // Replace with your access key ID
            secretAccessKey: cloudflareSecretAccessKey, // Replace with your secret access key
        },
        region: 'auto', // R2 uses auto region
        signatureVersion: 'v4', // Use AWS signature version 4
    });
    // change to Buffer for imageType to work
    const imageBuffer = Buffer.from(imageData);
    const fileType = imageType(imageBuffer); //eg. => {ext: 'png', mime: 'image/png'}

    if (fileType) {
        const contentType = fileType.mime; // 'image/jpeg', 'image/png', etc.
        const fileExtension = fileType.ext;

        const uploadParams = {
            Bucket: 'sgspots', // bucket name
            Key: `${imageUuid}.${fileExtension}`, // id of the uploaded file used in bucket
            Body: imageBuffer, // actual data of obj uploaded, usually in Buffer, Stream or Blob
            contentType: contentType, // type of content
        };
        // procced w uploading
        const uploadImageResponse = await s3.send(
            new PutObjectCommand(uploadParams)
        );
        console.log('image successfully uploaded to cloudflare R2');
    } else {
        console.error('unable to upload to r2');
    }
};
