# Fintrack — Personal Finance Tracker

React 18 with the Create React App toolchain, React Router, Ant Design, Ant Design Plots, Firebase Authentication, Cloud Firestore and Papa Parse.

## Run locally

```sh
npm install
npm start
```

Without Firebase configuration, the app opens a **local demo** with sample transactions. Demo changes persist in localStorage; demo mode is not authentication and must not be used for sensitive data.

## Enable Firebase

1. Create a Firebase project and register a web app.
2. Copy `.env.example` to `.env.local` and fill in the web app configuration from Firebase project settings.
3. Enable **Email/Password** and **Google** in Authentication → Sign-in method. Add your localhost and deployed domain to authorized domains.
4. Create a Cloud Firestore database. Deploy the included `firestore.rules` before using it with real data.
5. Restart the development server (or rebuild for hosting).

Authentication uses persistent Firebase sessions. Each account reads and writes only `users/{uid}/transactions`; the rules reject other users and validate transaction fields. Firestore snapshot subscriptions update totals, charts and the table automatically.

## Features

- Email/password registration and login, Google sign-in and logout.
- Income/expense modals; create, edit and confirm deletion.
- Overview, Transactions, Insights and Settings routes.
- Period filters, name search, type dropdown and segmented control, date and amount sorting, pagination.
- Cash-flow area chart and spending donut chart using Ant Design Plots.
- CSV import validates all rows before a single batch write (maximum 500 rows / 2 MB). Imports append, including duplicate rows. CSV export exports the currently filtered transactions and escapes spreadsheet formulas.
- Responsive desktop and mobile layout.

CSV columns: `name,type,amount,date,category,note`. `type` is `income` or `expense`; `date` is `YYYY-MM-DD`. Export a CSV for a compatible template. Categories are listed in Settings.

## Verification and hosting

```sh
npm test -- --runInBand
npm run build
```

For Firebase Hosting, install/use the Firebase CLI, sign in, select your project, then run `firebase deploy --only firestore:rules,hosting --project YOUR_PROJECT_ID`. The included `firebase.json` enables client-side routing. For Netlify, import this project, set the Firebase environment variables and use the included `netlify.toml`.

For Vercel, the included `vercel.json` configures the CRA build and client-side routing. Deploy with `vercel deploy --prod --build-env GENERATE_SOURCEMAP=false`. Source maps are disabled for this deployment to avoid upstream AntV missing-source-map warnings. Add the `REACT_APP_FIREBASE_*` variables in Vercel project settings and redeploy to enable Firebase; authorize the deployment domain in Firebase Authentication.

The supplied Figma reference was inaccessible to the connected account, so the interface is an original implementation of the project requirements. Real provider sign-in, session persistence and Firestore rules require verification against your configured Firebase project. Without Firebase configuration, hosted deployments run in local demo mode.
