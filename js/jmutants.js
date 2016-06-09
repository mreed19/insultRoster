var jMutants = {
  init: function(listSelector) {
    this.setupList(listSelector);
    this.setupTemplates();
    this.setupEventListeners();
  },

  setupList: function(selector) {
    this.mutantList = $(selector);
  },

  setupTemplates: function() {
    this.mutantListTemplate = $('.mutant.template').removeClass('template').detach();
  },

  setupEventListeners: function() {
    var doc = $(document);
    $('a[data-remote="true"]').on('click', function(ev) {
      ev.preventDefault();
      $.get({
        url: $(ev.currentTarget).attr('href'),
        dataType: 'jsonp',
        jsonpCallback: "callback",
        context: this,
        success: function(data) {
          var list = $('#test');
          if(data.students) {
            $.each(data.students, function(i, student) {
              list.append('<li>' + student.name + '</li>');
            });
          }
        }
      })
    }.bind(this));
    // $('form#mutant_form').on('submit', this.addMutantViaForm.bind(this));
    // $('#load').on('click', this.loadMutants.bind(this));
    // doc.on('click', '.mutant .edit', this.toggleEditable.bind(this));
    // doc.on('click', '.mutant .remove', this.removeMutant.bind(this));
    // doc.on('click', '.mutant .cancel', this.toggleEditable.bind(this));
    // doc.on('submit', '.mutant form', this.saveMutant.bind(this));
  },

  addMutantViaForm: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    this.createMutantAjax({
      mutant_name: f.mutantName.value,
      real_name: f.realName.value,
      power: f.power.value
    });
    f.reset();
    f.mutantName.focus();
  },

  loadMutants: function(ev) {
    ev.preventDefault();
    this.loadMutantsAjax();
  },

  addMutant: function(mutant, append) {
    var li = this.buildListItem(mutant);
    if (append) {
      this.mutantList.append(li);
    }
    else {
      this.mutantList.prepend(li);
    }
  },

  buildListItem: function(mutant) {
    var li = this.mutantListTemplate.clone();
    li.find('.mutant-name').text(mutant.mutant_name);
    li.find('.mutant-real-name').text('[' + mutant.real_name + ']');
    li.find('.mutant-power').text('(' + mutant.power + ')');
    return li.attr('data-id', mutant.id).removeClass('hide');
  },

  removeMutant: function(ev) {
    ev.preventDefault();
    this.deleteMutantAjax($(ev.currentTarget).closest('li').attr('data-id'));
  },

  toggleEditable: function(ev) {
    ev.preventDefault();
    var li = $(ev.currentTarget).closest('.mutant');
    var mutantName = li.find('.mutant-name .editable');
    var realName = li.find('.mutant-real-name .editable');
    var power = li.find('.mutant-power .editable');
    var f = li.find('form');
    if (f.hasClass('hide')) {
      mutantName.addClass('hide');
      realName.addClass('hide');
      power.addClass('hide');
      li.find('.actions').addClass('hide');
      f.removeClass('hide');
      f.find('input[name="mutantName"]').val(mutantName.text()).focus().select();
      f.find('input[name="realName"]').val(realName.text());
      f.find('input[name="power"]').val(power.text());
    }
    else {
      f.addClass('hide');
      mutantName.removeClass('hide');
      realName.removeClass('hide');
      power.removeClass('hide');
      li.find('.actions').removeClass('hide');
    }
  },

  saveMutant: function(ev) {
    ev.preventDefault();
    var li = $(ev.currentTarget).closest('.mutant');
    var f = li.find('form');
    this.toggleEditable(ev);
    this.editMutantAjax({
      mutant_name: f.find('input[name="mutantName"]').val(),
      real_name: f.find('input[name="realName"]').val(),
      power: f.find('input[name="power"]').val(),
      id: li.attr('data-id')
    });
    li.find('.mutant-name').text(f.find('input[name="mutantName"]').val());
    li.find('.mutant-real-name').text('[' + f.find('input[name="realName"]').val() + ']');
    li.find('.mutant-power').text('(' + f.find('input[name="power"]').val() + ')');
  },
}
