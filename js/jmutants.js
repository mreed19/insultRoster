var jMutants = {
  init: function(options) {
    this.setupSelect(options.selectSelector);
    this.setupList(options.listSelector);
    this.setupTemplates();
    this.setupEventListeners();
    this.loadStudents();
  },

  setupSelect: function(selector) {
    this.studentSelect = $(selector);
  },

  setupList: function(selector) {
    this.insultList = $(selector);
  },

  setupTemplates: function() {
    this.studentOptionTemplate = $('.student.template').removeClass('template').detach();
    this.insultListTemplate = $('.insult.template').removeClass('template').detach();
  },

  setupEventListeners: function() {
    var doc = $(document);
    $('form#insult_form').on('submit', this.addInsult.bind(this));
  },

  addInsult: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    this.insultList.append(this.buildListItem({
      studentName: $(f.student_select.selectedOptions).val(),
      starterInsult:f.insult_starter.value,
      insult: f.insult_select.value,
      additionalInsult: f.insult_additional.value
    }));
  },

  buildListItem: function(insult) {
    var li = this.insultListTemplate.clone();
    var finalInsult;

    if(insult.starterInsult && insult.additionalInsult) {
      finalInsult = insult.studentName + ' ' + insult.starterInsult + ' and ' + insult.additionalInsult + '.';
      li.find('.student-name').text(finalInsult);
    }
    else if(insult.starterInsult) {
      finalInsult = insult.studentName + ' ' + insult.starterInsult + '.';
      li.find('.student-name').text(finalInsult);
    }
    else if(insult.insult && insult.additionalInsult) {
      finalInsult = insult.studentName + ' ' + insult.insult + ' and ' + insult.additionalInsult + '.';
      li.find('.student-name').text(finalInsult);
    }
    else {
      finalInsult = insult.studentName + ' ' + insult.insult + '.';
      li.find('.student-name').text(finalInsult);
    }
    // jQuery.ajax({
    //     url: "https://mutant-school.herokuapp.com/api/v1/mutants",
    //     type: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     contentType: "application/json",
    //     data: JSON.stringify({
    //         "mutant": {
    //             "eligibility_begins_at": "-",
    //             "power": "-",
    //             "may_advise_beginning_at": "-",
    //             "eligibility_ends_at": "-",
    //             "real_name": "-",
    //             "mutant_name": finalInsult
    //         }
    //     })
    // });

    return li.removeClass('hide');
  },

  loadStudents: function() {
    this.loadStudentsAjax();
  },

  addStudentToSelect: function(student) {
    var option = this.buildSelectOption(student);
    this.studentSelect.append(option);
  },

  buildSelectOption: function(student) {
    var option = this.studentOptionTemplate.clone();
    option.val(student.name);
    option.text(student.name);
    return option.removeClass('hide');
  },

}
