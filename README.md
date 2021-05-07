# A statically generated blog example using Next.js and Ghost CMS


### Step 1. install ghost and start
```bash
ghost start
```
checkout master branch

```bash
git checkout master
```


## Configuration


### Step 2. Set up environment variables for ghost in next.js project

Go to the **http://localhost:2368/ghost/#/integrations** add custom integration

copy **Content API key** 

Next, create `.env.local` file in this directory  and paste this text:

```bash
GHOST_Content_API_key=
GHOST_API_URL=

NEXT_PUBLIC_GHOST_Content_API_key=
NEXT_PUBLIC_GHOST_API_URL=

DEFAULT_PROFILE_URL=https://imgix.cosmicjs.com/8efcc570-9a21-11ea-bf2a-2b6ff88d4f06-e73aee30-1db0-11ea-a594-a170ead8b2cb-12.jpg?auto=format,compress,enhance&w=100&h=100
DEFAULT_IMAGE_URL=https://imgix.cosmicjs.com/96ddc2b0-9a23-11ea-bf2a-2b6ff88d4f06-cover.jpg?auto=format&ixlib=react-9.0.2&w=1946

DISQUS_SHORT_URL=

WEBSITE_HOMEPAGE_URL=

```

### Step 4. Run Next.js in development mode

```bash
npm install
npm run dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! 




