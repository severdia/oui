#!/bin/sh

# Exit this script immediately if a command fails.
set -e

# Set colors for the outputted messages.
# http://stackoverflow.com/a/5947802
GREEN='\033[1;32m'
NC='\033[0m'

echo "${GREEN}[OUI DOCS]: Building documentation to deploy...${NC}"

# Run the following commands with a production flag turned on.
export NODE_ENV=production

# Build the documentation first.
npm run docs:build

# Documentation folder exists on the design-dot server. This is a pre-requisite
# for symlinking files in design.optimizely.com/docs/oui to a different
# location on the system. The symlinking is the non-OUI documentation part of
# design.optimizely.com lives in a separate repository and is deployed on a
# separate cadence.
ssh -t ubuntu@design.optimizely.com "mkdir -p /var/www/design-dot/docs"

# Symlink to the OUI documentation source so that the URL looks like
# design.optimizely.com/docs/oui but the files can live outside that folder.
ssh -t ubuntu@design.optimizely.com "rm -f /var/www/design-dot/docs/oui && ln -s /var/www/oui /var/www/design-dot/docs/oui"

echo "${GREEN}[OUI DOCS]: Uploading documentation to design.optimizely.com.${NC}"

# Use rsync to upload
rsync -rv --rsync-path="mkdir -p /var/www/oui/$(node -e "console.log(require('./package.json').version);") && rsync" --delete ./dist/docs/oui/$(node -e "console.log(require('./package.json').version);")/ ubuntu@design.optimizely.com:/var/www/oui/$(node -e "console.log(require('./package.json').version);")

# Update design.optimizely.com/docs/oui/latest to point to the folder
# containing the version of OUI that is being deployed. This is the URL
# used by go/oui.
ssh -t ubuntu@design.optimizely.com "sudo sed -i \"/Redirect 302 \/docs\/oui\/latest/c Redirect 302 \/docs\/oui\/latest \/docs\/oui\/$(node -e "console.log(require('./package.json').version);")\" /etc/apache2/sites-available/design-dot.conf"

# Restart Apache for the redirect to take effect.
ssh -t ubuntu@design.optimizely.com "sudo service apache2 reload"

echo "${GREEN}[OUI DOCS]: Deployment Succeeded!${NC}"
