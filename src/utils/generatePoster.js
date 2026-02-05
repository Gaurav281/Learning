export const generatePoster = (title) => {
  const canvas = document.createElement("canvas");

  // Poster size (16:9)
  canvas.width = 800;
  canvas.height = 450;

  const ctx = canvas.getContext("2d");

  // Background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#1e3a8a"); // blue-800
  gradient.addColorStop(1, "#2563eb"); // blue-600

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text settings
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dynamic font size
  let fontSize = 52;
  if (title.length > 30) fontSize = 42;
  if (title.length > 50) fontSize = 34;

  ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;

  // Word wrapping
  const words = title.split(" ");
  let line = "";
  const lines = [];
  const maxWidth = canvas.width * 0.8;

  words.forEach((word) => {
    const testLine = line + word + " ";
    const { width } = ctx.measureText(testLine);

    if (width > maxWidth) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  lines.push(line);

  // Center vertically
  const lineHeight = fontSize * 1.2;
  const startY =
    canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((l, i) => {
    ctx.fillText(l.trim(), canvas.width / 2, startY + i * lineHeight);
  });

  return canvas.toDataURL("image/png");
};
