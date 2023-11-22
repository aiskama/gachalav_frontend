<template>
  <LineChartGenerator
    :chart-data="chartData"
    :chart-id="chartId"
    :chart-options="chartOptions"
    :css-classes="cssClasses"
    :dataset-id-key="datasetIdKey"
    :height="height"
    :plugins="plugins"
    :styles="styles"
    :width="width"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    data: Array,
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: this.data.map((item) =>
          item.values
            .flat()
            .flat()
            .map((item) => item.year)
        )[0],
        datasets: [
          {
            label: this.data.map((item) => item.title)[0],
            borderColor: this.data.map((item) => item.color)[0],
            backgroundColor: this.data.map((item) => item.color)[0],
            tension: 0.2,
            data: this.data.map((item) =>
              item.values
                .flat()
                .flat()
                .map((item) => item.value)
            )[0],
          },
          {
            label: this.data.map((item) => item.title)[1],
            backgroundColor: this.data.map((item) => item.color)[1],
            borderColor: this.data.map((item) => item.color)[1],
            tension: 0.2,
            data: this.data.map((item) =>
              item.values
                .flat()
                .flat()
                .map((item) => item.value)
            )[1],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels:{
              boxHeight: 2,
              boxWidth: 20,
              borderRadius: 10,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#616161",
            },
            grid: {
              color: "#D5D8DF",
              drawBorder: false,
            },
          },
          y: {
            title:{
              display: true,
              text: 'Цена за кв.м.',
              color: '#616161',
              font: {
                size: 14,
                style: 'normal',
                lineHeight: 2,
                family: 'Inter',
              },
              padding: {top: 0, left: 0, right: 0, bottom: 0},
            },
            ticks: {
              color: "#616161",
            },
            grid: {
              drawBorder: false,
              display: false,
              tickBorderDashOffset: 0.9,
            },
          },
        },
      },
    };
  },
};
</script>
