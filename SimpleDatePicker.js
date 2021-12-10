class SimpleDatePicker {
    constructor(calendar_div_id, option={}) {
        this.id = Math.random();
        this.calendar_div_id = calendar_div_id;

        this.date = new Date();

        this.date_selected = new Date(this.date);
        this.cell_date_selected = null;
        this.date.setDate(1);

        this.option = option;

        this.month_fr = ['Janvier','Février','Mars','Avril','Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', "Décembre"];
        this.list_days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi', 'Dimanche'];
        this.init_calendar();

    }
    // add calendar html page div
    init_calendar(){
        let calendar_html_element = document.getElementById(this.calendar_div_id);
        let calendar_main_div = this.add_dom_element('div', {'parent': calendar_html_element, 'id': 'calendarWrap'+this.id});
        let calendar_nav_div = this.add_dom_element('div', {'parent': calendar_main_div, 'class': 'calendarNav'});
        let calendar_body_div = this.add_dom_element('div', {'parent': calendar_main_div, 'id': 'calendar'+this.id});

        this.init_control_button(calendar_nav_div);

        this.init_body_calendar(calendar_body_div);

        return this.id;
    }

    next_month(){
        let work_date = new Date(this.date)
        work_date.setMonth(work_date.getMonth()+1)
        if(this.option.date_max >= work_date || this.option.date_max === undefined ) {
            this.date.setMonth(this.date.getMonth()+1);
            this.display_current_date();
        }
    }
    previous_month(){

        let work_date = new Date(this.date)
        work_date.setMonth(work_date.getMonth()-1)
        if(this.option.date_min <= work_date || this.option.date_min === undefined ) {
            this.date.setMonth(this.date.getMonth()-1);
            this.display_current_date();
        }
    }

    // init control button in calendar nav div
    init_control_button(nav_div){

        let previous_button = this.add_dom_element('input', {'parent': nav_div, 'class': 'calendarNavML', 'type': 'button', 'value': '<'});
        previous_button.onclick = function(ev){
            ev.view.myCalendar.previous_month();
        };

        this.add_dom_element('p', {'parent': nav_div, 'class': 'calendarTitle', 'id':'calendarTitle'+this.id});

        let next_button = this.add_dom_element('input', {'parent': nav_div, 'class': 'calendarNavMR', 'type': 'button', 'value': '>'});
        next_button.onclick = function(ev){
            ev.view.myCalendar.next_month();
        };
    }

    init_body_calendar(body_div){
        this.calendar_table = this.add_dom_element('table', {'parent': body_div, 'class': 'calendar_table'});

        let week_line_calendar_table = this.add_dom_element('tr', {'parent': this.calendar_table});

        this.list_days.forEach(day => this.add_dom_element('th', {'parent': week_line_calendar_table, 'content':day}));
        this.display_current_date();
    }

    display_current_date(){

        let nb_node = this.calendar_table.childNodes.length;
        for(let k =1;k<nb_node;k++){
            this.calendar_table.removeChild(this.calendar_table.childNodes[1])
        }

        document.getElementById('calendarTitle'+this.id).innerHTML = this.month_fr[this.date.getMonth()]+" "+this.date.getFullYear();

        let work_date = new Date(this.date);
        work_date.setDate(1);
        let starter_day = work_date.getDay();
        let starter_day_fr = [1,2,3,4,5,6,0].indexOf(starter_day)
        work_date.setMonth(work_date.getMonth()+1);
        work_date.setDate(0);
        let number_day = work_date.getDate();

        let lines_number = parseInt((((number_day+starter_day_fr) / 7)+1));

        let day=1
        for(let l = 1;l<=lines_number;l++){
            let week_line_calendar_table = this.add_dom_element('tr', {'parent': this.calendar_table});
            for(let i = 1;i<=7;i++){
                if(l == 1 && i <= starter_day_fr){
                    this.add_dom_element('th', {'parent': week_line_calendar_table});
                } else {
                    if (day<=number_day){
                        let cell = this.add_dom_element('th', {'parent': week_line_calendar_table, 'class':'day' ,'content':day});
                        cell.cal = this
                        cell.selected_day = day;
                        cell.selected_month = this.date.getMonth();
                        cell.selected_year = this.date.getFullYear();
                        if (day == this.date_selected.getDate() && this.date_selected.getMonth() == this.date.getMonth()){
                            cell.className="selectedDay";
                            this.cell_date_selected = cell;
                        }

                        cell.onclick = function (ev){
                            this.className = "selectedDay";
                            this.cal.cell_date_selected.className = "day";
                            this.cal.cell_date_selected = this;
                            this.cal.date_selected.setDate(this.selected_day);
                            this.cal.date_selected.setMonth(this.selected_month);
                            this.cal.date_selected.setFullYear(this.selected_year);
                            console.log(this.selected_day)
                            console.log(this.cal.date_selected)
                        };
                        day++
                    }
                    else {
                        this.add_dom_element('th', {'parent': week_line_calendar_table});
                    }
                }
            }
        }
    }
    
    add_dom_element(type, opt){
        var element_dom = document.createElement(type);
        if(opt.id != undefined) element_dom.id = opt.id;
        if(opt.class != undefined) element_dom.className = opt.class;
        if(opt.type != undefined) element_dom.type = opt.type;
        if(opt.value != undefined) element_dom.value = opt.value;
        if(opt.content != undefined) element_dom.innerHTML = opt.content;
        if(opt.parent != undefined) opt.parent.appendChild(element_dom);
        return element_dom;
    }
}