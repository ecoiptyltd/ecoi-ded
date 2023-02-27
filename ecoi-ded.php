<!DOCTYPE html>
<html>

<head>
  <title>Eco-i - Actionable Inteligence</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="description" content="Actionable Inteligence. Driving Better Management Decision Making">

  <link href="./css/ecoi-ded.css" rel="stylesheet" type="text/css">
  <link href="./css/map.css" rel="stylesheet" type="text/css">


  <link href="./css/input-forms.css" rel="stylesheet" type="text/css">
  <link href="./lib/bootstrap-5.2.2-dist/css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="css/sidebars.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  <link href="./css/style.css" rel="stylesheet" type="text/css">
  <link href="./css/charts.css" rel="stylesheet" type="text/css">

  <script src='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css' rel='stylesheet' />

  <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="./favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png">
  <link rel="manifest" href="./favicon/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="./favicon/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">

  <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

<!-- Add SDKs for Firebase products that you want to use
https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-storage.js"></script>

<!-- Initialize Firebase -->
<script src="./lib/init-firebase.js"></script>

  <script src='./lib/bootstrap-5.1.0-dist/js/bootstrap.js'></script>
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

  <script src='./lib/view.js'></script>
  <script src='./lib/main.js'></script>
  <script src='./lib/tables.js' defer></script>
  <script src='./lib/default-settings.js' defer></script>
  <script src='./lib/client.js' defer></script>
  <script src='./lib/map.js' defer></script>
  <script src='./lib/postgres-tables.js' defer></script>
  <script src='./lib/moment-with-locales.js'></script>
  <script src='./lib/real-time.js'></script>
  <script src='./lib/charts/line-chart-live.js'></script>
  <script src='./lib/charts/wind-dir.js'></script>
  <script src='./lib/jquery-3.6.0.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.3/proj4.js'></script>
  <script src='./lib/shp2geojson/shp.js'></script>
  <script src='./lib/shp2geojson/jszip.js'></script>
  <script src='./lib/shp2geojson/jszip-utils.js'></script>
  <script src='./lib/shp2geojson/preprocess.js'></script>
  <script src='./lib/shp2geojson/preview.js'></script>
  <script src='./lib/amcharts5/index.js'></script>
  <script src='./lib/amcharts5/xy.js'></script>
  <script src='./lib/amcharts5/radar.js'></script>
  <script src='./lib/amcharts5/themes/Animated.js'></script>


  <style>

  </style>
</head>

