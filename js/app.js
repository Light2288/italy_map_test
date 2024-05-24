var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};
var ROOT_PATH = "http://localhost:8080";
var option;

myChart.showLoading();

$.get(ROOT_PATH + "/static/italy.json", function (italyJson) {
  myChart.hideLoading();
  echarts.registerMap("Italy", italyJson);
  option = {
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
      triggerOn: 'click'
    },
    visualMap: {
      left: "left",
      min: 0,
      max: 19,
      inRange: {
        color: [
          // "#313695",
          // "#4575b4",
          // "#74add1",
          // "#abd9e9",
          // "#e0f3f8",
          "#ffffff",
          "#000da6",
        ],
      },
      calculable: true,
      orient: "horizontal",
      type: 'continuous',
      hoverLink: false,
    },
    // toolbox: {
    //   show: true,
    //   //orient: 'vertical',
    //   left: "right",
    //   top: "bottom",
    //   showTitle: true,
    //   feature: {
    //     saveAsImage: {
    //       title: 'Save As picture',
    //     },
    //   },
    // },
    series: [
      {
        name: "Italy",
        type: "map",
        roam: false,
        map: "Italy",
        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            areaColor: 'green',
          }
        },
        selectedMode: 'single',
        select: {
          itemStyle: {
            areaColor: 'green',
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        data: [
          { name: "Lombardia", value: 1 },
          { name: "Abruzzo", value: 2 },
          { name: "Piemonte", value: 3 },
          { name: "Basilicata", value: 4 },
          { name: "Calabria", value: 5 },
          { name: "Campania", value: 6 },
          { name: "Emilia-romagna", value: 7 },
          { name: "Friuli venezia giulia", value: 8 },
          { name: "Lazio", value: 9 },
          { name: "Liguria", value: 10 },
          { name: "Marche", value: 11 },
          { name: "Molise", value: 12 },
          { name: "Puglia", value: 13 },
          { name: "Sardegna", value: 14 },
          { name: "Sicilia", value: 15 },
          { name: "Toscana", value: 16 },
          { name: "Trentino-alto adige/sudtirol", value: 17 },
          { name: "Umbria", value: 18 },
          { name: "Valle d'aosta", value: 19 },
          { name: "Veneto", value: 19 }
        ],
      },
    ],
  };
  myChart.setOption(option);
});

if (option && typeof option === "object") {
  myChart.setOption(option);
}

myChart.on("click", "series.map", function (e) {
  console.log('click on map');
  // if (!center[e.name]) return;
  console.log(e.name);
  console.log(e.value);
  let showValueElement = document.getElementById('show-value');
  showValueElement.innerText = `Regione: ${e.name}\n Valore: ${e.value}`;

});

window.addEventListener("resize", myChart.resize);

document.getElementById('myButton').onclick = function() {

// get the chart instance data as url
   let src = myChart.getDataURL({
    type: 'png', // can be jpeg or png
    pixelRatio: 1, // image's ratio. default is 1
    backgroundColor: '#fff', // hex color defining the background of the chart
  });

  const link = document.createElement('a');
  link.href = src;
  link.download = "image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
