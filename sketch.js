let seaweedColors = [];
let seaweedLengths = [];
let seaweedAmplitudes = [];
let seaweedFrequencies = [];
let bubbles = [];

function setup() { //初始設定函數，只會執行一次
  let canvas = createCanvas(windowWidth, windowHeight); //產生一個寬高為視窗大小的畫布
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1');
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布

  let iframe = createElement('iframe', '');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.attribute('width', windowWidth);
  iframe.attribute('height', windowHeight);
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '0');

  let seaweedCount = 40; // 海草數量

  // 定義一些固定的綠色範圍
  let colors = [
    color(34, 139, 34, 150), // ForestGreen with transparency
    color(0, 128, 0, 150),   // Green with transparency
    color(50, 205, 50, 150), // LimeGreen with transparency
    color(107, 142, 35, 150), // OliveDrab with transparency
    color(60, 179, 113, 150) // MediumSeaGreen with transparency
  ];

  // 為每條海草隨機選擇一個顏色、長度、擺動幅度和頻率
  for (let j = 0; j < seaweedCount; j++) {
    seaweedColors.push(colors[int(random(colors.length))]);
    seaweedLengths.push(random(200, 400)); // 增加海草的長度範圍
    seaweedAmplitudes.push(random(50, 60)); // 增加擺動幅度
    seaweedFrequencies.push(random(0.01, 0.02)); // 增加擺動頻率
  }

  // 產生泡泡
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(windowWidth),
      y: random(windowHeight),
      size: random(10, 30),
      speed: random(1, 2)
    });
  }
}

function draw() { //繪圖函數，會一直執行
  clear(); // 清除畫布，保持透明背景

  let seaweedCount = 40; // 海草數量
  let segments = 6; // 增加線條分段數量

  // 繪製海草
  for (let j = 0; j < seaweedCount; j++) {
    let x = (j / seaweedCount) * windowWidth; // 線條底部的X座標
    let y1 = windowHeight; // 線條底部的Y座標
    let segmentLength = seaweedLengths[j] / segments; // 使用預先選擇的固定長度
    let maxAmplitude = seaweedAmplitudes[j]; // 使用預先選擇的固定擺動幅度
    let frequency = seaweedFrequencies[j]; // 使用預先選擇的固定擺動頻率

    // 使用預先選擇的顏色
    stroke(seaweedColors[j]);
    strokeWeight(40); // 設定線條粗細
    noFill(); // 確保沒有填充

    // 繪製多段線條，模擬海草擺動
    beginShape();
    for (let i = 0; i <= segments; i++) {
      let y2 = y1 - segmentLength;
      let amplitude = maxAmplitude * (i / segments); // 擺動幅度隨高度增加
      let x2 = x + amplitude * (noise((frameCount * frequency + j * 100 + i * 10)) - 0.5) * 2; // 減少隨機性，使其左右擺動更順滑
      vertex(x, y1);
      x = x2;
      y1 = y2;
    }
    endShape();
  }

  // 繪製泡泡
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);

    // 繪製高光
    fill(255, 255, 255, 200);
    ellipse(bubble.x + bubble.size * 0.1, bubble.y - bubble.size * 0.3, bubble.size * 0.3);

    bubble.y -= bubble.speed;
    if (bubble.y < 0) {
      bubble.y = windowHeight;
      bubble.x = random(windowWidth);
    }
  }
}

