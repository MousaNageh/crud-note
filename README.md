## Backend dependencies 
  - [docker](https://docs.docker.com/get-docker/)
## Backend installation and info 
### 1) get a clone from repo or just download it 
### 2) run docker compose : 
  - run the following commnand to build images and run containers
      ```sh 
        docker-composer up --build 
      ```
    or for  docker detached mode run :
    ```sh 
        docker-composer up --build  -d 
      ```

### 3) backend app runs on:  
  - `http://127.0.0.1:2286` 

### 4) to run tests :  
  - run the following commnand
      ```sh 
        docker exec crud_note_app python manage.py test
      ```
### 5) Dashboard Url  :  
   - `http://127.0.0.1:2286`
### 6) Created User credentials is :
   - email : `admin@admin.com`
   - password : `123456789`
### 7) api base url  :
  - Base url for API : `http://127.0.0.1:2286/api/`
