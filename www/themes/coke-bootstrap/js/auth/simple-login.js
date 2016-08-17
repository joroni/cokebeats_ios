define( [ 'jquery', 'core/theme-app', 'core/modules/authentication' ], function( $, App, Auth ) {

	/**
	 * User authentication theme module example that implements a "Simple login/logout form"
	 * displayed under the topbar of app's theme.
	 *
	 * When the user clicks the "Login" button, a minimalist login form comes up.
	 * When the user has logged in, a "Log out" button appears, and user connection
	 * state info is displayed next to it, along with a link to the user page.
	 *
	 * Login/logout are handled with the WP-AppKit Authentication API.
	 */

	/**
	 * Define HTML for our login form wrapper, insert it into DOM just after the feedback <div>,
	 * then memorize a jQuery reference to it.
	 */
	//$( '<div class="clearfix"><div class="clearfix pull-right" id="user-info"></div></div>' ).insertAfter( '#feedback' );
	$( '<div class="clearfix"><div class="clearfix pull-left" id="user-info"></div></div>' ).insertBefore( '#app-menu' );
	var $user_info = $('#user-info');

	/**
	 * Function that handles the login/logout form display depending on
	 * whether the user is logged in or not.
	 */
	var update_login_info = function() {

		var current_user = Auth.getCurrentUser();

		if ( current_user ) {
			//User logged in : display user info and logout button :
			$user_info.html( 'Logged in as <a href="#user-page">'+ current_user.login +'</a> <button type="button" class="btn btn-danger" id="logout">Log out</button>');
		} else {
			//User not logged in : display the login button :
			$user_info.html( '<button type="button" class="btn btn-info" id="login" data-toggle="modal" data-target="#myModal">Log in</button>' );
		}

	};

	/**
	 * Update the login/logout display as soon as the theme is loaded,
	 * so that it displays correctly according user connection state
	 */
	update_login_info();

	/**
	 * Update the login/logout display at user login and logout
	 */
	App.on( 'info', function( info ) {
		switch( info.event ) {
			case 'auth:user-login':
			case 'auth:user-logout':
				update_login_info();
				break;
		}
	} );

	/**
	 * Make the login form appear when clicking the "Log in" button
	 */
	$( $user_info ).on( 'click', '#login', function( e ) {
		e.preventDefault();
		$user_info.html(


			'<div class="modal fade bd-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
			'<div class="modal-dialog" role="document">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
      '<h4 class="modal-title" id="myModalLabel">Log in</h4>'+
    	'</div>' +
      '<div class="modal-body">' +
						'<div class="form-group">'+
							 '<label for="userlogin">ID</label>'+
							 '<input id="userlogin" type="text" class="form-control">'+
						 '</div>'+
			 		 		'<div class="form-group">'+
							 '<label for="userpass">Password:</label>'+
							 '<input id="userpass" type="password" class="form-control">'+
						 '</div>'+
						 '<button  id="go-login" type="submit" class="btn btn-info">Submit</button>'+
						 /*
					'<input id="userlogin" placeholder="Login" clas="form-control" type="text" >' +
					'<input id="userpass" placeholder="Password" clas="form-control" type="password" >' +
					'<button type="button" class="btn btn-info" id="go-login">Log in</button>' +*/
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>'
		);
	} );

	/**
	 * Log the user in when submiting the login form
	 */
	$( $user_info ).on( 'click', '#go-login', function( e ) {
		e.preventDefault();
		Auth.logUserIn(
			$('#userlogin').val(),
			$('#userpass').val()
		);
	} );

	/**
	 * Log the user out when clicking the "Log out" button
	 */
	$( $user_info ).on( 'click', '#logout', function( e ) {
		e.preventDefault();
		Auth.logUserOut();
	} );

} );
