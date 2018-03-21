# An PoC for a Candidate Welcome Application

The application requires the following environment variables:

RUNNING_LOCALLY=true **only required for local testing, not required when deployed to AWS**

APPSECRET= **any random string, used for session management e.g. 1234567890**

- The following variables are required to be correct if the application is running with active Lambdas in the background, but can contain any value if running in UI test mode


ADMISSION_BUCKET = **e.g. dvsa.ftts.aps.tony-candidates**

CANDIDATE_WEBM_VIDEO_DIR = **e.g. candidate-webm-video**

# Running locally

- Ensure there is a local **.env** file containing the environment variables as above
- Run **npm i** from the root of the candidate-app folder
- Run **npm run start**
- Access the application in the local browser at **http://localhost:3000**