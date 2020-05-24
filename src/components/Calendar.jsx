
import React from 'react';
import '../css/main.css';
import moment from 'moment';
import 'moment/locale/ru';
export default function Calendar(props)
{

    require('moment/locale/ru');
    moment.locale('ru');
    const nominative=["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    const subjective=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    moment.updateLocale('ru',{
        months  : function (momentToFormat, format) {
            console.log(momentToFormat);
            if (/^MMMM/.test(format)) {
                return nominative[momentToFormat.month()];
            } else {
                return subjective[momentToFormat.month()];
            }
        }
    });

    const { date }=props;
    const dayOfWeek=moment(date).format('dddd');
    const monthText=moment(date).format('MMMM');
    const monthTextI=moment(date).format('MMM');
    const dayOfWeekNum=date.getDay();
    const prevMonthLastDay=new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const thisMonthLastDay=new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const prevMonthDaysLength=dayOfWeekNum-1;
    const currentDay=date.getDate();
    const dayOfWeekArray=[
        {
        title:'Понедельник',
        caption:"Пн"
        },
        {
            title: "Вторник",
            caption:'Вт'
        },
        {
          title:'Среда',
          caption:'Ср'
        },
        {
            title: 'Четверг',
            caption: 'Чт'
        },
        {
            title: 'Пятница',
            caption: 'Пт'
        },
        {
            title: 'Суббота',
            caption: 'Сб'
        },
        {
            title: 'Воскресенье',
            caption: 'Вс'
        }
    ]
    let resultArray=[];

    /* Заполняем предыдущий месяц */
    for (let i=prevMonthDaysLength;i>0;i--)
    {
        resultArray.push({classes: 'ui-datepicker-other-month', day: prevMonthLastDay-i+1});
    }
    for (let i=1;i<=thisMonthLastDay;i++)
    {
        resultArray.push({classes:(i===currentDay)? 'ui-datepicker-today':'', day:i});
    }
    const nextMonthDays=7-resultArray.length % 7;
    for (let i=1;i<=nextMonthDays;i++)
    {
        resultArray.push({classes:"ui-datepicker-other-month",day:i});
    }
    let resultGridArray=[];
    while (resultArray.length)
    {
        resultGridArray.push(resultArray.splice(0,7));
    }



    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{ dayOfWeek }</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{ currentDay }</div>
                    <div className="ui-datepicker-material-month">{monthText}</div>
                    <div className="ui-datepicker-material-year">{ date.getFullYear() }</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{monthTextI}</span>&nbsp;<span
                    className="ui-datepicker-year">{ date.getFullYear() }</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                <tr>
                    {dayOfWeekArray.map(day=><th scope={"col"} title={day.title}>{day.caption}</th>)}
                </tr>
                </thead>
                <tbody>
                {resultGridArray.map((row,i)=> <tr key={"tr-"+i}>{row.map((item,j) =><td key={"td"+item.classes+i*10+j}className={item.classes}>{item.day}</td> )}</tr>)}
                </tbody>
            </table>
        </div>
    );
}