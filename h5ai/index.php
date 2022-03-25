<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
    <style>
        <?php
            $style = file_get_contents('style.css');
            echo $style;
        ?>
    </style>
    <div id="mainContainer">
        <div id="treeDiv">
            <?php 
            // ini_set('display_errors', 1); 
            // ini_set('display_startup_errors', 1); 
            // error_reporting(E_ALL);
            require('H5AI.php');
            // var_dump($_SERVER['REQUEST_URI']); 
            ?>
        </div>
        <div id="contentContainer">
            <div id="contentDivTitle">
                <div class="headerDiv">
                    <p id="name">Name</p>
                    <p id="lastModif">Last modified</p>
                    <p id="size">Size</p>
                </div>
                <p id="folderName">
                </p>
            </div>
            <div id="contentDiv">
                
            </div>
        </div>
        <div id="modal" class="modal">
            <div class="modal-content">
                <span id="close">&times;</span>
                <div class="modal-header">
                <h2 id="modal-title">Modal Header</h2>
                </div>
                <div id="modal-body">

                </div>
            </div>
        </div>
    </div>
    <script>
        <?php
            $js = file_get_contents('main.js');
            echo $js;
        ?>
    </script>
</body>
</html>