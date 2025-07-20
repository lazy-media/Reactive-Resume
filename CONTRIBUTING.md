# Contributing to Reactive Resume

> ### I apologize if this is not the most efficient way to test this application, but it is the best way I have found that actually works.

## Getting the project set up locally

There are a number of Docker Compose examples that are suitable for a wide variety of deployment strategies depending on your use-case. All the examples can be found in the `tools/compose` folder.

We are going to use the Simple (default) version for testing locally in this example and a Windows PC.

#### Requirements

- [Docker for Windows](https://www.docker.com)
- [VSCode](https://code.visualstudio.com/)

## 1. Fork and Clone the Repository

- Fork the Repository to your GitHub Account
- Open VSCode
- In the Search Bar at the top, click on `Show and Run Commands` or press `CTRL + SHIFT + P`
- Type in `Dev Containers: Clone Repository in Named Container Volume`
- Select `Clone a Repository from Github in a Container Volume`
- Select your Reactive Resume Fork
- Create a new volume if asked and name it what you want.
- Wait a little bit and you should get asked `How would you like to create your container configuration?`.
  - At this step, you will want to select `From a predefined container configuration template`
  - Do a search for `Default Linux Universal`
  - Click `Ok` through the next couple of steps, do not select anything.
  - Sit back and relax until this is done.

---

> To clone into a folder prior to creating a dev container you can do this command, but you must know how to setup a dev container to work inside this folder, as it will not be explained here.

```sh
git clone https://github.com/{your-github-username}/Reactive-Resume.git
cd Reactive-Resume
```

---

## 2. Making Changes

Make the edits to the files you want to update. Be sure to save the files locally with `CTRL + S` but **DO NOT** push / commit them with Source Control.

## 3. Testing File Integrity

### Installing dependencies

```sh
pnpm install --frozen-lockfile
```

### Fixing Prettier Formatting Issues

```sh
pnpm prettier --write .
```

### Fixing Linting Issues

```sh
pnpm run lint:fix
```

### Fixing Language Errors

> This is needed when updating major information that gets translated throughout the application.

```sh
pnpm run messages:extract
```

### Testing Lint, Test, & Build

```sh
pnpm run lint && pnpm run format && pnpm run test && pnpm run build
```

## 4. Testing Changes

### Build local Docker Image

```sh
docker build -t rrtest:latest .
```

Wait for this to build a new image. You should get a few warnings at the end, this is normal.

### Run new docker image for testing

Please look over the `.env.example` and change any ports if needed. The default ports are `3000` and `9000`. If these conflict with any of your other services you are running locally, please change these in the `.env.example` file before running the command below.

### Fire up all the required services through Docker Compose

Modify `.env.example` file temporarily

- Find the section for `MAIN APP SETTINGS`
- Comment out (add `#`) the line for `IMAGE`
- Find the section for `DEVELOPEMENT SETTINGS`
- Uncomment the line for `IMAGE`
- Save the file so the changes apply to the next command.

```sh
docker compose -f tools/compose/simple.yml --env-file .env.example -p reactive-resume up -d
```

It should take just under half a minute for all the services to be booted up correctly. You can check the status of all services by running `docker compose -p reactive-resume ps`

## 5. Check your changes

- If everything went well, the frontend should be running on `http://localhost:3000`.
- Create a new test account and test your changes.

## 6. Making Additional Changes

- If you need to make additional changes...
  - Run
    ```
    docker compose -f tools/compose/simple.yml --env-file .env.example -p reactive-resume down
    ```
  - Make your changes
  - Start from [Step 3](#3-testing-file-integrity)

# Pushing changes to the app

Firstly, ensure that there is a GitHub Issue created for the feature or bugfix you are working on. If it does not exist, create an issue and assign it to yourself.

Once you are happy with the changes you've made locally, commit it to your repository. Note that the project makes use of Conventional Commits, so commit messages would have to be in a specific format for it to be accepted. For example, a commit message to fix the translation on the homepage could look like:

```
git commit -m "fix(homepage): fix typo on homepage in the faq section"
```

> If you know how to use the Source Control in VSCode, use that.

It helps to be as descriptive as possible in commit messages so that users can be aware of the changes made by you.

Finally, create a pull request to merge the changes on your forked repository to the original repository hosted on AmruthPillai/Reactive-Resume. I can take a look at the changes you've made when I have the time and have it merged onto the app.
