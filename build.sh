#!/bin/bash
echo "Installing dependencies..."
cd FRONTEND
npm install
echo "Building frontend..."
npm run build
cd ../BACKEND
echo "Installing backend dependencies..."
npm install