'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

function createProjectDetails($details, data) {
	var detail = '<h2>{0}</h2><div class="summary"><img src="{2}" class="detailsImage">{1}</div>'.f(data.title, data.summary, data.image);
	$details.html(detail);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	e.preventDefault();
	var idNumber = projectID.substr('project'.length);
	var projectID = $(this).closest('.project').attr('id');
	var $details = $(this).siblings('.details');
	console.log($details);

	$.get('/project/' + idNumber, function (data) {
		createProjectDetails($details, data);
	});
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get('/palette', function (data) {
		var colors = data.colors.hex;

		$('body').css('background-color', colors[0]);
		$('.thumbnail').css('background-color', colors[1]);
		$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
		$('p').css('color', colors[3]);
		$('.project img').css('opacity', .75);
	})
}

String.prototype.format = String.prototype.f = function() {
	var s = this,
		i = arguments.length;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};