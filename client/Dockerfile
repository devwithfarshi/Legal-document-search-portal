FROM node:20.18-alpine
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Accept build argument and set as environment variable for build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm run build
EXPOSE 4173
CMD ["pnpm", "preview", "--host", "0.0.0.0"]