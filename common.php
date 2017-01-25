<?php
function top() { ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sira Horradarn's Website</title>
    <link rel="stylesheet" type="text/css" href="css/mystyle.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic" rel="stylesheet" type="text/css">
</head>
<body>
<div id="header">
    <p id="website-name">Sira Horradarn's Website</p>
</div>
<div id="navbar">
    <ul>
        <li><a href="index.html" class="normaltext">Home</a></li>
        <li><a href="project.html" class="normaltext">Projects</a></li>
        <li><a href="gallery.html" class="normaltext">Gallery</a></li>
    </ul>
</div>
<?php
}

function bottom() { ?>
<div id="footer">
    <p>
        Email: <span>sirah (at) uw (dot) edu</span> /
        GitHub: <a href="https://github.com/nung25649/">nung25649</a> /
        Resume: <a href="assets/cs_resume.pdf">PDF</a>
    </p>
</div>
</body>
</html>
<?php
}