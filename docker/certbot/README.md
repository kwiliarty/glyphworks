Certbot things go here.

Here is a command that worked to issue the production certificates:

        docker-compose run --rm certbot certonly --webroot -w /var/www/certbot/ --email kevin.wiliarty@gmail.com --rsa-key-size 4096 --agree-tos

I had to make some adjustments, but these instructions were very helpful:

https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

I didn't run the script there, but I looked at what it was doing to figure out
the command above.
