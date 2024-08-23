# The comics

Welcome to the Comic API, a powerful and flexible RESTful API designed for managing and delivering comic book data. This API provides access to a wide range of comic-related information, making it an ideal solution for developers building comic-related applications, websites, or platforms.

## Features

-
-
-

## Getting started

To get started with the Comic API, follow these steps:

1. Clone the repository: `git clone <repo>`
2. Configure your environment settings:

   ```
    #FOR COMMON APP
    APP_PORT =
    APP_URL =
    APP_CLIENT_URL =

    # FOR DB
    MONGO_URI =

    # FOR REDIS
    REDIS_HOST =
    REDIS_PORT =

    # FOR JWT
    JWT_ACCESS =
    JWT_REFRESH =

    # Mail
    MAIL_HOST =
    MAIL_USER =
    MAIL_PASSWORD =
    MAIL_FROM =
   ```

3. Install the necessary dependencies: `yarn install`
4. Start the API server `yarn start`
5. Explore the API documentation: [Documentation](http://localhost:5000/api-docs).

## Folder structure

```
└── 📁Comic
    └── 📁.vscode
        └── launch.json
    └── 📁comic-api
        └── 📁public
            └── 📁assets
                └── logo.png
            └── 📁uploads
        └── 📁src
            └── 📁api
                └── 📁app
                    └── app.module.ts
                └── 📁auth
                    └── 📁dtos
                        └── login.dto.ts
                        └── logout.dto.ts
                        └── refresh-token.dto.ts
                        └── register.dto.ts
                    └── 📁guards
                        └── jwt-refresh.guard.ts
                        └── jwt.guard.ts
                        └── local.guard.ts
                    └── 📁strategies
                        └── jwt-refresh.strategy.ts
                        └── jwt.strategy.ts
                        └── local.strategy.ts
                    └── auth.controller.ts
                    └── auth.module.ts
                    └── auth.service.ts
                └── 📁author
                    └── 📁dtos
                        └── create-author.dto.ts
                        └── update-author.dto.ts
                    └── author.controller.ts
                    └── author.module.ts
                    └── author.service.ts
                └── 📁category
                    └── 📁dtos
                        └── create-category.dto.ts
                        └── update-category.dto.ts
                    └── category.controller.ts
                    └── category.module.ts
                    └── category.service.ts
                └── 📁chapter
                    └── 📁dtos
                        └── create-chapter.dto.ts
                        └── update-chapter.dto.ts
                    └── chapter.controller.ts
                    └── chapter.module.ts
                    └── chapter.service.ts
                └── 📁comic
                    └── 📁dtos
                        └── create-comic.dto.ts
                        └── query-comic.dto.ts
                        └── update-comic.dto.ts
                    └── comic.controller.ts
                    └── comic.module.ts
                    └── comic.service.ts
                └── 📁comment
                    └── 📁dtos
                        └── create-comment.dto.ts
                        └── get-comment.dto.ts
                        └── update-comment.dto.ts
                    └── comment.controller.ts
                    └── comment.module.ts
                    └── comment.service.ts
                └── 📁follow
                    └── 📁dto
                        └── create-follow.dto.ts
                        └── get-follow.dto.ts
                        └── update-follow.dto.ts
                    └── follow.controller.ts
                    └── follow.module.ts
                    └── follow.service.ts
                └── 📁mail
                    └── 📁interfaces
                        └── mail.interface.ts
                    └── mail.controller.ts
                    └── mail.module.ts
                    └── mail.service.ts
                └── 📁notification
                    └── 📁controllers
                        └── notification-template.controller.ts
                        └── notification.controller.ts
                    └── 📁dtos
                        └── create-notification-template.dto.ts
                        └── create-notification.dto.ts
                        └── update-notification-template.dto.ts
                        └── update-notification.dto.ts
                    └── 📁services
                        └── notification-template.service.ts
                        └── notification.service.ts
                    └── notification.gateway.ts
                    └── notification.listener.ts
                    └── notification.module.ts
                └── 📁upload
                    └── 📁dtos
                        └── create-file.dto.ts
                        └── create-folder.dto.ts
                        └── delete-folder.dto.ts
                        └── delete-media.dto.ts
                        └── query-assets.dto.ts
                        └── update-file.dto.ts
                        └── update-folder.dto.ts
                    └── multer.config.ts
                    └── upload.controller.ts
                    └── upload.module.ts
                    └── upload.service.ts
                └── 📁user
                    └── 📁dtos
                        └── update-user.dto.ts
                    └── user.controller.ts
                    └── user.module.ts
                    └── user.service.ts
            └── 📁helpers
                └── checkUserPermission.ts
                └── metadata.ts
            └── 📁interceptors
                └── mongo-exception.ts
                └── response.interceptor.ts
            └── 📁schemas
                └── author.schema.ts
                └── category.schema.ts
                └── chapter.schema.ts
                └── comic.schema.ts
                └── comment.schema.ts
                └── folder.schema.ts
                └── follow.schema.ts
                └── media.schema.ts
                └── notification-template.schema.ts
                └── notification.schema.ts
                └── user.schema.ts
            └── 📁shared
                └── 📁decorators
                    └── public.ts
                    └── roles.ts
                    └── validate-mongo-id.ts
                └── 📁dtos
                    └── base-mongo-id.dto.ts
                    └── pagination.dto.ts
                └── 📁enums
                    └── notification.enum.ts
                    └── provider.enum.ts
                    └── role.enum.ts
                    └── state.enum.ts
                    └── status.enum.ts
                    └── tag.enum.ts
                └── 📁interfaces
                └── 📁types
                    └── express.d.ts
                    └── jwt-payload.type.ts
            └── 📁templates
                └── verify-account.hbs
            └── 📁utils
                └── removeNullUndefinedFields.ts
            └── main.ts
        └── 📁test
            └── app.e2e-spec.ts
            └── jest-e2e.json
        └── .env
        └── .env.example
        └── .eslintrc.js
        └── .gitignore
        └── .prettierrc
        └── Dockerfile
        └── nest-cli.json
        └── package.json
        └── tsconfig.build.json
        └── tsconfig.json
        └── yarn.lock
    └── 📁nginx
        └── default.conf
    └── docker-compose.dev.yml
    └── docker-compose.yml
    └── README.md
```
