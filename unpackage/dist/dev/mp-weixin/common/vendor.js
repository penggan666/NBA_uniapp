(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "../../../projects/NBAdesign2/js_sdk/u-charts/components/u-charts/u-charts.js":
/*!***************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/js_sdk/u-charts/components/u-charts/u-charts.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {/*
 * uCharts v1.7.0.20190623
 * uni-app平台高性能跨全端图表，支持H5、APP、小程序（微信/支付宝/百度/头条）
 * Copyright (c) 2019 QIUN秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 
 * uCharts官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 * 
 */

Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: 12,
  pixelRatio: 1, //适配H5高分屏
  rotate: false, //横屏模式
  columePadding: 3,
  fontSize: 13,
  //dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  dataPointShape: ['circle', 'circle', 'circle', 'circle'], //仿F2图例样式改为圆点
  colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarGridCount: 3,
  radarLabelTextMargin: 15,
  gaugeLabelTextMargin: 15 };


// Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target, varArgs) {
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;

    return !flag;
  } };


// hex 转 rgba
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opc + ')';
}

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[wxCharts] unvalid series data!');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }

  return num / multiple;
}

function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  var seriesTemp = [];
  for (var k = 0; k < dayArr.length; k++) {
    var seriesItem = { data: [], name: nameArr[k], color: colorArr[k] };
    for (var i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}

function calValidDistance(distance, chartData, config, opts) {

  var dataChartAreaWidth = opts.width - config.padding - chartData.xAxisPoints[0];
  var dataChartWidth = chartData.eachSpacing * opts.categories.length;
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }

    return angle;
  }

  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }

  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;

  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;

  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);

  return {
    transX: transX,
    transY: transY };

}

function createCurveControlPoints(points, i) {

  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
    } else {
      return false;
    }
  }

  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/79
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }

  return {
    ctrA: { x: pAx, y: pAy },
    ctrB: { x: pBx, y: pBy } };

}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fillSeriesColor(series, config) {
  var index = 0;
  return series.map(function (item) {
    if (!item.color) {
      item.color = config.colors[index];
      index = (index + 1) % config.colors.length;
    }
    return item;
  });
}

function fillSeriesType(series, opts) {
  return series.map(function (item) {
    if (!item.type) {
      item.type = opts.type;
    }
    return item;
  });
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else {
    limit = 0.01;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.fontSize;

  // wx canvas 未实现measureText方法, 此处自行实现
  // 适配修改初始字体10px为其他大小的方法
  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function (item) {
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  });
  return width * fontSize / 10;
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function dataCombineStack(series) {
  var sum = new Array(series[0].data.length);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}

function getTouches(touches, opts, e) {
  var x, y;
  if (touches.clientX) {
    if (opts.rotate) {//适配横屏
      y = opts.height - touches.clientX * opts.pixelRatio;
      x = (touches.pageY - e.mp.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) * opts.pixelRatio;
    } else {
      x = touches.clientX * opts.pixelRatio;
      y = (touches.pageY - e.mp.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) * opts.pixelRatio;
    }
  } else {
    if (opts.rotate) {//适配横屏
      y = opts.height - touches.x * opts.pixelRatio;
      x = touches.y * opts.pixelRatio;
    } else {
      x = touches.x * opts.pixelRatio;
      y = touches.y * opts.pixelRatio;
    }
  }
  return { x: x, y: y };
}

function getSeriesDataItem(series, index) {
  var data = [];
  series.forEach(function (item) {
    if (item.data[index] !== null && typeof item.data[index] !== 'undefined') {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.shape = item.shape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.name = item.name;
      seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
      data.push(seriesItem);
    }
  });

  return data;
}

function getMaxTextListLength(list) {
  var lengthList = list.map(function (item) {
    return measureText(item);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }

  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color };

  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  calPoints.forEach(function (points) {
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  });
  validCalPoints.forEach(function (item) {
    offset.x = Math.round(item.x);
    offset.y += item.y;
  });

  offset.y /= validCalPoints.length;
  return { textList: textList, offset: offset };
}

function getMixToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false };

  });
  textList = textList.filter(function (item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  calPoints.forEach(function (points) {
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  });
  validCalPoints.forEach(function (item) {
    offset.x = Math.round(item.x);
    offset.y += item.y;
  });

  offset.y /= validCalPoints.length;
  return { textList: textList, offset: offset };
}

function getCandleToolTipData(series, seriesData, calPoints, index, categories, extra) {
  var option = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var upColor = extra.color.upFill;
  var downColor = extra.color.downFill;
  //颜色顺序为开盘，收盘，最低，最高
  var color = [upColor, upColor, downColor, upColor];
  var textList = [];
  var text0 = {
    text: categories[index],
    color: null };

  textList.push(text0);
  seriesData.map(function (item) {
    //console.log(color)
    if (index == 0 && item.data[1] - item.data[0] < 0) {
      color[1] = downColor;
    } else {
      if (item.data[0] < series[index - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index - 1][1]) {
        color[3] = downColor;
      }
    }

    var text1 = {
      text: '开盘：' + item.data[0],
      color: color[0] };

    var text2 = {
      text: '收盘：' + item.data[1],
      color: color[1] };

    var text3 = {
      text: '最低：' + item.data[2],
      color: color[2] };

    var text4 = {
      text: '最高：' + item.data[3],
      color: color[3] };

    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  calPoints.forEach(function (points) {
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  });
  offset.x = Math.round(validCalPoints[0][0].x);
  return { textList: textList, offset: offset };
}

function findCurrentIndex(currentPoints, xAxisPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var currentIndex = -1;
  if (isInExactChartArea(currentPoints, opts, config)) {
    xAxisPoints.forEach(function (item, index) {
      if (currentPoints.x + offset > item) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x < opts.width - config.padding && currentPoints.x > config.padding + config.yAxisWidth + config.yAxisTitleWidth && currentPoints.y > config.padding && currentPoints.y < opts.height - config.legendHeight - config.xAxisHeight - config.padding;
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };

    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);

      return item;
    });

    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    for (var i = 0, len = pieData.series.length; i < len; i++) {
      var item = pieData.series[i];
      if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }

  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (item !== null) {
      items.push(item);
    } else {
      if (items.length) {
        newPoints.push(items);
      }
      items = [];
    }
  });
  if (items.length) {
    newPoints.push(items);
  }

  return newPoints;
}

function calLegendData(series, opts, config) {
  if (opts.legend === false) {
    return {
      legendList: [],
      legendHeight: 0 };

  }
  //适配H5高分屏
  var padding = 5 * opts.pixelRatio;
  var marginTop = 8 * opts.pixelRatio;
  var shapeWidth = 15 * opts.pixelRatio;
  var legendList = [];
  var widthCount = 0;
  var currentRow = [];
  series.forEach(function (item) {
    var itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefined');
    if (widthCount + itemWidth > opts.width) {
      legendList.push(currentRow);
      widthCount = itemWidth;
      currentRow = [item];
    } else {
      widthCount += itemWidth;
      currentRow.push(item);
    }
  });
  if (currentRow.length) {
    legendList.push(currentRow);
  }

  return {
    legendList: legendList,
    legendHeight: legendList.length * (config.fontSize + marginTop) + padding };

}

function calCategoriesData(categories, opts, config) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };


  var _getXAxisPoints = getXAxisPoints(categories, opts, config),
  eachSpacing = _getXAxisPoints.eachSpacing;

  // get max length of categories text


  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item);
  });

  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (opts.xAxis.rotateLabel == true && maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }

  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

  var data = [];
  series.forEach(function (each) {
    var listItem = {};
    listItem.color = each.color;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];

      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });

    data.push(listItem);
  });

  return data;
}

function getPieDataPoints(series) {
  var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var count = 0;
  var _start_ = 0;
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  });
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    if (count === 0) {
      item._proportion_ = 1 / series.length;
    } else {
      item._proportion_ = item.data / count * process;
    }
  });
  series.forEach(function (item) {
    item._start_ = _start_;
    _start_ += 2 * item._proportion_ * Math.PI;
  });

  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    var totalAngle;
    if (arcbarOption.type == 'default') {
      totalAngle = arcbarOption.startAngle - arcbarOption.endAngle + 1;
    } else {
      totalAngle = 2;
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  });
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var i = 0; i < categories.length; i++) {
        if (item.data <= categories[i].value) {
          item.color = categories[i].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  });
  return series;
}


function getPieTextMaxLength(series) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  series.forEach(function (item) {
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text));
  });

  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = (eachSpacing - 2 * config.columePadding) / columnLen;

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      // customer column width
      item.width = Math.min(item.width, +opts.extra.column.width);
    } else {
      // default width should less tran 25px
      // don't ask me why, I don't know
      item.width = Math.min(item.width, 25);
    }
    item.x += (index + 0.5 - columnLen / 2) * item.width;

    return item;
  });
}

function fixColumeMeterData(points, eachSpacing, columnLen, index, config, opts, border) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = eachSpacing - 2 * config.columePadding;

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    } else {
      item.width = Math.min(item.width, 25);
    }
    if (index > 0) {
      item.width -= 2 * border;
    }
    return item;
  });
}

function fixColumeStackData(points, eachSpacing, columnLen, index, config, opts, series) {

  return points.map(function (item, indexn) {

    if (item === null) {
      return null;
    }
    item.width = eachSpacing - 2 * config.columePadding;

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    } else {
      item.width = Math.min(item.width, 25);
    }
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  var eachSpacing = spacingValid / dataCount;

  var xAxisPoints = [];
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.enableScroll === true) {
    xAxisPoints.push(startX + categories.length * eachSpacing);
  } else {
    xAxisPoints.push(endX);
  }

  return { xAxisPoints: xAxisPoints, startX: startX, endX: endX, eachSpacing: eachSpacing };
}

function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function (items, indexs) {
        var point = {};
        point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });

  return points;
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
      var value = item;
      if (typeof item === 'object' && item !== null) {
        value = item.value;
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
      points.push(point);
    }
  });

  return points;
}

function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;

  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);

      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
      point.y0 = opts.height - config.xAxisHeight - config.legendHeight - Math.round(heightc) - config.padding;
      points.push(point);
    }
  });

  return points;
}

function getYAxisTextList(series, opts, config, stack) {
  var data;
  if (stack == 'stack') {
    //data = dataCombine(series);
    data = dataCombineStack(series);
  } else {
    data = dataCombine(series);
  }

  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      //判断是否为数组
      if (item.constructor == Array) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  //var minData = Math.min.apply(this, data);
  //var maxData = Math.max.apply(this, data);
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor == Array) {
        item.map(function (subitem) {
          sorted.push(subitem);
        });
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
    //typeof item === 'object' ? sorted.push(item.value) : sorted.push(item)
  });
  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  if (typeof opts.yAxis.min === 'number') {
    minData = Math.min(opts.yAxis.min, minData);
  }
  if (typeof opts.yAxis.max === 'number') {
    maxData = Math.max(opts.yAxis.max, maxData);
  }

  // fix issue https://github.com/xiaolin3303/wx-charts/issues/9
  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    //minData -= rangeSpan;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / config.yAxisSplit;

  for (var i = 0; i <= config.yAxisSplit; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config) {
  //堆叠图重算Y轴
  var columnstyle = assign({}, opts.extra.column || { "type": "" });

  var ranges = getYAxisTextList(series, opts, config, columnstyle.type);
  var yAxisWidth = config.yAxisWidth;
  var rangesFormat = ranges.map(function (item) {
    item = util.toFixed(item, 2);
    item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
    yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
    return item;
  });
  if (opts.yAxis.disabled === true) {
    yAxisWidth = 0;
  }

  return { rangesFormat: rangesFormat, ranges: ranges, yAxisWidth: yAxisWidth };
}

function calTooltipYAxisData(point, series, opts, config, eachSpacing) {
  var ranges = getYAxisTextList(series, opts, config);
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var maxVal = ranges[0];
  var minVal = ranges[ranges.length - 1];
  var minAxis = config.padding;
  var maxAxis = config.padding + spacingValid;
  var item = maxVal - (maxVal - minVal) * (point - minAxis) / (maxAxis - minAxis);
  item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
  return item;
}

function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  context.setStrokeStyle("#ffffff");
  context.setLineWidth(1 * opts.pixelRatio);
  context.setFillStyle(color);
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 3.5 * opts.pixelRatio, item.y);
        context.arc(item.x, item.y, 4 * opts.pixelRatio, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'rect') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  }
  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || config.titleColor;
  var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;
  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize);
    var startX = (opts.width - textWidth) / 2 + (opts.subtitle.offsetX || 0);
    var startY = (opts.height - config.legendHeight + subtitlefontSize) / 2 + (opts.subtitle.offsetY || 0);
    if (title) {
      startY -= (titleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize);
    var _startX = (opts.width - _textWidth) / 2 + (opts.title.offsetX || 0);
    var _startY = (opts.height - config.legendHeight + titlefontSize) / 2 + (opts.title.offsetY || 0);
    if (subtitle) {
      _startY += (subtitleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}

function drawPointText(points, series, config, context) {
  // 绘制数据文案
  var data = series.data;


  points.forEach(function (item, index) {
    if (item !== null) {
      //var formatVal = series.format ? series.format(data[index]) : data[index];
      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle('#666666');
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        value = data[index].value;
      }
      var formatVal = series.format ? series.format(value) : value;
      context.fillText(formatVal, item.x - measureText(formatVal) / 2, item.y - 2);
      context.closePath();
      context.stroke();
    }
  });

}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + config.gaugeLabelTextMargin;

  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    pos.x += centerPosition.x - measureText(nowNumber) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(gaugeOption.labelColor || '#666666');
    context.fillText(nowNumber, startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();

    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }

}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin;

  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '') / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '');
    }
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || '#666666');
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });

}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = radius + config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;

  var seriesConvert = series.map(function (item) {
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    var color = item.color;
    return { arc: arc, text: text, color: color };
  });
  seriesConvert.forEach(function (item) {
    // line end
    var orginX1 = Math.cos(item.arc) * lineRadius;
    var orginY1 = Math.sin(item.arc) * lineRadius;

    // line start
    var orginX2 = Math.cos(item.arc) * radius;
    var orginY2 = Math.sin(item.arc) * radius;

    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;

    var textWidth = measureText(item.text);
    var startY = orginY3;

    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, { x: orginX3 })) {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }

    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }

    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color };


    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  });

  textObjectCollection.forEach(function (item) {
    var lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
    context.setLineWidth(1 * opts.pixelRatio);
    context.setFontSize(config.fontSize);
    context.beginPath();
    context.setStrokeStyle(item.color);
    context.setFillStyle(item.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
    var textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + item.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle('#666666');
    context.fillText(item.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  });
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startY = config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.beginPath();
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.closePath();
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.xAxisLabel) {
    var lableText = opts.categories[opts.tooltip.index];
    context.setFontSize(config.fontSize);
    var textWidth = context.measureText(lableText).width;

    var textX = offsetX - config.toolTipPadding - 0.5 * textWidth;
    var textY = endY;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pixelRatio);
    context.rect(textX, textY, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
    context.fillText(lableText, textX + 2 * config.toolTipPadding, textY + config.toolTipPadding + config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startX = config.padding + config.yAxisWidth + config.yAxisTitleWidth;
  var endX = opts.width - config.padding;

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.beginPath();
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.closePath();
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.yAxisLabel) {

    var lableText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts, config, eachSpacing);
    context.setFontSize(config.fontSize);
    var textWidth = context.measureText(lableText).width;

    var textX = startX - 2 * config.toolTipPadding - textWidth;
    var textY = opts.tooltip.offset.y;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pixelRatio);
    context.rect(textX, textY - 0.5 * config.fontSize - config.toolTipPadding, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
    context.fillText(lableText, textX + config.toolTipPadding, textY + 0.5 * config.fontSize);
    context.closePath();
    context.stroke();
  }
}


function drawToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = opts.extra.tooltip || { activeBgColor: '#000000', activeBgOpacity: 0.08 };
  toolTipOption.activeBgColor = toolTipOption.activeBgColor ? toolTipOption.activeBgColor : '#000000';
  toolTipOption.activeBgOpacity = toolTipOption.activeBgOpacity ? toolTipOption.activeBgOpacity : 0.08;
  var startY = config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - eachSpacing / 2, startY, eachSpacing, endY - startY);
  context.closePath();
  context.fill();
}

function drawToolTip(textList, offset, opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || { bgColor: '#000000', bgOpacity: 0.7, fontColor: '#FFFFFF' };
  toolTipOption.bgColor = toolTipOption.bgColor ? toolTipOption.bgColor : '#000000';
  toolTipOption.bgOpacity = toolTipOption.bgOpacity ? toolTipOption.bgOpacity : 0.7;
  toolTipOption.fontColor = toolTipOption.fontColor ? toolTipOption.fontColor : '#FFFFFF';
  var legendWidth = 4 * opts.pixelRatio;
  var legendMarginRight = 5 * opts.pixelRatio;
  var arrowWidth = 8 * opts.pixelRatio;
  var isOverRightBorder = false;
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'candle' || opts.type == 'mix') {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pixelRatio;
  var textWidth = textList.map(function (item) {
    return measureText(item.text);
  });

  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }

  // draw background rect
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor || config.toolTipBackground, toolTipOption.bgOpacity || config.toolTipOpacity));
  if (isOverRightBorder) {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  } else {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  }

  context.closePath();
  context.fill();

  // draw legend
  textList.forEach(function (item, index) {
    if (item.color !== null) {
      context.beginPath();
      context.setFillStyle(item.color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding + 1;
      if (isOverRightBorder) {
        startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      context.fillRect(startX, startY, legendWidth, config.fontSize);
      context.closePath();
    }
  });

  // draw text list

  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY + config.fontSize);
    context.closePath();
    context.stroke();
  });
}

