'use strict';
var DATA_CLOUD = {
  startX: 100,
  startY: 10,
  widthRect: 420,
  heightRect: 270,
  offsetShadow: 10,
  fillColor: ['rgb(255, 255, 255)', 'rgba(0, 0, 0, 0.7)'],
  text: ['Ура вы победили!', 'Список результатов:'],
  textColor: 'rgb(0, 0, 0)',
  textFonts: '16px PT Mono',
  MarginLeft: 40,
  textMarginTop: 25
};
var DATA_HISTOGRAM = {
  histogramHeight: 150,
  columnWidth: 40,
  columnMarginLeft: 50,
  columnMarginTop: 40,
  playerColor: 'rgba(255, 0, 0, 1)',
  textMargin: 20
};
window.renderStatistics = function (ctx, names, times) {
  drawRect(DATA_CLOUD.startX + DATA_CLOUD.offsetShadow, DATA_CLOUD.startY + DATA_CLOUD.offsetShadow, DATA_CLOUD.widthRect, DATA_CLOUD.heightRect, DATA_CLOUD.fillColor[1]);
  drawRect(DATA_CLOUD.startX, DATA_CLOUD.startY, DATA_CLOUD.widthRect, DATA_CLOUD.heightRect, DATA_CLOUD.fillColor[0]);
  // цикл отрисовки заглавного текста
  for (var i = 0; i < DATA_CLOUD.text.length; i++) {
    var heightLine = (i + 1) * DATA_CLOUD.textMarginTop;
    drawText(DATA_CLOUD.text[i], DATA_CLOUD.startX + DATA_CLOUD.MarginLeft, DATA_CLOUD.startY + heightLine);
  }
  var step = DATA_HISTOGRAM.histogramHeight / getMaxValue(times);
  // цикл отрисовки гистограммы и текста(имена и времени)
  for (var j = 0; j < times.length; j++) {
    var histogramHeight = times[j] * step;
    var histogramStartX = DATA_CLOUD.startX + (DATA_HISTOGRAM.columnWidth + DATA_HISTOGRAM.columnMarginLeft) * j + DATA_CLOUD.MarginLeft;
    var histogramStartY = DATA_CLOUD.startY + heightLine + DATA_HISTOGRAM.columnMarginTop + DATA_HISTOGRAM.histogramHeight - histogramHeight;
    drawText(Math.round(times[j]), histogramStartX, histogramStartY - DATA_HISTOGRAM.textMargin);
    var columnColor = fillBarColor(names[j]);
    drawRect(histogramStartX, histogramStartY, DATA_HISTOGRAM.columnWidth, histogramHeight, columnColor);
    drawText(names[j], histogramStartX, histogramStartY + histogramHeight + DATA_HISTOGRAM.textMargin);
  }
  // функция отрисовки текста
  function drawText(text, attitudeX, attitudeY) {
    ctx.fillStyle = DATA_CLOUD.textColor;
    ctx.font = DATA_CLOUD.textFonts;
    ctx.fillText(text, attitudeX, attitudeY);
  }
  // функция отрисовки прямоугольника
  function drawRect(positionX, positionY, width, height, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(positionX, positionY, width, height);
  }
  // функция по поиску максимального значения массива
  function getMaxValue(array) {
    var maxElement = 0;
    for (var k = 0; k < array.length; k++) {
      var value = array[k];
      if (value > maxElement) {
        maxElement = value;
      }
    }
    return maxElement;
  }
  // функция заливки колонок гистограммы цветом
  function fillBarColor(namePlayer) {
    var randomBlueColor = Math.floor(Math.random() * (256 - 100) + 100);
    if (namePlayer === 'Вы') {
      ctx.fillStyle = DATA_HISTOGRAM.playerColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0, ' + randomBlueColor + ')';
    }
  }
};

