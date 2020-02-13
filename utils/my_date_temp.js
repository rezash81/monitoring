var moment = require('moment-jalaali');
//moment.loadPersian({usePersianDigits: true});
//moment.loadPersian({dialect: 'persian-modern'});

function get_name_of_month_of_given_date(d){
    m = moment(d,'jYYYY/jM/jD');
    switch(m.jMonth()) {
        case 0:
        return 'فروردین'
        
        case 1:
            return 'اردیبهشت'
        
        case 2:
            return 'خرداد'
            
        case 3:
            return 'تیر'
        
        case 4:
            return 'مرداد'
        
        case 5:
            return 'شهریور'
        
        case 6:
            return 'مهر'
        
        case 7:
            return 'آبان'
        
        case 8:
            return 'آذر'
        
        case 9:
            return 'دی'
        
        case 10:
            return 'بهمن'
        
        case 11:
            return 'اسفند'
        
      }
}
function get_number_of_month_of_given_date(d){
    m = moment(d,'jYYYY/jM/jD');
    return m.jMonth();
}
// function get_end_of_mehr_in_georgian(){
//     var now = moment();
//     m=moment(now);
//     m=moment('1398/05/06', 'jYYYY/jM/jD');
//     jy = m.jYear();
//     jm = m.jMonth();
//     if(jm<7)
//         jy=jy-1;

//     end_of_mehr = moment(jy + "/07/30", 'jYYYY/jM/jD');
//     return end_of_mehr.format('YYYY/M/D');

// }
function get_end_of_months_in_georgian() {
//function get_end_of_months_in_georgian(){
    var now = moment();
    //var m=moment(now);
    var end_of_months = [];
    var jy = now.jYear(); 
    var jm = now.jMonth()+1;//  0 <= now.jMonth() =< 11
    var jmb = jm;


    end_of_months[jm]=now.format('YYYY-M-D');
    jm--;
    do{
        if(jm >= 1 && jm <= 6 )
            end_of_months[jm]= moment(jy + "/" + jm +"/31", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if(jm >= 7 && jm <= 11)
                end_of_months[jm]= moment(jy +"/"+ jm  +"/30", 'jYYYY/jM/jD').format('YYYY-M-D');
                else if(jm == 12)
                    end_of_months[jm] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY-M-D');
        jm--;
    }while(jm > 0)
    jm = jmb+1;
    jy--;
    do{
        if(jm >= 1 && jm <= 6 )
            end_of_months[jm]= moment(jy + "/" + jm +"/31", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if(jm >= 7 && jm <= 11)
                end_of_months[jm]= moment(jy +"/"+ jm  +"/30", 'jYYYY/jM/jD').format('YYYY-M-D');
                else if(jm == 12)
                    end_of_months[jm] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY-M-D');
        jm++;
    }while(jm <= 12)

    // end_of_months['مهر'] = moment(jy + "/07/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['آبان'] = moment(jy + "/08/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['آذر'] = moment(jy + "/09/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['دی'] = moment(jy + "/10/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['بهمن'] = moment(jy + "/11/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['اسفند'] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY/M/D');
    // jy=jy+1;
    // end_of_months['فروردین'] = moment(jy + "/01/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['اردیبهشت'] = moment(jy + "/02/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['خرداد'] = moment(jy + "/03/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['تیر'] = moment(jy + "/04/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['مرداد'] = moment(jy + "/05/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['شهریور'] = moment(jy + "/06/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    console.log("salam2");
    // for (var i in end_of_months) {
            
    //              console.log(i +' =  '+end_of_months[i]);
    //         }
    end_of_months.map(date => {
        console.log(date);
    });

    //return end_of_months;

}

//m = moment('1359/11/06', 'jYYYY/jM/jD');

//console.log(m.format('jYYYY/jM/jD [is] YYYY/M/D'));

//console.log(m.format('jYYYY/jM/jD [is] YYYY/M/D'));

//console.log(get_name_of_month_of_given_date('1359/11/06'));

//console.log(get_name_of_month_of_given_date('1359/11/06'));//بهمن
//console.log(get_end_of_mehr_in_georgian());
// end_of_months = get_end_of_months_in_georgian();
// for (var i in end_of_months) {
//     console.log(i +' =  '+end_of_months[i]);
// }

//console.log(get_number_of_month_of_given_date('1359/11/06'));

// var now = moment();
// var m=moment(now);
// console.log(now.format('YYYY-M-D'));
// console.log(m.format('YYYY-M-D'));

// console.log(now.jMonth());



get_end_of_months_in_georgian();