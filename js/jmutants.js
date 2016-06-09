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
    // $('#load').on('click', this.loadMutants.bind(this));
    // doc.on('click', '.mutant .remove', this.removeMutant.bind(this));
  },

  // addMutantViaForm: function(ev) {
  //   ev.preventDefault();
  //   var f = ev.currentTarget;
  //   this.createMutantAjax({
  //     mutant_name: f.mutantName.value,
  //     real_name: f.realName.value,
  //     power: f.power.value
  //   });
  //   f.reset();
  //   f.mutantName.focus();
  // },

  addInsult: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    this.insultList.append(this.buildListItem({
      studentName: $(f.student_select.selectedOptions).val()
    }));
  },

  buildListItem: function(insult) {
    var li = this.insultListTemplate.clone();
    li.find('.student-name').text(insult.studentName);
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
