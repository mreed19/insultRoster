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
  }
});
