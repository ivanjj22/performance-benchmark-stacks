import { AfterViewInit, Component, Input } from '@angular/core';
import * as Chart from 'chart.js';
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';

@Component({
  selector: 'app-scenario-chart',
  templateUrl: './scenario-chart.component.html',
  styleUrls: ['./scenario-chart.component.scss'],
})
export class ScenarioChartComponent implements AfterViewInit {
  bc_colors = [
    '#00c389',
    '#ff7f41',
    '#fdda24',
    '#59cbe8',
    '#00c389',
    '#9063cd',
    '#f5b6cd',
  ];
  @Input() scenario: string;
  @Input() metric: string;
  @Input() data: any;
  canvas: any;
  ctx: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.canvas = document.getElementById(`${this.scenario}-${this.metric}`);
    this.ctx = this.canvas.getContext('2d');
    this.createChart();
  }

  private createChart() {
    const data = this.buildChartData(this.data);
    new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: {
        title: {
          display: true,
          text: this.metric,
        },
        responsive: false,
        display: true,
        plugins: {
          colorschemes: {
            scheme: this.bc_colors,
          },
        },
      },
    });
  }

  private buildChartData(results): any {
    const data: any = { datasets: [] };
    const stacks = Object.keys(results);
    data.labels = results[stacks[0]].concurrency;
    stacks.forEach((stack) => {
      const dataset: any = { fill: false };
      dataset.data = results[stack][this.metric];
      dataset.label = stack;
      data.datasets.push(dataset);
    });
    return data;
  }
}
