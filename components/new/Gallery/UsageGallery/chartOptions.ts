import { ApexOptions } from 'apexcharts';

export const textColor = '#4a4a4a';
export const options: ApexOptions = {
  chart: {
    background: '#ffff',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: true,
    formatter: (val, opts) => val + ' €',
    style: {
      fontSize: '1.1rem',
    },
  },

  plotOptions: {
    bar: {
      dataLabels: {
        position: 'center',
        orientation: 'vertical',
      },
      borderRadius: 5,
    },
  },

  title: {
    style: {
      fontFamily: 'Segoe UI',
      color: textColor,
      fontSize: '20px',
    },
  },

  yaxis: {
    show: true,
    title: {
      text: 'Hinta',
      style: {
        color: textColor,
        fontSize: '1.5rem',
      },
    },
    labels: {
      style: {
        colors: ['#000'],
      },
      formatter: value => `${value} €`,
    },
  },
  xaxis: {
    title: {
      text: 'Päivämäärä',
      style: {
        color: textColor,
      },
    },

    labels: {
      style: {
        colors: [textColor],
      },
    },
  },
};
