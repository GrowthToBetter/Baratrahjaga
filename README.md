# Full-Stack Application Deployment Guide

This guide walks you through every step from cloning the repository to deploying your application on Vercel. Follow these instructions for a smooth development and deployment experience.

## Prerequisites

Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A [Vercel](https://vercel.com/) account
- A [GitHub](https://github.com/) account

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/GrowthToBetter/Ridhaamanta.git

# Navigate to the project directory
cd Ridhaamanta
```

## Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```
# Example environment variables
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_connection_string
# Add any other required environment variables
```

## Step 4: Run the Development Server

```bash
# Start the development server
npm run dev
```

Your application will now be running at [http://localhost:3000](http://localhost:3000).

## Step 5: Make Your Changes

Edit files in the project as needed. The development server will automatically reload when you save changes.

## Step 6: Commit Your Changes

```bash
# Add all changes to staging
git add .

# Commit the changes
git commit -m "Your descriptive commit message"
```

## Step 7: Push to GitHub

```bash
# If you cloned from your repo, simply push
git push origin main

# If you forked from another repo, first add your repository
git remote add origin https://github.com/GrowthToBetter/Ridhaamanta.git
git push -u origin main
```

## Step 8: Deploy to Vercel

### Option 1: Deploy through Vercel Dashboard (Recommended for beginners)

1. Visit [Vercel](https://vercel.com/) and log in
2. Click "Import Project"
3. Choose "Import Git Repository" and select your repository
4. Configure your project:
   - Set the Framework Preset to "Next.js"
   - Add environment variables from your `.env` file
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow the prompts to configure your project
```

### Option 3: Enable Automatic Deployments

For automatic deployments when you push to GitHub:

1. In your Vercel project settings, go to "Git Integration"
2. Enable "Auto Deployments"
3. Configure branch deployments as needed

## Step 9: Access Your Deployed Application

After deployment completes, Vercel will provide you with a URL to access your application (typically `https://ridhaamantadharmabhaktiar.vercel.app`).

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check the build logs in Vercel for specific errors
2. **Environment Variables**: Ensure all required environment variables are set in Vercel
3. **Dependencies Issues**: Make sure you're using compatible package versions

### Commands for Common Tasks:

```bash
# Update dependencies to latest versions
npm update

# Clean install (removes node_modules and reinstalls)
rm -rf node_modules && npm install

# Run build locally to check for issues
npm run build
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Git Guides](https://github.com/git-guides)

## Updating Your Deployment

When you make changes to your application, simply commit them and push to GitHub. If you've set up automatic deployments, Vercel will deploy the new version automatically.

```bash
git add .
git commit -m "Update description"
git push origin main
```

Congratulations! You've successfully deployed your application to Vercel.
