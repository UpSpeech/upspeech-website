#!/bin/bash

# UpSpeech - Bootstrap Script
# Clones all required repositories for development
# Run this from the upspeech-website directory after cloning it

set -e

echo "📦 UpSpeech Bootstrap"
echo ""
echo "This script will clone the remaining repositories into the parent directory."
echo ""

# Check if we're in the right directory
if [ ! -f "dev.sh" ]; then
  echo "❌ Error: This script must be run from the upspeech-website directory"
  echo "Please cd into upspeech-website and run ./bootstrap.sh"
  exit 1
fi

# Check if repos already exist in parent directory
if [ -d "../app-backend" ] && [ -d "../app-frontend" ] && [ -d "../upspeech-ai" ]; then
  echo "✅ All repositories already exist!"
  echo ""
  echo "Found:"
  echo "  • app-backend/"
  echo "  • app-frontend/"
  echo "  • upspeech-ai/"
  echo "  • upspeech-website/ (current)"
  echo ""
  echo "💡 Next steps:"
  echo "  1. ./dev.sh setup    # Initialize and start services"
  echo ""
  exit 0
fi

# Clone missing repositories
echo "Cloning repositories into parent directory..."
echo ""

if [ ! -d "../app-backend" ]; then
  echo "📦 Cloning app-backend..."
  (cd .. && git clone git@github.com:UpSpeech/app-backend.git)
else
  echo "✓ app-backend already exists"
fi

if [ ! -d "../app-frontend" ]; then
  echo "📦 Cloning app-frontend..."
  (cd .. && git clone git@github.com:UpSpeech/app-frontend.git)
else
  echo "✓ app-frontend already exists"
fi

if [ ! -d "../upspeech-ai" ]; then
  echo "📦 Cloning upspeech-ai..."
  (cd .. && git clone git@github.com:UpSpeech/upspeech-ai.git)
else
  echo "✓ upspeech-ai already exists"
fi

echo ""
echo "✅ All repositories cloned successfully!"
echo ""
echo "📁 Repository structure:"
echo "  parent-directory/"
echo "  ├── app-backend/"
echo "  ├── app-frontend/"
echo "  ├── upspeech-ai/"
echo "  └── upspeech-website/ (current)"
echo ""
echo "📋 Next steps:"
echo ""
echo "1️⃣  Configure environment variables:"
echo "    cp .env.docker.example .env.docker"
echo "    # Then edit .env.docker and set:"
echo "    #   • GROQ_API_KEY         (required for AI features)"
echo "    #   • RAILS_MASTER_KEY     (required for credentials)"
echo "    #   • SECRET_KEY_BASE      (required for sessions)"
echo ""
echo "2️⃣  Initialize and start services:"
echo "    ./dev.sh setup"
echo ""
echo "3️⃣  Verify everything is working:"
echo "    ./dev.sh health        # Check service status"
echo "    ./dev.sh env:check     # Validate environment variables"
echo ""
echo "💡 Run './dev.sh help' to see all available commands"
echo ""
