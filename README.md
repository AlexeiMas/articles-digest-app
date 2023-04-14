# Full stack Next.js application

For first launch app, authentication page opens with validation (sign in/up). Home page
has posts list, top tags, recent comments. On preview post also displays views and comments counters. If user is the
author of post, then he's able to
remove or edit post. Each post has clickable tags, that open access to see all posts with
this tag on separate page. Inside post users can write comments. All routes have validation data and routes protection.

#### Main stack technologies

- Next.js with TypeScript
- Material UI
- Next Auth
- Redux Toolkit
- Redux persist
- react-hook-form
- ajv validation
- MongoDB (Mongoose)
- Multer
- react-markdown
- react-simplemde-editor

***

## Getting Started

Create file in root directory `.env.local` by boilerplate `.env` file

Install mandatory dependencies:

```bash
npm i
```

After, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
