gradientBarChartConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    fontFamily: "Bahij"
  },
  responsive: true,
  scales: {
    yAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 80,
        padding: 10,
        fontColor: "#9e9e9e",
        fontFamily: "Bahij"
      }
    }],

    xAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 10,
        fontColor: "#9e9e9e",
        fontFamily: "Bahij",
        fontSize: 8
      }
    }]
  }
};

// General configuration for the charts with Line gradientStroke
gradientLineChartConfiguration = {
  // maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
    fontFamily: "Bahij"
  },
  responsive: true,
  scales: {
    yAxes: [{
      // display: 0,
      gridLines: 0,
      ticks: {
        // display: false
        fontFamily: "Bahij",
        // suggestedMin: 0,
        // suggestedMax: 80,
        padding: 10,
        fontColor: "#9e9e9e",
        fontFamily: "Bahij"
      },
      gridLines: {
        zeroLineColor: "transparent",
        color: 'rgba(29,140,248,0.1)',
        // drawTicks: false,
        // display: false,
        drawBorder: false
      }
    }],
    xAxes: [{
      // display: 0,
      gridLines: 0,
      ticks: {
        // display: false
        fontFamily: "Bahij",
        fontSize: 14
      },
      gridLines: {
        zeroLineColor: "transparent",
        // drawTicks: false,
        // display: false,
        // drawBorder: false
      }
    }]
  },
  layout: {
    padding: {
      left: 5,
      right: 0,
      top: 15,
      bottom: 1
    }
  }
};

function drawBarChart(chart_id, months, values, label) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  var mySugestedMax = 0;
   values.map(el=>{
    if(el > mySugestedMax)
      mySugestedMax = el;
  })
  mySugestedMax ++ ;

  var myChart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    legend: {
      display: false
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: label,
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    // options: gradientBarChartConfiguration
    options:
        {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            fontFamily: "Bahij"
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                // suggestedMax: 80,
                suggestedMax: mySugestedMax,
                padding: 10,
                fontColor: "#9e9e9e",
                fontFamily: "Bahij"
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 10,
                fontColor: "#9e9e9e",
                fontFamily: "Bahij",
                fontSize: 8
              }
            }]
          }
        }
  });
}
function drawLineChart(chart_id, months, values) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


  var myChart = new Chart(ctx, {
    type: 'line',
    responsive: true,
    legend: {
      display: false
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: "ارتفاع آب",
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    options: gradientLineChartConfiguration
  });
}