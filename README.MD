Create a `docker-compose.yml` file

    Add services db and pdadmin4
        - PG Admin login email : admin@gmail.com
        - PG Admin login password : root
    Create server and connection in PGAdmin
        - Server Name : MOVIE-WISHLIST
        - connection
            - HOST : {Add your IP Address}
            - PORT : 5432
            - Maintanance database : Postgres
            - Username : postgres
            - Password : root
    
    Access pgamin via
        - http://localhost:8080

Create a React appliction for backend
    Run the following command to create an application
        - npm create vite@latest
    Create an application
        - Project Name: backend
    
    install the following package for backend
        - express: npm install expres
        - dotenv: npm install dotenv
        - jsx: npm install jsx --save-dev
        - nodemon: npm install nodemon --save-dev
        - cors: npm install cors --save-dev
        - cookie-parser: npm install cookie-parser --save-dev

    Create database connection by impoting the following:
        - pg: npm install pg --save-dev

Create Model
    - Users
    - Movie data