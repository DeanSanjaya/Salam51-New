import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartThreeProps = {
  totalJumlah: { _id: string; nama: string; totalJumlah: number }[];
};

interface ChartThreeState {
  series: number[];
}

const ChartThree: React.FC<ChartThreeProps> = ({ totalJumlah }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: [
      '#3C50E0',
      '#6577F3',
      '#8FD0EF',
      '#0FADCF',
      '#FF5733',
      '#C70039',
      '#900C3F',
      '#581845',
    ],
    labels: totalJumlah.map((item) => item.nama),
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const [state, setState] = useState<ChartThreeState>({
    series: totalJumlah.map((item) => item.totalJumlah),
  });

  useEffect(() => {
    setState({ series: totalJumlah.map((item) => item.totalJumlah) });
  }, [totalJumlah]);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Analisis Total Barang
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {totalJumlah.map((item, index) => {
          const colors = [
            '#3C50E0',
            '#6577F3',
            '#8FD0EF',
            '#0FADCF',
            '#FF5733',
            '#C70039',
            '#900C3F',
            '#581845',
          ];
          const colorClass = colors[index % colors.length];
          return (
            <div className="sm:w-1/2 w-full px-8" key={item._id}>
              <div className="flex w-full items-center">
                <span
                  className="mr-2 block h-3 w-full max-w-3 rounded-full"
                  style={{ backgroundColor: colorClass }}
                ></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span>{item.nama}</span>
                  <span>{item.totalJumlah}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartThree;
