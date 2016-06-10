$.extend(jMutants, {
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
            this.addStudentToSelect(student);
          }.bind(this));
        }
      }.bind(this)
    });
  },

  createMutantInsultAjax: function(finalInsult) {
    $.post({
      url: "https://mutant-school.herokuapp.com/api/v1/mutants",
      headers: {
          "Content-Type": "application/json",
      },
      contentType: "application/json",
      data: JSON.stringify({
          "mutant": {
              "eligibility_begins_at": "-",
              "power": "-",
              "may_advise_beginning_at": "-",
              "eligibility_ends_at": "-",
              "real_name": "-",
              "mutant_name": finalInsult
          }
        })
    });
  }
});
