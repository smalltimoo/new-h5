
set timeout 30
spawn scp dist/favicon.ico root@192.168.0.168:/root/tomcat/mobileVueD_tomcat/webapps/ROOT
expect "password:"
send "snow123\r"
interact

set timeout 30
spawn scp dist/index.html root@192.168.0.168:/root/tomcat/mobileVueD_tomcat/webapps/ROOT
expect "password:"
send "snow123\r"
interact

set timeout 30
spawn scp -r dist/static root@192.168.0.168:/root/tomcat/mobileVueD_tomcat/webapps/ROOT
expect "password:"
send "snow123\r"
interact
