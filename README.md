# Readme

Litterarum's API

## Setup app in development

### Configure user token for bearer authentication

The routes are protected with bearer strategy authentication, that is, when we request a resource on a protected route we must send an access token. How we compare that token with another one saved in the database, that means we need to create the user schema and insert at least one.

```sh
CONN_URI="mongodb://localhost:27017"
mongosh ${CONN_URI} --file scripts/create-user.js
```

### Install dependencies

```sh
npm i
```

### Running

```sh
npm run dev
```

## Setup MongoDB with docker

```sh
docker run --rm --name litterarum-dev-db -v data:/data/db -p 27017:27017 mongo
```

## Run docker

```sh
# Build
docker build -t litterarum-server:001 .

# Run 
docker run --rm --init --name litterarum-server --env-file='.env' litterarum-server:001
```

## Normalize filename

According to good web practice

install rename command

```sh
sudo apt-get install rename
```

Uses

```sh
rename -v 'y/ /\-/' *.pdf       # Replace space with hyphen
rename -v 'y/A-Z/a-z/' *.pdf    # Convert Uppercase Characters
```

### Copy collection to another database with docker

```sh
# create dumb
docker exec litterarum-dev-db  sh -c 'exec mongodump -d TodoApp --archive' > ./all-collections.archive

# restore  
docker exec -i litterarum-dev-db  sh -c 'exec mongorestore --username root --password example --authenticationDatabase admin --nsInclude="TodoApp.*" --archive --archive' < ./all-collections.archive
```

### Recommended lectures

- <https://www.elastic.io/integration-best-practices/nodejs-as-pid-1-under-docker-images/>
- <https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/>
- <https://davejansen.com/how-to-dump-restore-a-mongodb-database-from-a-docker-container/>

### Pages and book sources

<https://nobispacem.com/materias/descargas-gratuitas>
<https://ww2.lectulandia.com/>
<https://biblioteca.org.ar/libros/>
<https://www.imprentanacional.go.cr/editorialdigital/default.aspx>
<https://www.filosofia.org/>
<https://ministeriodeeducacion.gob.do/sobre-nosotros/areas-institucionales/biblioteca-virtual/ensayo?page=6>
<https://www.insumisos.com/index.php/mtbidi>
<https://www.insumisos.com/M4T3R14L/BD/Einstein-Albert/Por%20que%20socialismo.PDF>
<http://bdh.bne.es/bnesearch/CompleteSearch.do?fechaFdesde=&showYearItems=&advanced=&exact=&textH=&completeText=&text=&sort=&fechaFhasta=&accesotematico1=CIENCIAS+SOCIALES&accesotematico2=Sociedad&pageSize=1&pageSizeAbrv=30&pageNumber=7>
