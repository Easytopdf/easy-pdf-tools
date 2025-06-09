const dropZone = document.getElementById('dropZone'); const fileInput = document.getElementById('fileInput'); const imagePanel = document.getElementById('imagePanel'); const generatePDF = document.getElementById('generatePDF'); const cropBtn = document.getElementById('cropBtn'); const rotateBtn = document.getElementById('rotateBtn'); const sizeRange = document.getElementById('sizeRange'); const brightnessRange = document.getElementById('brightnessRange'); const contrastRange = document.getElementById('contrastRange'); const controls = document.getElementById('controls'); const modeToggle = document.getElementById('modeToggle');

let images = [];

modeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

dropZone.addEventListener('click', () => fileInput.click()); dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'green'; }); dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = '#ccc'; }); dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.style.borderColor = '#ccc'; handleFiles(e.dataTransfer.files); });

fileInput.addEventListener('change', () => handleFiles(fileInput.files));

function handleFiles(files) { for (let file of files) { const reader = new FileReader(); reader.onload = (e) => { const img = document.createElement('img'); img.src = e.target.result; imagePanel.appendChild(img); images.push(e.target.result); }; reader.readAsDataURL(file); } controls.style.display = 'block'; }

generatePDF.addEventListener('click', async () => { const { PDFDocument, rgb } = PDFLib; const pdfDoc = await PDFDocument.create();

for (let image of images) { const imgBytes = await fetch(image).then(res => res.arrayBuffer()); let pdfImage; if (image.startsWith('data:image/jpeg')) { pdfImage = await pdfDoc.embedJpg(imgBytes); } else { pdfImage = await pdfDoc.embedPng(imgBytes); } const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]); page.drawImage(pdfImage, { x: 0, y: 0, width: pdfImage.width, height: pdfImage.height, }); }

const pdfBytes = await pdfDoc.save(); const blob = new Blob([pdfBytes], { type: 'application/pdf' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'converted.pdf'; link.click(); });
