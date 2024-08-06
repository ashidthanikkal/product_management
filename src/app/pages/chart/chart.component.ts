import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductService } from 'src/app/productService/product.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  allproducts:any=[]
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}

  constructor(private ps:ProductService) {
    this.chartOptions = {
      chart: {
        type: 'pie',
        events: {
          render() {
            const chart = this as Highcharts.Chart;
            const series = chart.series[0];
            let customLabel = (chart as any).customLabel;
            const totalValue = '333'; // Example value, update as needed

            if (!customLabel) {
              customLabel = (chart as any).customLabel =
                chart.renderer.label(
                  `Total<br/><strong>${totalValue}</strong>`,
                  0,
                  0,
                  undefined,
                  undefined,
                  undefined,
                  true
                )
                  .css({
                    color: '#000',
                    textAnchor: 'middle'
                  })
                  .add();
            }

            const x = series.center[0] + chart.plotLeft;
            const y = series.center[1] + chart.plotTop - (customLabel.getBBox().height / 2);

            customLabel.attr({
              x,
              y
            });

            customLabel.css({
              fontSize: `${series.center[2] / 12}px`
            });
          }
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      title: {
        text: '2023 Norway car registrations'
      },
      subtitle: {
        text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          innerSize: '75%',
          dataLabels: {
            enabled: true,
            distance: 20,
            format: '{point.name}',
            style: {
              fontSize: '0.9em'
            }
          },
          // colorByPoint: true // Moved here
        }
      },
      series: [{
        type: 'pie',
        name: 'Registrations',
        data: [{
          name: 'Phones',
          y: 23.9
        }, {
          name: 'Computers',
          y: 12.6
        }, {
          name: 'Accessories',
          y: 37.0
        }, {
          name: 'Cameras',
          y: 26.4
        },
        {
          name: 'In-Ears',
          y: 26.4
        },
        {
          name: 'Others',
          y: 26.4
        }]
      }]
    };
  }

  ngOnInit(): void {
    this.ps.getProductsApi().subscribe((data:any)=>{
      // console.log(data);
      this.allproducts=data
      console.log(this.allproducts);
      
    })
  }
}
