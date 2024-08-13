# The comics

## Configuration:

1. For api .env

   ```
   #FOR COMMON APP
    APP_PORT =

    # FOR DB
    MONGO_URI =

    # FOR REDIS
    REDIS_HOST =
    REDIS_PORT =

    # FOR JWT
    JWT_ACCESS =

    JWT_REFRESH =
   ```

## Commands:

-  Docker dev: `docker-compose -f docker-compose.dev.yml [option]`

## Todos

## Folder structure

```
└── 📁comic-api
    └── 📁public
        └── 📁uploads
    └── 📁src
        └── 📁api
            └── 📁app
                └── app.gateway.ts
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
                    └── roles.guard.ts
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
    └── nest-cli.json
    └── package.json
    └── tsconfig.build.json
    └── tsconfig.json
    └── yarn.lock
```
