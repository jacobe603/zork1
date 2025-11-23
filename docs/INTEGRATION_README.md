# ZORK I - Full Z-Machine Integration

## Overview

This directory contains **three versions** of the Zork I web experience:

### 1. **play.html** - RECOMMENDED: Full Integration (Best Experience)
**Complete Z-machine game with custom GUI**

- ✅ All 110+ authentic rooms from the 1983 original
- ✅ Custom GUI with compass navigation
- ✅ Real-time room detection and scene display
- ✅ Inventory tracking
- ✅ Command history (use ↑/↓ arrows)
- ✅ Quick command buttons
- ✅ Full text parser (try: "open mailbox", "take lamp", "go north")

**How it works:**
- Loads the complete Parchment Z-machine game in a hidden iframe
- Intercepts and displays game output in custom interface
- Routes compass buttons and text commands to the Z-machine
- Detects room changes via pattern matching
- Updates scene display with room-specific visuals

**To play:** Open `docs/play.html` in your browser

---

### 2. **index-integrated.html** - Alternative Integration
**Earlier integration prototype**

- Similar functionality to play.html
- Slightly different UI approach
- Useful for development/testing

**To play:** Open `docs/index-integrated.html` in your browser

---

### 3. **index.html** - Demo Version (Simplified)
**Proof of concept with ~9 manually converted rooms**

- Limited JavaScript-only version
- ~9 rooms (West of House, Forest areas, Kitchen)
- Demonstrates GUI concept
- No full game logic

**To play:** Open `docs/index.html` in your browser

---

## Quick Start

### Play the Full Game Now

```bash
# Option 1: Open the integrated version (RECOMMENDED)
open docs/play.html

# Option 2: Open the standalone Parchment version
open docs/zork1.z3.html
# (Also available at: COMPILED/zork1.z3.html)

# Option 3: Use a local web server (for GitHub Pages preview)
cd docs
python3 -m http.server 8000
# Then visit: http://localhost:8000/play.html
```

---

## File Structure

```
docs/
├── play.html                  # Main integrated version (RECOMMENDED)
├── play-integrated.js         # Integration logic for play.html
├── index-integrated.html      # Alternative integrated version
├── game-integrated.js         # Integration logic for index-integrated.html
├── index.html                 # Demo version (simplified)
├── game.js                    # Demo game logic
├── style.css                  # Shared styles
├── zork1.z3.html             # Z-machine game (copied for GitHub Pages)
└── INTEGRATION_README.md      # This file

COMPILED/
└── zork1.z3.html             # Z-machine game (original location)
```

---

## Features

### Room Detection
The integration automatically detects which room you're in by parsing the game output:

**Supported Rooms (70+ detected):**
- House exterior: West/North/South/East/Behind House
- Forest areas: Forest, Clearing, Up a Tree, Forest Path
- Canyon areas: Canyon View, Bottom, Rocky Ledge, End of Rainbow
- House interior: Kitchen, Living Room, Attic, Cellar
- Underground: Troll Room, Round Room, Loud Room, Maze rooms
- Dam complex: Dam, Reservoir, Frigid River, Maintenance Room
- Temple areas: Temple, Altar, Egyptian Room, Shrine
- And many more...

### GUI Controls

**Compass Navigation:**
- 8-direction compass: N, S, E, W, NE, NW, SE, SW
- UP/DOWN buttons for vertical movement
- Click buttons or type directions

**Text Input:**
- Full parser support - type any command
- Command history (↑/↓ arrow keys)
- Auto-focus for seamless typing

**Quick Commands:**
- 👁️ Look - Examine your surroundings
- 🎒 Inventory - Check what you're carrying
- 📊 Score - See your current score
- 💾 Save - Save your game
- 📂 Restore - Load saved game

### Visual Feedback

Each room displays:
- Room name with color coding
- Emoji representation (🏠, 🌲, 🏔️, etc.)
- Color-coded glow effects
- Status indicator

---

## How the Integration Works

### Architecture

```
┌─────────────────────────────────────┐
│  Custom GUI (play.html)             │
│  - Compass buttons                  │
│  - Scene display                    │
│  - Command input                    │
│  - Inventory panel                  │
└─────────┬───────────────────────────┘
          │
          │ JavaScript Bridge
          │ (play-integrated.js)
          │
┌─────────▼───────────────────────────┐
│  Hidden iframe                      │
│  - Loads: docs/zork1.z3.html        │
│  - Runs: Parchment Z-machine        │
│  - Executes: Authentic Zork I game  │
└─────────────────────────────────────┘
```

### Integration Flow

1. **Initialization:**
   - Load Parchment game in hidden iframe
   - Establish communication channel
   - Set up output monitoring

2. **Command Processing:**
   ```
   User input → Custom GUI → JavaScript → iframe input → Z-machine
   ```

3. **Output Handling:**
   ```
   Z-machine → iframe output → JavaScript parser → Custom GUI
   ```

4. **Room Detection:**
   - Monitor game output for room names
   - Match against room pattern database
   - Update scene display with room info
   - Apply color theme and emoji

