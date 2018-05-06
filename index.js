/*#!/bin/sh

rm -f ./.git/hooks/commit-msg

ln -s ../../commit-msg.js ./.git/hooks/commit-msg
*/

var exec = require('child_process').exec

exec('rm -f ./.git/hooks/commit-msg')
exec('ln -s ../../commit-msg.js ./.git/hooks/commit-msg')

