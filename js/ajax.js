$.extend(jMutants, {
  createMutantAjax: function(mutant) {
    $.post({
      url: 'https://mutant-school.herokuapp.com/api/v1/mutants',
      data: {
        mutant: mutant
      },
      success: function(mutant) {
        this.addMutant(mutant, false);
      }.bind(this)
    });
  },

  loadStudentsAjax: function() {
    $.get({
      url: 'http://davestrus.com/data/roster.json',
      dataType: 'jsonp',
      jsonpCallback: "callback",
      context: this,
      success: function(data) {
        var list = $('#test');
        if(data.students) {
          $.each(data.students, function(i, student) {
            this.addStudent(student);
          }.bind(this));
        }
      }.bind(this)
    });
  },

  deleteMutantAjax(id) {
    $.ajax( {
      method: 'delete',
      url: 'https://mutant-school.herokuapp.com/api/v1/mutants' + '/' + id,
      success: function() {
        $('li[data-id=' + id +']').remove();
      }
    });
  },

});
