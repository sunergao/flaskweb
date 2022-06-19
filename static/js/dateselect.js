var Canlender = new Object();
Canlender.years = new Array();
Canlender.yearIndex = new Array();
Canlender.months = new Array();
Canlender.date = new Date();
Canlender.year = Canlender.date.getFullYear();
Canlender.page = 0;
Canlender.pageNum = 12;
Canlender.startYear = 2001;

var i, j;
for (i = Canlender.startYear, j = 0; i <= Canlender.year; ++i, ++j) {
    Canlender.years[j] = i;
    Canlender.yearIndex[i] = j;
}
for (i = 1, j = 0; i <= 12; ++i, ++j) {
    Canlender.months[j] = i;
}

Canlender.getYearTds = function(goPage) {
    if (typeof(goPage) == 'undefined') {
        goPage = Math.ceil((Canlender.yearIndex[Canlender.year] + 1) / Canlender.pageNum);
    }

    var totalPage = Math.ceil(Canlender.years.length / Canlender.pageNum);
    
    goPage = goPage > totalPage ? totalPage : goPage;
    goPage = goPage <= 0 ? 1 : goPage;
    
    Canlender.page = goPage;
    
    var startIndex = (goPage - 1) * Canlender.pageNum;
    var endIndex = startIndex + Canlender.pageNum - 1;
    
    endIndex = endIndex > Canlender.yearIndex[Canlender.year] ? Canlender.yearIndex[Canlender.year] : endIndex;

    var rtn = '';
    var counter = 0;
    var addtr = false;
    for (i = startIndex; i <= endIndex; ++i) {
        if (counter % 4 == 0) {
            rtn += '<tr>';
        }
        rtn += '<td width="25%">';
        rtn += '<span style="cursor: pointer; font-size: 12px;" onclick="Canlender.sender.val($(this).html()); Canlender.yearBox.css(\'display\', \'none\');">' + Canlender.years[i] + '</span>';
        rtn += '</td>';
        
        ++counter;
        if (counter % 4 == 0) {
            rtn += '</tr>';
        }
    }
    
    while (counter % 4 != 0) {
        rtn += '<td width="25%"> </td>';
        ++counter;
        if (counter % 4 == 0) {
            rtn += '</tr>';
        }
    }

    if ($('#calenderYear').length > 0) {
        $('#calenderYear').html(rtn);
    } else {
        return rtn;
    }
}

Canlender.getMonthTds = function() {
    var rtn = '';
    var counter = 0;
    for (i = 1; i <= 12; ++i) {
        if (counter % 4 == 0) {
            rtn += '<tr>';
        }
        rtn += '<td width="25%">';
        v = i;
        if (i < 10) {
            v = '0' + v;
        }
        rtn += '<span style="cursor: pointer; font-size: 12px;" onclick="Canlender.sender.val($(this).html()); Canlender.monthBox.css(\'display\', \'none\');">' + v+ '</span>';
        rtn += '</td>';
        
        ++counter;
        if (counter % 4 == 0) {
            rtn += '</tr>';
        }
    }
    return rtn;
}

Canlender.getYear = function(sender) {
    Canlender.sender = sender;
    if (Canlender.yearBox) {
        Canlender.yearBox.css('display', 'block');
    } else {
        var pages = Canlender.getYearTds();
        var pos = sender.position();
        var left = pos.left;
        var top = pos.top + sender.height() + 10;
        var str = '<div style="width: 160px; border: 1px solid black; padding: 2px; position: absolute; z-index:999; top: ' + top + 'px; left: ' + left + 'px" id="calenderYearId">';
        str += '<div style="background: black; color: white; font-size: 12px; line-height:16px; height: 16px; text-align: center;">';
        str += '<span onclick="Canlender.getYearTds(' + (Canlender.page - 1) + ')" style="padding-right: 20px; cursor: pointer;"><<</span>';
        str += '<span>请选择年份</span>';
        str += '<span onclick="Canlender.getYearTds(' + (Canlender.page + 1) + ')" style="padding-left: 20px; cursor: pointer;">>></span>';
        str += '</div>';
        str += '<div style="padding: 2px 0px;"><table width="160px" border=0 id="calenderYear">';
        str += pages;
        str += '</table></div>';
        str += '<div style="padding: 2px; text-align:center;"><span style="color: black; cursor: pointer; font-size:12px;" onclick="Canlender.yearBox.css(\'display\', \'none\')">关闭</span></div>';
        str += '</div>';
        Canlender.yearBox = $(str);
        sender.after(Canlender.yearBox);
    }
    Canlender.monthBox.css('display', 'none');
}

Canlender.getMonth = function(sender) {
    Canlender.sender = sender;
    if (Canlender.monthBox) {
        Canlender.monthBox.css('display', 'block');  
    } else {
        var pages = Canlender.getMonthTds();
        var pos = sender.offset();
        var left = pos.left;
        var top = pos.top + 30;
        var str = '<div style="width: 160px; border: 1px solid black; padding: 2px; position: absolute; top: ' + top + 'px; left: ' + left + 'px" id="calenderMonthId">';
        str += '<div style="background: black; color: white; font-size: 12px; line-height:16px; height: 16px; text-align: center;">';
        str += '<span>请选择月份</span>';
        str += '</div>';
        str += '<div style="padding: 2px 0px;"><table width="160px" border=0 id="calenderMonth">';
        str += pages;
        str += '</table></div>';
        str += '<div style="padding: 2px; text-align:center;"><span style="color: black; cursor: pointer; font-size:12px;" onclick="Canlender.monthBox.css(\'display\', \'none\')">关闭</span></div>';
        str += '</div>';
        Canlender.monthBox = $(str);
        sender.after(Canlender.monthBox);
    }
    Canlender.yearBox.css('display', 'none');
}

Canlender.handle = function() {
     Canlender.monthBox.css('display', 'none');
     Canlender.yearBox.css('display', 'none');
}