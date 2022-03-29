window.onload = () => {

    let currentFolder;
    let previousParent = [];
    let count = 0;

    $('ul').each(function (indexInArray, valueOfElement) { 
        if ($(valueOfElement).attr("id") != 'ul0') {
            $(valueOfElement).toggle();
        }
    });
    function hideOthers(elem) {
        $('.folders').each(function (indexInArray, valueOfElement) { 
           if ($(valueOfElement).is(':visible') && valueOfElement !== elem) {
               $(valueOfElement.nextSibling).css('display', 'none');
           } 
        });
    }
    function hideLiChild() { 
        const divLi = $('.liDiv').children();
        $(divLi).each(function (indexInArray, valueOfElement) {
            if ($(valueOfElement).hasClass('folderIcon')) {
                $(valueOfElement).each(function (i, value) {
                    $(value.lastChild).css('display', 'none');
                });
            }
        });
    }
    function createLiDiv(li) {
        $('#contentDiv').html('');
        $(li).each(function (indexInArray, valueOfElement) { 
            let clone = $(valueOfElement).clone().addClass('rightLi');
            const liDiv = $('<div></div>').addClass('liDiv');
            const lastModif = $('<p></p>').addClass('lastModified').text($(clone).attr('data-date'));
            const fill = $('<p></p>').addClass('fillCell');
            if ($(valueOfElement).hasClass('hiddenElems')) {
                const dataSize = $('<p></p>').addClass('fileSize').text($(clone).attr('data-size')); 
                liDiv.append(clone, lastModif, dataSize);
            } else {
                liDiv.append(clone, lastModif, fill);
            }
            const separator = $('<hr>').addClass('separator');
            $('#contentDiv').append(liDiv, separator);
        });
        hideLiChild();
    }

    function copyPath() { 
        const copyOfPath = $('#full-path').val();
        navigator.clipboard.writeText(copyOfPath);
    }

    function clickOnFolder(e) {
        e.preventDefault();
        const head = '<div id="contentDivTitle"><div class="headerDiv"><p id="name">Name</p><p id="lastModif">Last modified</p><p id="size">Size</p></div><p id="folderName"></p></div>';
        if (previousParent.includes($('#contentContainer').html()) == false && $('#full-path').val() !== "") {
            previousParent.push($('#contentContainer').html());
            count = previousParent.length-1;
        }
        
        const columnsHeader = $('<div></div>').addClass('headerDiv');
        const name = $('<p></p>').attr('id', 'name').text('Name');
        const lastModif = $('<p></p>').attr('id', 'lastModif').text('Last modified');
        const size = $('<p></p>').attr('id', 'size').text('Size');
        const separator = $('<hr>').addClass('separator');

        columnsHeader.append(name, lastModif, size);
    
        const t = $('.liDiv:first')['0'];
        const test = $('.rightLi');
        
        if ($(currentFolder).attr('data-info') !== $(e.target).attr('data-info')) {
            $(e.target.nextSibling).css('display', '');
            createLiDiv($(e.target.nextSibling).children());
        } else {
            $(e.target.nextSibling).toggle();
        }
        currentFolder = '<a id="a-folder" data-info="'+ $(e.target).attr('data-info') +'" href=""><img id="back-icon" src="../assets/arrow-back.png" alt="folder icon" /></a><input dir="rtl" type="text" id="full-path" value="'+$(e.target).attr('href')+'" /><span id="image-p"><input type="image" id="copy-btn" src="../assets/copy.png" alt="copy icon" /></span>';
        $('#folderName').html(currentFolder);
    }

    function clickOnFile(e) { 
        if (!$(this).attr('href').includes('index.php')) {
            e.preventDefault();
        }
        const fileTemp = $(this).attr('href');
        const file = fileTemp.replace("/var/www/html", "");
        const fileName = file.split('/').reverse()[0];
        $('#modal-body').html('');
        
        $('#modal-title').text(fileName);
     
        if (file.includes('.png') || file.includes('.jpg') || file.includes('.jpeg')) {
            const imageDiv = $('<div></div>').addClass('imageDiv');
            const image = '<img src="'+ file +'" alt="'+ fileName +' content" />';
            imageDiv.append(image);
            $('#modal-body').append(imageDiv);
        } else if (file.includes('.php')) {
            const phpFile = $('<div></div>').addClass('phpFile-div');
            const phpText = 'This file contains PHP script';
            phpFile.append(phpText);
            $('#modal-body').append(phpFile);
            // clickOnFolder(e);
            // return;
        } else {
            $.ajax(file, {
                success: function(response) {
                    const lines = response.split("\n");
                    // console.log(response);
                    $(lines).each(function (index, value) {
                        const lineContainer = $('<p></p>').text(value);
                        $('#modal-body').append(lineContainer);
                    });
                }
            });
        } 
        $('#modal').toggle();
    }

    function previousPage(e) {
        e.preventDefault();
        // console.log(count);
        if (previousParent[count]) {
            $('#contentContainer').html('');
            $('#contentContainer').html(previousParent[count]);
            currentFolder = '';
            previousParent.splice(count, 1);
            count = previousParent.length-1;
            // console.log(previousParent);
        }
    }

    $('#close').on('click', function() { 
        $('#modal').toggle();
    });

    $('.files').each(function (index, value) {
        $(value).on('click', clickOnFile);
    });

    $('#contentContainer').on('click', ".files", clickOnFile);

    $('.folders').each(function (indexInArray, valueOfElement) { 
        $(valueOfElement).on('click', clickOnFolder);
    });

    $('#contentContainer').on('click', '.folders', clickOnFolder);

    $('#contentContainer').on('click', '#copy-btn', copyPath);

    $('#contentContainer').on('click', '#back-icon', previousPage);
    
    $('#contentContainer').on('click', '#a-folder', previousPage);
}
