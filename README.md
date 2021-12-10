# SimpleDatePicker
A Simple JS Date Picker

Project inspired by : [jsSimpleDatePickr](https://blog.niap3d.com/calendrier-javascript/)

#Usage 
``````
<link rel="stylesheet" href="jsSimpleDataPickr.2.1.css">
<script type="text/javascript" src="jsSimpleDataPickr2.1.review.js"></script>

<div id="calendarMain" class="calendarMain"></div>
<script type="text/javascript">

    var date_max = new Date();
    date_max.setMonth(date_max.getMonth()+2);
    var date_min = new Date();
    date_min.setMonth(date_min.getMonth()-1);
    var option = {'date_min' : date_min, 'date_max' : date_max};
    var myCalendar = new SimpleDatePicker('calendarMain', option);
</script>
```