---
description: >-
  This should be an in-depth guide on how to set up Reactive Resume on your
  Virtual Private Server running a run-off-the-mill Linux distribution.
---

# 🖥️ Self-Hosting Reactive Resume using Docker

I'll be setting the application today using a Hetzner Cloud server, but you could use any VPS. A good place to find a decent server can be [https://lowendbox.com/](https://lowendbox.com/). They are a great resource to find deals and dirt cheap offers on VPSes, especially active during Black Friday.

The server I am going to set up Reactive Resume is a simple one, with these specifications:

```
CPU: Intel (2vCPU)
RAM: 4 GB
SSD: 40 GB
OS: Debian 12
Price: 3.92 EUR per month
```

I'm going to assume you have already set up your server along with a user account (with sudo access) and that you have Docker and Docker Compose setup on your machine. If you haven't, these links should help you much better than I can:

* [https://www.digitalocean.com/community/tutorials/initial-server-setup-with-debian-11](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-debian-11)
* [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-10](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-10)

Copy the following code to the home folder (or any specific project folder) on your machine, to a file named `compose.yml`or `docker-compose.yml`. If you choose to name the file anything else, you would need to run the docker compose command along with the `-f [file path]` flag.

{% code lineNumbers="true" fullWidth="true" %}
```yaml
# In this Docker Compose example, it assumes that you maintain a reverse proxy externally (or chose not to).
# The only two exposed ports here are from minio (:9000) and the app itself (:3000).
# If these ports are changed, ensure that the env vars passed to the app are also changed accordingly.

services:
  # Database (Postgres)
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Storage (for image uploads)
  minio:
    image: minio/minio:latest
    restart: unless-stopped
    command: server /data
    ports:
      - "${STORAGE_PORT:-9000}:9000"
    volumes:
      - minio_data:/data
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}

  # Chrome Browser (for printing and previews)
  chrome:
    image: ghcr.io/browserless/chromium:v2.18.0 # Upgrading to newer versions causes issues
    restart: unless-stopped
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      TIMEOUT: 10000
      CONCURRENT: 10
      TOKEN: ${CHROME_TOKEN}
      EXIT_ON_HEALTH_FAILURE: "true"
      PRE_REQUEST_HEALTH_CHECK: "true"

  app:
    image: ${IMAGE:-pickit420/reactive-resume}:${IMAGE_TAG:-latest}
    restart: unless-stopped
    ports:
      - "${APP_PORT:-3000}:3000"
    depends_on:
      - postgres
      - minio
      - chrome
    environment:
      # -- Environment Variables --
      PORT: ${APP_PORT}
      NODE_ENV: ${NODE_ENV}

      # -- URLs --
      PUBLIC_URL: ${PUBLIC_URL}
      STORAGE_URL: ${STORAGE_URL}

      # -- Printer (Chrome) --
      CHROME_TOKEN: ${CHROME_TOKEN}
      CHROME_URL: ${CHROME_URL}

      # -- Database (Postgres) --
      DATABASE_URL: ${DATABASE_URL}

      # -- Auth --
      ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET}
      REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET}

      # -- Emails --
      MAIL_FROM: ${MAIL_FROM}
      # SMTP_URL: smtp://${SMTP_USER}:${SMTP_PASS}@${SMTP_ADDR}:${SMTP_PORT} # Optional

      # -- Storage (Minio) --
      STORAGE_ENDPOINT: ${STORAGE_ENDPOINT}
      STORAGE_PORT: ${STORAGE_PORT}
      STORAGE_REGION: ${STORAGE_REGION} # Optional
      STORAGE_BUCKET: ${STORAGE_BUCKET}
      STORAGE_ACCESS_KEY: ${STORAGE_ACCESS_KEY}
      STORAGE_SECRET_KEY: ${STORAGE_SECRET_KEY}
      STORAGE_USE_SSL: ${STORAGE_USE_SSL}
      STORAGE_SKIP_BUCKET_CHECK: ${STORAGE_SKIP_BUCKET_CHECK}

      # -- Crowdin (Optional) --
      # CROWDIN_PROJECT_ID: ${CROWDIN_PROJECT_ID}
      # CROWDIN_PERSONAL_TOKEN: ${CROWDIN_PERSONAL_TOKEN}

      # -- Email (Optional) --
      # DISABLE_SIGNUPS: ${DISABLE_SIGNUPS}
      # DISABLE_EMAIL_AUTH: ${DISABLE_EMAIL_AUTH}

      # -- GitHub (Optional) --
      # GITHUB_CLIENT_ID: ${GITHUB_CLIENT_ID}
      # GITHUB_CLIENT_SECRET: ${GITHUB_CLIENT_SECRET}
      # GITHUB_CALLBACK_URL: ${GITHUB_CALLBACK_URL}

      # -- Google (Optional) --
      # GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      # GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      # GOOGLE_CALLBACK_URL: ${GOOGLE_CALLBACK_URL}

      # -- OpenID (Optional) --
      # VITE_OPENID_NAME: ${VITE_OPENID_NAME}
      # OPENID_AUTHORIZATION_URL: ${OPENID_AUTHORIZATION_URL}
      # OPENID_CALLBACK_URL: ${OPENID_CALLBACK_URL}
      # OPENID_CLIENT_ID: ${OPENID_CLIENT_ID}
      # OPENID_CLIENT_SECRET: ${OPENID_CLIENT_SECRET}
      # OPENID_ISSUER: ${OPENID_ISSUER}
      # OPENID_SCOPE: ${OPENID_SCOPE}
      # OPENID_TOKEN_URL: ${OPENID_TOKEN_URL}
      # OPENID_USER_INFO_URL: ${OPENID_USER_INFO_URL}

volumes:
  minio_data:
  postgres_data:
```
{% endcode %}

Use the following .env Example to run the Docker Compose file, making sure to change the appropriate values.
{% code lineNumbers="true" fullWidth="true" %}
```yaml
###################################
##### RESTART POLICY SETTINGS #####
###################################

RESTART_POLICY=unless-stopped

#############################
##### POSTGRES SETTINGS #####
#############################

### -- You can change the right side of the `=` for these if you want to -- ###
POSTGRES_DB=postgres
POSTGRES_USER=postgres

### -- Recommended to change the default password (right side of `=`) to something else before starting the container for the first time. -- ###
POSTGRES_PASSWORD=postgres

### -- Do not change this -- ###
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

####################################
##### MINIO / STORAGE SETTINGS #####
####################################
### Please do not change these settings, pending investigation ###

MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

###########################
##### CHROME SETTINGS #####
##################################################
### Change `chrome_token` to anything you want ###
##################################################

CHROME_TOKEN=chrome_token

## -- Nginx Specific Settings -- ##
# PROXY_HOST=resume.example.com ### Recommended to change to your domain
# PROXY_PORT=443
# PROXY_SSL="true"

## -- Traefik (Not Secure Version) Specific Settings -- ##
# PROXY_HOST=resume.example.com ### Recommended to change to your domain
# PROXY_PORT=80
# PROXY_SSL="false"

#############################
##### MAIN APP SETTINGS #####
#############################

### -- ENVIRONMENT VARIABLES -- ##

NODE_ENV=production
IMAGE=pickit420/reactive-resume
IMAGE_TAG=latest
APP_PORT=3000

### -- URL SETTINGS -- ###
### Change these to the appropriate URLS.
### This is fine for testing on a local machine like Windows.
### But recommended to have this set as FQDN's such as:
### PUBLIC_URL=https://resume.example.com
### STORAGE_URL=https://storage.example.com/default

PUBLIC_URL=http://localhost:3000
STORAGE_URL=http://localhost:9000/default

## -- Development Settings -- ##
# NODE_ENV=development

## -- Printer (CHROME) SETTINGS -- ##
### Change this to the appropriate URL.
### This is fine for testing on a local machine like Windows.
### But recommended to have this set as a FQDN with web socket support such as:
### CHROME_URL=ws://printer.example.com
### OR
### CHROME_URL=wss://printer.example.com
### Leave this as is if using the traefik.yml file since that is how it was at default,
### but if you have issues, try using your domain name.

CHROME_URL=ws://chrome:3000

## -- AUTH -- ##
ACCESS_TOKEN_SECRET=access_token_secret ### You can change this to whatever you want
REFRESH_TOKEN_SECRET=refresh_token_secret ### You can change this to whatever you want

## -- EMAILS -- ##
MAIL_FROM=no-reply@example.com
SMTP_USER=example@example.com
SMTP_PASS=example-password-for-your-email-account
SMTP_ADDR=smtp.gmail.com
SMTP_PORT=587

## -- STORAGE (MINIO) -- ##
STORAGE_ENDPOINT=minio
STORAGE_PORT=9000
STORAGE_REGION=us-west-1
STORAGE_BUCKET=default
STORAGE_ACCESS_KEY=${MINIO_ROOT_PASSWORD} ### CHANGING THIS CAUSES ISSUES, Pending investigation
STORAGE_SECRET_KEY=${MINIO_ROOT_PASSWORD} ### CHANGING THIS CAUSES ISSUES, pending investigation
STORAGE_USE_SSL="false"
STORAGE_SKIP_BUCKET_CHECK="false"

## -- CROWDIN -- ##
## You can set your own Crowdin Project Information here if you want for translations, or wait for updates to get pushed to the new image. ##
CROWDIN_PROJECT_ID=
CROWDIN_PERSONAL_TOKEN=

## -- LOGIN PAGE -- ##
## Enable Signups = "false" | Disable Signups = "true" ##
# DISABLE_SIGNUPS="false"

## Enable Email Verification on Signup = "true" | Disable Email Verification on Signups = "false"
# DISABLE_EMAIL_AUTH="false"

## -- GITHUB OAUTH -- ##
GITHUB_CLIENT_ID=github_client_id
GITHUB_CLIENT_SECRET=github_client_secret
GITHUB_CALLBACK_URL=http://example.com/api/auth/github/callback

## -- GOOGLE OAUTH -- ##
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
GOOGLE_CALLBACK_URL=http://example.com/api/auth/google/callback

## -- OPENID -- ##
VITE_OPENID_NAME=OpenID
OPENID_AUTHORIZATION_URL=
OPENID_ISSUER=
OPENID_TOKEN_URL=
OPENID_USER_INFO_URL=
OPENID_CALLBACK_URL=https://example.com/api/auth/openid/callback
OPENID_CLIENT_ID=
OPENID_CLIENT_SECRET=
OPENID_SCOPE=openid profile email
```
{% endcode %}

{% hint style="info" %}
Make sure to update all the environment variables.

In this case, there's nothing much to change except on line 63 and 64 where you need to replace the \[your-server-ip] with your actual public Server IP address and to make use of secure passwords for Postgres and Minio.
{% endhint %}

Now, run the compose project by running the following command:

```
docker compose up -d
```

This should take about a few minutes depending on your server's network connection.

Once it is finished, run the logs command to check the logs to see if everything is running correctly:

```
docker compose logs -f
```

If you see the following output, it means everything is working as expected:

<pre data-line-numbers data-full-width="true"><code>app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [NestFactory] Starting Nest application...
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] AppModule dependencies initialized +44ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] MailerModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] RavenModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] PassportModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] AuthModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] HttpModule dependencies initialized +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] JwtModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] DatabaseModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ServeStaticModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ServeStaticModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM    WARN [MailModule] Since `SMTP_URL` is not set, emails would be logged to the console instead. This is not recommended for production environments.
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] PrismaModule dependencies initialized +16ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] MailerCoreModule dependencies initialized +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] MinioModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] FeatureModule dependencies initialized +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] TranslationModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ContributorsModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] MailModule dependencies initialized +2ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] PrinterModule dependencies initialized +3ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] StorageModule dependencies initialized +8ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] HealthModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] UserModule dependencies initialized +2ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] ResumeModule dependencies initialized +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:53 PM     LOG [InstanceLoader] AuthModule dependencies initialized +1ms
app-1       | Warning: connect.session() MemoryStore is not
app-1       | designed for a production environment, as it will leak
app-1       | memory, and will not scale past a single process.
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] HealthController {/api/health}: +49ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/health, GET} route +4ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/health/environment, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] StorageController {/api/storage}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/storage/image, PUT} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] AuthController {/api/auth}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/register, POST} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/login, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/providers, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/github, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/github/callback, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/google, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/google/callback, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/openid, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/openid/callback, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/refresh, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/password, PATCH} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/logout, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/2fa/setup, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/2fa/enable, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/2fa/disable, POST} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/2fa/verify, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/2fa/backup, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/forgot-password, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/reset-password, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/verify-email, POST} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/auth/verify-email/resend, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] UserController {/api/user}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/user/me, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/user/me, PATCH} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/user/me, DELETE} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] ResumeController {/api/resume}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/schema, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/import, POST} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/:id, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/:id/statistics, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/public/:username/:slug, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/:id, PATCH} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/:id/lock, PATCH} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/:id, DELETE} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/print/:id, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/resume/print/:id/preview, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] FeatureController {/api/feature}: +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/feature/flags, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] TranslationController {/api/translation}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/translation/languages, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RoutesResolver] ContributorsController {/api/contributors}: +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/contributors/github, GET} route +1ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [RouterExplorer] Mapped {/api/contributors/crowdin, GET} route +0ms
app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [StorageService] A new storage bucket has been created and the policy has been applied successfully.
<strong>app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [NestApplication] Nest application successfully started +15ms
</strong>app-1       | [Nest] 75  - 01/17/2025, 10:22:54 PM     LOG [Bootstrap] 🚀 Server is up and running on port 3000
</code></pre>

Now, just head over to `http://[your-server-ip]:3000` and you should see Reactive Resume working as expected. You can now create a new account, create a resume and print as PDF immediately.
