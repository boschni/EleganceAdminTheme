/**
 * ProcessWire Admin Theme jQuery/Javascript
 *
 * Copyright 2012 by Ryan Cramer
 *
 */

var ProcessWireAdminTheme = {

	/**
	 * Initialize the default ProcessWire admin theme
	 *
	 */
	init: function() {
		this.setupCloneButton();
		this.setupButtonStates();
		this.setupFieldFocus();

		if ($.fn.tooltip) {
			this.setupTooltips();
		}

		$('#content').removeClass('fouc_fix'); // FOUC fix
		this.browserCheck();
	},

	/**
	 * Enable jQuery UI tooltips
	 *
	 */
	setupTooltips: function() {
		$("a.tooltip").tooltip({
			position: {
				my: "center bottom-20",
				at: "center top",
				using: function(position, feedback) {
					$(this).css(position);
					$("<div>")
						.addClass("arrow")
						.addClass(feedback.vertical)
						.addClass(feedback.horizontal)
						.appendTo(this);
				}
			}
		}).hover(function() {
			$(this).addClass('ui-state-hover');
		}, function() {
			$(this).removeClass('ui-state-hover');
		});
	},

	/**
	 * Clone a button at the bottom to the top
	 *
	 */
	setupCloneButton: function() {
		// if there are buttons in the format "a button" without ID attributes, copy them into the masthead
		// or buttons in the format button.head_button_clone with an ID attribute.
		// var $buttons = $("#content a[id=] button[id=], #content button.head_button_clone[id!=]");
		var $buttons = $("#content a:not([id]) button:not([id]), #content button.head_button_clone[id!=]");

		// don't continue if no buttons here or if we're in IE
		if($buttons.size() == 0 || $.browser.msie) return;

		var $head = $("<div id='head_button'></div>").appendTo("#content .container").show();
		$buttons.each(function() {
			var $t = $(this);
			var $a = $t.parent('a');
			if($a.size()) {
				$button = $t.parent('a').clone();
				$head.append($button);
			} else if($t.is('.head_button_clone')) {
				$button = $t.clone();
				$button.attr('data-from_id', $t.attr('id')).attr('id', $t.attr('id') + '_copy');
				$a = $("<a></a>").attr('href', '#');
				$button.click(function() {
					$("#" + $(this).attr('data-from_id')).click(); // .parents('form').submit();
					return false;
				});
				$head.append($a.append($button));
			}
		});
	},

	/**
	 * Make buttons utilize the jQuery button state classes
	 *
 	 */
	setupButtonStates: function() {
		// jQuery UI button states
		$(".ui-button").hover(function() {
			$(this).removeClass("ui-state-default").addClass("ui-state-hover");
		}, function() {
			$(this).removeClass("ui-state-hover").addClass("ui-state-default");
		}).click(function() {
			$(this).removeClass("ui-state-default").addClass("ui-state-active").effect('highlight', {}, 500);
		});

		// make buttons with <a> tags click to the href of the <a>
		$("a > button").click(function() {
			window.location = $(this).parent("a").attr('href');
		});
	},

	/**
	 * Make the first field in any forum have focus, if it is a text field
	 *
	 */
	setupFieldFocus: function() {
		// add focus to the first text input, where applicable
		jQuery('#content input[type=text]:visible:enabled:first:not(.hasDatepicker)').each(function() {
			var $t = $(this);
			if(!$t.val() && !$t.is(".no_focus")) $t.focus();
		});

	},

	/**
	 * Give a notice to IE versions we don't support
	 *
	 */
	browserCheck: function() {
		if($.browser.msie && $.browser.version < 8)
			$("#content .container").html("<h2>ProcessWire does not support IE7 and below at this time. Please try again with a newer browser.</h2>").show();
	}

};


$(document).ready(function() {
	ProcessWireAdminTheme.init();
});
