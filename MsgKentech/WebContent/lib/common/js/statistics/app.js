var chart;

$(function(){
	init();
	initEvent();
});
function init() {
	initChart();
	initDateBox();
	statisticsChart();
	
	hideSelectMonth();
}
function initEvent() {
	setHandler('#select_year, #select_month', 'change', statisticsChart);
	setHandler('input[name=statisticsType]', 'change', changeStatisticsType);
}
function initDateBox() {
	var date = new Date();
	var thisYear = getYear(date);
	var thisMonth = getMonth(date) + 1;
	
	initYearBox(date);
	initMonthBox();
	
	setYearBox(thisYear);
	setMonthBox(thisMonth);
}
function initYearBox(date) {
	var $year = $('#select_year');
	
	var thisYear = getYear(date);
	var startYear = thisYear - 3;
	
	for (var i = startYear; i <= thisYear; i++) {
		var year = i + '';
		var $option = $('<option>').val(year).text(year + '년');
		$year.append($option);
	}
}
function initMonthBox() {
	var $month = $('#select_month');
	for (var i = 1; i <= 12; i++) {
		var month = lpad(i + '', 2, '0');
		var $option = $('<option>').val(month).text(month + '월');
		$month.append($option);
	}
}
function setYearBox(year) {
	$('#select_year').val(year).prop('selected', true);
}
function setMonthBox(month) {
	 month = lpad(month + '', 2, '0');
	$('#select_month').val(month).prop('selected', true);
}
function statisticsChart() {
	getAndMakeStatisticsChart();
}
function getChartUrl() {
	var type = getStatisticsType();
	return '/statistics/' + type + 'AccessStatistics';
}
function getAndMakeStatisticsChart() {
	var data = {};
	data.year = $('#select_year').val();
	data.month = $('#select_month').val();
	
	var obj = {};
	obj.url = getChartUrl();
	obj.data = data;
	
	ajaxCall(obj, getAndMakeStatisticsChartHandler);
}
function initChart() {
	const canvas = document.querySelector('.chart');
	const context = canvas.getContext('2d');
	var options = {
        maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
        scales: {
        	y: {
        		ticks: {
        			callback: function(label, index) {
        				if (Math.floor(label) == label) {
        					return label;
        				}
        			}
        		}
        	}
        },
        onClick: chartClickHandler
    }
	chart = new Chart(context, {
		type: 'bar',
		data: {},
		options: options
	});
}
function chartClickHandler(point, event) {
	var item = event[0];
	if (item) {
		var idx = item.index;
		var dates = chart.data.dates;
		var date = chart.data.dates[idx];
		console.log(date);
	}
}
function getAndMakeStatisticsChartHandler(res) {
	var code = res.code;
	console.log(res);
	if (code == 'ok') {
		var fullAccessList = res.fullAccessList;
		var deduplicatedAccessList = res.deduplicatedAccessList;
		
		var chartData = makeChartData(fullAccessList, deduplicatedAccessList);
		
		var labels = chartData.labels;
		var fullAccessCounts = chartData.fullAccessCounts;
		var deduplicatedAccessCounts = chartData.deduplicatedAccessCounts;
		var dates = chartData.dates;
		
		const canvas = document.querySelector('.chart');
		const context = canvas.getContext('2d');
		
		var data = {
			labels: labels,
			datasets: [
				{
					label: '전체 접속 통계',
					data: fullAccessCounts,
					backgroundColor: 'rgba(255, 99, 132, 0.2)'
				},
				{
					label: '사용자 접속 통계',
					data: deduplicatedAccessCounts,
					backgroundColor: 'rgba(54, 162, 235, 0.2)'
				}
			],
			dates : dates
		}
		
		chart.data = data;
		chart.update();
	}
}
function makeChartData(fullAccessList, deduplicatedAccessList) {
	var len = fullAccessList.length;
	var labels = [];
	var fullAccessCounts = [];
	var deduplicatedAccessCounts = [];
	var dates = [];
	for (var i = 0; i < len; i++) {
		var fullAccess = fullAccessList[i];
		var deduplicatedAccess = deduplicatedAccessList[i];
		
		var label = getChartDateLabel(fullAccess.date);
		
		labels.push(label);
		fullAccessCounts.push(fullAccess.cnt);
		deduplicatedAccessCounts.push(deduplicatedAccess.cnt);
		dates.push(fullAccess.date);
	}
	
	var data = {};
	data.labels = labels;
	data.fullAccessCounts = fullAccessCounts;
	data.deduplicatedAccessCounts = deduplicatedAccessCounts;
	data.dates = dates;
	
	return data;
}
function getChartDateLabel(date) {
	return getStatisticsType() == 'monthly' ? date + '월' : date + '일';
}
function changeStatisticsType() {
	var type = getStatisticsType();
	console.log(type);
	if (type == 'monthly') {
		hideSelectMonth();
	} else {
		$('#select_month').show();
	}
	
	statisticsChart();
}
function getStatisticsType() {
	return $('input[name=statisticsType]:checked').val();
}
function hideSelectMonth() {
	$('#select_month').hide();
}
function showSelectMonth() {
	$('#select_month').show();
}