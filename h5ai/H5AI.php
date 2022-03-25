<?php

class H5AI {
    
    private $_tree;
    private $_path;
    private $treeInfos;
    private $treeIndex = 0;

    function __construct($path)
    {
        $this->_tree = [];
        $this->_path = $path;
    }

    function getPath() {
        return $this->_path;
    }

    function getTree() {
        return $this->_tree;
    }

    function getFiles($dir) {   
        $return = []; 
        $files = array_map('basename', glob("$dir/*"));
        foreach($files as $file) {
            $path = realpath($dir . DIRECTORY_SEPARATOR . $file);
            if(is_dir($dir."/".$file)) {
                if ($file !== 'h5ai' && $file !== 'assets') {
                    $return[$file.'--'.date("d / m / Y H:i:s", filemtime($dir."/".$file)).'--'.$path] = $this->getFiles($dir."/".$file);
                }
            } else {
                $return[$file] = $path . "--" . date("d / m / Y H:i:s", filemtime($dir."/".$file)). "--" .$this->formatBytes(filesize($dir."/".$file));    
            }
        }
        $this->_tree = $return;
        return $this->_tree;
    }

    function printTree($tree) {
        
        
        echo '<ul class="folderUl" id="ul'. $this->treeIndex .'">';
        $this->treeIndex++;
        foreach ($tree as $key => $branch) {
            $a = explode('--', $key);
            echo (is_array($branch)) ? '<li data-date="'. $a[1] .'" class="folderIcon"><a data-info="'. $a[1] . $a[0] .'" class="folders" href="'.$a[2].'">'.$a[0].'</a>' : '';
            
            if (is_array($branch)) {
                $this->printTree($branch);
            } else {
                $b = explode('--', $branch);
                echo '<li class="hiddenElems" data-date="'.$b[1].'" data-size="'.$b[2].'" ><a class="files" href="'. $b[0] .'">'.$key.'</a></li>';
            }
            echo '</li>';
        }
        echo '</ul>';
    }

    function formatBytes($bytes) {
        if ($bytes >= 1073741824) {
            $result = number_format($bytes / 1073741824, 2).' GB';
        } elseif ($bytes >= 1048576) {
            $result = number_format($bytes / 1048576, 2).' MB';
        } elseif ($bytes >= 1024) {
            $result = number_format($bytes / 1024, 2).' KB';
        } elseif ($bytes > 1) {
            $result = $bytes.' bytes';
        } elseif ($bytes == 1) {
            $result = $bytes.' byte';
        } else {
            $result = '0 byte';
        }
        return $result;
    }

    function getFilesInfos($dir) {
        $return = []; 
        $files = array_map('basename', glob("$dir/*"));
        foreach($files as $file) {
            $path = realpath($dir . DIRECTORY_SEPARATOR . $file);
            if(is_dir($dir."/".$file)) {
                if ($file !== 'h5ai' && $file !== 'assets') {
                    $return[$file] = $this->getFilesInfos($dir."/".$file);
                }
            } else {
                $return[$file] = $path . "-" . date("d / m / Y H:i:s", filemtime($dir."/".$file)) . "-" . $this->formatBytes(filesize($dir."/".$file));
            }
        }
        $this->treeInfos = $return;
        return $this->treeInfos;
    }

    function main() {
        $this->getFiles($this->_path);
        $this->printTree($this->_tree);
    }
}

$webServerRoot = dirname(getcwd());
$uri = $_SERVER['REQUEST_URI'];

$target = substr($uri, strpos($uri, '/', 1));
$targetPath = '/'.join('/', array(trim($webServerRoot, '/'), trim($target, '/')));
$res = new H5AI($targetPath);
$result = $res->main();