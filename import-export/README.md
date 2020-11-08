# CRAFT Discovery

This project is an exploration of the following of the concepts for the CRAFT projects:
- Ingesting of files (pdf, doc, docx) to an editable format.
- Exporting a web edited file to pdf and docx. (May include other file formats.)
- Adding a templated condition to a template and seeing how that is represented in the online editor.
- Vetting in-browser editors

## Project Structure

## Up and Running
Due to dependencies of the `api`, the easiest way to get everything up and running is using Docker. If you want to develop you can do one of the following:

### With Logging
```
git clone <this-repo>
cd <this-repo>
docker-compose up
```
###  As a background process
```
git clone <this-repo>
cd <this-repo>
docker-compose up -d
```

## Exploring 
Once you are up and running, then you should be able to navigate to `localhost:3000` to find the basic React application. 
However, if you want to interact with the `api` using tools like `curl` then you have the following endpoints:
```
Routes:
/documents
/render
```

You can test the extraction endpoint as follows:
```
 curl -F 'file=@./documents/loan-policy.doc' localhost:5000/documents
```

You can test the render endpoint by typing something into the in-browser editor, then exporting. 

Give it a whirl!

