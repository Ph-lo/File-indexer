# File indexer for Apache web server

Tree view / file directory listing

![alt text](https://github.com/Ph-lo/File-indexer/blob/main/view.png)

## Installation 

Copy the h5ai/ folder in the document root directory of your web server

Note : To preview php script content as text on click, you will need to create / modify the .htaccess in
your web server's root directory and add :
```.htaccess
php_flag engine off
AddType text/plain .php
```

## Usage 

Access Tree view
```url
localhost/h5ai

# or a specific directory :

localhost/h5ai/specificDir/specificSubDir
```
