document.addEventListener('DOMContentLoaded', function () {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const imagePanel = document.getElementById('imagePanel');
  const controls = document.getElementById('controls');
  const modeToggle = document.getElementById('modeToggle');

  let imageFiles = [];

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#0056b3';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#007bff';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', () => handleFiles(fileInput.files));

  function handleFiles(files) {
    controls.style.display = 'block';
    imagePanel.innerHTML = '';
    imageFiles = Array.from(files);

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        imagePanel.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  document.getElementById('generatePDF').addEventListener('click', async () => {
    const { PDFDocument } = window.pdfLib;
    const pdfDoc = await PDFDocument.create();

    for (let file of imageFiles) {
      const imageBytes = await file.arrayBuffer();
      let imgEmbed;
      if (file.type === 'image/jpeg') {
        imgEmbed = await pdfDoc.embedJpg(imageBytes);
      } else {
        imgEmbed = await pdfDoc.embedPng(imageBytes);
      }
      const page = pdfDoc.addPage([imgEmbed.width, imgEmbed.height]);
      page.drawImage(imgEmbed, {
        x: 0,
        y: 0,
        width: imgEmbed.width,
        height: imgEmbed.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.pdf';
    link.click();
  });

  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
