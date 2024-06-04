fx_version 'cerulean'
game 'gta5'

author 'Level5 Dev'
version '1.0 -release'


client_script {
    'client/client.lua',
}

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/css/*.css',
	'html/js/*.js',
}

server_script {
}

shared_scripts {
    "@ox_lib/init.lua",  
} 

escrow_ignore {
    'client/client.lua',
}


lua54 'yes'