function drawYAxisTitle(title, opts, config, context) {
  var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
  context.save();
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
  context.translate(0, opts.height);
  context.rotate(-90 * Math.PI / 180);
  context.fillText(title, startX, config.padding + 0.5 * config.fontSize);
  context.closePath();
  context.stroke();
  context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var columnOption = opts.extra.column || { type: {}, meter: {} };
  columnOption.type = columnOption.type == undefined ? 'group' : columnOption.type;
  columnOption.meter = columnOption.meter || {};
  columnOption.meter.border = columnOption.meter.border == undefined ? 4 : columnOption.meter.border;
  columnOption.meter.fillColor = columnOption.meter.fillColor == undefined ? '#FFFFFF' : columnOption.meter.fillColor;
  var _calYAxisData = calYAxisData(series, opts, config),
  ranges = _calYAxisData.ranges;

  var _getXAxisPoints = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints.xAxisPoints,
  eachSpacing = _getXAxisPoints.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config, context, eachSpacing);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        points.forEach(function (item, index) {
          if (item !== null) {
            context.beginPath();
            context.setFillStyle(item.color || eachSeries.color);
            var startX = item.x - item.width / 2 + 1;
            var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
            context.moveTo(startX, item.y);
            context.fillRect(startX, item.y, item.width - 2, height);
            context.closePath();
            context.fill();
          }
        });
        break;
      case 'stack':
        // 绘制堆叠数据图
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);

        points.forEach(function (item, index) {
          if (item !== null) {
            context.beginPath();
            context.setFillStyle(item.color || eachSeries.color);
            var startX = item.x - item.width / 2 + 1;
            var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
            var height0 = opts.height - item.y0 - config.padding - config.xAxisHeight - config.legendHeight;
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.moveTo(startX, item.y);
            context.fillRect(startX, item.y, item.width - 2, height);
            context.closePath();
            context.fill();
          }
        });
        break;
      case 'meter':
        // 绘制温度计数据图
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config, opts, columnOption.meter.border);
        if (seriesIndex == 0) {
          points.forEach(function (item, index) {
            if (item !== null) {
              //画背景颜色
              context.beginPath();
              context.setFillStyle(columnOption.meter.fillColor);
              var startX = item.x - item.width / 2 + 1;
              var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
              context.moveTo(startX, item.y);
              context.fillRect(startX, item.y, item.width - 2, height);
              context.closePath();
              context.fill();
              //画边框线
              context.beginPath();
              context.setStrokeStyle(eachSeries.color);
              context.setLineWidth(columnOption.meter.border * opts.pixelRatio);
              context.moveTo(startX + columnOption.meter.border * 0.5, item.y + height);
              context.lineTo(startX + columnOption.meter.border * 0.5, item.y + columnOption.meter.border * 0.5);
              context.lineTo(startX + item.width - columnOption.meter.border, item.y + columnOption.meter.border * 0.5);
              context.lineTo(startX + item.width - columnOption.meter.border, item.y + height);
              context.stroke();
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (item !== null) {
              context.beginPath();
              context.setFillStyle(item.color || eachSeries.color);
              var startX = item.x - item.width / 2 + 1;
              var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
              context.moveTo(startX, item.y);
              context.rect(startX, item.y, item.width - 2, height);
              context.closePath();
              context.fill();
            }
          });
        }
        break;}

  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

          drawPointText(points, eachSeries, config, context);
          break;
        case 'stack':
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawPointText(points, eachSeries, config, context);
          break;
        case 'meter':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          drawPointText(points, eachSeries, config, context);
          break;}

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawCandleDataPoints(series, seriesMA, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var candleOption = opts.extra.candle || { color: {}, average: {} };
  candleOption.color.upLine = candleOption.color.upLine ? candleOption.color.upLine : '#f04864';
  candleOption.color.upFill = candleOption.color.upFill ? candleOption.color.upFill : '#f04864';
  candleOption.color.downLine = candleOption.color.downLine ? candleOption.color.downLine : '#2fc25b';
  candleOption.color.downFill = candleOption.color.downFill ? candleOption.color.downFill : '#2fc25b';
  candleOption.average.show = candleOption.average.show === true ? true : false;
  candleOption.average.name = candleOption.average.name ? candleOption.average.name : [];
  candleOption.average.day = candleOption.average.day ? candleOption.average.day : [];
  candleOption.average.color = candleOption.average.color ? candleOption.average.color : ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'];
  opts.extra.candle = candleOption;

  var _calYAxisData5 = calYAxisData(series, opts, config),
  ranges = _calYAxisData5.ranges;

  var _getXAxisPoints5 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints5.xAxisPoints,
  eachSpacing = _getXAxisPoints5.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  //画均线
  if (candleOption.average.show) {
    seriesMA.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      //calPoints.push(points);
      var splitPointList = splitPoints(points);

      splitPointList.forEach(function (points, index) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      });
    });
  }
  //画K线
  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);
    splitPointList = splitPointList[0];

    splitPointList.forEach(function (points, index) {
      context.beginPath();
      //如果上涨
      if (data[index][1] - data[index][0] > 0) {
        context.setStrokeStyle(candleOption.color.upLine);
        context.setFillStyle(candleOption.color.upFill);
        context.setLineWidth(1 * opts.pixelRatio);
        context.moveTo(points[3].x, points[3].y); //顶点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[1].x - eachSpacing / 4, points[1].y); //收盘左侧点
        context.lineTo(points[0].x - eachSpacing / 4, points[0].y); //开盘左侧点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[2].x, points[2].y); //底点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[0].x + eachSpacing / 4, points[0].y); //开盘右侧点
        context.lineTo(points[1].x + eachSpacing / 4, points[1].y); //收盘右侧点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.moveTo(points[3].x, points[3].y); //顶点
      } else {
        context.setStrokeStyle(candleOption.color.downLine);
        context.setFillStyle(candleOption.color.downFill);
        context.setLineWidth(1 * opts.pixelRatio);
        context.moveTo(points[3].x, points[3].y); //顶点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.lineTo(points[0].x - eachSpacing / 4, points[0].y); //开盘左侧点
        context.lineTo(points[1].x - eachSpacing / 4, points[1].y); //收盘左侧点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[2].x, points[2].y); //底点
        context.lineTo(points[1].x, points[1].y); //收盘中间点
        context.lineTo(points[1].x + eachSpacing / 4, points[1].y); //收盘右侧点
        context.lineTo(points[0].x + eachSpacing / 4, points[0].y); //开盘右侧点
        context.lineTo(points[0].x, points[0].y); //开盘中间点
        context.moveTo(points[3].x, points[3].y); //顶点
      }
      context.closePath();
      context.fill();
      context.stroke();
    });
  });


  context.restore();



  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var areaOption = opts.extra.area || { type: 'straight', opacity: 0.5, addLine: false, width: 2 };
  areaOption.type = areaOption.type ? areaOption.type : 'straight';
  areaOption.opacity = areaOption.opacity ? areaOption.opacity : 0.2;
  areaOption.addLine = areaOption.addLine == true ? true : false;
  areaOption.width = areaOption.width ? areaOption.width : 2;
  var _calYAxisData2 = calYAxisData(series, opts, config),
  ranges = _calYAxisData2.ranges;

  var _getXAxisPoints2 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints2.xAxisPoints,
  eachSpacing = _getXAxisPoints2.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }


  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    var splitPointList = splitPoints(points);

    splitPointList.forEach(function (points) {
      // 绘制区域数据
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      context.setLineWidth(areaOption.width * opts.pixelRatio);
      if (points.length > 1) {
        var firstPoint = points[0];
        var lastPoint = points[points.length - 1];

        context.moveTo(firstPoint.x, firstPoint.y);
        if (areaOption.type === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }

        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var item = points[0];
        context.moveTo(item.x - eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, endY);
        context.lineTo(item.x - eachSpacing / 2, endY);
        context.moveTo(item.x - eachSpacing / 2, item.y);
      }
      context.closePath();
      context.fill();


      //画连线
      if (areaOption.addLine) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pixelRatio);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          if (areaOption.type === 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      }
    });

    //画点
    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }

  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var lineOption = opts.extra.line || { type: 'straight', width: 2 };
  lineOption.type = lineOption.type ? lineOption.type : 'straight';
  lineOption.width = lineOption.width ? lineOption.width : 2;
  var _calYAxisData3 = calYAxisData(series, opts, config),
  ranges = _calYAxisData3.ranges;

  var _getXAxisPoints3 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints3.xAxisPoints,
  eachSpacing = _getXAxisPoints3.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);

    splitPointList.forEach(function (points, index) {
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setLineWidth(lineOption.width * opts.pixelRatio);
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        if (lineOption.type === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }
        context.moveTo(points[0].x, points[0].y);
      }
      context.closePath();
      context.stroke();
    });

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawMixDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData6 = calYAxisData(series, opts, config),
  ranges = _calYAxisData6.ranges;

  var _getXAxisPoints6 = getXAxisPoints(opts.categories, opts, config),
  xAxisPoints = _getXAxisPoints6.xAxisPoints,
  eachSpacing = _getXAxisPoints6.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var calPoints = [];

  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function (eachSeries, seriesIndex) {
    if (eachSeries.type == 'column') {
      columnLength += 1;
    }
  });
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    // 绘制柱状数据图
    if (eachSeries.type == 'column') {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
      points.forEach(function (item, index) {
        if (item !== null) {
          context.beginPath();
          context.setFillStyle(item.color || eachSeries.color);
          var startX = item.x - item.width / 2 + 1;
          var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
          context.moveTo(startX, item.y);
          context.rect(startX, item.y, item.width - 2, height);
          context.closePath();
          context.fill();
        }
      });
      columnIndex += 1;
    }

    //绘制区域图数据

    if (eachSeries.type == 'area') {
      var splitPointList = splitPoints(points);
      splitPointList.forEach(function (points) {
        // 绘制区域数据
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setFillStyle(eachSeries.color);
        context.setGlobalAlpha(0.2);
        context.setLineWidth(2 * opts.pixelRatio);
        if (points.length > 1) {
          var firstPoint = points[0];
          var lastPoint = points[points.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          if (eachSeries.style === 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          var item = points[0];
          context.moveTo(item.x - eachSpacing / 2, item.y);
          context.lineTo(item.x + eachSpacing / 2, item.y);
          context.lineTo(item.x + eachSpacing / 2, endY);
          context.lineTo(item.x - eachSpacing / 2, endY);
          context.moveTo(item.x - eachSpacing / 2, item.y);
        }
        context.closePath();
        context.fill();
        context.setGlobalAlpha(1);
      });
    }



    // 绘制折线数据图
    if (eachSeries.type == 'line') {
      var splitPointList = splitPoints(points);
      splitPointList.forEach(function (points, index) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(2 * opts.pixelRatio);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          if (eachSeries.style == 'curve') {
            points.forEach(function (item, index) {
              if (index > 0) {
                var ctrlPoint = createCurveControlPoints(points, index - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            });
          } else {
            points.forEach(function (item, index) {
              if (index > 0) {
                context.lineTo(item.x, item.y);
              }
            });
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.closePath();
        context.stroke();
      });
    }

    // 绘制点数据图
    if (eachSeries.type == 'point') {
      var splitPointList = splitPoints(points);
      splitPointList.forEach(function (points, index) {
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(2 * opts.pixelRatio);
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
      });
    }

    if (opts.dataPointShape !== false && eachSeries.type !== 'column') {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      if (eachSeries.type !== 'column') {
        drawPointText(points, eachSeries, config, context);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
        drawPointText(points, eachSeries, config, context);
        columnIndex += 1;
      }

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == 'line' || opts.type == 'area' || opts.type == 'column' || opts.type == 'candle' || opts.type == 'mix')) {
    drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context, eachSpacing, xAxisPoints);
  }
  context.restore();

}

function drawXAxis(categories, opts, config, context) {

  var _getXAxisPoints4 = getXAxisPoints(categories, opts, config),
  xAxisPoints = _getXAxisPoints4.xAxisPoints,
  startX = _getXAxisPoints4.startX,
  endX = _getXAxisPoints4.endX,
  eachSpacing = _getXAxisPoints4.eachSpacing;

  var startY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var endY = config.padding;


  //绘制滚动条
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - config.padding - config.legendHeight + 6 * opts.pixelRatio;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.setLineCap('butt');
    context.closePath();
  }

  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  context.beginPath();
  context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
  context.setLineCap('butt');
  context.setLineWidth(1 * opts.pixelRatio);
  if (opts.xAxis.gridType == 'dash') {
    context.setLineDash([opts.xAxis.dashLength, opts.xAxis.dashLength]);
  }
  if (opts.xAxis.disableGrid !== true) {
    if (opts.xAxis.type === 'calibration') {
      xAxisPoints.forEach(function (item, index) {
        if (index > 0) {
          context.moveTo(item - eachSpacing / 2, startY);
          context.lineTo(item - eachSpacing / 2, startY + 4 * opts.pixelRatio);
        }
      });
    } else {
      xAxisPoints.forEach(function (item, index) {
        context.moveTo(item, startY);
        context.lineTo(item, endY);
      });
    }
  }
  context.closePath();
  context.stroke();
  context.setLineDash([]);

  //不绘制X轴
  if (opts.xAxis.disabled !== true) {
    // 对X轴列表做抽稀处理
    var validWidth = opts.width - 2 * config.padding - config.yAxisWidth - config.yAxisTitleWidth;
    //默认全部显示X轴标签
    var maxXAxisListLength = categories.length;
    //如果不旋转X轴文案
    if (config._xAxisTextAngle_ === 0) {
      //如果设置了X轴单屏数量
      if (opts.xAxis.labelCount) {
        //如果设置X轴密度
        if (opts.xAxis.itemCount) {
          maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
        } else {
          maxXAxisListLength = opts.xAxis.labelCount;
        }
        maxXAxisListLength -= 1;
      }
    } else {
      //旋转标签文案
      maxXAxisListLength = Math.min(categories.length, Math.ceil(validWidth / config.fontSize / 1.5));
    }

    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    var newCategories = [];
    var cgLength = categories.length;
    for (var i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];
    /*
                                                            categories = categories.map(function (item, index) {
                                                            	return index % ratio !== 0 ? '' : item;
                                                            });*/


    if (config._xAxisTextAngle_ === 0) {
      newCategories.forEach(function (item, index) {
        var offset = eachSpacing / 2 - measureText(item) / 2;
        context.beginPath();
        context.setFontSize(config.fontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
        context.closePath();
        context.stroke();
      });

    } else {
      newCategories.forEach(function (item, index) {
        context.save();
        context.beginPath();
        context.setFontSize(config.fontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        var textWidth = measureText(item);
        var offset = eachSpacing / 2 - textWidth;

        var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + config.fontSize / 2 + 5, opts.height),
        transX = _calRotateTranslate.transX,
        transY = _calRotateTranslate.transY;

        context.rotate(-1 * config._xAxisTextAngle_);
        context.translate(transX, transY);
        context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
        context.closePath();
        context.stroke();
        context.restore();
      });
    }
  }
  context.restore();

}

function drawYAxisGrid(categories, opts, config, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var startX = config.padding + yAxisTotalWidth;
  var _getXAxisPoints4 = getXAxisPoints(categories, opts, config),
  xAxisPoints = _getXAxisPoints4.xAxisPoints,
  xAxiseachSpacing = _getXAxisPoints4.eachSpacing;
  var TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  var endX = startX + TotalWidth;

  var points = [];
  for (var i = 0; i < config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }
  points.push(config.padding + eachSpacing * config.yAxisSplit + 2);

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.yAxis.gridType == 'dash') {
    context.setLineDash([opts.yAxis.dashLength, opts.yAxis.dashLength]);
  }
  context.beginPath();
  context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");

  context.setLineWidth(1 * opts.pixelRatio);
  points.forEach(function (item, index) {
    context.moveTo(startX, item);
    context.lineTo(endX, item);
  });
  context.closePath();
  context.stroke();
  context.setLineDash([]);

  context.restore();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }

  var _calYAxisData4 = calYAxisData(series, opts, config),
  rangesFormat = _calYAxisData4.rangesFormat;

  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;

  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight + config.xAxisTextPadding;

  // set YAxis background
  context.beginPath();
  context.setFillStyle(opts.background || '#ffffff');
  if (opts._scrollDistance_ < 0) {
    context.fillRect(0, 0, startX, endY + config.xAxisHeight);
  }
  context.fillRect(endX, 0, opts.width, endY + config.xAxisHeight);
  context.closePath();
  context.stroke();

  var points = [];
  for (var i = 0; i <= config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }


  rangesFormat.forEach(function (item, index) {
    var pos = points[index] ? points[index] : endY;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(opts.yAxis.fontColor || '#666666');
    context.fillText(item, config.padding + config.yAxisTitleWidth, pos + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });


  if (opts.yAxis.title) {
    drawYAxisTitle(opts.yAxis.title, opts, config, context);
  }
}

