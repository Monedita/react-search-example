

# Stage 1: construir la aplicación
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV CI=true
RUN pnpm install --frozen-lockfile && pnpm run build

# Stage 2: serve static files with nginx
FROM nginx:1.29.6-alpine-slim AS production
RUN apk update && apk upgrade
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
