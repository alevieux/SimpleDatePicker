# SimpleDatePicker
A Simple JS Date Picker

Project inspired by : [jsSimpleDatePickr](https://blog.niap3d.com/calendrier-javascript/)

# Usage 
```html
<link rel="stylesheet" href="SimpleDatePickerjs.css">
<script type="text/javascript" src="SimpleDatePicker.js"></script>

<div id="calendarMain" class="calendarMain"></div>
<script type="text/javascript">

    var date_max = new Date();
    date_max.setMonth(date_max.getMonth()+2);
    var date_min = new Date();
    date_min.setMonth(date_min.getMonth()-1);
    var month_name = ['Janvier','Février','Mars','Avril','Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', "Décembre"];
    var day_name = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi', 'Dimanche'];
    var option = {
        'date_min' : date_min,
        'date_max' : date_max,
        'month_name' : month_name,
        'day_name' : day_name
    };
    var myCalendar = new SimpleDatePicker('calendarMain', option);
</script>
```