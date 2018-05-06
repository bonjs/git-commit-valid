#!/usr/bin/env node

'use strict';

var fs = require('fs');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var gitEmail = spawn('git', ['config', 'user.email']);
gitEmail.stdout.on('data', function (data) {
	var email = firstLineFromBuffer(data);
	
	var commitMsgFile = process.argv[2];

	var incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

	fs.readFile(
		commitMsgFile, function (err, buffer) {
		var message = firstLineFromBuffer(buffer);

		if (!validateMessage(message)) {

			var address = function() {
				if(email.match(/\b(?:observable|alex)\b/)) {
					return '兄dei';
				} else {
					return '妹砸';
				}
			}();
			
			var errorMsg = [
				'******************************* Error *******************************',
				address + '，貌似你不按套路出牌，再看看是不是哪里写的不合要求．',
				'示例：PTENTOW-5619 热图优化-修复xxBug',
			].join('\n   ');
			
			error(errorMsg);
			error('   你提交的是: \\c', 7);
			error(message, 3)
			
			process.exit(1);
		} else {
			process.exit(0);
		}
	});
	
});

	
var error = function (msg, color) {
	var color = color === undefined ? 1 : color;
	spawn('echo', ['-e', '\\033[3' + color + 'm' + msg + '\\033[0m'], {
		stdio : 'inherit'
	});
};

var validateMessage = function () {
	
	var reg = /^PT[A-Z]{5}-\d{1,5}\s+.+-?.+/;
	return function(message) {
		return reg.test(message);
	};
}();

var firstLineFromBuffer = function (buffer) {
	return buffer.toString().match(/.*/)[0];
};

// publish for testing
exports.validateMessage = validateMessage;


