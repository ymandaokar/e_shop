#!/bin/sh
echo "file generating..."
cat > /etc/nginx/conf.d/nginx.conf << EOF

upstream tofaapi {
    server $TOFA_API_SERVICE_HOST:$TOFA_API_SERVICE_PORT;
}
upstream couchapi {
    server  $COUCHDB_SERVICE_HOST:$COUCHDB_SERVICE_PORT;
}
server { 
    listen       80;
    access_log   /etc/nginx/conf.d/localhost.access.log  main;

    root  /var/www/sites/tofa;
    
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
        proxy_pass http://tofaapi/user;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /auth {
        proxy_pass http://tofaapi/auth;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /categories {
        proxy_pass http://tofaapi/categories;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

     location /productitems {
        proxy_pass http://tofaapi/productitems;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /organization {
        proxy_pass http://tofaapi/organization;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /invoice {
        proxy_pass http://tofaapi/invoice;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location /healthz {
        proxy_pass http://tofaapi/healthz;
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

    location ~ ^/db\/((ecart\\$|ecart%24)[^/]*)\/(_all_docs|_bulk_docs|_changes|_local|_design|_revs_diff|_bulk_get|_find)\/(.*)$ {
        proxy_pass http://couchapi/\$1/\$3/\$4\$is_args\$args;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location ~ ^/db\/((ecart\\$|ecart%24)[^/]*)\/(\$|_all_docs|_bulk_docs|_changes|_local|_design|_revs_diff|_bulk_get|_find)$ {
        proxy_pass http://couchapi/\$1/\$3\$is_args\$args;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_buffering off;
        proxy_pass_request_headers on;
    }

    location ~ ^/db\/((ecart\\$|ecart%24)[^/]*)\/([^\_].*)$ {
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