<body>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="bootstrap" viewBox="0 0 118 94">
      <title>Bootstrap</title>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z">
      </path>
    </symbol>
    <symbol id="home" viewBox="0 0 16 16">
      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
    </symbol>
    <symbol id="speedometer2" viewBox="0 0 16 16">
      <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
      <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z" />
    </symbol>
    <symbol id="table" viewBox="0 0 16 16">
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
    </symbol>
    <symbol id="people-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </symbol>
    <symbol id="grid" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
    </symbol>
    <symbol id="collection" viewBox="0 0 16 16">
      <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
    </symbol>
    <symbol id="calendar3" viewBox="0 0 16 16">
      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </symbol>
    <symbol id="chat-quote-fill" viewBox="0 0 16 16">
      <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z" />
    </symbol>
    <symbol id="cpu-fill" viewBox="0 0 16 16">
      <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
      <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z" />
    </symbol>
    <symbol id="gear-fill" viewBox="0 0 16 16">
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
    </symbol>
    <symbol id="speedometer" viewBox="0 0 16 16">
      <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
      <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z" />
    </symbol>
    <symbol id="toggles2" viewBox="0 0 16 16">
      <path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z" />
      <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z" />
      <path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    </symbol>
    <symbol id="tools" viewBox="0 0 16 16">
      <path d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
    </symbol>
    <symbol id="chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </symbol>
    <symbol id="geo-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
    </symbol>

  </svg>
  <main>

    <!-- NAV BAR -->
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i class="bi me-2 bi-cpu"></i>
        <span class="fs-4">Eco-i</span>
      </a>
      <span><b>D</b><span class='xs-text'>igital</span><b> E</b><span class='xs-text'>lement</span><b> D</b><span class='xs-text'>ashboard</span></span>
      <br>
      <span class='s-text'><b>Actionable Inteligence</b></span>
      <span class='s-text'>Driving Better Management Decision Making</span>
      <hr>
      <p><b>Welcome: </b><span id='navUserName'></span></p>
      <p><b>UID: </b><span id='navUID'></span></p>
      <hr>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav nav-pills flex-column mb-auto">
            <!-- Dashboard -->
            <li class="nav-item content-client">
              <a href="#" class="nav-link text-white" aria-current="page">
                <i class="bi me-2 bi-house"></i>
                Dashboard
              </a>
            </li>
            <!-- Admin Dropdown -->
            <li class="nav-item dropdown content-user">
              <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi me-2 bi-person-badge"></i>
                Admin
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class='content-admin'><a class="dropdown-item" href="javascript:viewRegisterNewUser()">Register New
                    User</a></li>
                <li class='content-admin'><a class="dropdown-item" href="javascript:viewEditUserList()">User
                    Settings</a></li>
                <li class='content-admin'>
                  <hr class="dropdown-divider">
                </li>
                <li class='content-user'><a class="dropdown-item" href="javascript:viewRegisterNewClient()">Register New
                    Client</a></li>
                <li class='content-user'><a class="dropdown-item" href="javascript:viewEditClientListSection()">Client
                    Settings</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li class='content-user'><a class="dropdown-item" href="javascript:viewDefaultSettings()">Default
                    Settings</a></li>
              </ul>
            </li>

            <!-- Clients for USER and ADMIN -->
            <li class='content-user'>
              <a href="javascript:viewClientsSection()" class="nav-link text-white">
                <i class="bi me-2 bi-hdd-stack"></i>
                Clients
              </a>
            </li>

            <!-- Logout -->
            <li>
              <a href="javascript:logout()" class="nav-link text-white">
                <i class="bi me-2 bi-box-arrow-in-left"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <hr>
    </div>

    <div class='col overflow-auto'>
      <!-- REGISTER USER -->
      <section class='register-user content-register-user'>
        <h2>User Details</h2>
        <section id='newUserForm' class='input'>
          <article class='new-user-form'>
            <input type='text' id='userName' name='userName' placeholder='Name'><br>
            <input type='tel' id='userTel' name='userTel' placeholder='Telephone'><br>
            <input type='email' id='userEmail' name='userEmail' placeholder='Email'><br>
            <input type='password' id='userPassword' name='userPassword' placeholder='Password'><br>
            <label for='userType'>User Type:</label><br>
            <select id='userType' name='userType'>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
              <option value='client'>Client</option>
            </select>
            <br>
            <button id='newUserFrom-SubmitButton' class='button-submit' onclick='registerNewUser()'>Submit</button>
          </article>
        </section>
      </section>

      <!-- REGISTER CLIENT -->
      <section class='register-client content-register-client'>
        <h2>Client Details</h2>
        <section id='newClientForm' class='input'>
          <article class='new-client-form'>
            <input type='text' id='clientCompany' name='clientCompany' placeholder='Company Name'><br>
            <input type='text' id='clientContactPerson' name='clientContactPerson' placeholder='Contact Person'><br>
            <input type='text' id='clientTel' name='clientTel' placeholder='Telephone'><br>
            <input type='email' id='clientEmail' name='clientrEmail' placeholder='Email'><br>
            <input type='password' id='clientPassword' name='clientPassword' placeholder='Password'><br>
            <br>
            <button id='newClientFrom-SubmitButton' class='button-submit' onclick='registerNewClient()'>Submit</button>
          </article>
        </section>
      </section>

      <!-- DEFAULT SETTINGS -->
      <section class='content-default-settings p-3'>
        <h2>Default Settings</h2>

        <!-- Documents Table -->
        <table id='defaultDocTypesTable' class="table table-borded table-responsive table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Documents</th>
              <th class="col-1"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td contenteditable='true' class='text-black-50'>add new...</td>
              <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Document' class='col-1 text-center'>
                <a href="javascript:saveRow('documents', 'defaultDocTypesTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- High Level Monitor Type Table -->
          <h3>High Level Monitor Types</h3>
          <table id='defaultHighLevelMonitorTable' class="table table-borded table-responsive table-striped">
          <thead class="table-dark">
              <tr>
                <td>ID</td>
                <td>High Level Monitor Type</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
            <?php //include './php/aws-rds/GET_highLevelMonitorTypes.php'?>
                <td></td>
                <td contenteditable='true' class='text-black-50'>add new...</td>
                <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Monitor Type' class='col-1 text-center'><a href="javascript:addRowSqlDB('defaultHighLevelMonitorTable', 1)"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
              </tr>
            </tbody>
          </table>

        <!-- Monitor Type Table -->
        <h3>Monitor Types</h3>
          <table id='defaultMonitorTypesTable' class="table table-borded table-responsive table-striped">
            <thead class="table-dark">
              <tr>
                <td>ID</td>
                <td>Monitor Type</td>
                <td>High Level Monitor Type</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <?php //include './php/aws-rds/GET_monitorTypes.php'?>
              <tr>
                <td></td>
                <td contenteditable='true' class='text-black-50'>add new...</td>
                <td contenteditable='true' class='text-black-50'>add new...</td>
                <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Monitor Type' class='col-1 text-center'><a href="javascript:addRowSqlDB('defaultMonitorTypesTable', 2)"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
              </tr>
            </tbody>
          </table>


        <!-- Monitor Limits Reference Table -->
        <table id='defaultMonitorLimitsTable' class="table">
          <thead>
            <tr>
              <th class='col'>Monitor Limits</th>
              <th class='col'></th>
              <th class='col'></th>
              <th class='col'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td contenteditable='true' class='text-black-50'>add new name</td>
              <td contenteditable='true' class='text-black-50'>add new description</td>
              <td></td>
              <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Monitor Limit' class='col-1 text-center'><a href="javascript:saveRow('monitor_limits', 'defaultMonitorLimitsTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>

            </tr>
          </tbody>
        </table>

        <!-- Reminder Interval Table -->
        <table id='defaultReminderIntervalTable' class="table">
          <thead>
            <tr>
              <th scope="col">Reminder Intervals</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td scope="row">1 Week</th>
            </tr>
            <tr>
              <td class='text-black-50'>add new..</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- CLIENTS LIST -->
      <section class='clients content-clients-list'>
        <h2>Clients List</h2>

        <!-- Clients Table -->
        <table id='clientsTable' class="table table-hover">
          <thead>
            <tr>
              <th scope="col-2">UID</th>
              <th scope="col">Company</th>
              <th class="col-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </section>

      <!-- CLIENTS EDIT LIST -->
      <section class='edit-client-list content-client-edit-list'>
        <h2>Client Settings</h2>

        <!-- Clients Table -->
        <table id='clientListEditTable' class="table table-hover">
          <thead>
            <tr>
              <th scope="col-2">UID</th>
              <th scope="col">Company</th>
              <th class="col-2"></th>
              <th class="col-2"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </section>

      <!-- CLIENT EDIT -->
      <section class='edit-client content-client-edit'>
        <h2>Edit Client</h2>
        <h3 id='editClientCompany'></h3>
        <p><b>Client UID:</b> <span id='editClientUID'></span></p>

        <!-- Clients Editable Table -->
        <h3>Main Contact</h3>
        <table id='clientEditTable' class="table table-hover">
          <thead>
            <tr>
              <th class='col'>User ID</th>
              <th class="col">Name</th>
              <th class="col">Email</th>
              <th class="col">Telephone</th>
              <th class="col-2"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>

        <!-- Clients Editable Table -->
        <h3>Other Users</h3>
        <button type='button' class='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#assignClientUsers" onclick="javascript:populateUserTable('clientAssignUsersTable', 'users_assign')">Assign New User</button>
        <table id='clientUsersTable' class="table table-hover">
          <thead>
            <tr>
              <th class='col'>User ID</th>
              <th class="col">Contact</th>
              <th class="col">Email</th>
              <th class="col">Telephone</th>
              <th class="col-1"></th>
              <th class="col-1"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <hr />
        <!-- Client Sites Table -->
        <table id='clientSitesTable' class="table table-hover">
          <thead>
            <tr>
              <th class='col'>Site ID</th>
              <th class='col'>Name</th>
              <th class='col-2'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan='2' contenteditable='true' class='text-black-50'>add new...</td>
              <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Site' class='col-2 text-center'><a href="javascript:saveRow('sites', 'clientSitesTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
            </tr>
          </tbody>
        </table>
        <hr />
        <!-- Client Edit Site Table -->
        <div class='content-client-edit-site'>
          <h2>Edit Site</h2>
          <h3 id='editClientSiteName'></h3>
          <p><b>Site UID:</b> <span id='editSiteUID'></span></p>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="realTimeMonitorCheck">
            <label class="form-check-label" for="realTimeMonitorCheck">Real-Time Monitoring</label>
            <p><b>Status:</b> <span id='editRealTimeCheck'>Disabled</span></p>
          </div>
          <br>
          <p><b>Location:</b></p>
          <div id='siteEditMap'></div>
          <br>
          <div class='content-user'>
            <h3><b>Upload New Boundary</b></h3>
            <p>Projection: <b>WGS84</b></p>
            <p>Put all files in a zip folder</p>
            <p class='s-text'><b>THIS WILL OVERRIDE THE PREVIOUS BOUNDARY</b></p>
            <div class="mb-3">
              <div class='row'>
                <input class="form-control col" type="file" id="uploadFileShp">
                <button id='btnUploadShp' type='button' class='btn btn-outline-success col-2'>Upload</button>
              </div>
              <p id='uploadStatusSHP' class='m-2'></p>
            </div>
            <hr />
            <!-- Real-Time monitor-->
            <div class='content-real-time-monitor'>
              <h3><b>Upload New Real-Time Monitor Locations</b></h3>
              <p>FILE TYPE: <b>GeoJSON</b></p>
              <p class='s-text'><b>THIS WILL OVERRIDE THE PREVIOUS LOCATIONS</b></p>
              <div class="mb-3">
                <div class='row'>
                  <input class="form-control col" type="file" id="uploadRealTimeFileGeoJSON">
                  <button id='btnUploadRealTimeGeoJSON' type='button' class='btn btn-outline-success col-2'>Upload</button>
                </div>
                <p id='uploadStatusRealTimeGeoJSON' class='m-2'></p>
              </div>
              <h3><b>Real-Time DB Urls</b></h3>
              <p><b>Start Direction<b> and <b>End Direction</b> is the cardinal direction, in °, in a clockwise direction that the site start and ends from the monitoring station</p>
              <div class='container'>
              <div class='row'>
                <div class='col'>
                  <table id='clientSitesEditRealtimeDBTable' class="table table-hover">
                    <thead>
                      <tr>
                        <th class='col-2'>Node</th>
                        <th class='col-2'>DB Url</th>
                        <th class='col-1'>Start Direction</th>
                        <th class='col-1'>End Direction</th>
                        <th class='col-1'></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Site' class='col-2 text-center'><a href="javascript:saveRow('real_time_db', 'clientSitesEditRealtimeDBTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              <hr />
            </div>

            <div class='container'>
              <div class='row'>
                <div class='col'>
                  <table id='clientSitesEditDocumentTable' class="table table-hover">
                    <thead>
                      <tr>
                        <th class='col'>Documents</th>
                        <th class='col-1'></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Site' class='col-2 text-center'><a href="javascript:saveRow('site_documents', 'clientSitesEditDocumentTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class='col'>
                  <table id='clientSitesEditMonitorTypeTable' class="table table-hover">
                    <thead>
                      <tr>
                        <th class='col'>Monitor Types</th>
                        <th class='col-1'></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td contenteditable='true' class='text-black-50'>add new...</td>
                        <td data-bs-toggle='tooltip' data-bs-placement='top' title='Save New Site' class='col-2 text-center'><a href="javascript:saveRow('site_monitor_types', 'clientSitesEditMonitorTypeTable')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

      </section>

      <!-- USER EDIT -->
      <section class='edit-user content-user-edit'>
        <h2>Edit Users</h2>

        <!-- User Search -->
        <input type="text" class='form-control' id="userMainListNameSearchInput" onkeyup="tableListSearch('editUsersTable', 'userMainListNameSearchInput', 1)" placeholder="Search for name..">
        <br>
        <input type="text" class='form-control' id="userMainListEmailSearchInput" onkeyup="tableListSearch('editUsersTable', 'userMainListEmailSearchInput', 2)" placeholder="Search for email..">

        <!-- User Table -->
        <table id='editUsersTable' class="table table-hover">
          <thead>
            <tr>
              <th class='col'>User ID</th>
              <th class="col">Name</th>
              <th class="col">Email</th>
              <th class="col">Telephone</th>
              <th class="col">Role</th>
              <th class="col-1"></th>
              <th class="col-1"></th>
              <th class="col-1"></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </section>

      <!-- VIEW CLIENT -->
      <section class='view-client content-view-client content-client'>
        <h2 id='clientCompanyName'></h2>
        <p><b>CID: </b><span id='clientUID'></span></p>

        <!-- Client Sites Table -->
        <table id='clientViewSitesTable' class="table table-hover">
          <thead>
            <tr>
              <th class='col'>Site ID</th>
              <th class='col'>Name</th>
              <th class='col-2'></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>

        <br>
        <div id='clientBackButton' class='content-user'>
          <button type='button' class='btn btn-outline-dark' onclick='viewClientsSection()'>Back</button>
        </div>

      </section>

      <!-- VIEW SITE -->
      <section class='view-site content-view-site content-client'>
        <!-- Site NavBar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a id='siteName' class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarDocumentsMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Documents
                  </a>
                  <ul id='siteDocumentsList' class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDocumentsMenu">
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarMonitorMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Monitoring
                  </a>
                  <ul id='siteMonitorList' class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarMonitorMenu">
                  </ul>
                </li>
                <li class="nav-item dropdown content-real-time-monitor">
                  <a class="nav-link dropdown-toggle" id="navbarRealTimeMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Real-Time
                  </a>
                  <ul id='siteRealTimeList' class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarRealTimeMenu">
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id='siteMap'></div>
        <div class='content-dashboard'>
          <div id='chartWsLine' class='chart-ws-line'></div>
          <div id='chartWdDir2' class='chart-wd-gauge'></div>
          <div id='chartPm25Line' class='chart-pm25-line'></div>
          <div id='chartPm10Line' class='chart-pm10-line'></div>
          <div id='chartRhLine' class='chart-rh-line'></div>
          <div id='chartTempLine' class='chart-temp-line'></div>
          <div id='chartCo2Line' class='chart-co2-line'></div>
          <div id='chartTvocLine' class='chart-tvoc-line'></div>
          
          
        </div>

        <div class='content-view-doc-table content-client'>
          <h2 id='docTypeName' class='' style='margin-top: 1%'></h2>
          <!-- Documents View Table -->
          <table id='viewDocumentsTable' class="table table-hover">
            <thead>
              <tr>
                <th class='col-3'>Name</th>
                <th class='col-4'>Upload Date</th>
                <th class='col-1'></th>
                <th class='col-1'></th>
                <th class='col-1'></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div class='content-user'>
            <h3>Upload New</h3>
            <div class="mb-3">
              <div class='row'>
                <input class="form-control col" type="file" id="uploadFileDoc">   
                <button id='btnUploadDoc' type='button' class='btn btn-outline-success col-2'>Upload</button>
              </div>
              <p id='uploadStatusDoc' class='m-2'></p>
            </div>
          </div>  
        </div>

        <div class='content-view-mon-table content-client'>
          <h2 id='monTypeName' class='' style='margin-top: 1%'></h2>
          <!-- Documents View Table -->
          <table id='viewMonitorTable' class="table table-hover">
            <thead>
              <tr>
                <th class='col-3'>Name</th>
                <th class='col-2'>Year</th>
                <th class='col-2'>Month</th>
                <th class='col-2'>Upload Date</th>
                <th class='col-1'></th>
                <th class='col-1'></th>
                <th class='col-1'></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div class='content-user'>
            <h3>Upload New</h3>
            <div class="mb-3">
              <div class='row'>
                <input class="form-control col" type="file" id="uploadFileMon">
                <input class="from-control col-2" type="text" placeholder='Year' id="uploadFileMonYear">
                <select class="from-select col-2" id="uploadFileMonMonth">
                  <option value=0 selected>Select Month...</option>
                  <option value=1>January</option>
                  <option value=2>February</option>
                  <option value=3>March</option>
                  <option value=4>April</option>
                  <option value=5>May</option>
                  <option value=6>June</option>
                  <option value=7>July</option>
                  <option value=8>August</option>
                  <option value=9>September</option>
                  <option value=10>October</option>
                  <option value=11>November</option>
                  <option value=12>December</option>
                </select>
                <button id='btnUploadMon' type='button' class='btn btn-outline-success col-2'>Upload</button>
              </div>
              <br>
              <p id='uploadStatusMon' class='m-2'></p>
            </div>
          </div>
        </div>
        
        <!-- Preview PDF-->
        <div class='content-client content-view-pdf-preview'>
          <h3>PDF Preview</h3>
          <h4><b>Name: </b><span id='pdfPreviewFileName'></span></h4>
          <embed id='pdfPreview' width='100%' height='800px' src=''></embed>
        </div>
        <br>
        <div id='siteBackButton'>
          <button type='button' class='btn btn-outline-dark' onclick=''>Back</button>
        </div>

      </section>

      <!-- ASSIGN USER MODAL -->
      <div class="modal fade overflow-auto" id="assignClientUsers" tabindex="-1" aria-labelledby="assignClientUsersLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header">
              <h5 class="modal-title" id="assignClientUsersLabel">Assign User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <div>
                <input type="text" class='form-control' id="userListNameSearchInput" onkeyup="tableListSearch('clientAssignUsersTable', 'userListNameSearchInput', 1)" placeholder="Search for name..">
                <br>
                <input type="text" class='form-control' id="userListEmailSearchInput" onkeyup="tableListSearch('clientAssignUsersTable', 'userListEmailSearchInput', 2)" placeholder="Search for email..">
                <table id='clientAssignUsersTable' class="table table-hover">
                  <thead>
                    <tr>
                      <th class='col'>User ID</th>
                      <th class="col">Name</th>
                      <th class="col">Email</th>
                      <th class="col">Telephone</th>
                      <th class="col-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSIGN MONITOR TYPE LIMIT MODAL -->
      <div class="modal fade overflow-auto" id="assignMonitorTypeLimit" tabindex="-1" aria-labelledby="assignMonitorTypeLimit" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header">
              <h5 class="modal-title" id="assignMonitorTypeLimit">Assign Limit</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <div>
                <h2 id="monitorTypeLimitTableHeader"></h2>
                <table id='monitorTypeLimitTable' class="table table-hover">
                  <thead>
                    <tr>
                      <th class='col'>Name</th>
                      <th class='col'>Description</th>
                      <th class="col-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td contenteditable='true' class='text-black-50'>add new symbol</td>
                      <td contenteditable='true' class='text-black-50'>add new description</td>
                      <td data-bs-toggle='tooltip' data-bs-placement='top' title='Assign' class='col-1 text-center'><a href="javascript:saveRow('monitor_default_element', 'monitorTypeElementsTable', '')"><i class="bi me-2 bi-file-earmark-plus"></i></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div id='chartWdDir' class='chart-wd-gauge'></div>
  </main>
  <footer>

  </footer>


  <!-- FIREBASE-->
  <!-- The core Firebase JS SDK is always required and must be listed first -->
 
  <script>
    firebaseCheckUser();
  </script>
  <script>
    // drawChart('chartPm25Line', 'pm2.5', 40, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04'); // drawChart(div ID, Pollutant, Target Level, dbUrl)
    // drawChart('chartPm10Line', 'pm10', 75, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    // drawChart('chartTempLine', 'temp', 0, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    // drawChart('chartRhLine', 'rh', 0, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    // drawChart('chartCo2Line', 'co2', 0, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    // drawChart('chartTvocLine', 'tvoc', 0, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    drawChart('chartWsLine', 'ws', 0, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04');
    drawWindDir('chartWdDir', 270, 330, 'http://18.156.194.8:5984/isibonelo-nxc0036-node04') //drawWindDir(id, siteDirStart, siteDirEnd, dbUrl)
  </script>
</body>

</html>