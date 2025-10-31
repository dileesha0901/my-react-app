# HNB Bank Website

A simple single-page React website for Hatton National Bank (HNB) - designed for DevOps pipeline testing.

## Features

- Single-page React application
- Simple and clean design
- Responsive layout
- No external UI libraries (minimal dependencies)
- Docker support with multi-stage build

## Prerequisites

- Node.js v18 or higher (tested with Node v21)
- npm or yarn
- Docker (for containerized deployment)

## Installation

```bash
npm install
```

## Development

To start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Build

To create a production build:

```bash
npm run build
```

The build files will be generated in the `build` directory.

## Docker Deployment

Build the Docker image:

```bash
docker build -t hnb-bank-website .
```

Run the container:

```bash
docker run -p 80:80 hnb-bank-website
```

The application will be available at [http://localhost](http://localhost)

## Docker Multi-Stage Build

The Dockerfile uses a multi-stage build process:
1. **Stage 1 (Builder)**: Uses Node.js to install dependencies and build the React app
2. **Stage 2 (Serve)**: Uses Nginx to serve the static files from the build

This approach results in a smaller, more secure production image.

## Project Structure

```
.
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── Dockerfile
├── package.json
└── README.md
```

## Technologies Used

- React 18.2.0
- React Scripts 5.0.1
- Nginx (for Docker deployment)

## License

This is a demo project for DevOps pipeline testing.
