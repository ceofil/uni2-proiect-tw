function createPieChart( elementID, labels, values, colors ) {
    var ctx2 = document.getElementById(elementID);
    return new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: colors,
                data: values
            }]
        },
        options: {
            tooltips: {
                titleFontSize: 20,
                bodyFontSize: 20,
                titleFontFamily: "Comic Sans MS",
                bodyFontFamily:"Comic Sans MS",
                callbacks: {
                    label: function(tooltipItem, data) {
                        value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                        return value + '%';
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontFamily: "Comic Sans MS",
                    fontSize:20,
                    fontColor: "white",
                    boxWidth: 10
                }
            },
            title: {
                fontFamily: "Comic Sans MS",
                fontSize:20,
                display: false,
                text: 'https://youtu.be/QaPrQa3oMy0'
            }
        }
    });
}


function update_piechart(chart, values){
    chart.data.datasets[0].data = values;
    chart.update();
}

function normalize_values(values){
    sum = values.reduce((a, b) => a + b, 0)
    return values.map((a) => (a / sum * 100).toFixed(1))
}


function init_piechart_indemnizatie(rows, id_judet=null){
    colors = ["#ffc2e5", "#3399ff"]
    labels = ['indemnizati', 'neindemnizati']
    values = [0, 0]
    for (var row of rows) {
        if(id_judet == null || id_judet == row['id_judet'])
        {
            values[0] += row.indemnizati
            values[1] += row.neindemnizati
        }
    }
    values = normalize_values(values)
    return createPieChart("piechart_indemnizatie", labels, values, colors)
}

function init_piechart_gender_medii(rows, id_judet=null){
    colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654"]
    labels = ['rural_femei', 'rural_barbati', 'urban_barbati', 'urban_femei']
    values = [0, 0, 0, 0]
    for (var row of rows) {
        if(id_judet == null || id_judet == row['id_judet']){
            values[0] += row.rural_femei
            values[1] += row.rural_barbati
            values[2] += row.urban_barbati
            values[3] += row.urban_femei
        }
    }
    values = normalize_values(values)
    return createPieChart("piechart_gender_medii", labels, values, colors)
}


function init_piechart(rows,id_judet = null,colors){
    let labels = [];
    let values = [];
    const dict = generate_data_dict_by_rows(rows,id_judet);
    const result = generate_lables_data(dict);
    for(const key in dict){
        labels.push(result[key]['label']);
        values.push(result[key]['value']);
    }
    values = normalize_values(values);

    return createPieChart("piechart_all", labels, values, colors)
}

function init_piechart_varste(rows, id_judet=null){
    let colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange"]

    return init_piechart(rows,id_judet,colors);
}


function init_piechart_rata(rows, id_judet=null){
    let colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange"]

    return init_piechart(rows,id_judet,colors);
}

function init_piechart_educatie(rows, id_judet=null){
    let colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange"]

    return init_piechart(rows,id_judet,colors);
}

function init_piechart_medii(rows, id_judet=null){
    let colors = ["#ffc2e5", "#3399ff", "#ee70a6", "#f38654", "yellow", "orange"]

    return init_piechart(rows,id_judet,colors);
}