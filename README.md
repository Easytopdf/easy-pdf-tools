body {
  font-family: sans-serif;
  margin: 0; padding: 0;
  background: #fafafa;
  color: #333;
  transition: background 0.3s, color 0.3s;
}
body.dark {
  background: #1e1e1e;
  color: #ddd;
}
header {
  display: flex; justify-content: space-between;
  padding: 1rem; background: #4a90e2; color: #fff;
}
#dropZone {
  border: 2px dashed #aaa;
  margin: 1rem auto;
  width: 90%; padding: 2rem;
  text-align: center;
  cursor: pointer;
}
#imagePanel img {
  max-width: 150px;
  margin: 0.5rem;
  cursor: pointer;
  border: 2px solid transparent;
}
#imagePanel img.selected {
  border-color: #4a90e2;
}
#controls {
  margin: 1rem;
}
button, input[type="range"] {
  margin: 0.5rem;
}# Easy PDF Tools

Online image-to-PDF converter with:
- Drag & drop upload
- Crop, resize, rotate
- Brightness & contrast filters
- Real-time PDF generation

## Setup

1. Unzip the folder into easy-pdf-tools/
2. Visit index.html in your browser locally
3. To publish live:
   - Create a GitHub repo
   - Upload these files (include libs/ folder)
   - Enable Pages in *Settings > Pages*, main branch, root folder
   - Live URL: https://<your-username>.github.io/<repo-name>/
