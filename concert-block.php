<?php
/**
 * Plugin Name: Concert Review Block
 * Description: Adds a Concert Review block to the new WordPress editor.
 * Text Domain: concert-block
 * Version: 0.1.0
 *
 * @package concert-block
 */

// Add stylesheet to Front-end and Gutenberg editor.
add_action( 'init', function() {
	wp_enqueue_style(
		'concert-block',
		plugins_url( 'style.css', __FILE__ ),
		[],
		'0.1.0'
	);
} );

// Provide the concert block to Gutenberg.
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script(
		'concert-block',
		plugins_url( 'block.build.js', __FILE__ ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore' ],
		'0.1.0'
	);
} );

