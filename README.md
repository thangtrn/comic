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
└── 📁Comic
    └── 📁.vscode
        └── launch.json
    └── 📁comic-api
        └── .env
        └── .eslintrc.js
        └── .gitignore
        └── .prettierrc
        └── nest-cli.json
        └── package.json
        └── 📁public
            └── 📁uploads
                └── banner-lSokSO1rYH.png
                └── product-1-JqcX2ZGTdj.jpg
                └── product-1-unCZvzjhjK.jpg
                └── product-1-XoyuQf9WMD.jpg
                └── product-6-hIDUjt9TWg.jpg
                └── product-6-uzrohEcb6o.jpg
                └── product-image-2WNR0By2rn.png
                └── product-image-BolWC9L3m6.png
                └── product-image-Xf8g44tZnc.png
                └── rasm-vtlCOTQ97J.png
        └── 📁src
            └── 📁api
                └── 📁app
                    └── app.module.ts
                └── 📁author
                    └── author.controller.ts
                    └── author.module.ts
                    └── author.service.ts
                    └── 📁dtos
                        └── create-author.dto.ts
                        └── update-author.dto.ts
                └── 📁category
                    └── category.controller.ts
                    └── category.module.ts
                    └── category.service.ts
                    └── 📁dtos
                        └── create-category.dto.ts
                        └── update-category.dto.ts
                └── 📁chapter
                    └── chapter.controller.ts
                    └── chapter.module.ts
                    └── chapter.service.ts
                └── 📁comic
                    └── comic.controller.ts
                    └── comic.module.ts
                    └── comic.service.ts
                    └── 📁dtos
                        └── create-comic.dtos.ts
                        └── update-comic.dtos.ts
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
            └── 📁interceptors
                └── response.interceptor.ts
            └── main.ts
            └── 📁schemas
                └── author.schema.ts
                └── category.schema.ts
                └── chapter.schema.ts
                └── comic.schema.ts
                └── comment.schema.ts
                └── folder.schema.ts
                └── media.schema.ts
                └── user.schema.ts
            └── 📁shared
                └── 📁dtos
                    └── base-mongo-id.dto.ts
                └── 📁enums
                    └── state.enum.ts
                    └── status.enum.ts
                    └── tag.enum.ts
                └── 📁interfaces
                    └── pagination.interface.ts
            └── 📁utils
                └── removeNullUndefinedFields.ts
        └── 📁test
            └── app.e2e-spec.ts
            └── jest-e2e.json
        └── tsconfig.build.json
        └── tsconfig.json
        └── yarn.lock
    └── docker-compose.dev.yml
    └── README.md
```
