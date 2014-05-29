$(function() {

	$('#topnav a').smoothScroll();

	$('.checkthemall').checkThemAll();

	$('#hook_demo').checkThemAll({
		onSlaveCheckAfter: function(container, element, options) {
			var msg = 'You checked Slave Element: ' + element.next('label').html();
			var console_item = $('<p class="slave check" />').html(msg);
			container.find('.console').prepend(console_item);
			setTimeout(function() { console_item.fadeOut() }, 5000)
		},
		onMasterCheckAfter: function(container, element, options) {
			var msg = 'You checked Master Element: ' + element.next('label').html();
			var console_item = $('<p class="master check" />').html(msg);
			container.find('.console').prepend(console_item);
			setTimeout(function() { console_item.fadeOut() }, 5000)
		},
		onSlaveUncheckAfter: function(container, element, options) {
			var msg = 'You unchecked Slave Element: ' + element.next('label').html();
			var console_item = $('<p class="slave uncheck" />').html(msg);
			container.find('.console').prepend(console_item);
			setTimeout(function() { console_item.fadeOut() }, 5000)
		},
		onMasterUncheckAfter: function(container, element, options) {
			var msg = 'You unchecked Master Element: ' + element.next('label').html();
			var console_item = $('<p class="master uncheck"/>').html(msg);
			container.find('.console').prepend(console_item);
			setTimeout(function() { console_item.fadeOut() }, 5000)
		}
	});

	$('#hook_demo2').checkThemAll({
		onMasterCheckAfter: function(container, element, options) {
			container.find('.slave-checkbox').each(function() {
				$(this).attr('disabled', 'disabled');
				$(this).next('label').attr('disabled', 'disabled').css('color', '#ccc');
			});
		},
		onMasterUncheckAfter: function(container, element, options) {
			container.find('.slave-checkbox').each(function() {
				$(this).removeAttr('disabled');
				$(this).next('label').removeAttr('disabled').css('color', '#000000');
			});
		}
	});
	
});