5. **Inventory Tracking:**
   - Parse "You are carrying:" messages
   - Update inventory panel in real-time
   - Handle empty-handed state

---

## Technical Details

### Room Detection Patterns

The system uses text pattern matching to detect room changes:

```javascript
rooms = {
    'West of House': { emoji: '🏠', color: '#90EE90' },
    'Troll Room': { emoji: '👹', color: '#8B0000' },
    'Treasure Room': { emoji: '💰', color: '#FFD700' },
    // ... 70+ more rooms
}
```

When output contains "West of House", the GUI updates to show:
- Room name: "West of House"
- Emoji: 🏠
- Color theme: Light green (#90EE90)

### Command Routing

Commands are sent to the iframe game via DOM manipulation:

```javascript
// Find input in iframe
inputElement = iframeDoc.querySelector('input[type="text"]');

// Set command
inputElement.value = command;

// Trigger Enter key
enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
inputElement.dispatchEvent(enterEvent);
```

### Output Monitoring

The system polls the iframe every 300ms for new output:

```javascript
setInterval(() => {
    outputText = iframeDoc.querySelector('.Output').textContent;
    if (outputText.length > lastOutputLength) {
        newText = outputText.substring(lastOutputLength);
        processOutput(newText);
    }
}, 300);
```

---

## Limitations & Workarounds

### Browser Security (CORS)
**Issue:** Browsers may restrict iframe access if files aren't served from the same origin.

**Workaround:**
- Use a local web server (see Quick Start)
- Or configure browser to allow local file access
- Or host on GitHub Pages (recommended)

### Room Detection Coverage
**Issue:** Not all 110+ rooms have detection patterns yet.

**Current Status:** ~70 major rooms detected

**Future:** Add remaining rooms to `this.rooms` in JavaScript

### Inventory Parsing
**Issue:** Complex inventory messages may not parse perfectly.

**Workaround:** Use the "Inventory" quick button for accurate info

---

## Customization

### Adding More Rooms

Edit `play-integrated.js`:

```javascript
this.rooms = {
    'Your New Room': { emoji: '🎯', color: '#FF69B4' },
    // ... add more rooms
};
```

### Changing Colors/Themes

Edit `docs/style.css`:

```css
:root {
    --primary-color: #00ff00;  /* Change main color */
    --bg-color: #0a0a0a;       /* Change background */
}
```

### Adding Custom Commands

Edit the quick commands section in `play.html`:

```html
<button onclick="game.sendCommand('your command')">🎮 Custom</button>
```

---

## Troubleshooting

### Problem: Blank screen or "Loading..." forever
**Solution:**
- Ensure `docs/zork1.z3.html` exists (should be 3.6MB)
- Try opening with a local web server
- Check browser console for errors

### Problem: Commands don't work
**Solution:**
- Check that game has loaded (wait 2-3 seconds)
- Try clicking in the text input area
- Check browser console for errors
- Try the standalone version: `docs/zork1.z3.html`

### Problem: Room detection not working
**Solution:**
- Some rooms may not be in the pattern database yet
- Type "look" to refresh room detection
- Check that room name matches exactly in the JavaScript

### Problem: Inventory not updating
**Solution:**
- Type "inventory" manually to refresh
- Use the Inventory quick button
- Some items may use different text formats

---

## GitHub Pages Deployment

To host this on GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/docs`
   - Save

2. **Access URLs:**
   - Main game: `https://yourusername.github.io/zork1/play.html`
   - Demo: `https://yourusername.github.io/zork1/index.html`
   - Standalone: `https://yourusername.github.io/zork1/zork1.z3.html`

3. **Note:** GitHub Pages serves via HTTPS, so iframe access should work perfectly.

---

## Development

### Testing Changes

```bash
# Start local server
cd docs
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/play.html

# Watch for errors in browser console
# Test commands: north, south, take lamp, open mailbox
```

### Adding Debug Output

Add to `play-integrated.js`:

```javascript
console.log('Current room:', this.currentRoom);
console.log('Inventory:', this.inventory);
console.log('Last output:', this.lastOutputLength);
```

---

## Credits

- **Original Game:** Zork I (1983) by Infocom, Inc.
- **Z-Machine Interpreter:** Parchment by Dannii Willis
- **Custom GUI:** Modern web adaptation
- **Integration:** Full Z-machine + GUI bridge

---

## License

- Zork I is copyright © 1983 Infocom, Inc.
- Parchment is open source (MIT License)
- Custom GUI and integration code: MIT License

---

## Version History

- **v3.0** - Full Z-machine integration with play.html (comprehensive)
- **v2.0** - Initial integration with index-integrated.html
- **v1.0** - Demo version with manual room conversion

---

## Next Steps

**For Players:**
1. Open `docs/play.html` and start playing!
2. Try exploring: "north", "open mailbox", "take leaflet"
3. Full game available - discover all 110+ rooms

**For Developers:**
1. Add remaining room detection patterns
2. Enhance visual themes per room
3. Add room-specific images (replace emoji placeholders)
4. Improve inventory parsing for edge cases
5. Add save/restore state management
6. Create mobile-responsive layout

Enjoy your adventure in the Great Underground Empire! 🏰
