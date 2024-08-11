FROM nginx:latest

# Create static content directory and set ownership and permissions
RUN mkdir -p /usr/share/nginx/static && \
    chown -R nginx:nginx /usr/share/nginx/static && \
    chmod -R 750 /usr/share/nginx/static

# Copy your configuration and other necessary files
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports and other configurations
EXPOSE 80

# The default command for the nginx image is already set to start nginx, so no need to specify it explicitly