function drawLegend(series, opts, config, context) {
  if (opts.legend === false) {
    return;
  }
  // each legend shape width 15px
  // the spacing between shape and text in each legend is the `padding`
  // each legend spacing is the `padding`
  // legend margin top `config.padding`

  var _calLegendData = calLegendData(series, opts, config),
  legendList = _calLegendData.legendList;

  var padding = 5 * opts.pixelRatio;
  var marginTop = 10 * opts.pixelRatio;
  var shapeWidth = 15 * opts.pixelRatio;
  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    itemList.forEach(function (item) {
      item.name = item.name || 'undefined';
      width += 3 * padding + measureText(item.name) + shapeWidth;
    });
    var startX = (opts.width - width) / 2 + padding;
    var startY = opts.height - config.padding - config.legendHeight + listIndex * (config.fontSize + marginTop) + padding + marginTop;

    context.setFontSize(config.fontSize);
    itemList.forEach(function (item) {
      switch (opts.type) {
        case 'line':
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
          break;
        case 'pie':
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
          break;
        case 'ring':
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 5 * opts.pixelRatio, 6 * opts.pixelRatio, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          context.stroke();
          break;
        //圆弧进度图不显示图例
        case 'gauge':
          break;
        case 'arcbar':
          break;
        default:
          context.beginPath();
          context.setLineWidth(1 * opts.pixelRatio);
          context.setStrokeStyle(item.color);
          context.setFillStyle(item.color);
          context.moveTo(startX, startY);
          context.fillRect(startX, startY, 15 * opts.pixelRatio, 10 * opts.pixelRatio);
          context.closePath();
          context.fill();
          context.stroke();}

      startX += padding + shapeWidth;
      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(opts.extra.legendTextColor || '#333333');
      context.fillText(item.name, startX, startY + 6 * opts.pixelRatio + 3 * opts.pixelRatio);
      context.closePath();
      context.stroke();
      startX += measureText(item.name) + 2 * padding;
    });
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var pieOption = opts.extra.pie || {};
  series = getPieDataPoints(series, process);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2 };

  var radius = Math.min(centerPosition.x - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, centerPosition.y - config.pieChartLinePadding - config.pieChartTextPadding);
  if (opts.dataLabel) {
    radius -= 10;
  } else {
    radius -= 2 * config.padding;
  }

  var activeRadius = radius + config.pieChartLinePadding / 2;


  series = series.map(function (eachSeries) {
    eachSeries._start_ += (pieOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, opts.extra.pie.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(2 * opts.pixelRatio);
    context.lineJoin = "round";
    context.setStrokeStyle('#ffffff');
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (opts.disablePieStroke !== true) {
      context.stroke();
    }
  });

  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof opts.extra.pie.ringWidth === 'number' && opts.extra.pie.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - opts.extra.pie.ringWidth);
    }
    context.beginPath();
    context.setFillStyle(opts.background || '#ffffff');
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  if (opts.dataLabel !== false && process === 1) {
    // fix https://github.com/xiaolin3303/wx-charts/issues/132
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var arcbarOption = opts.extra.arcbar || {};
  arcbarOption.startAngle = arcbarOption.startAngle ? arcbarOption.startAngle : 0.75;
  arcbarOption.endAngle = arcbarOption.endAngle ? arcbarOption.endAngle : 0.25;
  arcbarOption.type = arcbarOption.type ? arcbarOption.type : 'default';

  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);

  if (typeof arcbarOption.width === 'number' && arcbarOption.width > 0) {
    arcbarOption.width = arcbarOption.width;
  } else {
    arcbarOption.width = 12 * opts.pixelRatio;
  }
  radius -= config.padding + arcbarOption.width / 2;

  //背景颜色
  context.setLineWidth(arcbarOption.width); // 设置圆环的宽度
  context.setStrokeStyle(arcbarOption.backgroundColor || '#E9E9E9'); // 设置圆环的颜色
  context.setLineCap('round'); // 设置圆环端点的形状
  context.beginPath(); //开始一个新的路径
  if (arcbarOption.type == 'default') {
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, false);
  } else {
    context.arc(centerPosition.x, centerPosition.y, radius, 0, 2 * Math.PI, false);
  }

  context.stroke(); //对当前路径进行描边


  series.forEach(function (eachSeries) {
    context.setLineWidth(arcbarOption.width);
    context.setStrokeStyle(eachSeries.color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, false);
    context.stroke();

  });
  drawRingTitle(opts, config, context);
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = opts.extra.gauge || {};
  gaugeOption.startAngle = gaugeOption.startAngle ? gaugeOption.startAngle : 0.75;
  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  gaugeOption.endAngle = gaugeOption.endAngle ? gaugeOption.endAngle : 0.25;
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  if (typeof gaugeOption.width === 'number' && gaugeOption.width > 0) {
    gaugeOption.width = gaugeOption.width;
  } else {
    gaugeOption.width = 15 * opts.pixelRatio;
  }
  radius -= config.padding + gaugeOption.width / 2;
  var innerRadius = radius - gaugeOption.width;



  //画背景
  context.setLineWidth(gaugeOption.width);
  context.setLineCap('butt');
  categories.forEach(function (eachCategories) {
    context.beginPath();
    context.setStrokeStyle(eachCategories.color);
    context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
    context.stroke();
  });
  context.save();

  //画刻度线
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  gaugeOption.splitLine.fixRadius = gaugeOption.splitLine.fixRadius ? gaugeOption.splitLine.fixRadius : 0;
  gaugeOption.splitLine.splitNumber = gaugeOption.splitLine.splitNumber ? gaugeOption.splitLine.splitNumber : 10;
  gaugeOption.splitLine.width = gaugeOption.splitLine.width ? gaugeOption.splitLine.width : 15 * opts.pixelRatio;
  gaugeOption.splitLine.color = gaugeOption.splitLine.color ? gaugeOption.splitLine.color : '#FFFFFF';
  gaugeOption.splitLine.childNumber = gaugeOption.splitLine.childNumber ? gaugeOption.splitLine.childNumber : 5;
  gaugeOption.splitLine.childWidth = gaugeOption.splitLine.childWidth ? gaugeOption.splitLine.childWidth : 5 * opts.pixelRatio;

  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
  var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
  var endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
  var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;

  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(2 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(endX, 0);
    context.stroke();
    context.rotate(splitAngle * Math.PI);
  }
  context.restore();

  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  context.rotate((gaugeOption.startAngle - 1) * Math.PI);

  for (var _i = 0; _i < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i++) {
    context.beginPath();
    context.setStrokeStyle(gaugeOption.splitLine.color);
    context.setLineWidth(1 * opts.pixelRatio);
    context.moveTo(startX, 0);
    context.lineTo(childendX, 0);
    context.stroke();
    context.rotate(childAngle * Math.PI);
  }
  context.restore();

  //画指针
  gaugeOption.pointer.width = gaugeOption.pointer.width ? gaugeOption.pointer.width : 15 * opts.pixelRatio;
  if (gaugeOption.pointer.color == undefined || gaugeOption.pointer.color == 'auto') {
    gaugeOption.pointer.color == 'auto';
  } else {
    gaugeOption.pointer.color == gaugeOption.pointer.color;
  }
  series = getGaugeDataPoints(series, categories, gaugeOption, process);

  series.forEach(function (eachSeries) {
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((eachSeries._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.moveTo(gaugeOption.pointer.width, 0);
    context.lineTo(0, -gaugeOption.pointer.width / 2);
    context.lineTo(-innerRadius, 0);
    context.lineTo(0, gaugeOption.pointer.width / 2);
    context.lineTo(gaugeOption.pointer.width, 0);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFillStyle('#FFFFFF');
    context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  });

  if (opts.dataLabel !== false) {
    drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
  }

  drawRingTitle(opts, config, context);

  if (process === 1 && opts.type === 'gauge') {
    gaugeOption.oldAngle = series[0]._proportion_;
    gaugeOption.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var radarOption = opts.extra.radar || {};
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2 };


  var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin), centerPosition.y - config.radarLabelTextMargin);

  radius -= config.padding;

  // draw grid
  context.beginPath();
  context.setLineWidth(1 * opts.pixelRatio);
  context.setStrokeStyle(radarOption.gridColor || "#cccccc");
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath();

  // draw split line grid

  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pixelRatio);
    context.setStrokeStyle(radarOption.gridColor || "#cccccc");
    coordinateAngle.forEach(function (angle, index) {
      var pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount * i * Math.sin(angle), centerPosition);
      if (index === 0) {
        startPos = pos;
        context.moveTo(pos.x, pos.y);
      } else {
        context.lineTo(pos.x, pos.y);
      }
    });
    context.lineTo(startPos.x, startPos.y);
    context.stroke();
    context.closePath();
  };

  for (var i = 1; i <= config.radarGridCount; i++) {
    _loop(i);
  }

  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);

  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.setGlobalAlpha(0.3);
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    context.setGlobalAlpha(1);

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, shape, context, opts);
    }
  });
  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },

  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },

  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },

  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';

  var delay = 17;

  var createAnimationFrame = function createAnimationFrame() {

    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else if (typeof setTimeout !== 'undefined') {

      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else {

      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;

  var _step = function step(timestamp) {

    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);

      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;

  var series = opts.series;
  var categories = opts.categories;
  series = fillSeriesColor(series, config);
  series = fillSeriesType(series, opts);
  var seriesMA = null;


  if (type == 'candle') {
    var average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
    }
  }

  var _calLegendData = calLegendData(series, opts, config),
  legendHeight = _calLegendData.legendHeight;

  config.legendHeight = legendHeight;

  var _calYAxisData = calYAxisData(series, opts, config),
  yAxisWidth = _calYAxisData.yAxisWidth;

  config.yAxisWidth = yAxisWidth;
  if (categories && categories.length) {
    var _calCategoriesData = calCategoriesData(categories, opts, config),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;

    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
  }
  if (type === 'pie' || type === 'ring') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(series);
  }

  var duration = opts.animation ? 1000 : 0;
  this.animationInstance && this.animationInstance.stop();

  //先清空画布,不然百度和支付宝ToolTip有重影
  context.clearRect(0, 0, opts.width, opts.height);


  switch (type) {
    case 'line':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);

        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });


      break;
    case 'mix':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMixDataPoints.xAxisPoints,
          calPoints = _drawMixDataPoints.calPoints,
          eachSpacing = _drawMixDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });


      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          calPoints = _drawColumnDataPoints.calPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing;
          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);

          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          _this.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          _this.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          _this.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          _this.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'candle':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config, context, process),
          xAxisPoints = _drawCandleDataPoints.xAxisPoints,
          calPoints = _drawCandleDataPoints.calPoints,
          eachSpacing = _drawCandleDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          if (seriesMA) {
            drawLegend(seriesMA, opts, config, context);
          } else {
            drawLegend(opts.series, opts, config, context);
          }
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;}

}

// simple event implement

function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts) {
  opts.fontSize = opts.fontSize ? opts.fontSize * opts.pixelRatio : 13 * opts.pixelRatio;
  opts.title = opts.title || {};
  opts.subtitle = opts.subtitle || {};
  opts.yAxis = opts.yAxis || {};
  opts.yAxis.gridType = opts.yAxis.gridType ? opts.yAxis.gridType : 'solid';
  opts.yAxis.dashLength = opts.yAxis.dashLength ? opts.yAxis.dashLength : 4 * opts.pixelRatio;
  opts.xAxis = opts.xAxis || {};
  opts.xAxis.rotateLabel = opts.xAxis.rotateLabel ? true : false;
  opts.xAxis.type = opts.xAxis.type ? opts.xAxis.type : 'calibration';
  opts.xAxis.gridType = opts.xAxis.gridType ? opts.xAxis.gridType : 'solid';
  opts.xAxis.dashLength = opts.xAxis.dashLength ? opts.xAxis.dashLength : 4 * opts.pixelRatio;
  opts.xAxis.itemCount = opts.xAxis.itemCount ? opts.xAxis.itemCount : 5;
  opts.xAxis.scrollAlign = opts.xAxis.scrollAlign ? opts.xAxis.scrollAlign : 'left';
  opts.extra = opts.extra || {};

  opts.legend = opts.legend === false ? false : true;
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation === false ? false : true;
  var config$$1 = assign({}, config);
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  if (opts.type == 'pie' || opts.type == 'ring') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.lableWidth || config$$1.pieChartLinePadding * opts.pixelRatio;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pixelRatio;
  config$$1.yAxisSplit = opts.yAxis.splitNumber ? opts.yAxis.splitNumber : config.yAxisSplit;
  //屏幕旋转
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //适配H5高分屏
  config$$1.yAxisWidth = config.yAxisWidth * opts.pixelRatio;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pixelRatio;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 6 * opts.pixelRatio;
  }
  config$$1.xAxisLineHeight = config.xAxisLineHeight * opts.pixelRatio;
  config$$1.legendHeight = config.legendHeight * opts.pixelRatio;
  //config$$1.yAxisTitleWidth=config.yAxisTitleWidth*opts.pixelRatio;
  config$$1.padding = config.padding * opts.pixelRatio;
  config$$1.fontSize = opts.fontSize;
  config$$1.titleFontSize = config.titleFontSize * opts.pixelRatio;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pixelRatio;
  config$$1.toolTipPadding = config.toolTipPadding * opts.pixelRatio;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pixelRatio;
  config$$1.columePadding = config.columePadding * opts.pixelRatio;
  //config$$1.xAxisTextPadding=config.xAxisTextPadding*opts.pixelRatio;

  //向配置中传入当前pixelRatio及字体大小
  config.pixelRatio = opts.pixelRatio;
  config.fontSize = opts.fontSize;
  config.rotate = opts.rotate;

  this.opts = opts;
  this.config = config$$1;
  opts.$this = opts.$this ? opts.$this : this;
  this.context = uni.createCanvasContext(opts.canvasId, opts.$this);
  // store calcuated chart data
  // such as chart point coordinate
  this.chartData = {};
  this.event = new Event();

  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };


  //计算右对齐偏移距离
  if (opts.enableScroll && opts.xAxis.scrollAlign == 'right') {
    var _calYAxisData = calYAxisData(opts.series, opts, config$$1),
    yAxisWidth = _calYAxisData.yAxisWidth;
    config$$1.yAxisWidth = yAxisWidth;
    var offsetLeft = 0;
    var _getXAxisPoints0 = getXAxisPoints(opts.categories, opts, config$$1),
    xAxisPoints = _getXAxisPoints0.xAxisPoints,
    startX = _getXAxisPoints0.startX,
    endX = _getXAxisPoints0.endX,
    eachSpacing = _getXAxisPoints0.eachSpacing;
    var totalWidth = eachSpacing * (xAxisPoints.length - 1);
    var screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    this.scrollOption = {
      currentOffset: offsetLeft,
      startTouchX: offsetLeft,
      distance: 0,
      lastMoveTime: 0 };

    opts._scrollDistance_ = offsetLeft;
  }

  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts.series = data.series || this.opts.series;
  this.opts.categories = data.categories || this.opts.categories;
  var scrollPosition = data.scrollPosition || 'current';
  switch (scrollPosition) {
    case 'current':
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case 'left':
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0 };

      break;
    case 'right':
      var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
      yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      var offsetLeft = 0;
      var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
      xAxisPoints = _getXAxisPoints0.xAxisPoints,
      startX = _getXAxisPoints0.startX,
      endX = _getXAxisPoints0.endX,
      eachSpacing = _getXAxisPoints0.eachSpacing;
      var totalWidth = eachSpacing * (xAxisPoints.length - 1);
      var screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0 };

      this.opts._scrollDistance_ = offsetLeft;
      break;}

  var animation = data.animation == undefined ? this.opts.animation : data.animation;
  this.opts.animation = animation;
  this.opts.title = assign({}, this.opts.title, data.title || {});
  this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.zoom = function () {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log('请启用滚动条后使用！');
    return;
  }
  //当前屏幕中间点
  var centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  //重新计算x轴偏移距离
  var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
  yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var centerLeft = eachSpacing * centerPoint;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: offsetLeft,
    distance: 0,
    lastMoveTime: 0 };

  this.opts._scrollDistance_ = offsetLeft;

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = e.mp.changedTouches[0];
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    if (this.opts.type === 'pie' || this.opts.type === 'ring') {
      return findPieChartCurrentIndex({ x: _touches$.x, y: _touches$.y }, this.chartData.pieData);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({ x: _touches$.x, y: _touches$.y }, this.chartData.radarData, this.opts.categories.length);
    } else {
      return findCurrentIndex({ x: _touches$.x, y: _touches$.y }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = e.mp.changedTouches[0];
  var _touches$ = getTouches(touches, this.opts, e);

  if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column') {
    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;

    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false });

    if (index > -1) {

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mix') {

    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;

    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false });

    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
        textList = _getMixToolTipData.textList,
        offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'candle') {

    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;

    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false });

    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.chartData.calPoints, index, this.opts.categories, this.opts.extra.candle, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'pie' || this.opts.type === 'ring') {
    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;

    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false });

    if (index > -1) {

      var seriesData = this.opts.series[index];
      var textList = [{
        text: option.format ? option.format(seriesData) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = { x: _touches$.x, y: _touches$.y };

      opts.tooltip = {
        textList: textList,
        offset: offset,
        option: option,
        index: index };

    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.translate = function (distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0 };

  var opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false });

  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};

Charts.prototype.scrollStart = function (e) {
  var touches = e.mp.changedTouches[0];
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    if (touches.x) {
      this.scrollOption.startTouchX = _touches$.x;
    } else {
      this.scrollOption.startTouchX = _touches$.clientX;
    }
  }
};

Charts.prototype.scroll = function (e) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  var Limit = this.opts.extra.touchMoveLimit || 20;
  var currMoveTime = Date.now();
  var duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1000 / Limit)) return;

  this.scrollOption.lastMoveTime = currMoveTime;

  var touches = e.mp.changedTouches[0];
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    var _distance;
    if (touches.x) {
      _distance = _touches$.x - this.scrollOption.startTouchX;
    } else {
      _distance = _touches$.clientX - this.scrollOption.startTouchX;
    }
    var currentOffset = this.scrollOption.currentOffset;

    var validDistance = calValidDistance(currentOffset + _distance, this.chartData, this.config, this.opts);

    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });

    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};

Charts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;

    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};var _default =

