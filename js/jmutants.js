var jMutants = {
  init: function(listSelector) {
    this.setupList(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
  },

  setupList: function(selector) {
    this.studentList = $(selector);
  },

  setupTemplates: function() {
    this.studentListTemplate = $('.student.template').removeClass('template').detach();
  },

  setupEventListeners: function() {
    var doc = $(document);
    $('#load').on('click', this.loadStudents.bind(this));
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

  loadStudents: function(ev) {
    ev.preventDefault();
    this.loadStudentsAjax();
  },

  addStudent: function(student) {
    var li = this.buildListItem(student);
      this.studentList.append(li);
  },

  buildListItem: function(student) {
    var li = this.studentListTemplate.clone();
    li.find('.student-name').text(student.name);
    return li.attr('data-id', student.id).removeClass('hide');
  },

  // removeMutant: function(ev) {
  //   ev.preventDefault();
  //   this.deleteMutantAjax($(ev.currentTarget).closest('li').attr('data-id'));
  // },

}
