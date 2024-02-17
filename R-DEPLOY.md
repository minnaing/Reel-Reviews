# Deploying a React App

Here's a step-by-step guide to get our React app published on GitHub Pages. Before we start, make sure we have a GitHub account and that our React app is in a Git repository.

```bash
ls -a
```

This will list all files, including hidden files, and will tell us if we have a `.git` file in our project.

## Step 1: Add Homepage to `package.json`

In our React app's `package.json`, add a `homepage` field. Replace `ourusername` with our GitHub username, and `our-app-name` with the name of our GitHub repository.

```json
"homepage": "https://ourusername.github.io/our-app-name",
```

## Step 2: Install `gh-pages`

Run the following command in our project directory to install the `gh-pages` package, which helps create a gh-pages branch on GitHub and publish our app to it.

```bash
npm install --save gh-pages
```

## Step 3: Add Deployment Scripts

In the same `package.json` file, add the following scripts to automate the deployment process.

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  ...
},
```

## Step 4: Create a GitHub Repository

We have already create a repository on GitHub and pushed our project to it. We can re-initialize it with:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then follow the instructions on GitHub to add a remote and push our code.

## Step 5: Deploy to GitHub Pages

Now, we can deploy our app to GitHub Pages by running:

```bash
npm run deploy
```

This command builds the app, creates/updates the `gh-pages` branch, and pushes the build to that branch.

## Step 6: Configure GitHub Pages on GitHub

- Go to our repository on GitHub and navigate to the "Settings" tab.
- Scroll down to the "Pages" section.
- Under "Source", select the `gh-pages` branch and save.

Our app should now be live at `https://ourusername.github.io/our-app-name`.

## Step 7: Verify Deployment

After the deployment, visit `https://ourusername.github.io/our-app-name` to see our deployed React app. It may take a few minutes for the changes to be visible.

### Notes

- If our React app uses React Router, we might need to adjust our routing for GitHub Pages. We have to consider using `HashRouter` instead of `BrowserRouter` for client-side routing to work correctly on GitHub Pages.

- Ensure that our repository is public if we want our site to be accessible by everyone.

This guide provides a basic overview of deploying our React app to GitHub Pages. Depending on our project's specifics, and possible pivots, we might need to adjust some steps.
