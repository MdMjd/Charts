let myChart = document.getElementById('myChart').getContext('2d');
let myChart2 = document.getElementById('myChart2').getContext('2d');

//Global Variables
const xlabels = []; //getData, chartIt
const ytemps = [];

//Program Running Sequence
chartIt();

//Chart
let massPopChart = new Chart(myChart, {
  type:'bar',
  data:{
    labels:['Clementi','Geylang', 'Hougang', 'Jurong East', 'Jurong West'],
    datasets:[{
      label: 'Population',
      data: [
        91990,
        110110,
        227560,
        78600,
        262730
      ]
    }]
  },
  options:{
    plugins: {
      title:{
        display:true,
        text:'Population in selected areas in Singapore',
        fontSize: 20
      },
      legend:{
        position: 'right'
      }
    }
  }
})
//Chart
async function chartIt(){
  await getData();
  let massPopChart2 = new Chart(myChart2, {
    type:'line',
    data:{
      labels: xlabels,
      datasets:[{
        label: 'Temperatures',
        borderColor: 'green',
        data: ytemps
      }]
    },
    options:{
      plugins: {
        title:{
          display:true,
          text:'Mean Global temeprature',
          fontSize: 20
        },
        legend:{
          position: 'right'
        }
      }
    }
  })
}

//Chart
async function getData() {
  const response  = await fetch('test.csv')
  const data = await response.text();

  //Makes an array of rows and remove the 1st element since it is just the headers
  const rows = data.split('\n').slice(1)
  rows.forEach(row => {
    const columns = row.split(',')

    const year = columns[0]
    xlabels.push(year)
    const temp = columns[1]
    ytemps.push(parseFloat(temp) + 14)
    console.log(year, temp);
  })
}
