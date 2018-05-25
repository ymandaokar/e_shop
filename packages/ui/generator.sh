#!/bin/sh
echo "file generating..."
cat > /etc/nginx/conf.d/nginx.conf << EOF

upstream surveyapi {
    server $SURVEY_API_SERVICE_HOST:$SURVEY_API_SERVICE_PORT;
}
upstream couchapi {
    server  $COUCHDB_SERVICE_HOST:$COUCHDB_SERVICE_PORT;
}
server { 
    listen       80;
    access_log   /etc/nginx/conf.d/localhost.access.log  main;

    root  /var/www/sites/survey;
    
    index index.html;

    location ~* \.(?:ico|css|js|gif|jpe?g|png|json|ttf)$ {
       expires 30d;
       add_header Pragma public;
       add_header Cache-Control "public";
    }

    location / {    
        try_files \$uri \$uri/ index.html 404;
        include fastcgi_params;
    }

    location /user {
        proxy_pass http://surveyapi/user;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /auth {
        proxy_pass http://surveyapi/auth;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /trigger {
        proxy_pass http://surveyapi/trigger;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

     location /survey {
        proxy_pass http://surveyapi/survey;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /published {
        proxy_pass http://surveyapi/published;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /thumbnail {
        proxy_pass http://surveyapi/thumbnail;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /response {
        proxy_pass http://surveyapi/response;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /validateuserlocation {
        proxy_pass http://surveyapi/validateuserlocation;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /validatesurveytime {
        proxy_pass http://surveyapi/validatesurveytime;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /providers {
        proxy_pass http://surveyapi/providers;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /validate {
        proxy_pass http://surveyapi/validate;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /media {
        proxy_pass http://surveyapi/media;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /clientimage {
        proxy_pass http://surveyapi/clientimage;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /sharedContent {
        proxy_pass http://surveyapi/sharedContent;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /toJSON {
        proxy_pass http://surveyapi/toJSON;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /invite {
        proxy_pass http://surveyapi/invite;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /healthz {
        proxy_pass http://surveyapi/healthz;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /db/_ {
        return 404;
    }

    location ~ ^/db\/((survey\\$|survey%24)[^/]*)\/(_all_docs|_bulk_docs|_changes|_local|_design|_revs_diff|_bulk_get|_find)\/(.*)$ {
        proxy_pass http://couchapi/\$1/\$3/\$4\$is_args\$args;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location ~ ^/db\/((survey\\$|survey%24)[^/]*)\/(\$|_all_docs|_bulk_docs|_changes|_local|_design|_revs_diff|_bulk_get|_find)$ {
        proxy_pass http://couchapi/\$1/\$3\$is_args\$args;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location ~ ^/db\/((survey\\$|survey%24)[^/]*)\/([^\_].*)$ {
        proxy_pass http://couchapi/\$1/\$3\$is_args\$args;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }
}
gzip on;
gzip_proxied any;
gzip_disable "msie6";
gzip_vary on;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss application/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;


EOF

echo "file generated."

nginx -g 'daemon off;'
