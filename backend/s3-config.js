import { S3Client } from "@aws-sdk/client-s3"

// TODO: replace all the variables with environment variables

export const createS3Client = () => {
    const awsAccessKey = process.env.AWS_ACCESS_KEY;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!awsAccessKey || !awsSecretAccessKey) {
        throw new Error("AWS environment variables are missing or invalid!");
    }

    return new S3Client({
        credentials: {
            accessKeyId: awsAccessKey,
            secretAccessKey: awsSecretAccessKey,
        },
        region: 'ap-southeast-1',
    });
};
