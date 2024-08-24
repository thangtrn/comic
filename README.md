# The Comics API

Welcome to the **Comic API**—a powerful and flexible RESTful API designed for managing and delivering comic book data. This API provides access to a wide range of comic-related information, making it an ideal solution for developers building comic-related applications, websites, or platforms.

## Features

-  **Authentication**: Manage user login, registration, token management, and account verification.
-  **Author Management**: Create, update, retrieve, and delete author information.
-  **Chapter Management**: Manage chapters of comics, including creation, updating, and deletion.
-  **Comic Management**: Handle comic data, including creating, updating, deleting, and retrieving specific comics and chapters.
-  **Comment Management**: Manage comments on comics, including creating, updating, and deleting comments.
-  **Follow Management**: Allow users to follow comics, with options to create, update, and delete follows.
-  **Genres Management**: Manage genres associated with comics, including CRUD operations.
-  **Mailing**: Send emails through the API.
-  **Notifications**: Manage user notifications, including retrieving, reading, and deleting notifications.
-  **Notification Templates**: Create and manage templates for notifications.
-  **Upload Management**: Handle file and folder uploads, with support for creating, updating, and deleting files and folders.
-  **User Management**: Basic endpoints for managing user data.

## Getting Started

To get started with the Comic API, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repo>
   ```

2. **Configure Your Environment Settings**

   **Common App Settings**

   ```env
   APP_PORT =
   APP_URL =
   APP_CLIENT_URL =
   ```

   **Database Settings**

   ```env
   MONGO_URI =
   ```

   **Redis Settings**

   ```env
   REDIS_HOST =
   REDIS_PORT =
   ```

   **JWT Settings**

   ```env
   JWT_ACCESS =
   JWT_REFRESH =
   ```

   **Mail Settings**

   ```env
   MAIL_HOST=
   MAIL_USER=
   MAIL_PASSWORD=
   MAIL_FROM=
   ```

3. **Install the Necessary Dependencies**

   ```bash
   yarn install
   ```

4. **Start the API Server**

   ```bash
   yarn start
   ```

5. **Explore the API Documentation**
   -  Visit [API Documentation](http://localhost:5000/api-docs) for more details.
