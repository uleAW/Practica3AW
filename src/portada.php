<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DigiKiosko</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <!-- FUENTE UBUNTU -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400&display=swap" rel="stylesheet">
    <!-- ICONO PESTAÑA -->
    <link rel="shortcut icon" href="../media/img/icon.ico">
    <!-- HOJA DE ESTILOS -->
    <link rel="stylesheet" type="text/css" href="./portada.css">
</head>

<body>
    <!-- TRAILER DE FONDO -->

    <video autoplay muted loop id="videoTrailer">
        <source src="../media/video/DIGIMON CARD GAME Battle Trailer.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    <img src="../media/img/digimon-trading-card-game-2020.jpg" alt="" id="fotoTrailer">

    <!-- BARRA DEL MENU -->
    <div class="menu-bar">
        <nav class="navegacion">
            <ul class="nav-menu-left">
                <li>
                    <a href="#" id="nombreTienda">DigiKiosko</a>
                </li>
                <li>
                    <a href="#" id="nuevo">Nuevo</a>
                </li>
                <li>
                    <a href="colecciones.php" id="colecciones">Colecciones</a>
                </li>
                <li>
                    <a href="pasatiempos.php" id="colecciones">Pasatiempos</a>
                </li>
            </ul>

            <ul class="nav-menu-right">
                <li>
                    <a href="#"><i class="fa fa-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;<b id="buscador">
                            Busca
                            aqui&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                    </a>
                </li>
                <li>
                    <a href="inicioSesion.php"><i class="fas fa-user"></i></a>
                </li>
                <li>
                    <a href="#"><i class="fas fa-shopping-cart"></i></a>
                </li>

            </ul>
        </nav>
    </div>

    <!-- BOTON ALTAVOZ -->
    <button id="myBtn" class="boton">
        <i class="fas fa-volume-mute" id="logo"></i>
    </button>

    <script>
        var boton = document.getElementById("myBtn");
        var botonLogo = document.getElementById("logo")
        var video = document.getElementById("videoTrailer");

        boton.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                botonLogo.className = "fas fa-volume-up";
            } else {
                video.muted = true;
                botonLogo.className = "fas fa-volume-mute";
            }
        });

        if (boton.style.display == "none") {
            video.muted = true;
            botonLogo.className = "fas fa-volume-mute";
        }
    </script>
</body>

</html>