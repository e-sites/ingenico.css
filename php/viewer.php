<?php

// Set some defaults
$sTemplate = 'clean';
$sContent = '';
$sReplace = '$$$PAYMENT ZONE$$$';
$sFile = 'index';
$aViews = array(
	'bancontact',
	'giropay',
	'ideal',
	'mastercard',
	'visa',
	'waitmsg'
);

// Handle given view
if (!empty($_GET['v']) && in_array($_GET['v'], $aViews)) {
	$sFile = $_GET['v'];
}

// Fetch view
if (file_exists('../views/' . $sFile . '.html')) {
	$sView = file_get_contents('../views/' . $sFile . '.html');
}

// Fetch template and parse view
if (file_exists('../templates/' . $sTemplate . '.html')) {
	$sTemplate = file_get_contents('../templates/' . $sTemplate . '.html');
	$sTemplate = str_replace($sReplace, $sView, $sTemplate);
}

// Clean HTML by removing script tags
$sTemplate = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $sTemplate);

// Return output
echo $sTemplate;