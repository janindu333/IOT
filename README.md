To build your React application and deploy it to GitHub Pages, you can follow these steps:

1. **Install the `gh-pages` package**:
   
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Update your `package.json` file**:
   
   Add the following fields to your `package.json`:

   ```json
   {
     "homepage": "https://<username>.github.io/<repository>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

   Replace `<username>` with your GitHub username and `<repository>` with your repository name.

   Example `package.json`:

   ```json
   {
     "name": "your-app-name",
     "version": "0.1.0",
     "private": true,
     "dependencies": {
       "react": "^17.0.2",
       "react-dom": "^17.0.2",
       "react-scripts": "4.0.3"
     },
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://<username>.github.io/<repository>"
   }
   ```

3. **Create a `.env` file at the root of your project (optional but recommended)**:

   Add the following line to ensure your build path works correctly on GitHub Pages:

   ```plaintext
   PUBLIC_URL=.
   ```

4. **Build and deploy the project**:

   Run the following command to build and deploy your project to GitHub Pages:

   ```bash
   npm run deploy
   ```

5. **Push your changes to GitHub**:

   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

   Make sure your local branch is up to date with your remote branch.

6. **Verify the deployment**:

   Go to your repository's settings on GitHub, scroll down to the "GitHub Pages" section, and ensure that the source is set to the `gh-pages` branch. After a few minutes, your site should be available at `https://<username>.github.io/<repository>`.

By following these steps, you will be able to deploy your React application to GitHub Pages, and any future changes can be deployed by running `npm run deploy`.