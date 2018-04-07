/**
 * Created by Administrator on 2017/7/5.
 */
var DateFormat = {
    /**
     * 传入Date对象和时间格式
     * 例如 DateFormat.getDateString(new Date(),"yyyy-MM-dd") 将返回 2017-7-8
     * @param date  Date对象
     * @param format  时间格式
     * @returns {string|XML|*} 格式化时间字符串
     */
    getDateString: function (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        var month = (date.getMonth() + 1);
        format = format.replace(/MM/g, month < 10 ? '0' + month : month);
        var day = date.getDate();
        format = format.replace(/dd/g, day < 10 ? '0' + day : day);
        var hours = date.getHours();
        format = format.replace(/HH/g, hours < 10 ? '0' + hours : hours);
        var minutes = date.getMinutes();
        format = format.replace(/mm/g, minutes < 10 ? '0' + minutes : minutes);
        var seconds = date.getSeconds();
        format = format.replace(/ss/g, seconds < 10 ? '0' + seconds : seconds);
        return format;
    },

    /**
     * 返回当前时间 格式化字符串
     * @param format 时间格式
     * @returns {*|string|XML}
     */
    getNowDateString: function (format) {
        return DateFormat.getDateString(new Date(), format);
    },

    /**
     * 将dateString根据format转换成对应的Date类型并返回
     * @param dateString 需要转换的date字符串
     * @param format 时间格式
     * @returns {Date}
     */
    parseDate: function (dateString, format) {
        /\d{4}-(.*)-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/
        var yearExp = "\\d{4}";
        var monthExp = "\\d{1,2}";
        var dayExp = "\\d{1,2}";
        var hourExp = "\\d{1,2}";
        var minExp = "\\d{1,2}";
        var secExp = "\\d{1,2}";
        var year = dateString.replace(new RegExp(format.replace(/yyyy/, '(.*)').replace(/MM/, monthExp).replace(/dd/, dayExp).replace(/HH/, hourExp).replace(/mm/, minExp).replace(/ss/, secExp)), '$1');
        var month = dateString.replace(new RegExp(format.replace(/yyyy/, yearExp).replace(/MM/, '(.*)').replace(/dd/, dayExp).replace(/HH/, hourExp).replace(/mm/, minExp).replace(/ss/, secExp)), '$1');
        var day = dateString.replace(new RegExp(format.replace(/yyyy/, yearExp).replace(/MM/, monthExp).replace(/dd/, '(.*)').replace(/HH/, hourExp).replace(/mm/, minExp).replace(/ss/, secExp)), '$1');
        var hour = dateString.replace(new RegExp(format.replace(/yyyy/, yearExp).replace(/MM/, monthExp).replace(/dd/, dayExp).replace(/HH/, '(.*)').replace(/mm/, minExp).replace(/ss/, secExp)), '$1');
        var min = dateString.replace(new RegExp(format.replace(/yyyy/, yearExp).replace(/MM/, monthExp).replace(/dd/, dayExp).replace(/HH/, hourExp).replace(/mm/, '(.*)').replace(/ss/, secExp)), '$1');
        var sec = dateString.replace(new RegExp(format.replace(/yyyy/, yearExp).replace(/MM/, monthExp).replace(/dd/, dayExp).replace(/HH/, hourExp).replace(/mm/, minExp).replace(/ss/, '(.*)')), '$1');

        var date = new Date();
        if (year != '$1') {
            date.setFullYear(parseInt(year));
        }
        if (month != '$1') {
            date.setMonth(parseInt(month) - 1);
        }
        if (day != '$1') {
            date.setDate(parseInt(day));
        }

        if (hour != '$1') {
            date.setHours(parseInt(hour));
        } else {
            date.setHours(0);
        }
        if (min != '$1') {
            date.setMinutes(parseInt(min));
        } else {
            date.setMinutes(0);
        }
        if (sec != '$1') {
            date.setSeconds(parseInt(sec));
        } else {
            date.setSeconds(0);
        }
        date.setMilliseconds(0);
        return date;
    }
}