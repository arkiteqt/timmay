#!/bin/bash

# Start api in the background
cd api && npm start &

# Start ui in the background
cd ui && npm start &

# Wait for both services to start 
# (replace with appropriate checks)
wait

echo "Both services are running!"