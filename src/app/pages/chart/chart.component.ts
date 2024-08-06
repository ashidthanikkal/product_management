import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductService } from 'src/app/productService/product.service';

// Extend the Highcharts.Options interface
interface CustomHighchartsOptions extends Highcharts.Options {
  totalValue?: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  allproducts: any[] = [];
  phonesCount: number = 0;
  computersCount: number = 0;
  accessoriesCount: number = 0;
  camerasCount: number = 0;
  inEarsCount: number = 0;
  // othersCount: number = 0;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: CustomHighchartsOptions = {};

  constructor(private ps: ProductService) {
    this.chartOptions = {
      chart: {
        type: 'pie',
        events: {
          render: function () {
            const chart = this as Highcharts.Chart;
            const series = chart.series[0];
            let customLabel = (chart as any).customLabel;

            // Calculate the total value dynamically
            const totalValue = (chart.options as CustomHighchartsOptions).totalValue;

            if (!customLabel) {
              customLabel = (chart as any).customLabel =
                chart.renderer.label(
                  `<div class="text-center">Total </br> <strong>${totalValue}</strong></div>`,
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

            const centerX = series.center[0] + chart.plotLeft;
            const centerY = series.center[1] + chart.plotTop;
            const labelBBox = customLabel.getBBox();

            // Center the label
            customLabel.attr({
              x: centerX - labelBBox.width / 2,
              y: centerY - labelBBox.height / 2
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
        text: 'Categories in stock'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
      },
      legend: {
        enabled: false
      },
      credits: {
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
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Registrations',
        data: [] // Initially empty, will be updated in ngOnInit
      }],
      totalValue: 0 // Custom property to store the total value
    };
  }

  ngOnInit(): void {
    this.ps.getProductsApi().subscribe((data: any) => {
      this.allproducts = data;
      console.log(this.allproducts);

      this.phonesCount = this.allproducts.filter(product => product.category === 'Phones').length;
      this.computersCount = this.allproducts.filter(product => product.category === 'Computers').length;
      this.accessoriesCount = this.allproducts.filter(product => product.category === 'Accessories').length;
      this.camerasCount = this.allproducts.filter(product => product.category === 'Camera').length;
      this.inEarsCount = this.allproducts.filter(product => product.category === 'In-ears').length;

      // Calculate total value
      const totalValue = this.phonesCount + this.computersCount + this.accessoriesCount +
        this.camerasCount + this.inEarsCount

      // Update chart data and total value
      this.chartOptions.series = [{
        type: 'pie',
        name: 'in-stock',
        data: [
          { name: 'Phones', y: this.phonesCount },
          { name: 'Computers', y: this.computersCount },
          { name: 'Accessories', y: this.accessoriesCount },
          { name: 'Cameras', y: this.camerasCount },
          { name: 'In-Ears', y: this.inEarsCount },
        ]
      }];
      this.chartOptions.totalValue = totalValue; // Update total value in chart options

      Highcharts.chart('container', this.chartOptions); // Render the chart
    });
  }
}