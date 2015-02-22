(function(){

  var rsvp = $('#rsvp');
        
  // After loading the form from rails, turn it into an AJAX form
  var rsvpFormSetup = function(data) {
    
    // setup variables
    var container = $('#rsvp-form ').append(data),
        form = container.find('form'),
        success_message = $('#rsvp-success-message'),
        error_message = $('#rsvp-error-message'),
        pluses_field = form.find('#response_plusses'),
        plus_container = pluses_field.parent(),
        plus_tmpl = $('<div class="plus-one"><input type="text" placeholder="Name of Plus One"/><a href="#" class="remover button"></a></div>'),
        plus_adder = $('<a href="#" class="plus-adder pull-right button">Add <span></span> plus one</a>').click(function(e) {
          e.stopPropagation();
          e.preventDefault();
          var plusOne = plus_tmpl.clone(true).hide();
          plus_adder.before(plusOne);
          plusOne.slideDown();
        });

    var rsvpFormSuccess = function(e, d) {
          container.html(success_message);
        },
        rsvpFormErr = function(e, d) {
          container.html(error_message);
        };

    // Setup Form
      // Keep clicking on the form (or children) from propagating to the mfp wrapper
      form.submit(function(e) {
        e.preventDefault();
        if (form.valid()) {
          pluses_field.trigger('update-value');
          $.ajax({
            method: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') },
            success: rsvpFormSuccess,
            error: rsvpFormErr,
          });
        } else {
          console.log('invalid form');
        }
      });

      // Setup form validation
      form.validate();




    // Setup Fields
      // hide static pluses field
      pluses_field.hide();
      // add "Add {} Plus One" button
      plus_container.prepend(plus_adder);
      // OnChange, update pluses_field value
      pluses_field.on('update-value', function() {
        var arr = []
        form.find('.plus-one input').each(function() {
          arr.push($(this).val());
        });
        $(this).val(JSON.stringify(arr));
      });
      // Setup remover button
      plus_tmpl.find('a.remover').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().slideUp(400, function() {
          $(this).remove();
        });
      });
  };

  $.ajax({
    url: "/responses/new",
    success: rsvpFormSetup
  });
  rsvp.magnificPopup({
    type: 'inline',
  });
  if (window.location.hash.substr(1) === 'rsvp') {
    rsvp.magnificPopup('open');
  }

  // Set options for jQuery Validator
  $.extend($.validator.messages, {
    required: "!",
    remote: "Please fix this field.",
    email: "@",
    url: ".com",
    date: "mm/dd/yyyy",
    dateISO: "mm/dd/yyyy",
    number: "#",
    digits: "#",
    creditcard: "Credit Card #",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("< {0}"),
    minlength: jQuery.validator.format("> {0}"),
    rangelength: jQuery.validator.format("between {0} and {1} letters long"),
    range: jQuery.validator.format("between {0} and {1}"),
    max: jQuery.validator.format("< {0}"),
    min: jQuery.validator.format("> {0}")
  });

})();
