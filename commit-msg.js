#!/usr/bin/env node

'use strict';

var fs = require('fs');

var exec = require('child_process').exec
	var spawn = require('child_process').spawn

	var PATTERN = /^PT[A-Z]{5}-\d{1,5}\s+.+-?.+/;

var error = function (msg, color) {
	var color = color === undefined ? 1 : color;
	spawn('echo', ['-e', '\\033[3' + color + 'm ' + msg + ' \\033[0m'], {
		stdio : 'inherit'
	});
};

var validateMessage = function (message) {
	var isValid = true;

	var match = PATTERN.exec(message);

	if (!match) {

		// 妹砸，貌似你不按套路出牌，再看看是不是哪里写的不合要求

		var errorMsg = [
			'*******************Error******************',
			'兄dei，貌似你不按套路出牌，再看看是不是哪里写的不合要求．',
			'示例：PTENTOW-5619 热图优化-修复xxBug',
		].join('\n   ');
		
		error(errorMsg);
		error('你提交的是: \\c', 7);
		error(message, 3)
		return false;
	}

	return isValid;
};

var firstLineFromBuffer = function (buffer) {
	return buffer.toString().split('\n').shift();
};

// publish for testing
exports.validateMessage = validateMessage;

var commitMsgFile = process.argv[2];

console.log(commitMsgFile);
var incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

fs.readFile(
	commitMsgFile, function (err, buffer) {
	var msg = firstLineFromBuffer(buffer);

	if (!validateMessage(msg)) {
		process.exit(1);
	} else {
		process.exit(0);
	}
});
