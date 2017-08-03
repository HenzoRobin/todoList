<style scoped>
  * {
    box-sizing: border-box;
    margin:  0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  body {
    font-family: 'microsoft yahei';
   /*  background-color: grey; */
  }
  .calendar {
    max-width: 900px;
    margin:  0 auto;
    padding: 30px 15px;

  }
  .month {
    width: 100%;
    background-color: lightblue;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .month ul {
    display: flex;
    justify-content: space-between;
  }
  .arrow {
    padding: 30px;
    font-size: 20px;
  }
  .arrow:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .choose-year {
    padding: 10px 20px;
    font-size: 20px;
  }
  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }
  .week {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  
    color: #fff;
    background-color: lightblue;
    padding: 10px 0;
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .days li {
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding: 15px 0;
    font-size: 17px;
    color: #000;
  }
  .days li:hover {
    background: #e1e1e1;
    border-radius: 5px;
  }
</style>


<template>
  <div class="calendar">
    <div class="month">
      <ul>
        <li class="arrow">&lt;</li>
        <li class="year-month">
          <span class="choose-year">2017</span>
          <span class="choose-month">7 月</span>
        </li>
        <li class="arrow">&gt;</li>
      </ul>
    </div>
    <ul class="week">
      
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <ul class="days">
      <li v-for="day in days">
        <span>{{ day.getDate() }}</span>
      </li>
    </ul>
  </div>
</template>


<script>

export default {
  data:function(){
    return {
      currentDay:1,
      currentMonth:1,
      currentYear:1970,
      currentWeek:1,
      days:[]
    }  
  },

  created:function(){
    this.init(null)
  },

  methods:{

    init:function(){
      var date = new Date();

      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.curentMonth = date.getMonth() + 1
      this.curentWeek = date.getDay()

      if(this.curentWeek == 0) {
        this.curentWeek == 7 
      }

      var str = this.formatDate(this.currentYear,this.currentMonth,this.currentDay)
      // this.days.length = 0

      for (var i = this.currentWeek -1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }

      for (var i = 1; i <= 41 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    }, 

    formatDate:function(year,month,day){
      if(month < 10){
        month = "0" + month
      }
      if(day < 10){
        day = "0" + day
      }
      return year + "-" + month + "-" + day 
    }
  }
}

</script>