Charts;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/logo sync recursive ^\\.\\/.*\\.png$":
/*!***************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo sync ^\.\/.*\.png$ ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./76人.png": "../../../projects/NBAdesign2/logo/76人.png",
	"./swiper1.png": "../../../projects/NBAdesign2/logo/swiper1.png",
	"./公牛.png": "../../../projects/NBAdesign2/logo/公牛.png",
	"./凯尔特人.png": "../../../projects/NBAdesign2/logo/凯尔特人.png",
	"./勇士.png": "../../../projects/NBAdesign2/logo/勇士.png",
	"./国王.png": "../../../projects/NBAdesign2/logo/国王.png",
	"./太阳.png": "../../../projects/NBAdesign2/logo/太阳.png",
	"./奇才.png": "../../../projects/NBAdesign2/logo/奇才.png",
	"./尼克斯.png": "../../../projects/NBAdesign2/logo/尼克斯.png",
	"./开拓者.png": "../../../projects/NBAdesign2/logo/开拓者.png",
	"./快船.png": "../../../projects/NBAdesign2/logo/快船.png",
	"./掘金.png": "../../../projects/NBAdesign2/logo/掘金.png",
	"./森林狼.png": "../../../projects/NBAdesign2/logo/森林狼.png",
	"./步行者.png": "../../../projects/NBAdesign2/logo/步行者.png",
	"./活塞.png": "../../../projects/NBAdesign2/logo/活塞.png",
	"./湖人.png": "../../../projects/NBAdesign2/logo/湖人.png",
	"./火箭.png": "../../../projects/NBAdesign2/logo/火箭.png",
	"./灰熊.png": "../../../projects/NBAdesign2/logo/灰熊.png",
	"./热火.png": "../../../projects/NBAdesign2/logo/热火.png",
	"./爵士.png": "../../../projects/NBAdesign2/logo/爵士.png",
	"./独行侠.png": "../../../projects/NBAdesign2/logo/独行侠.png",
	"./猛龙.png": "../../../projects/NBAdesign2/logo/猛龙.png",
	"./篮网.png": "../../../projects/NBAdesign2/logo/篮网.png",
	"./老鹰.png": "../../../projects/NBAdesign2/logo/老鹰.png",
	"./问号.png": "../../../projects/NBAdesign2/logo/问号.png",
	"./雄鹿.png": "../../../projects/NBAdesign2/logo/雄鹿.png",
	"./雷霆.png": "../../../projects/NBAdesign2/logo/雷霆.png",
	"./马刺.png": "../../../projects/NBAdesign2/logo/马刺.png",
	"./骑士.png": "../../../projects/NBAdesign2/logo/骑士.png",
	"./魔术.png": "../../../projects/NBAdesign2/logo/魔术.png",
	"./鹈鹕.png": "../../../projects/NBAdesign2/logo/鹈鹕.png",
	"./黄蜂.png": "../../../projects/NBAdesign2/logo/黄蜂.png"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../projects/NBAdesign2/logo sync recursive ^\\.\\/.*\\.png$";

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/76人.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/76人.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/swiper1.png":
/*!********************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/swiper1.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/swiper1.24b71cd4.png";

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/公牛.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/公牛.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/凯尔特人.png":
/*!*****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/凯尔特人.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/勇士.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/勇士.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/国王.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/国王.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/太阳.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/太阳.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/奇才.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/奇才.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/尼克斯.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/尼克斯.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/开拓者.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/开拓者.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/快船.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/快船.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/掘金.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/掘金.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/森林狼.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/森林狼.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/步行者.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/步行者.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/活塞.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/活塞.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/湖人.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/湖人.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/火箭.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/火箭.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/灰熊.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/灰熊.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAiR0lEQVR42u1dB3iT1feOqIDQpAwZov5liBNkKgIKgoAgo8zuRQtUFJA9hA7aYhdlyZTdMn6yZSNN0gmCIIIDZAlOHCgb2pS+//vejCZtSpOSQqv9nuc+lOTLvee8773nnnOnQlHKHoQpymGf4hFoq1TBHqeat9TODXRqp3aZGmfXLLXzUJ3GeVKmVhWRqVGFyyT+5mf8ju/wXf6Gv5V5MC+Rp6LsKQayUp1q3NIon9WpnTvqNMpxWRpVgkiHRLoqEoqYrhrySBB5jmfeLINllSF+F09mSuXGAsheOq0qVICbJNKluyDJ1sQyklgmy6YMZUzY8NxKUj6TpVUGCvDminT6HhBVWDotZREyUbYyhvI8uiTnzllq1SwB0hEClq1VQpiv+0rabW1lIO1hILmS8bMjlJGy/ucJy9Kq3jOYwQsEBymPiPQwbu6tjEy1UhJ4P0hDckX8vutxbPi4G85ufhJILydlM3x/QcosZP/vEaZRBoja+6UA4CbByEmuDOHtYefSdpgUNRXvT1+DdYnv4Ka6qqj5le4paTmihf22+2lMmzcLvtN2CFlWYUpMmJDtdSkjZTW8e1OvgzLg3+0ZCpc7U6vsLRT+RpjBm7e1TqJVqXD5s0exZI4rhk5bhEEx2+ATpYZ3dIpIWixeMhb/7KklWkDlYidMJ020E45vbIiR02ZJOfxi1PCNSYa3+JuyUUbKSpkpO3WgLtSJuv3rwgpoK9cWMVSsUDBH9hmi5l7cXQvL57nCf+pq+EXvxcBYDQLiNPD9cCdcQzag3aA5qNN+JDz9OuP8ppoQbnqxkUaTnJ2sQvLi+mjUcQCqt/RD/U7D0T5wNlyDN0qZKBtlpKyUeZmQ/W+hQ5a6srEfzKGO1LX0E7ZTUYEemQiAf85JdhIKVsCFnTWxYUlPeIckwvPDFAyarkXgdDU8wrag2/tL8WKviXi0pTeqNnPHoy28oGzqiy59u+ObtY8LZ0GYVK2D+7MUJ9xOVmLjrOdQt607qjX3luVXF2VLGcTflImyUUbKSpk9hOw+QoeNQhfqRN2oI3WlztAqKpbOOEyrfE504B9JcFIrIDOpEpIS2mN0VDxcQtMwKD4VQ2YmyxrdYfBHsoYrG/cTYHlIsMyTsokvXu7aG+lL6wIZlRzjtAhTx4ogZMTCiCao+bIXqjTzzVe2vhJ5SNkoI2WlzJSdOlAX6kTdqCN1NZQxL1Pj9GLpisfUyp60+5K0tIdwfEN9zJs3DH2Cd8Endh/emZ0Kr/CtwhTNQv03h0PVuL9VwsyTkyDv2TcGYPvcZyR5bCV3RVp6JVxTO2Pq+Fao0txXtuw7lW8kkLJSZspOHagLdaJu1PG79Q1E3g8ayzqRqXV2Kx0xmUY5Wgj8F1sF0h7AjqVv4P2o+egXkS5qaAoGz9DCZdwqPNttLJxfckWVJm6FAmZMlZv44YnWHlgR3Ui2Fpq5IplHQfzF3dXwblB7USH8JGk1bJSBiTJTdupAXagTdaOOI6IWYPPiLqLlPSgql5Tvik6tHFty+7N1ivJCyPkiZSGlkojFKmHxfH94h28SHmKq6BfUcAvZhGb9Q1GndQCqNHWX/cijdgBmJI//Tp/SQppMe8kj4T9trYEBXl1Q+SU/ODezjzRjouzUgbpQJ9eQjVJH7+g0eE7digVzg3B5F7sJxn/OWcIkLyBGJas/S6r6UqZGtUvfn1XE9xvqIjQuDB6RScKd1gqPLAm9xibi6c4jZIdfrRCzWFhSiRZCwCeNbIMre6raTF5OihLHP6mDDi494CTyqNrc567kYKIu1KmB0I06Ule/GA3cI9UIjovAiQ31TP0eMSJWJWT0w7mlEOqwTtT+nNTy2Le6OYZEfCxin2ThPotYKGo3WrpFomYrP0ML87prsGR/I0CnifMP6Ihftz56R/LoiWaLtH95XTTv0k+SXr2Ft0Pk0CcvqRt1bD4gTOi8S+ruE52MoIjFEhNio9M7VYeJWUkg7bg0WcId3ruyPdxD1sE/Nlm6zW7Bm/BCj/Em5RwHlMFcsfUJEnq6dcOpDY/JWE+Xd8xRODEEbOe8hmjY3tXk7hdP0uv4fPex0vMMjFNLLIgJsSFG0iNWq767b+Rlaas0zVI7H9PJfqYCdq7ogr5TtgrCBGnCXPQcsxINOr0vaqJnMQKlT2xBbXu44HDCk4ZYT6n3HEmkIC4hppF0ahxhGm3t/xp0GoGeo1dKLIgJsSFGxEovn/MxYnhv3f0UVUNRm7/Q92kPY9vyrugzZaf0rFjL3nxnHmq+4iu8L9d7ApSM9YTZbNSxP9SLGkhXH/sq4YaQL25KS32/2Mz3nsmi9zxdJQbEgpgQG2JErIiZwSIcIpb3aPiqShXh8m/MFDEQ45XtSzujf8g2BMaLlhabJOObR1v6SI/rXgJVXcZ6fqjX1h2bZj+LC7uqYfz7bSWh9rr7DiNPYuAjMZEtT2BErLYv7SKxI4bEkpjei4HiKOHe5iDjQexd0RYeoRsxMC5ZelPtAmZJO28cKrofieFCg9dd0a3f26jWwke2tBr3SRbT0J3ApJ0gjxgRK4/QTRI7YkgsiWmxDlCLQoaIdANp5ZGx+iUMilgpR88DYvfijcFzZO2qepeuviMSyarY2F8SV+M+y2IccZEtT2BErIgZsSOGxJKYEttiIU14Qz24wIYB5dnNT2B87Ex4RaUIt3cvury3EDWEPa/W3PO+g1RSE7EhRsSKmBE7Ykgs9UG66ioxdihp1z+rVEdk/D0nEa/vVSJ2zgS4RqSIpq9G7/GrUMsUo5URVJi3SayIGbEjhsSSmBomaL8n1o4aynpQrk3kOpDkh5G4yB19Q5Pk1IZXxFY0fGtkscRo/97kJTEjdsSQWBJTYkuMiTUxd8D0jMpdJ+et2K+9As+w9Rg4PRX+0bvlPFX1MvNof8sTmBE7YkgsiSmxJcbEmpjfpetfw0k03x+4UObirhqYEBMLj+j9GDJDi1ZeUVKAMhNZNJNJ7IghsSSmxJYYGxYl/UDsiz5Fo3WezCGaW2olVs53Q6/QdAydkyZs9GrUbhNwX93+0p6IHTEklsSU2K6c7y6xlssTBfZ345D8yPWFZ7c+DbeQzRg0QzTr8K14ttsYVG1aRtpdkycwJJacBiK2nPYi1sRcYH8eqZUeK0LMpporovqcG3urIjhqIrxjUjEoXoM2vnFyErHMRDrGZBLLNn5xEltiTKyJObEnB3bPr4kfneNq4gNrW8Br2h4Mjhce0MS1eOL1IWUm0sEmk5gSW2JMrIm5YSX3uSxNlSa2OSRQPGCYyc7JEvZ2RHisnFsaGPMZXvWOhqrxgDLAHT3SIzAltsSYWI8IjwOxlxwILsiJra3tey4/0KxsjYDoHQicrkEfUSNqlY2OFNuoCrElxsSamBN7ckAubJo1z9SopurkUuzyGPNhDHyj1fCP2oOXPafBuUlZayu2OUWBLTEm1sSc2JMDnX7Jw9RCtjk518/SKI/mpD6CjMSmCIrZhIFxWvSfvF4uTi0bISnm2XOBMbEm5sSeHOTIcUzlUXJTyGYMZyBDgYjpE+E5Td+3veIx7Z7Pr/0XEzEm1sSc2EcKDsgFOSlwcwm21akkXlicI+zqqU1PYmTccvhEp8Bj6mbUfMWvDNh7lIi1e9hmif0owQG5ICfkhhxZX0OiUf2BjHJY+pGrCLR3Sg+nfeDMAh0S56YeqPTigHypSjNP1HjZ/pimUiNXi3weEUn5kpuc3bbaqYvfVG7sKt+rZE8S5RQkI8timXnzrNzI/ti1xss+EqNHXshfftUCMCXWxJzYkwNyQU7IjdU1KplalZdc+JNcDvHzguEamSYn/eq9OczQv+VZEv6SO4ImzMCe5INQpx1GUtohaDK+hDr1C/QZEo6Kz/e3Y6mdJ57uMATb9qRDk67Piynl86OYuegT/N9rAUIhSxlUTTzQrNu7WLXxM/me8TeFJW3GEWzdk4ZegaECRNc8oHnJslimeZ7Ua92natR/Y3CBgFtLDz/XFwPHz8Sho8dNeRGr7Un70Ml9nKg8ViadBdbEnNiTA3JBTgwzB16WZnJPrcpZGuelSKuAg6tfxLtRy+Abmyo6ynWo1crfqlCskTHz1uC2Lht5n7nLP4Wy0QDZImx1h3v4B8PakyJAa2AFsMqN3fB6v1E4d/4X2PtcvXJVVLqZAth++SoQy2KZ+Z8cNO0xwjrYBVijp9r4YfOOlHw53bh+A+5Dw6FsYt1vIObEnhyQC3JCbiRHgiuzTRrODbjeHxkPYN1iF/QL3Y1BM5JFUBgjm3tBxEXPXQNdlk6vVk6OTHwOHDqGZm8Pk63SFiVrveKDZWu3WeRjzCtZtMA7EXf23M/5yi+UuKvXEDRxVoHEsUxrsowLn2/V+lhd+yJM+Gv9x+HU6XP55Lt27fodiSPmxJ4ckAtyQm7IEbnKnQVQK9twiEWX/CCWLR6GfhH75djZ051HonpzL7uJ++efS+jqF4IKLxRuLqvLDtkXX339vYOIK5y8a1evCOJm2k3ctt1pqN3KNkft4Wf7wiUoEpmZmXYTR8yJPTkgF+SE3EiOBFemlVvciM55oDPCg5kQNwM+sfvlJobHXxtU4ETpnYjjM3DcTJQXNr5wp8Qbz3d6B9eE+bgb4kjYjZs3kbB+N0JnJiJizhqradrc/2HK9BVo02+McELc7SLuj7/+kYt+Clu+TidGJVrc5NjluYbWLuI8JfZcDU0uJsTOkNzIuTq1aphcESbDAI1qNY+GSE5oBbeQdaKJpsuFnLVe9S/QkyqIOKNwy9buwOOtfVG1mWehjsm7ovYTePM87CdOtPRLV9DFYxwUT3bHA0+7WE2KBi4o17C3BC1vN3An4ozydHSfIPpuz0L7t+c7BSEl/ZBVbAoljmtTBPbkgFy4Ba8T3Lwqj+8QXK2RYQF2q6rxIBbuZdud2A09g0XUPisNLVzD72jPCyPu5KmzaNlrZIHC5QadHli9YXeBQNlD3KXLV9F/cGi+lmSPd3sn4phmLvyfDCXuuKpahBNtRP/2558Xi0SckTxyQC7IyZ7Et4F02c+dJWeKm9oqdXXJytsQNvTTRA/0iTggZ2Sfe3vsHSdLCyMuW6dDB88PZPxzx52mgoCTZ34sFcTx2X/oGxmK3CkfYtPZN4QZWPzWHuKI/TNdx8hNk30jD2JLopcA4yGGBTly+EunVXXl0rC/dlbH9NkT4BnzObyn7ZCxxJ0Wt96JOKOAo8Lmo1qzgtelsLV1FqbtytXrpYa4v/6+jGfaBxYY6jAWrPOqHxau3GJB1mUhW2Zmlu3ECezrdRwG74htkpO42RPx545H5TK+bI3qbYXo7Eay0zu1uS6GR86C//R9clLv/9oHCSFsJ45C/f3PZQth92j2o167QQUGrWyNU2esQFaWXqHbt2/j19/+wM+//mEi434SJ02+sAa///m36f83b97C0IkzCiyDffozHYPw1bHjueHH9es4fvIsrhscMFuII/ZPtguSXJCTYYKbk5vqGhcTjeKxTB9xF+nRdS/CKzhBdIYZ8miIx9oE3HHuLS9xFOrr46fwz+UrJoF/u/Annus8FM5W+gQuDS/XsA+27E43ufCXL19Dyr7DuPDHXyWGuPTPj4pQ5aSpMrJyLV29HeWf71egFWGgfuPGDVMeR785idT9X+LWrVt2EOeJx9oGSC7ICbk5uv5FueOXnCl0GtUWbnU99EkL9Jm8BUNmpaNj0FzDDlJPu1rc3pQD2HfgqEXM9Ib7RKujDTQpNVp64sTpH03vnvvpN8xYuAZ/X7pSYog7+OW3WLNxDy5fuWr67MCR43LW2loXwBjM7/1oC8uzeNU2EabsQnZ2th3OiafkgFyQE3JDjsgVOeOioAzu1zr4SSv0mrwH78xOx+sD402eja3E3b6dLUOA+SssbXvMnEQRYOcffakofj9wVIxoZbkkpX/xDXr4TxHm6GaJIe7ot6cwbFI8fjj/q+mzP/76W441Or3klm8woXYrX6xat9MCgyGTPkL0/P/lDgDY6FXyX3IRJDghN+TIsLcug8SdkMStb4tewcmSuFe9ogxm0nbi+ETNWwvf0fEWLS7jwFd4vM3AfJXgwWf6YMbH6021kOZy2Se70Vq40TqDSSkJxJ049QNe7jEcGYe+NX12S/Rzk6OXonyekRfqWFs4JifPnLcYXnvT6wNEzf/ELuKM5rKV54cYSuIEN+TIQNz3JO53pDyELza0h0voPhkKtHQLF7barVCXNy9xMQs+weuu43Hp0iVTjWNn/lieQJ7TKYon38Y29YFcMDIzMSZ8Pjp6TUZWEYmTAbj7OJn3AyLQLihxRMeaFbDqnJw+h+c7v4P5CVtl/2asZAmbkqCo28NiGxc9zTZ9RiFbvGdsbV99fQL12w1E/JJNdhNHDhjLkRNyQ47IFad4SNzfkriN7dF76n75UvMBUws9OMYacbOWbkatlh5I23/EwlT4jIiymJapLExMq14jcPqHXND/vHgJDYWCbweEFYk4lqXTZYs8f8GX35zBke/OWk1fibR03Wd4qGFvm4lr1n04AkbH4LqZw/HVN6ekvM5mMR11DIlZYmFxFiRux4M1O0ni7SZOcMBTHIbOSZfckCMDcf+QuFv8z6FNHUSg94UkrknfYLlQ017iFiRug6J6B0HgFgvhl63dbuGhPvRsXwyb8pHwRK+b3jl09Hso6vdEz0HhRSbO1tmBjMPfydZiK3Gv9h2Np9r4Cm83Nyz46+LfcH8vEhXM5h05orL9s3TTOxyEGB3xscDkTYmNvcSRA3JBTsgNOTIQd8vxxNXohBFhC5BlCDb5fPv9OYsxS0WDXphhZjoI+HJBLscQ7wVxaV98C0W9njYTxwFp9slas3m626JvDolPgOJpl9xlByKd/THXifn1t9/ROzAUisfeKhbiHGYqJXFPdEMHt7E4c/Yn0+dXrt3AK6KDJzByyUBzd+zSfG4CnA5KvyFhcsb4bojLzr4tR/AZxP8qYkhriTHiJhE7lmvgYhdxnAKaPn+NWT8HJGxMwsMNXfRLyUX85iHIYJ+e65gdQ722fqJ19ywScYWZSoc5J5K4+r1QtckA7NTkOh4cGZkc9bEcfK34wgB09fkA53/8xax/+wdVBGgVX+hfZOJkBblyDSOD56D9gNHo7DHeaurqPRGtXEbIQNke4h550VWWRycKhpbNwPqVnsOlLBwFmrN0g4WXPHflVmmSOStRJOIKcU4cFg5QODl1IsiLFu6vsXayNWzZnSZrLadV3guZL0xN7u92Ju1DzZd97po4hgMu/pNFH9pPD2YBSSWndLztIo7EsHKd//k3syUI1+E/Jl722RwF0u7/Kvc74ciMmjoPDwtZikpcYeGAQwJwc+LKiw570Ng4ERZcNn13+twvqN1StCphDucs22zhdYbFLZVTSI4gzuFjlUbiGrtKstdvVVvIPjFupQw/6r/mL0i9YPrdGaFv065DBTkeRSKu0ADcUUNe5sRVpevf3APHTvyQC6qIsVwCgtGgXSDSPz9i+jwzKxMvu4yUtaukE0cw3xkfb0Hcum3JqNJ4AIImxEtCjM+elMMoZ3BcikZcYUNexkHm9XkGmdvaN8hsThyDUprLDTtTzVzjLITIJQNj8afZIPJ3J87g/14LlDFQSSeOeDR66z3cvJU7JHf+x5/RXMR5c5ZtsZiLnL1kozShRSWu0EFmThFwqoBTBsPMpnU4pWDPtI45ccaxyInTFll4WRxt6DUkwtS580lcvwuPt9aPrJR44lp4yUq2/+Axi1Cmq38ItqkPWsjRT8hhXOVWNOIKmdZx1ERqXuLoHr/W530RqF4yfX/qh5/wqXBSzE1Nv6AIk4dXGkxl7VY+mPXxJxY6rN20F8dPnsvtz8//KnTJHccsCnGFTqQ6aulCXuKYOAjLoSFTWCBMyA2zkX/ODLRwGSW9vNJAnH47lDt6DAxBjtl45KUrV3HrVqYpDFi3VWOxZKNIxBW2dMFRi4WsEcf1JIsT9YOz5msejQqnZRzGc28GwbmZR6khjpXspbeH45dfL1joYviPjOMmRi6wWJdSVK/yjouFDMvz1piW5wUXbXmeNeJoLgeOjIFOBqX5129M+HCJrFnGMkoDcRy6q98uAJt3JFtdJHXpyjU06/aexZoUe4mzbXkeF8RykaVxQWysYUFssH0LYq0Rx4Wj9V4PwIU/LuYfT8y5jbf8w1DBbE7rbonjtE4n1zFQ1OkKRb0e1lPdHtLj5SRoYesqrRFHnZTi76CJs60udj189DhUeUZl7CbOlgWxjlqCbo04Yw1NSvkin4Knz5xHqz6jpTl1BHHMN0vI8uXXJ/FZ2hEkZXxVQDqKrXv3w2XQVDmMZS9xUvcXBuANzw9Ms/fmei1dvS2flbKfOBuWoDtq00dBxFGJmI9W5VNw3ZYkPNXWz2Jx6d0SZ+tzW8SU706eI4fGikIc+7kmwhwePPx1Pr26+03Jt3TPXuJs3vRR9G1Wa+X0hvFZuGp7PuIYWL/Q5d184L0fvggPPdPHch2KgbjsrEybt1n9UNRtVhNt22Z1SliGvMRxZKhGCw8sWGk57/j7nxdRv/1gq8QRG/NtVh6O2GZVlI2NJG7a7EQpBEf/meau2JKfOPHbp9oF4tvjp03v/fH7H8JUhVlMQhqJ6xE4FdeuXjW9m5R8oEDiXus7Et+fOiff464YWxLf/euvixg0Lr5A4lgm39OJRLlb9x1tQZxx06LvmBlyyZ1R1j3qfXjCyvoaYkJsjO9xN5NrUJh14grY2JhtbWNjUbYS02Ps6j0JIXHLMDV+hUwugWES0Ly7cWqJoNVzWCTCZyYgQpA9MmSu3BThnKcT5/9f6voepsQuRfiMlYiYlYiAUbGmkRWLKQ9hYhu2HyTzipiVgNDpK2xK4TNXYtKHi9G6d/59DSyDZbFMlh0pZB0+ZQ4adhicb7+AqqneXE6ctlCvl5Chd0CwnOWonm+vnJvERuIk9PogeoncTVvViv9wx63EKVWaFbp5f5Rh8z43klvbvF/DYOvZaoyJbnhBfSKF17/XT7ZWaW7y2XZ9ree+OuO7+hGLgveAMy9zGWxJbNkF7gFvod+UyLKNslazArCUtZmnnF8017+gPovf5S3fIZv38x6XwaMaPMqOy7hvx2V42Hpchsm7VDsfkwfUJJQdUHPfD6hJMBxQIzix8CYLOBIqXB4JlVIeo6eVHQl1v46EGj0tVnJgOBIq3IZzKqs0KTuErQQdwqZWnbTp6MP8xx7GlR17WBqOPTRrdWUHjZamg0atH+07SR47O7jsaN/iOdpXYDrYEUf75j1M+8ynDeVh2oPLDtMunsO0BaaD5WHam80P0/6xyLd+6NSqKfrj652wYr572fH1xXx8/QpHHF9v7cKI8WUXRhTThRH7JLYOuzDC/IoWxhTpZVe0FNsVLcQ2x1FXtOhbneKhTLUqMvdSJA/0DVXrL0UKL7sUqciXIoUbL0VSS0xNlyIJrIm5464hE4Fg2TVkxXwNmcDYYdeQWbv478zmJzAudlbZxX93efEfMTxTnBf/md37HaS/avNhZKxqgkERCaarNtvLqza9S8RVmyXPg9Rj0n7wbLOrNhMkhvqVW843iG3xXW4rLwHMe7ntJrPLbWfe98ttS6LbLy+3Fdjc8XJbR1z2Z9910l3QP2T7fb9OuqTOr5muk441Xie9Hdvu9XXSeS5wP5R7gXs3swvck/Bm0L2/wL3EkWa8wD1onsQk9wL3buYXuB++Zxe4W65Rcf5aLjBKqYCdK95C3ylbETg9WQrac/RKNOg04j/pbVJn6k4M5MXtAhNis3NFF4kVMSN2Vo+jvzfkObcUteZ4tlwdVhF7V7aHe8h6+MeRPLVcift897H/OeKoM3UnBsSCmBAbJFeQw1nEjNgp7ueTlaR6WcQfX7IW5aSWx77VLRAUsRg+wnPi3JJf1G40GxAmF8z8m8MF6e4LHakrdabuxIBYEBNiI1uawOq+k2Z+dVmmRrVL3+dVwIkN9TAlLgLukYK4GK10gTsKW6/fLOmJav+ikIG6UCfqRh2pK3Wm7sSAWBCTLP0ShF02XSl2Lx/hzpbP0qoWCNudxYDy0i4VFswNkvd/ekenyUlC15BNaNY/FHVaB0iPqzT3f5SdOlAX6kTdqCN1pc7UnRjog2vnLGJDjBQl9dGplWNF7bpyO9lJCP0gNi9+CyOiFqJfRLr0rLhRz2XsKjkPxUnEwg7CKZkeo5uUnTpQF+pE3agjdaXO1J0YEAtioigNT6bW2Y3np0jTKeKV79Y/jXnzhqFP8C74xO7DO7NT5SAr45v6bw6HqnH/UjHiQhkpK2Wm7NSBuvjEZqB38G6h43CpK3U2uPsniIWiND2ZGqcXheDzjP1eZlIlJCW0x+ioeLiEpcnrk4fMTJbeV4fBH6F+p+FQNu5XIgmkTJSNMlJWykzZqQN1oU5JCW8IHSub+jPqTgwUpfGBVlExS6sM1Gmcf86h6RTu8IWdNbF+sQu8QlbB88MUObUROF0Nj7At8mgIzlMZh4ruZx/Iso1Dd5SJslFGykqZKTt1oC7UibpRR+pKnam7orQ/0FaunalxjuVyMyRXQqbaCRd318ayue7wm7oGftF7hfusQUCcBr4f7pQ12mhGTXsROGtsSI6d/zPL11BRWKbRHFIWykTZKCNlpcyUnTpQF+pE3agjdVX8mx5uf81UK/sIBb/VaZQ3b2udOGmIy589iiVz3DB02iIMitkG7yi1HD33j0mCf/QeAdwGCeBz3cfh8baDULv1QNMmFM4k8zwQffKUSb+cIk8yfFfN7H3jzD3zYp7Mm2Xoydogy6YMlIUyUTbKSFkpM2WnDtSFOlE30xbff+tDUyIDUY2KSstJRJ2ouTuXvo4pMWEYOT0R3pE74BaZItzrVLmWPjBeI2OkPhPWoMOQuWjpFoHnu4+X/c5Tb7wr46gnXh+MOoKAOm0C8Zgh8W9+xu/4Dt/lb/hb5sG8mCfzZhksi2XKsoUMlIUyUTbKKCc89X3YTX0wrQxU/Nce3qIlAEgS6YJ0YlIekUdCnN9cB4tnD0DsnGCMjf9YxEWfou/UZLhN2w/f2HQBcJpwDlIRNCsVg6dr4DNNkCxMGheV9hyTgO4jl+Ptkctk4t/8jN/xHb7L3/C3zIN5MU/mzTJY1tjpH8uyKQNloUyGRTwwyJpE2RX/9UeX5NxZ1N5ZApAjkkBRq+lSI12B05uexMZFb2H5wgDMWzQJ70fPh0foOuF+fybPcOwXeRAe0Z/L0wn8pu/DwPh9CJiRYZH4Gb/jO3yXv+FvmQfzYp5zF30gy9ggyjq98UlZtpQht4UdoYyUVVH25L2HXPmMNKP6MOJUbivUk5itLo9v1j0NzcpXsX15N2xP7I8NKwdizryxmBIXiZEfzsSQ8AUICFuMgaFLZeLf/Izf8R2+y9/wt8yDeTFPnbpCLlm5reuUlEXIRNnKGLIpiHdqdEuj7JWpVUUYzOklOQuRWlFO9yO9nB5o7UO4vNsZP336mGiddfHthob4ev1zOLZOn/g3P+N3fIfv8jd6ksrp8xJ5ZmvlKMdllsUyMzVKF8pQxkRRvVEoHkCqUw1B4rM6tXNH4cWNF+AmcBJSpGvcHCGH11Iq6VsnE8k1T8bPxTu3Zawlp1auGfJIYJ4i/nqTZbAsm3fHlD32hRXYp3iE0/1IqlyLOzWFt9fOMMz2riBgkmwxalWkTOJvfsbv+A7f5W/4W5kH8yqFbvz/A3NPZzWg+QPiAAAAAElFTkSuQmCC"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/热火.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/热火.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAdMElEQVR42u1dB3iUxdbebLZkNwSQjoAQSOgJiFgA5SrKxYKo91oAxasUUUABr9ffa0PEC3axUQIp1NACoSNFQJr0plIlgHQxdNLz/ued/bZ8yQYC2Q1t53nOA9mdb+ac991v5szMmRmD4dpLRhGbSGmRCiK1RFqKPC3yish/RQaIfKjJAO2zV7Q8LbVnKmhl2LQyA8kPqbxIHZFWIv8RGS2yTuSMCC5TzmhlsKw3tbLraHUFUhFSlEg7kX4iC0VOFkSCyWBEWbMJ1UJNiCxtRv2yeuFn/I55mPcCZJ7U6uqn1R0VoKFwqbZIF5HvRHbnBzYIEWFm3B9uRYcmFnRvZcJb7UwY0smCpFdsWPS6HWveDsWWD0T6aSL/52f8jnmYl8/wWZbBsiJLmlXZXojcrenSRdMtkPKk1iKDRTbmBa+S1YT2DUPw3iNWxHQzY+W7ITjwpR2ZCTZgaggwxyxicsjsYE2MeUT73JmPz8izLINlrZIyWTbrYF2s0wuJGzUdWwfoMhh6ak3TEU+QykmT9tpdoRjzkhWrP7Tgz6FC0ASRGQL4DAF+RjByZhiRLZKeZMKpeCuOfW3HgY9LIOWDUtj9dmmd8DN+xzzMy2f4LMtgWY4yzaoO1sU6WTd1oC55CDyi6dzzRiSss8gGkTTPZvCRWiGY1NWOX7+w4GSsFZhsAaaZkSVAZ0wx4fwEM/4YWAJbupfH8seqYN6d4ZhWPwJTIiMxqUZtTKxWB4lV6mJ8Zb3wM37HPMzLZ/gsy2BZLJNlsw7WxTpZ9wnR4TfRZbLoRN3yNKdpmg2dr3ey6HI/LvKLk7AgEZs5CL2b27Ghnw3H4yzImGBBzhQz0gXIs+PMODo4FJu6VsC8ZuFIrFoH4yrWw+gy9ZFQsgHiQhsi1t4QcZRQt8TnEc/vmDdWy88yWBbLZNmsg3WxTtadJjrkJJmVTtSNOlJX6hykJ/AXzbbrblhRSeRTkVzn21U+1IjeLWzY85kNaYkCzmSTktMJFhz92kFWcr0IjCrdAAlhDRBPKeH4l38TdJ+Il7JZJ+ve2KWC0oU6OfWjrtSZutMGj7cwV7Ox0vVAmFXzyA44m5iK9mC8eLsVuweGAkkWZE4NRpoAcnyIDbveKo35LWooQGNDohxAlrwywrqpA/9PnagbdaSu1Jm67xIbXhBbaJNHE3pAsznkWiWtrsi3nn1Y27oWLOgr3uAUqzgGwchMDpZftB2bu5dDsvQ7ww2NEGtr6Ns3ygdvJHWibtSRulJn6k4baAttom15+sDvRRpca6Q9qrX7yoiIUiZ8/qQVaSPtwEzx6GYakRpjw8bOFZWjMNwYLb/uhlcPWQUIdaSu1Jm60wbaQptoG22MLGX2JG+7yDPXCmmvixx3Kv9YXSt+lnESplqRLb/SzGnB2PdhScxuGo4RpmiMsERd9YTlFepM3WkDbaFNtI02rn7PhvZRIZ7knRZ542omzCIyRCTTobAR77ax4sh3JE28RHG1j35jw5I21TBOXPSRVvZhDa850tx9YENlA22hTWw+0yc7hhKpw2z46NEQBLun14jJUA2jqypFi8x1/srCS5gxsZsNGeOsyBLXPm2iCXv7l8T0hrWkv4hy9GPXKGH5mk+xhTbRNtpIW7Mmm5Gd6JiGqxmmazrnalhdFampyHqncs2rWrCxnx25Mv5Jn2jGmdEWLGtXBWPK1VMu91XlePhySCG20calD1ZTNtN2YkAsiIkHees1zK44aducStGzOvSlHTlTTarZOPqNHfOahzvIuh4J80IgZe6d4a6mk1gQE4fX6SLvtytJXmORLU5lnmpkxckhdmRLR502yYSU90shuUEtNXNxQ5Cme/saKtv3CAbEgpgQm6eirZ7kbdEwLNYUKbLWqUT7xlacG2FHVrKDtF96lsPom+pjhDnqxiEsr+cpthMDYkFMiM3ZGLvCyoO8dRqWxZK43J/ketOi5E0bKqTJr+q8tOsbO1dAQqkGyuPivzcqcZ4YcOosTbAhRsQqz5uXpGHq94niQc45x4cjrMrFz5J2nIpteFFIEzdZTRXdyKR5kOeYNmuoftDK45zq6PuJnccc5yB/T1C/JHKeFTa72Yptg2xq9vz8BBM2dyvvUJSufoA0PXkaJpu7VVBY5SSZFHbEUCPvvIatX1JbZ3BOlRAzFv3HBijSzNjWp4xqz51LJQHJL8Rm9E0NFFbEjNgRQ2LpEbzU1tek3SyygxUEBxkR87wVuZNlrDLJjP0DwmT8Ut8xRgsQdOHZFjXWq68wI3bEkFgSU428HRrWPknBBkdsIoyGIPS914qcMSFqaePE8BDMaFQLCQHSCi+CFTEjdsSQWBJTo3tlYYCGeZFTe6cHdM8tFhz42oZcurZjLJh/d3VH8xgWIORSxnnEjNgRQ2JJTImth6fZvqiklRBJYWGhZiPm9JZ+bZYJGfJLWfXkzY4wgbBAv3Y5E9TEjhgSS2JKbImxRlyKhv1lp3ccAadB6NMyxLEAOsuI/f8Lw/iK9a6JNbSreW2PGBJLYkpsibHJ3WS+UxSHZL+a7b8pGMe/syNnejD+krZ59m3hMrgMkFZUIYbEkpgSW2JMrDXi9olUvhziGMGbazIaMOrZUGCaSa2prelQCTGm6IAX6SMvk1iuFUzTpwQrjBMEa2KuDcy/u5z1tb1qoF3VjHOjraotPvBxGCbeUscVRBMQXzSZUQpTBuwS47OCNTHX3jpy0KiwpAVpK9m5jB38oVcoMmTMcW68GT8/VRnDg6MDgPtYiCmxJcbEmpgHuafDhmicFOptU4Pt+6tbkZrgiPA9MChMBY8GZkf8NKsi2BJjYk3Mib3HoLxQq+b9neOJub3syGBE8VgzVj5eRQXIBID20zKQYEuMiTUxJ/Ye47r+FyOtpshmZr6jogUHh1mQKb+Aw1+EOsZrgYG2fxdgBWNiTcyJPTnQiNuscXPBzRgqc9xzNmQlWqXdtWCF/BLU2lIAYD8PD6IU1sSc2JMDj7euwM0ldpERzFS9hBmbBllVsMtfQ2yuTRYB8b8Qa4a6E/tNH1sVFxpxIzSOvMaQHGOm15rZcCYuRDwck1oA9IVDEmeNxMjgmjqJNdWSJuISfxSluAOnbr6yKHEhtQseM9nlGZMzbzhiLRGXXjffClP+eqkP9fKVo0LMiT05IBcacccKilF51hnjP6q7BZhqUetG0+pFFG3zhYAzulwjrBr4FfYvWYG9C5cq2b94OXYkz8aEyL8hzl6n8MAZwzGrdUfsW7oS+35c5iovZcFS/Nj7bcTZ8pdFYJMf6oiUeT+qvAeW/4xNwxMwJqLFBcnOK6NKR2HPnIXYu+gnlw17FixG8t+eVAT6arMJMVdrdsIBufDYk/BsXtJCRWL5ZZPyFmwdGKJG8Yc/D1WxgglFJa5CE+yauwDe0tynu8mvrJDElaiPkSERWDPgy3zl5IqsHxKn3mxvb9u8Lq8hJyfblf/Ilq0YH9UKceaIwgEq5M98sjNysrPz1b2065uIMVTzmZNCzIk9OSAX5EQjLlbjypVqOeP9u95lxfl4m4pK+vnpyhhV1DAEJ3Fz5nslblPsGIwq17hQzRZJSax3H/5YvSY/cbm5WP99bMHEdRbisrLcxG3acknE8U1e3v8z5Obk5Kt7o9QbX4ZNeD2fkEfMiT05IBfkRCPuuMaVKzV3NpMfPyOv6HSLDASDMT2acZH+Je7w5q0YW/l2xJe4uNFsjpKbPY7zJ08WP3FS7tZRE1U9edOexT9hfOQ9Qm5t3zSXgjmxJwfkgpx4NJfNPSO3ejpOODBjwRsh6oQCbnSfUKVu0R2TixCXmZaGRDH6osRJEzLSUgsLnnnFazn+Jm5EUA0c3bDFa90nDhxA0u1tHQ6PjxwUYn90sF1xQU4qW13eZS9nRBhdzHH88L4aMuj+UjLPMqpAzrGMJQnz7xvHtLDHf6SeizSV0gyNqtAYG4bHFz9x0reOqnwrzh4+4rXuHOlhZ7XqoLxVXzkoxJ4ckIvDwkmrGq5+brxzWFDGeRhMh6YW5IyzqYW9n9pW9c1W3kIQt2PGPGnXL/xm0/NMrHUPDm7cVOzEscwZ/3gB6afPFGjDgg49VItwOUOMgsj76ZGqyJ1tVJy0b+p64/ZonBlqiOTww1f/zmV0C3KFuDl3hPtmtqQQxJ3cs++isZhxIZGYEt0G2ZmZxU7cSGNNLH93ELIyM5yV6TxUpjWff4eEMlGF6qsLNewJicKs28LVpknMtqD3gyZnP5frnP56UMWUBAUjppNVnbxzKtaqxhI+2cdWCOKy0zOQdM9jBRstZcSXrC/jtHcKLMOfxNHV3zEh2fXs+b9SkSIOiWdKWbYC42s0V3X5at/d1LqRODEyRHEy4l8hKGF0rY4/TOL6OKa5TFjyb+nf5gSrRb3J4bXVmSD+IC5DmpzMs+d0oPMXW+BgWJVxK7ZNneHuV8QtT92TgvQzZ/xO3HBjNRxetd717On9B7Bi0Fc4f+KEu9U4eAgT67XyOgFwWQ6KYD9JOODiNTlZKtyQI424vgbnyQjRFczY+ZEM+uYYsev/blIn8vhk7c0LcWePHsOf23aoN82Z9i36Sc2KeF/ir4cxFW8Tova6Pbl9+7Fv5WpknjvvV+LirbUxLupenExx1526fTeSH+6IVNHBPQGQiykNWkv9tX3mWZKDXf9XWnFCbsiRRhw5MyTzjztvMSP1m1B1aNnWV8phTNn6ap+XP4hLl3HYr1Om45T8cp3pzIFDiC8X7bVzJ3FJTR+B5whqzw8/Yuv4yS4y/EUcf0xzOryMcydS3c+uWIeE8o2wf9VqXXM5+8FO8qb4pqkk9uSAXJATckOONOLImWEF/2gZYUJWLMcNQVj/fEXlLPgkIMgLcZnpaVjyZn8cWbvR3XyeO4vZz73sfSwkZfz8xXc6kNb2+wIr3xnk9z4uxlAVqz74HNlZma6ptV9HT0KMNRxbY8fqdFofE4dRZRv5xLNU2AsH5IKckBtypBFHztRZHHignglItIn7GaQFu/po+68X4rJzczDzoeewXQBwAS991qYh8TLQre51RSBl8TJd/7agfS8s7/OBf4kT4IYaymP7mCS37lLGyg8/xxD5fEWffvoZlB+XqiY93hdDAhXx3AArhQtyQm7IkUc4g+Eo/2gTZQSmWVWmZTJ+8NnCqTfiZMg6p00n/PRGf2Rnu8E8vHytAFUh3xIJ+43zf/7ldg6OHcOUZo9h1Vv+fePi7fUwsrQ4CEtXulsL6VNndXgJwwyV5MfTU6f/ib37MK7KHb4bEggHjrFckOKGHHks8RhSFXGNhLjpDuKWPlTVdwfHFEDc/Ce6YcLtD+HssT913tqEpm10HTz7jLkdX0Gux6z8/kVLMcR6M9b0/8qvxHG9cFKztvhr9+/u/vmvE0goG62mwKa37oBTRw67WwLRcXyVO31GHDkgF4o44ebBRi7iTpC4dP7xUJMgdXIqM/14/y0qUNOfxC3o0AvfG8viz42/6vq5H199GyMMt7jBkz5vc9w45bU50+avY/G1wYJ1A7/xK3HUY96zPXWOyaHVGxArdVCvCdEP4OC6DZc+fVdIIQfkQhEn3JAjjbj0K0dcx17ST5TFb+OSdIb/FjdBmqHKuhXnQ6vdY6j08+ewuOd/8a0h1O/EDRc9Vr/3mU6/X8ZPkfLqqDJjb6qPHROT9TMog4f6bNrrYsRdkaaSxKl+ovu/kZXhHs8dWrUWceWjEG+rq8AZW/cenDvqbk5Td/4ugN8rfWE5/xIneg8z3oxfh43REbPs/UGOUIWSdFwqYuP/vtV9v3v2fJ+eGXahpvKKOCckbri42mMjmuuIOXXkCGY8+jxGSh/C2fbFr7+HrLQ01/d7Zy6QN7WcPFvFr8RxFmfULXdgn4c3yzT13n+6+jAOFZb2eFscFHf/e+L3FHm2TrE4J8U/HNCIi5E+JNZcC/uWLHd/J17ayv8MUM3lcMPN2JE43eO7bPz80Veq7+F3/iQuNrgmklr+A8d373b3wWfOqLgTZ1M4UoYusx5/Ubzco24HRVqPxLr3qqUgfw8Hin0A7kkc+4s13wzXL/OMmYwYc3WMDKuNY+vdi5dpJ09hxj87K2/P38TxxzG/Q09keLztRzb/gjEqzMK9Ij+5RTsc37nLTVxmJn7o2qfIc5aFGYAX+5SXJ3EJ0uxMatxGH86waTPGRt6NKfc+gTMyZnOm41u3IS6snvo1+5s4vvErPAb4TJzkHlUmWjcVFxNWE3tnLfSYSMhWEW2xXvTw9ZSXl0nm0n6dZNYRJ9+z+Tmx1z1he+7UKUy/v714j28jK9M91bRtQrJrqOBP4hj0w7d9y9AEHXErBnyWb92QMyhbvo3T5ft99oIih+sVZpK5r3NZZ6lrWSdMLSn4a1lHRxyjmm6KVhPGnmnRs69h85cjdFNNnN90zmX6kziWMb72PUhZulzvmDRti4TSDTFamkunjLDUwJoBg1X4gsvz3bYTI4oYxlCYZZ1iX0jNS1w8Txrv1lc/7zd/EY5tdQ/O01NPYGytZq5O35/EsQ+d2uwx/OWxlMPEGRQuR/25fadLjv22Haf+OKiLtzx37DgSm7SWIU0dvy6kFnvoQl7iOK01MaIlsjzW57LT03VAH163SQeEP4njUGT2Q88jIz0Nl5M4A/RDl77KM/Vn6EKxBwvle+NkQDvulrvUwmhBidFdzoGvv4njCsWiTr1xuYnDljUffyv9cXW/BgvZtZAvFQJ2qBjC8/IRxwFt2Wis+XJIgWCoga/HVJLfiBNd4krVx5pPv9HVf3TzVuz7aQX2r1iVT/YuWaabLGfaOWG60tGf4XlGLchSBV06A2IZjOmvgNi8xDk2sUdi1sOdkOuFtPPSv3kOfP1JHMdf4yPuRsoSfTDQnMc7q5mUsbXvzifxlRpjw3cjdf3ckVXrECOOy+XMWxY2ILbYQ9C9EieAT2r4AE4cPJiPuJ2zf8DoPCvL/iKOXuuUJg/hpIceaadPY0qjNqrpY/l5hVNf8/71KtLPnHYHD4ljk3jrA171udQQ9E/aew9BL/ZNH96IUxPK1e/Czjk/5COOw4D4Unln7v1EnLkWprf4h25zx2HxbifWv6/AKLR4+Tzxtr/rIp1J9oKur3tf0ffhpg+/b7Pa7bHNipAseFZPnJq0NVbH4n/1zUccA2Hz7qFTxA3Sz8xfeJtVbx0Z7LPyEcd7dOy1seD513Tlbh0zAaMqNblgzCR1P7lzj27b1xr5YXEyvKjbrG69wDYr/25sFOJ2zJijopAp6ZlpmN++Rz7iRhhrYGbrjjh3+pQKzqEc3LAJ42u00HmUTuLWDPhKzaywzKyMdKz9JqZA4ua+0AsZ58+paGRV7rr1GN/wPh1x8dwjUL4x1n47XOVReaXfWvraOzI0unB4OXXflTxXPeN4LgubhyTo1hb9sbHRf1uJOaVVJhpzOr6Mlf0/w8p+n2LZe4MwqfGD+UDmhDOby4U93sTKAV+ooJx5z/dS++fyrirHmiIwvXV7rOj3iZT5CVa89zGmP/Kc1z1qJGTibW2w/N2BWPH+J1j10ZdqHXB0laa6t4j5Rpe/FfM791Z1M+/qT7/F5MZtLtpXcYw5SxwYPqPqGDgY87if4BJnUC6ylfjWQm/eP+6jzfux8stm507hAFcBlnejRynH0IDzfM68Be4Tl2cZmzLCUMMhUuaFwFV7wIMc+VS5HBx7W3qRulinql/Lyx/URfd4Ux9xbEZ41sG3+RL3hus27w8q3OZ93XEZ8Z0Cx2Vc6eMyyEFhjstwepdbAgfUXHUH1GzJ6016Sx+6joR6NXAk1BU7EupV3ZFQHxbmLK9GrkPYagQOYbtih7DVcI3ddhb26MPAsYfX6LGHzreugING6wYOGvXLQaNhCuNzRThoNP/Rvs+FqiskA0f7+udo3zXqaF/HNZ2jini0r+4w7ZplPA7THsbDtGsGDtP25WHaw7wepr2/KLd+vOu4liUIr+uOry8ZOL7eD8fXE2NTUNGPr9ddGFHCbMS8PtqFEdMCF0b47MKIaY4LI4htCR9eGKG7oqVl9cAVLf66ooXY+vKKFiaTyEe6S5HGOi70SQ1cinTZlyKlOi9FGpvvUqSPNMx9dg3ZzsA1ZH6/hmynL68hy3/xn83bxX8NArMqF5sdKe3l4j+bfy/+c6buzqs2m99sxXZ11aZJu2qzQuCqzZIXuWqzq/uqTWLXXH/VZnd/3pEanP9yW7t2ua0JG14Q8koGLrfVkaZdbktsLnK5bbDBz0l/nXS0FaeGBa6T9kaa6zppweS8dp00sboS10l7XuC+znWB+636C9y39ghc4O68wJ1YOC9wJ0bEyoO09cV5gbtnjMpWpxJPN7bi5BA7stWbZ8Ke90shuUEtxx67sBtrnEabaTsxIBbEhNg81UhH2taCjqMvjtRUZJtTmbb1LDj0lR050o6nT5a2/Gs75t4Z7iAu7MYgjUKbaTsxIBbEhNh4kLZNw+6KpttFNjiVal7Vgk0f2JErnlO6tOtnRluw9MFqGOW8Jzzs+p0NoY20lTbTdmJALIiJB2kbrgbSPK8um+tUrlaYGUk9QpCdaEH2ZBnrJZqx9eVymFSjjtqw55N9d1fLZLHYojYhim20kbbSZtpODIiFB2lzC3ulWHEmi8hQkUw1w2IIxv/ahSB1mE2tM2UkBeOYuMFL2lTDuMp1lcd1LU9QU3faQFtoE22jjbSVNtN2YqARlqlhYzFcxekNkdPOX1mH6BCsfl/Im2pFtnhW3Ki398OSah0qJjjadwfhFKfHKDpTd9pAW2gTvUbaSFtps8dbdlrD5JpIzzjPT6FEljLj8yetSBtpB2aKlzXTiNThNmx8sSKm1Y/AcGP0NbG2Rx2pK3Wm7rSBttCmdLHt86esylYP0rZrWFxTqYHI924jgtC2rgUL+srbN9mKnBny9smvlN7X5pfKIZkEGho5+r+wq8vxoE7UjTpSV+pM3WkDbaFNj9bTxfhDs72B4RpNISJdRA44DapoD0aXO634fVAokGRRSxscoDLsetdbpTG/RQ1XEE182JXswxq4gqKoE3WjjtSVOlN32kBbaJMHYQc0m0MM10GqJPKpc46Tv8zyoUb0vduGlM8EDPHEMmTMQzmdYMHRwaFqmoi7VkaVdkb5OpZF4n09JvRSNutk3dSBulAnp37UlTpTd9rg8ZblajZWMlxnidtfnxD5VSSNxjJ20GYOQp8WdmzoZ8PxOAFoggU5SWakMYJ6nNlFIge1iVXrYFzFeq5NKBw70RVXEuqW+Dzi+Z1nfucmC5bJslmHkyzWTR2oC3WibtSRulLnIPcblqbZ9ITnFt/rNXXRBqJpnn3gI7VCMLmrHb99ZcHJOKv0H9ynZ0aWDGQZ4ct1rD8GlsCW7uWxrF0VBTT7nSmRkWocNbFaHSRWqatO5PEUfsbvmId5+QyfZRksi2WybNbBulgn66YO1IU6Ubc8fViaZkMXww2YeIvWQpEjHoCgvMWE3s1CMeYlK9YMsOL40BBggsgMAXSGADuDjoER2SLpAvSpeKs4DKE4MKgEUvqVwu63S+uEn/E75mFePsNnWQbLcpRpVnWwLtbJuqkDdfHUTdN1oab7DZ9aiwwW2ZgHJFQJMaNjVAjee8SKmG5mrHo3RN24lZnAsWGIOjmVJ+/w2CSeUOAQYx7RPmceldesnmUZLItljnjJrOpgXawzrx6aboM1XQMpT6qtNT10pXflBy8IkSXNeCBcAG5iQfdWJrzVzoQhnSyY2sOGxf+2Yd07odjSLxRbP3AI/8/P+B3zMC+f4bMsg2WxzDzNoFN2abp00XQLpEKkhiLtRAZoTdNJL8AqMRmMKCdN2i0lTKhd2oz6Zc1ooAn/z8/4HfMwb0HliJzS6mKdj2k6BNJlJu5UKS9SR6SVyJsio7VFyLMXIOFiclYrY7RW5v1aHeUNl7A7JpAubVhh05b7KxocOzVbalNLPUT+q70xH2kyQPush5anpfZMRa0M27Xoxv8/XtuFHyTMkvoAAAAASUVORK5CYII="

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/爵士.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/爵士.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/独行侠.png":
/*!****************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/独行侠.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/猛龙.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/猛龙.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/篮网.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/篮网.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/老鹰.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/老鹰.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAn5ElEQVR42u19B5iUZZYuzu7dmY33zuydu/fu3p3rXB1HgU4V/1hdNEmSIAKCCCIggiBBRBQMKEhQRlHJwYiDCoiCoAhmRCR1V+yu2BU755zPnvP9VdUNNtDdFEpD/8/zP7R2Vddf3/udc95zvhN69eq5eq6eq+fq9AXLev3Kxg/+nU2S/mDmjbdaJSnJEbnp57Oy3NukM/zRJcu/P62e8d96VuznBqhXr1+5jMb/axbSDOmcYaJJTF1k5Q2rLDpxk0Ut7szQ6PdZ1PrPTCrNlxkp2q/oZj9ruM/TVdzHFq2wy6yXtpp4+UV87xKraLjPLEkDXELaTdADaPyur4zG36RzxhttvPF2C294FEHaYtMIn5hTNGdMiSqfrW9yaVafpIasRBU4U3Tg0nDg1gl4i3hLkX9FcOHt1PDgVOkgK1ENmX2Sm/C9FZbElKApWW2ya/jDZi71DbtkWGqX5VEZknSLrY/xn3oQ6MR1Qj/kXyx6OTFDkCZZOHmjizccylRxFlufxDJHnyTw4eJni6ngG3A7BIaNhODY8RCa+gDkznsE8p94EgqeWwGFq16EwtWtd8HylZC/9GnIe2QRhKc/CKG7J0JgxJ3gHzgUfFI/8CHgzj7JYO2dUJWVrM1y68UjNk5+HT9/ZrqQqnWojf+zB5kLXHa94U92Xh5l1gmvejjpS4dK50PJgGCyBgKpaeAfORoC90+HnCVPQuGGTVC6dx9UfPMtVJ48DdVWO9R5s6EhnAONRUXQVFoGTWXlsbuxqBgacnOhzueHGnsmVJ0+AxXfHYOyjw9A8dYdkPfMcxCcMQv8o8dCIG0ghFR6cPVJAUeyJs+rl4/Z9NIOC24kk2Dse1qt7lGpriFDfm3WpfKoAmdnacU9Xg3nsCep2MKF0gZB9sTJEHhsCRRu3wEVX38NNZlZ0JBfANDQCO1dLQ0N0FxZBc0IXHNpaetdUQEt9XXQ/ptaoLG4GGpdbqg6fhyK3tkJwaeWgW/KNAgOGgphLarYZDW4VZw/SyceNPPS42cEQ9p3kvTb68923Wj8jY3rpyebkqnlfshK1pV50UaFRCP4UfUFFiNY77wL1RkZ0IggnHM1NUEjSk+9PQtqTvwIVZ8fhYo9H0LZm29BycZNUPSXl6Bo1RooWtnmfvEvULJ+A5TueAPK398NVZ99DjXHf4A6qxUaQyFoqT0X1CYEvxY3STH+3SBKow83UMjQH9W0HjKT1TU2NWex8uILNoMh7fSAAf/9mgfsg7Fj/wa/bIpFQBKgFX60Jambs9V68PcbCP4HZkLuq+uh8rvvUUIqz5Gixtw8qD19Fio++hhKN26GArRlOfc/AIHho8Avp4GPlyGbkyBbL0I2kpNslJJsJCOxf+n/0e/wNfRan2SEwJDhEJ48BfIfXQzF616D8t17GZgNgeA5QLbUN0D1mbOQv3U7BB6eD77Bw/BvcmBPUgOSGrtNNLxokYzG4zz/99co6dD/W6ZouCdTL35jR4Lhwd3rNg4A/6w5UPDGW2yHxxarro5JVc2x76F02w7If3wphO66GxcdwUGbl43v9xJJoRuBp4VkIGkjILV3R39Pr6X3qPTK++lvpWjxdwIEkbDkL3gUStCGVh85Cg3Z2dBcVR17rvpgEIo+2AMBBNuNatSj5sCBmsKplzIyhdSHf0AGfM0AZuvT5+8sPC/YeWl9lpoLZOOXdSIr9CK7I3VY7/G2qii0R7UZJih/820oWLiYMT8GUEKKstC48D6UHF9UcgTD5d30N+hvkbQSuAQquhZelKbAwCGQN2cuqt/NUPPDj9CEpCd6kZ0t+fAj8M9bAA7cfLQRHGp9sY2T3jWLhqHHRPGfuzdo/ODfmQXp/kytcMal5hS/asx4KFi/EWqdrthCNJeVQTWqKbJHobvvQZUmg7dvsiIJUZDiAVRnwEQw6BloswRHjYGCJ5+GqsNHEMBiRmgUCQyxzeedPBXc+D4vfkdUn14rJy0+K6T9P1yCG7pbhOOGU7whxSrIG5F85HtwETxpgyG09Cmo+vEkQKPCCokB1nz/AxQ88ywEh49kO9eLO55JVryk6nIBREkkCaRNRFKYj75g5eHD0IRMNHqRms9dsxY8Q+8AL9k/ta7SyksfWsTUgd3GffjKaPxbs2QcgE70EadK3+RGFecdOwGK393V+mWbm6HB6WbsL3D7cEVF4cLQIv2iYF0MRCI3EZsYQFel4PElUIekhVgu+0o1NVB+6DPwIcly4mvR/rU4eNlkR/+P3J6rPkRlEeR70WE1u9X6Fhd+gcCc+egf/QAtkS/YVFDI6HsO2jja0d5kBCwqYVcbYO0BSLaQkRkeQuMnQhkSKyIxbaUvvPx5cBn7o+rUQZZe9Nl4w6NkNq5K0M6K4r/bhdTHkDV6vKjy3LgrSX3UtSEf9XY7FD79LPhT++PO1baqxKsdsHYAZGQGpc+PP+fOnY82+kTM9jUWFkEh+pXuEaMYuXLohAKzXn7ZpBH/fHWFq9AQo2/2CqqIIg/SY+/Iu6Dor7tY6ImpkaoqlLK9kDN1uiJlTC2K3Q+w8289slH8vqTqw+PugdItW6GxoED5zrW1UPbZZ5A98T7m+jjUQo1ZJ72fwfMpVwVoWTrDH22ivMmh4ysYCxx/L5R/epg9ONt96DwXo2MdGDwUspM0jIB0e8DOu5l/iASGHPuCp5+D+kyH4o+ieag68SP4H5ytgKflGyz61H0uTlb9oqCd1Br+0yyif6bjK91oq7InTYHKr79FtBR7VmezQcGy5eAz9GPMjJzcaw20VukT2cYkG5g7dwFUI1uOXjUmM/p8jwDafXBqhAZ01ndnGgwJv4xNk+Xfp6PeztSK5e4kBA19GSIhoKh5qP76G8hFAsIYI+p5ZsvoOOZaBY59N5l9X9I8QfRXKz7cx6JADDy074EFi8BFkqfh65HE7TKJ/X5em5eN7NHMpT7i0InFFBz2oh6vPPZ9JPzRzBzVMKpMT59kBbRrFawLAMjA65MEwWF3QPmu96ClukoBz2YH/8PzmeRlavk6G2d4hQTgZwMuU+h3l00nejwU58OdVf7lV4pOb0adjvYthH6bh6IO+AWuaSm7mPQRCcM1CNw+DMp2vssIGtNEGWb09WYBBSWQbRbZeeP8nyVATfkeNk467UbQ3EPvgNKP9qMRbmYPVXXkKIQRtGio6LoEra3kIXi0gQODh6PkvQ8tEcJWiSbFe88kRljQz/PYBXk8nZxcMdAsspxo1UuHSNRd6IsV7niDRQyYGjh+HML4MF4KCF/voLUFD0mLt28KBFBtVuz7OEbcSj85BC7c+MSyrTrxrEnu1x+uBHg/6vr/q5WTX3OodM0o4hBesRKaCpWIeb3TCTkzUPwTVD2gXQA8T0IyO5qqOXY8FiIr3LYDHIY0JCw6sOik/SaD4Y9xjz+aBOP4LA0fpqiI78GHoM7tUbhIcQkUPrciwh71PaBdCDwtx1yivIfnQYNXiSbRxg89tQxcKAh2ta4mQzAsjKu9Oymkaq168Vuisu5RY6AiQkbI4JZu2gL+1AEKaD0gXdxRJ7LGS1D47IrY+V6NxQrZU6YBcQabls8ySakj4mLvzAnSb828/JKTUtgkI+Rv2BILGFMqQYCO8ilqwMk94HQkxok+nl/uB6Wbt7G0DLpK9n0ErkFD2ea3cvxeiyDcdNnAZfD9BqO/lkWi7ps9Fxr8QcWuub3MwVYiIj12rXMRFjWEUHNRshPTXBUVEEYppANkh0ZXaBEN0yhru8ugUSKonTdscuEucZEzefhz5YNKSqB4zYtMyrLVfA8YXYltogbLW7gI6iNHQjXp6eCZMAn8pDJ56ZMzHHdbl4GzCvIYu1ob8uIuCS9fCc0UAWhpgaqDn7LMLIqaXJUHn90BPCJ5eglKt2xX/Dtc14Kt28Fr6A+2FG2NWZQXLOuK1GWkpf2HhRPf8SRr2Al2FZ03UbQ/GEZmNF/JB9EJPSB09abISpIGwndPhDqzWTE/3mzIRsZO+ZsOTjh6VicldT6IzKdOsCVrc0iicte+zPILWxoboWLvh+BD34Py7XsAuMw7ojKLX9vA8m9I6ore3QXetEFgS1LVp4vyok4SkrT/MOv4N51oRP3jJ0LV94rT2BAMQu6MmUp+SHc8ub5KWWbwzjFQl56hHIV5PCzX1JuiAYuWP2LmO3H8ky7II7NUOqcfwcl5YS3TwZTdW7HrfaSyxh5pi+fNknVR6l5eB83l5czVKnjzbcgmW5eYUpYhynM6HNoy6YUNziRNY2D0OCg7+qUibdk+yH1gFnjR5sVd2lgWlaQku0b/7exnRDKxlPd39r5Eki0XfbbI348nISOpQybJpO5susIwzVYITHsA3LjWZq34sZU33nxJ4M7oRc7DySeCyHpCS5+GprIytG/1UPHBHvCh4+i9EudrlElMmcpEeCiHI0VJLe8MeHS6ztLnUrpwq3SRqIZ8rj9KP/NyLH1QSc/TKwDG29bhXfLKekXqUMPlrd8AAfLr1HpfBme4++KJrAA3pOuFh5xqfX54wO1Q/MFuRdpCYch/5FEW+Y+7tFEK36ChkPPgLMjDz8idtwDyHn0McqbPYC4Hc+4vCrqS5Ry8ewLkzF0AufMXsr/R8fsRpeBx6gPgo+wzYsoR8LJ1IviNAyF831TIXfAo87tyZs2GwJARrRnWcZI6CmSEJ9wLdVYbW/Pyr76GEEqhI1lTn6GR1uSoR/zDhVPGB/O/s+jknc6ElKYAfpFae6ZyzvbFVxAYOoL98bhT4kQVquAHoRoJENUR1LlcSIu9UPX1NwjeTFbkcdEF0inqq3jDJpbTWOd2s7/RmbseCUHlwUMQHDZS2ZwEHNU34LNR+jkdx1CaIb2u5uQpyJk9V3GHSPLiFDFimgz/Fju3Qw3XmF8A4cVPgCdZC5la8Qu7YOx74bikXlK7eOlUENVBeOVqaKmpZWJb8sprjOUw/R5naaPFKVz+PNLhynNr1MorWBkwlUn5LpZkRL/D5yqns67LuKjejsJQ3t6JrcDhz6FxE6AuI6O1zgGfM++JJ5VU+TbSGZdNjJsm/7EnWGYcXVTFFBJSwaPlvSZBHnMh3G4w8+KDWSm63ODAoVDykbIQDbjTch+ay3IoroQf4xMNULJ9R+xov7UurR5KiV1Jxovb1Shwez68LODqLDYIjhx9LnD4nUNj7oaaH3+Mva6xsBDyFj2uxGjjbOvowJXSPmpPnVZOylELhceMp/O6SjMvraJcn5+gdmjIkF/bePlte+/kFj/q9JqIrqXEH3YCEO98SDL6VNQ4ZDiUf3KQOffnX5Wffgb+/oMvrqJ1CiMsWvsS1Jw5w2wElWrVol9Um54O9T4/2wTRsuEmXPhaU+T39DqzGWrxPeW797BiR5KkXwq4aI5O2Ts7mVtANYIhqsXDZ3II0ufpxnbq77LEgf9u0ovHfIlqCC15EhrovKipkVWAxsqd4s0kk5U0tpqzZ9uVAoqeB+8ci4upvrgbgHdgxEgI3nsfhCbfD6FJ90EQDX3w7nugCG1fY+Tsq6WxCaqOfKG8ZvxE9rrQpCkQnjKVdW/woY8aA+MXAI6RFPzMgiefgaaSElZQQlW6Qcoa4ySLSTRy7aSRGwxmtc7qR9VUuHUHQ7wJdW0B6lxmsOMdTGaxOjXk3D+dRWTaVV9INnIoipCsu+R5H8vlj1aaUrlWgoqpHmqT0ZifHwGukRWckN309lWdW5kadQfauAI/O3CkLvskQ86U6WhzFWJYuv8TCCHrdmo4f4Yg3/vTRCBOnmlJTMnzDx8JFZ8fUSpP0CEM4c5luf7xBo6IiZqD/MVLYhIRVWfR4okGXPDCFStjddwdcsIjd7RkuGDZc4yhxYBDEuNDg+9Tc+e8vr10g18COFbGNXQ4mijlCK0aVXoYtYI9QYV2zrDqJ/V2Zk5+ydY7qc4/cTJUm5RoddWnyvENlf9eEWJiSIPizVtjxIQC2Y0FhbH/bkbbVPL6m7hAkiIRXTjzahc4kcJ2/CXzRH4R4GiD4rOXbntdYbvoQ4fRh8zsnQQWvbDvtLpNl4fsG42/sWjFPc6+yRCaMw9qvcrhXjkaSQLtkk5wV4gJLqofSU/FoU9jxKQhJweq0a5F6TBLj9h/QEm26SQ56q7ARe0caRpyxZrQ/ch9fjU7Nbfo+FPUTK41zMUbbzapdF+7SXU9t4KpLgoqFyNTY8Xz8T53YyEuHYSQftdFpJuphVOnoGTnu1AfySBj/+/4D6wtRmdT2bs1cChAVLLcmJPLuEbRth3gx9+Z1XqHWRAMrWqSl1PNKm2GF4lJ8aYtsXYVVC4bK9iIN3AoQWFkd40oZdGr/MAByMUHjuZiMILicELOzNmdfo5uDRyRtmkzoN5mV9blo/3gR4JiTtYE0de+p02NW+pYS5La60sbCGXvK/HJ+iwH5M6cc2XO3ogB4t/MI9pb1to5qAQ3DcUtyX+LLVReHuQ/u/z6Ag7XnCI20Q1MpWuBUWPAkqgqsnLygtYiDn3qDAQuj9mcyKLVnjkLYfSLrgSjZPaNiAmqgGgBZAv6jJRvmK0XWNumWIippgZK1m9SYpadWKhuCxxjlnrWGZB8TmYukN0Hx98Ltr4plRZOWtHqClBxeZK62I8vrvzmO8X5PfY9hEaPU87f4rqjIg+WNggqPjvMOjAwYkILgmqSbCoFjKM1CeQaEJDUd8TXCVvbrYGjjU3r8/EBRYjQpwtOngq2Psl1Fp34aptGMuKzWUnqCv/Iu6AqEierPvolBIfcoez0eDNKAm7ICCQmptZuBbZM1OsPspq6vKVPQUM43EpQvj8OAXw2xiw7KP3dHbjoSQFbG5cbgtNngr13UrNFL77VmobHSWuyEjTVgTvHQlXkFLYKpSEwYLACXDyTXYmY4KLR+VdDIBBbkKqjRyF4x2hw33QrM8x1EcPMCIrTCeFZEXt7PQDHepKJUPb2zkgeihdCyDeYL6fj329znCO/7ExQ11KqQlUkaaXyk0PgNw5QVGUcgVM62UmskyuLx0WusrfeZsXv7hv/xOKT1T+0LhY1EM1/Yinrs9VRgtLdgaOoUunrbyrAZfsgNHsuOAg4jbCv1cbp5Fc9iao6CvhWZSjqq3L/J+CT0+IPHHOkU/Gh3ojVR1OEpGjty2yXeW/ujY75UMX+RQlKeTmL/rOjpesFONQu1DmQAecPQGjOfHD1SQQrJxxoQ06kde5EVW3wrrvbSNxBlLj+8QcuRceKHojyt0RjkgUFkI+uAXtgtHG+1AFQ8s5OaI4e9eC/pO/ZQnWQoHR74JCkUWNUBpzPzyTOScDx4kcx4Ey8+KIrUXXlbVw0o2nEnVBz+kyrDcvKYoWRLCFHrQMvLmrByjXnBJ+rkO0ygqLqWNp797dxApqPd5T18WajjZsNWagq7Trp/TbkRFjuSFRVBkYhqzx9NkIWvlAapFGvLTGOjjcuJh3V1KPejrHGr75hpbbsEBNf57ktQXlNm9AXUeIwkhbWS+RaBy7ybGV/fU8BDtch9MAsZJWJLTa9+E6bkwFhsS1RXeIfPoq11mV+3HfHWJYRAy6ObSRoQamdfGNZaWuoa9fu2NE9vc5zSx92hF8TkX62YOge5C9c1GE71+39uH4DoTKSR1OLGik4ZTr5cfUWTtjQ9ixuliVJnc8iJ58p50C1qMrCEyfHL3JCwFF1D35ZMrrRor5mJChF615jv/Pelsge2nPzbRAYNAwqI5GDaMly0fOrO5wi2K2BQwJHWXWUNsKECAlj8J7JYO2bUpXBS6va9PyXx5uSND5f2mAoiyTd1KFqitqduAFH0mvor2RkRSImjSWlUPjiS+AfOhz8tw+FwB2jwD/gdgiOmwAVyGyjh6rN1dVQ8uZbyrCIDhwzdedYJasnwM+tPq7UbFSh9iNXzZKQUmzh2xSC2Hi5vzlZa8mW+kHJtteVzuPBEOsQHrfTgcgDBe4aGysiYZJUVcWObsoRpApkshUHD0H5gYMsgajObo+VLdO/lUeOQIA6yXaAoHT704Ep06DObImcmiDDR75hTtaETZzhvrZ9uXqbVNx3Hq2gsDkaslBZBUWrXlDyMS73PI6kLZITkvPQHJaEev7QhvYGOfwkB8Vmg/C9U5Ssr0tspm4NXIIK8uY9gsITZOtQ/MZbzIUyq3Wus5w0oFXijMZ/ouICV18VhOYtZA4fvYG6n8a6j18ucJE284W4kE3oUHflouEOeUiL6Yv9osChJoolxLbNW7lYDktngEPaX7hsOWud34QmIu+FtUxbmXR8eoZOuuXcZCFB2GC7LaExMHkqVEdyKisPfAJ+Q79O53tciJhQYUbJy6/E7Buln1EwmeU3IoNk/0bvs2eZqqSW9jG1iotWsOQphTBdYrdfMeAKClh9gueW3gp4Kfrziki0rcHwLvi/2ZHez6WbNrNOhDQTKIwSTuEus146ZD5/NIxdlOdb+iYX0QlBJfpVjM38eJI9uFd1+bXetNgUiSnb+ddzQlmFa19isckg+pDUeSd6B9E1oRNyyklpm/5dsnUby39kBOUiz3TFgCsuUnpw9hvAmqcGht5xzh0cMYol1pJq6wo3YEnCSM4o5KicmtghfP8DyCiTatO10jqa43BuoT4vDzardFlUsVKEHjuFoyh6n4+767LzKqMRk3Hjoerb71qDx4EghKg94q0Jyu6lZqWRm9SFBz+36C/roKWNhFYePcqcdYU0/fzANdXWon+ZwQ6cKw9/zghT5ZGjsZu+X9mu9/F94xWV3kmpo3yT8MT7oC4SMy5D9yyEG8Kh1iIxEaf/ZJZBppG70aIXj/tw0cK4oxqpTgvZZfHLryqGuKvARYkJSlzu7Idj7SFi/smIO5VoSNvBEKzbuMTiljSepa1NrCWCgouZfYkCyysFHCNNzS1sM7V3txaBzgTPn/t0HjjcsFT40RRJ4s3bvBWCpD552XpOolD0CvL835t5ebcDF8s/bUZsEgezc2kDu05QohETlBAiJs1tagQqvziqhNXaU8UkpShxuXPmQX2gNdOZMp9y7rtfCX7rLwWcHgpWrILGSF4L8dTKg5+y46PsjgDHqnXGszSOzlyUAZ43azbawds6BRwjOyxAsZ0F1mnuXShSGeQSDN+0W5kKveAGi2BYmJmkKSZdXXZIyT2ppzRw6iCEInx5PT1EKFrzIssxoeOcJnS8izduYmd+F0q4JakK3TMZ1c8xli7Iss/Qv2R0PPIlLyVx+U8vY8DT+0lyy/fsReBSL70RYxI3FqpR/dH7KVH3UjeVptGa5eLm99zat1PAkUkiW18d8XMpGyE8YRI4k9Q1Nk56JW/QoH9sv9uCJEkuvZQRxN2Y+5eXY4P0aMGzSV93VV1GFpjsGc0dIMkrWPIkBO8a11pjfYH3Ue5F7oxZUPjMc8r7nljK5u9Ey3wvdtJON8Vb8xctZu8vWPo0hKmF/sU+8zzw/f0HQd5DDyvvf+qZS970uvwFixRN0skkXgKO/LcG3Jx0Fe56D8KGNPBo+GCGXpp04YpUrfF/23lpr6svIo/+Un0ko5mqNQP9Byvhry43mlYkjyL/REY8FJe8VJJrpEUunXyz99CNNqAz7km0P7LymQmdS36KtuiNfv5tHbiJaJF26mS1KvtO+Fml299gUktpiznPPMtcjCydeDxdELQXrgE3Gv82nRcXZal0pSGktCUHFEpKJb65CCS1qb3suGVXndTLdXDj4Bh3+O6K052oZp0Xak+dibT/PcG6DjmStA3pWnF9utH4Py7e44QzGl16IYNqskIrViq6u6YGyl5/iyWxent6nFyZDkMqPRQ+v4qdghD7Ldj+OgSR/TpTdDkmsU188kLXaVn+P2a9+I4rSdMcGD8JKiPZtHW2TOZfeJPVPV2FrkRp1ZARUB0ZAVDn9UBwzlw2MMqsFb7I7Gh3IZrBnanWBwNCKuRv2MRKcWluaemWbQia2KFjlZ67E/0r0fazGG5kqGDJ7j1szrktMaXWxMlLoKMDBK08f7NJz++lsSs0e7sm4sXXO5wodZN6ennF+dDU30bayE8NPfoYy9y2argTZ1NT+c41YtNLM2zJ6hKaTF+waSs7D2MTmt54E7Ijo0h6Fv7yc3CoOXnh86tjOaY0x8E7aChkJqgaMzjD8k73ZzaJ4p8tOn4/G8w3eSrURHoqNrg9kDtluiJ1erFn8S8nfkvNC+4YDTU/KL1AG/Lywb/gUVbmTOO2T8my2KU5pxbeMM2eoi31oD+S98prrKKGxft2vR8zqj0gdD2TiyJGVDwabc5T8sFu8KBtsyMxtOrlZ21jzzsJ6OjlkaQ/ZHLyLjqScd01DqoiaeGN1Ntr8RLW/jBb10NUunLmRkdllG5Ya7HG+lTSiG3qyZypE785qxM1lzVd2CYaxmWpubAHPyy45KnYgFpq8BKm0c+URhDP1kjXQ0vfZA0LiVHSMTtVaGyC/FfWg1fuB5kqrtomGRZe9jRjO/p1KHWvk+Pt7D8Iine9F5ssTE45zTv1Jmt6mmp3omiRJK5o9QvQEqkBrPjya3CPHA1+JCp2Tj56RpYT4zLTO10vDnSqBQtNX/KgE14dSVRtRukrWr4Ssnmph2V2tFIJbVs+BZJ9SiZ3Pf7rf3geG0uGmi3XJshT4jY7/Cvjjb+x6sQ5WVquxK0VIEhNZfKVlhaNPr/Sy5JyLa7XeXEdPExmPSmRodelKxu/pboG8te9Ci7UVlkqbZOZk9cc78PHd+z0SYPhP62c+B6NIHPQENdNm1mSKjvJPnkKQuPuUYb9xbGH47U0R44NARw8DCr3H2w1NR9+BE702YioUPZBXFTk+deyZct+Zeb7pdo4+SR5++7bh0WG/jWxh6g4cJD1I6H8/x7w2oDG8iRTGBco2/56bLPT8D/PuAkMtEw99aM0jo+bijz/+qDX2L+xiP1G23Wi20v2DlllxbfHYv0ly9/7AILIltjExmt9mG1HQUtUsYyvklc3QnNJaWxWqm/mbKCGQC69mG+XDPMOqNX/cEVHbZJTaBblOQ6dlEcG1TftQdYoLDqWrHznXyGIKqErh4nX1IzUCGjUgLxk3WusR1m01o04ghtJSpaWr7YL0mobH2e7dqHrO2nYb61C6hqHlq8l8Pxz5scak1KqQ/nOXeyYgpJtrjvCwoiICJ4+Sage01DSNsRAqw+GWAadC3/vUOlbrJy0yyxJ//9nHSlNH2jh5F1OLVdPhCWw4FGoifRYpOZhFbs/jDUJvZ5cBcYe8TtTUmvp5i2x4DHrgrdyDTg5BhrYOOnLdhuH/izgGQwJyDT3oOQ1uEjyFiyEGoslNg+cDXGnNheRvMqupmV3F9WoNC7VsQPnCmSMLREiUu/3Q3jFKnDybI4AWCT5O5vBkNbrl7xsvCHFok/dR9Pk3biT/A89DFWUNxFJDqV+JQVPPKlkMSVrrs0JWBR7JD8WfVxqPF7dpoysNssB4SefAQ+qRyeBxqcez5Dlwb2uhsvOySoE8IOozfPdNxXKv/gSWurqI2XAOVD80joIDBrCYpudneJxNccdmZQlaVhvMuqlXO9wxNLlq06fgcDcBUDlay4V14i+2jcZgmFQr6vpMvN8goWXNzm0QjEdDnrQvhXtej+WPt6CjLNi917InTJNOa7v7tIXlTKNHsJjxzMfrakgkuqOG7bs8OeQPXlqNJRVa+YMH9oko9TrarzOyvLvkbAsceiFAOl6FyWzvrCWtTSKDWZA1VFCnb1Hj2UZY+xMj9yG7hKk5qRYSj2lHBQ9vwpqTp1q7XJLDci37QA3BSPQdDh1Qgk1ALIIaTf1upov06BB/2jhDVMdvGyjSLgTv6h/9lyo+Orr2JejVPKa4z9A3ryFCn0m8Ih5Xq0A0jMRYCyNTseOsah7e+Whz84ZdEHBd2r976QSKxq9zUtBmyg/QRu6V3e4bH3G/p1FlofZ9fJhu0rP3AXPyNGQ/9qGc6p1qA6gYs8+yJ3xEIsuKNOstMr53tUAYGQ8Gm1Aphbxv4kx0nFWPRXFRBsQoJ9WTP2rJ0wCN4JrS9FBJiee9Eqpkw4nXiDf/2q9YFmvX50wGP6UKRieyVTzQVIbbgnBeWAWlOzdFzuQJSPOANz3EeShI+8fOEQx+ImqVhLzc4IYkS7K+2A+KLWw6jeAdfQrfesdqHe5Y6SL4o7lR74A/yOLwM26xevBrtaXobnYmIFs+ydFiN3pcg0Z8i9WwTjGpuP3o+NZTvbBgewy+MRSKD/6JTSXlbcCmJML1V98BUXo8+TgzmaHtAkpSuzzSjPRSGd2ClNRXR41rw6PnQAFS55m1aE01CLaNI6KYapOnIAccqipvg9ZY1aKriFLz39rEeWZdPjc61q46DCWssayBMNiFyc42CQOVIdkwENPP8cYWGNUAgnDomI2I6fig92s+oVaR/jTBjMJoFAS8wepGwTZnOgkxUh1ziXvyIRG9l56Dpq6jBuDVd0ipaemPOR3Uh+tujNnoTEvv02b4VqoPPY95K59CdxjxqENk1n+I6rHsI2T1po4ToUb9de9rrUrSxT/2SL0G4Y+35ZMNeejhFvycbwjEMAlT0HRex8wh7Vt9WdTYREbV0IFliXrN0LB08sgd/qDbPIUmyBJHYnINyQw6U7RnlOSrNya2E0jnJWOgAYIDh8JOehzFjy+FIrXvcbGt9RlmFkD72jnI8aEA0Eo+fgAi35kjxkPHtwANGY7M0VflMml7rKJhokmQfhfva7164S+/79lcIbRZk7ealfpsrNQkrwaKlpHFTpjFuS98iqTQorvndsvo5HZRnIpqGd0xcf7mWSUIOkpWrWGOcD5ix6HfJquOH8hu+lnarRDtXGkgilSTw08K9DOUkiOWsTT7J3YxKvoRxUVQfnX30Lelq0QnPcIUv87mEp04rPakrWFdk58zyr1m5zOtTNh6lq/LAigVUobYeek1Zkq3YmsJHW5O0UDIWJvI++CwNxHIPzyK1CK0kbd81jANlrI3/bC/0e5icTuKHWw0e+HBp9y089EfqgOnLo8QDvjzpRBg+Vs2mP5kaOQu3EzBHADUCO4kKTMhcVnq7GnaM1WTthgFg33ZF6PgLVXf05RBZsgzbVy/F63hrc7krQVbtzdYZ0I4WF3QHDqAxB6Ygnko/NeitJShX4gHUhS21sankTNBliZMp3In9+UiNLn62qhsaICGhDcen+AjeWsOnkKypB4FGzaAiGUVpJ22jBhHskKqcIkda1Xw7scWv6QSZCWWsTUgT/21/1rr56rHSlMS7sJd/RQs9bweCYnfZitl047U7Qhc++kZlYjjfYlOGgoUDfbwOT7IThrDuQsXgp5K1dD4bpXoWjzNije8SZr2EZ3MfpcJVu3QyECnrf6BchZ+hSEZs+D4H3T2Ow6ym8MiqngRztp652EkqXNx8/McPDip0g4Vth5eZRJY+zb6Rz+6/UiP5DUkUlMla2cPD2Dk1+zctIhp044aU3WeK19kkvNtya0uHonItvUKCndROklI2OH1K+F3Yb+ComJjJwmYuJGgKy3JYClb3KFLVHjd6i5s3ZOOGoRUrfhPZf6ZWVI0i3tjrbsuTqvTqno0iP015oEebyZkxabecN6/Pk9k0b81KLRf2NW6U6akjUmU6La3vbOQNtkUulPWVTcd2YNf9jCiXssomGzWUx9ysRLk206UbappT9QT7PusBb/BfYB28B5QS0IAAAAAElFTkSuQmCC"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/问号.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/问号.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/雄鹿.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/雄鹿.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/雷霆.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/雷霆.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/马刺.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/马刺.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/骑士.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/骑士.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/魔术.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/魔术.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/鹈鹕.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/鹈鹕.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/logo/黄蜂.png":
/*!***************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/logo/黄蜂.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js":
/*!***********************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "../../../projects/NBAdesign2/App.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2FNews\"}":
/*!*******************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2FNews"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _News = _interopRequireDefault(__webpack_require__(/*! ./pages/views/News.vue */ "../../../projects/NBAdesign2/pages/views/News.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_News.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2FNews_detail%2FNews_detail\"}":
/*!****************************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2FNews_detail%2FNews_detail"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _News_detail = _interopRequireDefault(__webpack_require__(/*! ./pages/views/News_detail/News_detail.vue */ "../../../projects/NBAdesign2/pages/views/News_detail/News_detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_News_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2FTeam\"}":
/*!*******************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2FTeam"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _Team = _interopRequireDefault(__webpack_require__(/*! ./pages/views/Team.vue */ "../../../projects/NBAdesign2/pages/views/Team.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_Team.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fcomparison\"}":
/*!*************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fcomparison"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _comparison = _interopRequireDefault(__webpack_require__(/*! ./pages/views/comparison.vue */ "../../../projects/NBAdesign2/pages/views/comparison.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_comparison.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fpersonal_page%2Fpersonal_page\"}":
/*!********************************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fpersonal_page%2Fpersonal_page"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _personal_page = _interopRequireDefault(__webpack_require__(/*! ./pages/views/personal_page/personal_page.vue */ "../../../projects/NBAdesign2/pages/views/personal_page/personal_page.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_personal_page.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fplayer_data\"}":
/*!**************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fplayer_data"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _player_data = _interopRequireDefault(__webpack_require__(/*! ./pages/views/player_data.vue */ "../../../projects/NBAdesign2/pages/views/player_data.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_player_data.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Freg\"}":
/*!******************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Freg"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _reg = _interopRequireDefault(__webpack_require__(/*! ./pages/views/reg.vue */ "../../../projects/NBAdesign2/pages/views/reg.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_reg.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fteam_data\"}":
/*!************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fteam_data"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _team_data = _interopRequireDefault(__webpack_require__(/*! ./pages/views/team_data.vue */ "../../../projects/NBAdesign2/pages/views/team_data.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_team_data.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fteam_detail\"}":
/*!**************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fteam_detail"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _team_detail = _interopRequireDefault(__webpack_require__(/*! ./pages/views/team_detail.vue */ "../../../projects/NBAdesign2/pages/views/team_detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_team_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Fteam_record\"}":
/*!**************************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Fteam_record"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _team_record = _interopRequireDefault(__webpack_require__(/*! ./pages/views/team_record.vue */ "../../../projects/NBAdesign2/pages/views/team_record.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_team_record.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/main.js?{\"page\":\"pages%2Fviews%2Ftest\"}":
/*!*******************************************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/main.js?{"page":"pages%2Fviews%2Ftest"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../projects/NBAdesign2/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _test = _interopRequireDefault(__webpack_require__(/*! ./pages/views/test.vue */ "../../../projects/NBAdesign2/pages/views/test.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_test.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../projects/NBAdesign2/pages.json":
/*!**************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/pages.json ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "../../../projects/NBAdesign2/service.js":
/*!**************************************************!*\
  !*** H:/Hbuilder/projects/NBAdesign2/service.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var BASE = 'http://101.132.166.30:8082';var _default =
{
  BASE: BASE };exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(vm._getFormData || (vm.$parent && vm.$parent.__next_tick_pending)){
              return
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$scope;
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$scope && event) {
            this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$scope) {
                return this.$scope[method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map