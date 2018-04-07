$(".chart").find(":last").click(function(){
    setTimeout(function () {

        //昨日收款状况
        var flow_in  =  echarts.init(document.getElementById('flow-in'), 'roma');
        // 显示标题，图例和空的坐标轴
        flow_in.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['已收款','待收款']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'昨日收款情况',
                    type:'pie',
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {value:73400, name:'已收款'},
                        {value:6000, name:'待付款'}
                    ]
                }
            ]
        });


        //未来7日现金应收/应付情况
        var next_flow = echarts.init(document.getElementById('next_flow'), 'roma');
        // 显示标题，图例和空的坐标轴
        next_flow.setOption({
            title: {
                text: ''
            },
            grid: {
                left: '15%',

            },
            tooltip: {},
            legend: {
                data: ['应收', '应付']
            },
            xAxis: {
                data: [7.1,7.2,7.3,7.4,7.5,7.6,7.7]
            },
            yAxis: {},
            series: [{
                name: '应收',
                type: 'bar',
                data: [10200,6712,0,2900,31800,79700,7800]
            }, {
                name: '应付',
                type: 'bar',
                data: [556,0,0,0,0,0,0]
            }]
        });

        //过去7日现在就收入/支出情况
        var pre_flow = echarts.init(document.getElementById('pre_flow'), 'roma');
        // 显示标题，图例和空的坐标轴
        pre_flow.setOption({
            title: {
                text: ''
            },
            grid: {
                left: '20%',

            },
            tooltip: {},
            legend: {
                data: ['应收', '应付']
            },
            xAxis: {
                data: [7.1,7.2,7.3,7.4,7.5,7.6,7.7]
            },
            yAxis: {},
            series: [{
                name: '应收',
                type: 'bar',
                data: [12737.5,24156,13684.4,16904,27502,92143,1387244]
            }, {
                name: '应付',
                type: 'bar',
                data: [42264,21000,18012,0,0,220500,58100]
            }]
        });

        //上月收入类型情况
        var type  =  echarts.init(document.getElementById('type'), 'roma');
        // 显示标题，图例和空的坐标轴
        type.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['租金','押金','杂费']
            },

            calculable : true,
            series : [
                {
                    name:'上月收入类型情况',
                    type:'pie',
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {value:418579, name:'租金'},
                        {value:185909, name:'押金'},
                        {value:52698.3, name:'杂费'}
                    ]
                }
            ]
        });

    }, 1000)
});
var myChart = echarts.init(document.getElementById('house'), 'roma');
// 显示标题，图例和空的坐标轴
myChart.setOption({
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['拿房数', '删房数']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '拿房数',
        type: 'bar',
        data: []
    }, {
        name: '删房数',
        type: 'bar',
        data: []
    }]
});
// 填入数据
myChart.setOption({
    xAxis: {
        data: ["三", "四", "五", "六"]
    },
    series: [{
        // 根据名字对应到相应的系列
        name: '拿房数',
        data: [29, 88, 98, 301]
    }, {
        // 根据名字对应到相应的系列
        name: '删房数',
        data: [0, 9, 245, 95]
    }]
});


//拿房删房
var evict = echarts.init(document.getElementById('evict'), 'roma');
// 显示标题，图例和空的坐标轴
evict.setOption({
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['到期退租', '中途退租']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 1, name: '到期退租'},
                {value: 4, name: '中途退租'}
            ]
        }
    ]
});


//租客转换率
var change = echarts.init(document.getElementById('change'), 'roma');
// 显示标题，图例和空的坐标轴
change.setOption({

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },

    legend: {
        data: ['总客数', '已跟进', '已签约']
    },
    calculable: true,
    series: [
        {
            name: '业务转换率',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 30,
            max: 100,
            minSize: '30%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 76, name: '总客数'},
                {value: 76, name: '已跟进'},
                {value: 60, name: '已签约'}
            ]
        }
    ]
});


//过去7日入住率趋势
var stay = echarts.init(document.getElementById('stay'), 'roma');
// 显示标题，图例和空的坐标轴
stay.setOption({

    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['入住率']
    },

    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['6.30', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {

            name: '入住率',
            type: 'line',
            data: [20.83, 20.92, 20.95, 19.58, 19.65, 19.69, 19.93]

        }
    ]
});



setTimeout(function () {

}, 1000)