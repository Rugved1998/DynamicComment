**Comment System with Google Authentication and Rich Text Features
Overview**

This project is a dynamic comment system integrated with Google Authentication. It allows users to post comments with rich text features, attach files, tag people, sort comments by latest and popularity, and includes pagination. The backend is managed using Firebase, which handles authentication, storage, and database management.
Figma Design
You can view the design for this project in the following Figma file: Comment System Design
Functional Requirements
1.	Google Authentication
o	Integrate Google Authentication to allow users to sign in and post comments.
2.	Comment Input Box
o	Rich text formatting options: bold, italic, underline, and hyperlink.
o	Character limit: 250.
3.	Comment Sorting
o	Sort comments by latest and by popularity (based on reactions).
4.	Comment Features
o	Display user’s profile picture, name, and comment text.
o	Reaction buttons with counts.
5.	Pagination
o	Display 8 comments per page with pagination controls.
Setup Instructions
Prerequisites
•	Node.js and npm/yarn installed.
•	Firebase project set up (Authentication, Firestore, Storage).
•	Google API credentials for authentication.
Installation
1.	Clone the repository:
bash
Copy code
git clone https://github.com/your-username/comment-system.git
cd comment-system
2.	Install dependencies:
bash
Copy code
npm install
# or
yarn install
3.	Set up Firebase:
o	Create a .env file in the root directory and add your Firebase configuration:
makefile
Copy code
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
4.	Start the development server:
bash
Copy code
npm start
# or
yarn start

Features
•	Google Authentication: Users can sign in using Google to post comments.
•	Rich Text Formatting: Apply bold, italic, underline, and hyperlinks to comments.
•	User Tagging: Tag people within comments.
•	Comment Sorting: Sort comments by latest or popularity.
•	Comment Display:
o	Shows profile picture, name, and comment text.
o	Includes reaction buttons and counts.
o	The limit of Comment is set to 250 characters.
•	Pagination: Displays 8 comments per page with pagination controls.

