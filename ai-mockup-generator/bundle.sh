#!/bin/bash
# Bundle AI Mockup Generator into single HTML file for Google AI Studio

cd "$(dirname "$0")"

# Build if dist doesn't exist
if [ ! -d "dist" ]; then
  echo "Building app..."
  npm run build
fi

# Get file contents
CSS=$(cat dist/assets/index-*.css)
JS=$(cat dist/assets/index-*.js)

# Create single bundled HTML file
cat > ai-mockup-bundle.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="theme-color" content="#09090b">
  <title>AI Mockup Generator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
HTMLEOF

echo "$CSS" >> ai-mockup-bundle.html

cat >> ai-mockup-bundle.html << 'HTMLEOF'
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
HTMLEOF

echo "$JS" >> ai-mockup-bundle.html

cat >> ai-mockup-bundle.html << 'HTMLEOF'
  </script>
</body>
</html>
HTMLEOF

echo "✅ Created: ai-mockup-bundle.html ($(du -h ai-mockup-bundle.html | cut -f1))"
echo "📤 Upload this single file to Google Drive / AI Studio"
