// Copyright 2015 Ethan Smith

(function() {
   _.templateSettings.variable = 'model';

   $.getJSON('days.json', function( data ) {
      var createTemplate = function(id) {
         return _.template(
            $( 'script.' + id ).html()
         );
      };
      var dayTemplate = createTemplate('template-day'),
          taskTemplate = createTemplate('template-task');

      var days = _.map(data, function(tasks, name) {
         var tasksHTML = _.map(tasks, taskTemplate).join('');
         return dayTemplate({
            'name': name,
            'tasksHTML': tasksHTML
         });
      });

      $('#jsWeek').html(days);
   });
}).call(this);
