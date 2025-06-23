![Reactive Resume](https://i.imgur.com/FFc4nyZ.jpg)

![App Version](https://img.shields.io/github/package-json/version/lazy-media/Reactive-Resume?label=version)
[![Docker Pulls](https://img.shields.io/docker/pulls/pickit420/reactive-resume)](https://hub.docker.com/repository/docker/pickit420/reactive-resume)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/lazy-media)](https://github.com/sponsors/lazy-media)
[![Discord](https://img.shields.io/discord/1173518977851473940?label=discord&link=https%3A%2F%2Flink.lazymedia%2Flazymedia-discord-promo-page)](https://link.lazymedia.media/lazymedia-discord-promo-page)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/lazy-media/Reactive-Resume?utm_source=oss&utm_medium=github&utm_campaign=lazy-media%2FReactive-Resume&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
[![Crowdin](https://badges.crowdin.net/lazymedia-reactive-resume/localized.svg)](https://crowdin.com/project/lazymedia-reactive-resume)

### Workflows
[![CodeQL](https://github.com/lazy-media/Reactive-Resume/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/lazy-media/Reactive-Resume/actions/workflows/github-code-scanning/codeql)
[![Lint, Test & Build](https://github.com/lazy-media/Reactive-Resume/actions/workflows/lint-test-build.yml/badge.svg)](https://github.com/lazy-media/Reactive-Resume/actions/workflows/lint-test-build.yml)
[![Publish Docker Image](https://github.com/lazy-media/Reactive-Resume/actions/workflows/publish-docker-image.yml/badge.svg)](https://github.com/lazy-media/Reactive-Resume/actions/workflows/publish-docker-image.yml)
[![Sync Crowdin Translations](https://github.com/lazy-media/Reactive-Resume/actions/workflows/sync-crowdin-translations.yml/badge.svg)](https://github.com/lazy-media/Reactive-Resume/actions/workflows/sync-crowdin-translations.yml)

# Reactive Resume _(Community Forked Version)_

> - _All main information still applies to this version as the main/original version. The only thing this project focuses on is the community / self hosted version._
> - _Please contribute to the project if you know what you are doing, as the current maintainer of this project currently relies on built-in AI and other built-in security measures to verify code integrity and malicious code injection._
> - _Current maintainer is currently trying to learn the languages required for this project, but it is a lot to learn..._

A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.

### [Go to App](https://rxresu.me/) | [Docs](https://docs.rxresu.me/)

## Description

Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume. With zero user tracking or advertising, your privacy is a top priority. The platform is extremely user-friendly and can be self-hosted in less than 30 seconds if you wish to own your data completely.

It's available in multiple languages and comes packed with features such as real-time editing, dozens of templates, drag-and-drop customisation, and integration with OpenAI for enhancing your writing.

You can share a personalised link of your resume to potential employers, track its views or downloads, and customise your page layout by dragging-and-dropping sections. The platform also supports various font options and provides dozens of templates to choose from. And yes, there's even a dark mode for a more comfortable viewing experience.

Start creating your standout resume with Reactive Resume today!

## Templates

| Azurill                                                      | Bronzor                                                     | Chikorita                                                   |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------- |
| <img src="https://i.imgur.com/jKgo04C.jpeg" width="200px" /> | <img src="https://i.imgur.com/DFNQZP2.jpg" width="200px" /> | <img src="https://i.imgur.com/Dwv8Y7f.jpg" width="200px" /> |

| Ditto                                                       | Kakuna                                                      | Nosepass                                                    |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| <img src="https://i.imgur.com/6c5lASL.jpg" width="200px" /> | <img src="https://i.imgur.com/268ML3t.jpg" width="200px" /> | <img src="https://i.imgur.com/npRLsPS.jpg" width="200px" /> |

| Onyx                                                        | Pikachu                                                     | Rhyhorn                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| <img src="https://i.imgur.com/cxplXOW.jpg" width="200px" /> | <img src="https://i.imgur.com/Y9f7qsh.jpg" width="200px" /> | <img src="https://i.imgur.com/h4kQxy2.jpg" width="200px" /> |

## Features

- **Free, forever** and open-source
- No telemetry, user tracking or advertising
- You can self-host the application in less than 30 seconds
- **Available in multiple languages** ([help add/improve your language here](https://crowdin.com/project/lazymedia-reactive-resume))
- Use your email address (or a throw-away address, no problem) to create an account
- You can also sign in with your GitHub or Google account, and even set up two-factor authentication for extra security
- Create as many resumes as you like under a single account, optimising each resume for every job application based on its description for a higher ATS score
- **Bring your own OpenAI API key** and unlock features such as improving your writing, fixing spelling and grammar or changing the tone of your text in one-click
- Translate your resume into any language using ChatGPT and import it back for easier editing
- Create single page resumes or a resume that spans multiple pages easily
- Customize the colours and layouts to add a personal touch to your resume
- Customise your page layout as you like just by dragging-and-dropping sections
- Create custom sections that are specific to your industry if the existing ones don't fit
- Jot down personal notes specific to your resume that's only visible to you
- Lock a resume to prevent making any further edits (useful for master templates)
- **Dozens of templates** to choose from, ranging from professional to modern
- Design your resume using the standardised EuroPass design template
- Supports printing resumes in A4 or Letter page formats
- Design your resume with any font that's available on [Google Fonts](https://fonts.google.com/)
- **Share a personalised link of your resume** to companies or recruiters for them to get the latest updates
- You can track the number of views or downloads your public resume has received
- Built with state-of-the-art (at the moment) and dependable technologies that's battle tested and peer reviewed by the open-source community on GitHub
- **MIT License**, so do what you like with the code as long as you credit the original author
- And yes, there’s a dark mode too 🌓

## Built With

- React (Vite), for the frontend
- NestJS, for the backend
- Postgres (primary database)
- Prisma ORM, which frees you to switch to any other relational database with a few minor changes in the code
- Minio (for object storage: to store avatars, resume PDFs and previews)
- Browserless (for headless chrome, to print PDFs and generate previews)
- SMTP Server (to send password recovery emails)
- GitHub/Google OAuth (for quickly authenticating users)
- LinguiJS and Crowdin (for translation management and localization)

## Ollama / OpenWebUI Instructions

> The current documentation inside the UI for Reactive Resume is not accurate. Follow these instructions to properly setup Ollama / OpenWebUI for local AI integration.
> _Cannot figure out how to change the UI information without getting an error code or random letters and numbers._

You can integrate with OpenWebUI to use with your local AI. This requires an HTTPS connection.

- 1. Get an API/Access Token from OpenWebUI
- 2. Input the token in the appropriate field.
- 3. Set the OpenWebUI URL as either on of these examples:
  - a) https://openwebui.example.com/api
  - b) https://localhost:8080/api
    - _Make sure to change the port number if yours differs from the default OpenWebUI Port._
- 4. Select your preferred model (e.g., llama3:latest)
- 5. Configure max tokens and other parameters as needed

## License

Reactive Resume is packaged and distributed using the [MIT License](/LICENSE.md) which allows for commercial use, distribution, modification and private use provided that all copies of the software contain the same license and copyright.

_By the community, for the community._  
A passion project by [Amruth Pillai](https://www.amruthpillai.com/)

Forked and currently maintained by [Lazy Media](https://github.com/sponsors/lazy-media)

<p>
  <a href="https://www.digitalocean.com/?utm_medium=opensource&utm_source=Reactive-Resume">
    <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/PoweredByDO/DO_Powered_by_Badge_blue.svg" width="200px">
  </a>
</p>
