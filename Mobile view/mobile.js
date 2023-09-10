$(document).ready(function () {
	// Check for cookies on page load
	const successfulSubmissionCookie = getCookie("successful_submission");
	const popupClosedCookie = getCookie("popup_closed");
  
	if (successfulSubmissionCookie) {
	  console.log('Successful Submission Cookie Value:', successfulSubmissionCookie);
	  // If the successful_submission cookie is present, don't show the popup
	  return;
	}
  
	if (!popupClosedCookie) {
	  // Set a delay to show the modal if popup_closed cookie is not present
	  setTimeout(function () {
		console.log('Here after 5 seconds');
  
		// Show the modal
		$('.wrapper').css('visibility', 'visible');
	  }, 5000);
	}
  
	// Function to close the modal
	function closeModal() {
	  $('.close-icon').click(function () {
		// Hide the modal
		$('.wrapper').css('visibility', 'hidden');
  
		// Create a cookie to indicate the popup was closed
		createCookie("popup_closed", "true", 1);
		console.log('Popup Closed Cookie Value: true');
	  });
	}
  
	closeModal();
  
	// Form submission handling
	$('#subscriberForm').submit(function (event) {
	  event.preventDefault();
  
	  // Get the values of name and email
	  const name = $('#name').val();
	  const email = $('#email').val();
	  const checkbox = $('#checkbox').is(':checked');
  
	  if (name.trim() === '' || email.trim() === '' || !checkbox) {
		// Show error message
		$('.alert').text('One of the value is missing.').show();
	  } else {
		// Hide error message
		$('.alert').hide();
  
		// Create a cookie to indicate successful submission
		createCookie("successful_submission", "true", 1);
		console.log('Successful Submission Cookie Value: true');
  
		// Log the content of name and email
		console.log('Name:', name);
		console.log('Email:', email);
  
		// Close the modal after successful submission
		$('.wrapper').css('visibility', 'hidden');
	  }
	});
  
	// Function to create a cookie
	function createCookie(name, value, days) {
	  var expires = "";
	  if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	  }
	  document.cookie = name + "=" + value + expires + "; path=/";
	}
  
	// Function to get the content of a cookie
	function getCookie(name) {
	  const cookies = document.cookie.split(';');
	  for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.indexOf(name + "=") === 0) {
		  return cookie.substring(name.length + 1);
		}
	  }
	  return null;
	}
  });
  