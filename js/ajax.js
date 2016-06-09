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

  loadMutantsAjax: function() {
    $.get({
      url: 'https://mutant-school.herokuapp.com/api/v1/mutants',
      success:  function(mutants) {
        $.each(mutants, function(i, mutant) {
          this.addMutant(mutant, true);
        }.bind(this));
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

  editMutantAjax: function(mutant) {
    $.ajax({
      url: "https://mutant-school.herokuapp.com/api/v1/mutants/" + mutant.id,
      method: "PUT",
      data: {
        mutant: mutant
      },
    });
  }
});
