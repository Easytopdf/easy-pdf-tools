const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const imagePanel = document.getElementById("imagePanel");
const controls = document.getElementById("controls");
const generatePDFBtn = document.getElementById("generatePDF");

let images = [];

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "#e0e0e0";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "white";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.background = "white";
  handleFiles(e.dataTransfer.files);
});

function handleFiles(files) {
  images = [];
  imagePanel.innerHTML = "";
  for (let file of files) {
    if (!file.type.startsWith("image/")) continue;
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      imagePanel.appendChild(img);
      images.push(reader.result);
    };
    reader.readAsDataURL(file);
  }
  controls.style.display = "block";
}

generatePDFBtn.addEventListener("click", async () => {
  if (images.length === 0) return alert("Upload images first!");

  const { PDFDocument } = PDFLib;
  const pdfDoc = await PDFDocument.create();

  for (let imgData of images) {
    const img = await fetch(imgData).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedJpg(img); // You can check format
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "converted.pdf";
  link.click();
});
