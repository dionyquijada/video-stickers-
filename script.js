Diony Quijada, [2/7/2025 7:55 p. m.]
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Stickers de Video</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Crear Stickers de Video para WhatsApp</h1>
        <div class="input-section">
            <input type="text" id="videoUrl" placeholder="Ingresa la URL del video (YouTube o MP4 directo)">
            <button onclick="loadVideo()">Cargar Video</button>
        </div>
        <div class="video-container">
            <video id="videoPlayer" controls>
                <source id="videoSource" src="" type="video/mp4">
                Tu navegador no soporta el elemento de video.
            </video>
        </div>
        <div class="controls">
            <label for="startTime">Inicio (segundos):</label>
            <input type="number" id="startTime" min="0" step="0.1" value="0">
            <label for="endTime">Fin (segundos):</label>
            <input type="number" id="endTime" min="0" step="0.1" value="6">
            <button onclick="previewClip()">Previsualizar Fragmento</button>
            <button onclick="generateSticker()">Generar Sticker</button>
        </div>
        <div class="output">
            <p id="status">Ingresa una URL para comenzar.</p>
            <a id="downloadLink" style="display: none;" download="sticker.mp4">Descargar Sticker</a>
        </div>
        <button onclick="shareWhatsApp()" class="whatsapp-btn">Compartir en WhatsApp</button>
    </div>
    <script src="script.js"></script>
</body>
</html>

Diony Quijada, [2/7/2025 8:34 p. m.]
function loadVideo() { const url = document.getElementById('videoUrl').value; const videoPlayer = document.getElementById('videoPlayer'); const videoSource = document.getElementById('videoSource'); const status = document.getElementById('status'); const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/; const match = url.match(youtubeRegex); if (match) { videoSource.src = https://www.youtube.com/embed/${match[1]}; videoPlayer.load(); status.textContent = 'Video de YouTube cargado. Selecciona el fragmento.'; } else { videoSource.src = url; videoPlayer.load(); status.textContent = 'Video cargado. Selecciona el fragmento.'; } } function previewClip() { const videoPlayer = document.getElementById('videoPlayer'); const startTime = parseFloat(document.getElementById('startTime').value); const endTime = parseFloat(document.getElementById('endTime').value); const status = document.getElementById('status'); if (endTime - startTime < 3  endTime - startTime > 6) { status.textContent = 'El fragmento debe durar entre 3 y 6 segundos.'; return; } videoPlayer.currentTime = startTime; videoPlayer.play(); const stopVideo = () => { if (videoPlayer.currentTime >= endTime) { videoPlayer.pause(); videoPlayer.removeEventListener('timeupdate', stopVideo); } }; videoPlayer.addEventListener('timeupdate', stopVideo); } async function generateSticker() { const url = document.getElementById('videoUrl').value; const startTime = parseFloat(document.getElementById('startTime').value); const endTime = parseFloat(document.getElementById('endTime').value); const status = document.getElementById('status'); const downloadLink = document.getElementById('downloadLink'); if (endTime - startTime < 3  endTime - startTime > 6) { status.textContent = 'El fragmento debe durar entre 3 y 6 segundos.'; return; } status.textContent = 'Procesando el video...'; try { const response = await fetch('/api/generate-sticker', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, startTime, endTime }) }); if (response.ok) { const blob = await response.blob(); downloadLink.href = URL.createObjectURL(blob); downloadLink.style.display = 'block'; status.textContent = 'Sticker generado. Haz clic para descargar.'; } else { status.textContent = 'Error al generar el sticker.'; } } catch (error) { status.textContent = 'Error en la conexión con el servidor.'; } } function shareWhatsApp() { const downloadLink = document.getElementById('downloadLink'); if (downloadLink.style.display === 'none') { alert('Primero genera el sticker.'); return; } const whatsappUrl = https://wa.me/?text=Mira%20este%20sticker%20que%20cre%C3%A9%3A%20${encodeURIComponent(downloadLink.href)}; window.open(whatsappUrl, '_blank'); }
