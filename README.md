# SG Spots

## Technology

<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
	<code><img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" title="Tailwind CSS"/></code>
    <code><img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" title="AWS"/></code>
    <code><img width="50" src="https://devicon-website.vercel.app/api/firebase/plain-wordmark.svg" alt="Firebase" title="Firebase"/></code>
</div>

## Description

SG SPOTS began as a side project with a simple yet powerful mission: to create a platform where users can share honest and real reviews about attractions, events, and places in Singapore. Unlike many other review platforms, SG SPOTS does not rely on predetermined algorithms that prioritize more popular spots, allowing for a truly unbiased experience. The goal is to give both locals and visitors a space to share their authentic experiences, helping others discover hidden gems or lesser-known places that might otherwise be overlooked. With a commitment to transparency and integrity, SG SPOTS ensures that every review reflects the genuine opinions of its users, fostering a community built on trust and open feedback. All our data is retrieved from the Singapore Tourism Information and Services Hub, ensuring that the information shared on SG SPOTS is accurate and up-to-date.

[Visit Official Website](http://54.251.144.57:8080/)

## Getting started

### Dependencies

Ensure you have the following installed on your machine:

Node.js (Version 16 or later)
npm (Comes with Node.js)
Git (For cloning the repository)
AWS CLI (If interacting with AWS services locally)
Firebase CLI (For local Firebase setup, if applicable)

### Installing and set up

To get SG SPOTS up and running locally on your machine, follow these steps:

1. Clone the repository:

First, clone the repository to your local machine. In your terminal, run the following command:

git clone https://github.com/Sprou-t/sg-spots.git

2. After cloning the repo, move into the project folder:

cd sg-spots
Install dependencies:

3. Make sure you have Node.js and npm installed. You can verify this by running:
   node -v
   npm -v
   If these are installed, run the following command to install all the required dependencies:
   npm install

4. set up mongodb atlas

- remember to set your mongodb api key

5. Set up AWS CLI

If you're interacting with AWS services locally, ensure that the AWS CLI is installed:
aws --version
Follow the official guide to configure the AWS CLI with your credentials if necessary.
Environment Configuration:

6. If your project requires environment variables (such as API keys or Firebase config), make sure to create a .env file in the root of your project and add the necessary keys.

Example:
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_AWS_ACCESS_KEY=your_aws_access_key
mongo_URI = your_mongo_URI

### Executing program

To run SG SPOTS locally in development mode, follow these steps:

#### Run the app in development mode:

In your terminal, inside the project folder, run:

npm run dev
This will start the development server and open your app in the browser (typically at http://localhost:3000 or a similar URL).
Access the app:

Open your browser and go to the specified address (e.g., http://localhost:8080) to view the app.

## Help

- 404 get error when refreshing page in deployment mode due to the usage of BrowserRouter from React Router Dom. Issue rectified with hashrouting instead but would be open for other solutions.stackoverflow issue here: (https://stackoverflow.com/questions/79374870/page-refresh-not-working-on-deployment-but-works-in-local-environment)

## Authors

[Lau Wei Bin](https://github.com/Sprou-t?tab=repositories)

## Version History

- 0.1
    - initial release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgements

Inspiration, code snippets, etc.
