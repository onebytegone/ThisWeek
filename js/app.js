// Copyright 2015 Ethan Smith

(function() {
   _.templateSettings.variable = 'model';

   $.getJSON('data/days.json', function( data ) {
      var createTemplate = function(id) {
         return _.template(
            $( 'script.' + id ).html()
         );
      };
      var dayTemplate = createTemplate('template-day'),
          taskTemplate = createTemplate('template-task');

      var days = _.map(data, function(tasks, name) {
         var tasksHTML = _.map(tasks, taskTemplate).join('');
         var timeUsed = _.reduce(tasks, function(total, task){ return total + task.hours; }, 0);
         return dayTemplate({
            'name': name,
            'used': timeUsed,
            'tasksHTML': tasksHTML
         });
      });

      $('#jsWeek').html(days);
   });
}).call(this);
