import { S3Client } from "@aws-sdk/client-s3"

// TODO: replace all the variables with environment variables

const cloudflareEndpoint = process.env.CLOUDFLARE_BUCKET_ENDPOINT
const cloudflareAccessKey = process.env.CLOUDFLARE_ACCESS_KEY
const cloudflareSecretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY

const s3 = new S3Client({
    endpoint: cloudflareEndpoint, // Replace with your R2 endpoint
    credentials: {
        accessKeyId: cloudflareAccessKey, // Replace with your access key ID
        secretAccessKey: cloudflareSecretAccessKey, // Replace with your secret access key
    },
    region: 'auto', // R2 uses auto region
    signatureVersion: 'v4', // Use AWS signature version 4
});

export default s3
