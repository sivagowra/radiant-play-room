# Google OAuth Setup Instructions

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required information (App name, User support email, etc.)
   - Add your email to test users if needed
   - Click **Save and Continue** through the steps

## Step 2: Create OAuth Client ID

1. In **Credentials**, click **Create Credentials** > **OAuth client ID**
2. Choose **Web application** as the application type
3. Give it a name (e.g., "LearnHub OAuth")
4. Add **Authorized JavaScript origins**:
   - `http://localhost:8080` (for local development)
   - `https://sivagowra.github.io` (for production)
5. Add **Authorized redirect URIs**:
   - `http://localhost:8080` (for local development)
   - `https://sivagowra.github.io/radiant-play-room/` (for production)
6. Click **Create**
7. Copy the **Client ID** (it looks like: `xxxxx.apps.googleusercontent.com`)

## Step 3: Configure Your App

1. Create a `.env` file in the root of your project:
   ```bash
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```

2. Replace `your-client-id-here.apps.googleusercontent.com` with your actual Client ID

3. For GitHub Pages deployment, you'll need to add the environment variable as a GitHub Secret:
   - Go to your repository on GitHub
   - Settings > Secrets and variables > Actions
   - Click **New repository secret**
   - Name: `VITE_GOOGLE_CLIENT_ID`
   - Value: Your Google Client ID
   - Click **Add secret**

4. Update the GitHub Actions workflow to use the secret (if needed)

## Step 4: Test Locally

1. Make sure your `.env` file is in the root directory
2. Run `npm run dev`
3. Try signing in with Google
4. You should see a Google sign-in popup

## Important Notes

- The `.env` file is already in `.gitignore` so it won't be committed
- For production, make sure to add your production domain to authorized origins
- The app will work without the Client ID, but Google login won't function

