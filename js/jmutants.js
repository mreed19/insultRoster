var jMutants = {
  init: function(listSelector) {
    this.setupList(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
    this.loadStudents();
  },

  setupList: function(selector) {
    this.studentSelect = $(selector);
  },

  setupTemplates: function() {
    this.studentOptionTemplate = $('.student.template').removeClass('template').detach();
  },

  setupEventListeners: function() {
    var doc = $(document);
    // $('#load').on('click', this.loadStudents.bind(this));
    // $('form#mutant_form').on('submit', this.addMutantViaForm.bind(this));
    // $('#load').on('click', this.loadMutants.bind(this));
    // doc.on('click', '.mutant .edit', this.toggleEditable.bind(this));
    // doc.on('click', '.mutant .remove', this.removeMutant.bind(this));
    // doc.on('click', '.mutant .cancel', this.toggleEditable.bind(this));
    // doc.on('submit', '.mutant form', this.saveMutant.bind(this));
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

  loadStudents: function() {
    // ev.preventDefault();
    this.loadStudentsAjax();
  },

  addStudent: function(student) {
    // debugger;
    var option = this.buildSelectOption(student);
    this.studentSelect.append(option);
  },

  buildSelectOption: function(student) {
    var option = this.studentOptionTemplate.clone();
    option.val(student.name);
    option.text(student.name);
    return option.removeClass('hide');
  },

  // removeMutant: function(ev) {
  //   ev.preventDefault();
  //   this.deleteMutantAjax($(ev.currentTarget).closest('li').attr('data-id'));
  // },

}
