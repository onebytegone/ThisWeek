// Copyright 2015 Ethan Smith

(function() {
   var HOURS_IN_DAY = 24;

   _.templateSettings.variable = 'model';

   $.getJSON('data/days.json', function( data ) {
      var createTemplate = function(id) {
         return _.template(
            $( 'script.' + id ).html()
         );
      };
      var dayTemplate = createTemplate('template-day'),
          taskTemplate = createTemplate('template-task'),
          todayIndex = (new Date()).getDay(),
          dayNames = _.keys(data);

      var days = _.map(dayNames, function(name, index) {
         var tasks = data[name];
         var tasksHTML = _.map(tasks, taskTemplate).join('');
         var timeUsed = _.reduce(tasks, function(total, task){ return total + task.hours; }, 0);
         var timeLeft = HOURS_IN_DAY - timeUsed;

         if (timeLeft > 0) {
            tasksHTML += taskTemplate({
               icon: 'fa-paper-plane-o',
               classes: 'open',
               name: 'Open',
               hours: timeLeft
            });
         }

         return dayTemplate({
            'name': name,
            'used': timeUsed,
            'tasksHTML': tasksHTML,
            'classes': (index === todayIndex ? 'today' : '')
         });
      });

      $('#jsWeek').html(days);
   });
}).call(this);
