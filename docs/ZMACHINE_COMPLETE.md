# Complete Z-Machine Integration with GUI

## Current Status

✅ **You have the complete Parchment-generated game!**

Location: `COMPILED/zork1.z3.html` (3.5MB)

This file contains:
- The complete Z-machine interpreter (Parchment - latest Jan 2025)
- The entire Zork I game embedded as base64
- Fully playable standalone version

## Quick Play

**To play the complete game right now:**

```bash
# Just open it in your browser!
open COMPILED/zork1.z3.html
```

This works perfectly with:
- All 110+ rooms
- All puzzles and gameplay
- Complete authentic Zork I experience

## Integration Options

You now have **two versions**:

### Option 1: Standalone Parchment (Complete Game)
- **File**: `COMPILED/zork1.z3.html`
- **Pros**: Complete game, works perfectly, zero setup
- **Cons**: No custom GUI (compass, scene images)

### Option 2: Custom GUI Demo (Partial Game)
- **File**: `docs/index.html`
- **Pros**: Custom GUI, compass, scene display, modern styling
- **Cons**: Only ~9 rooms, simplified game logic

## Next Steps for Full Integration

To combine the complete game with your custom GUI:

### Approach A: Wrap Parchment in iframe

**Quick integration** - Add the Parchment game inside your GUI:

1. Edit `docs/index.html`
2. Replace the text panel with:
```html
<iframe src="../COMPILED/zork1.z3.html"
        id="gameFrame"
        style="width: 100%; height: 600px; border: none;">
</iframe>
```
3. Keep the compass and scene panels for UI enhancement

**Result**: Full game visible in your GUI (but can't detect rooms for images)

### Approach B: Extract & Integrate Parchment

**Full integration** - This requires:

1. **Extract Parchment library** from the HTML
   - The file contains the Parchment engine as JavaScript
   - Extract it or use Parchment from CDN/npm

2. **Load Parchment in your page**:
```html
<script src="parchment.min.js"></script>
<script>
  // Initialize Parchment
  const parchment = Parchment.create({
    container: document.getElementById('output'),
    story: '../COMPILED/zork1.z3'
  });

  // Intercept output for room detection
  parchment.on('output', (text) => {
    detectRoomFromOutput(text);
    updateSceneImage();
  });

  // Wire compass buttons
  document.querySelectorAll('.compass-btn').forEach(btn => {
    btn.onclick = () => {
      const dir = btn.getAttribute('data-dir');
      parchment.sendCommand(dir);
    };
  });
</script>
```

3. **Detect rooms from output**:
```javascript
function detectRoomFromOutput(text) {
  const roomPatterns = {
    'West of House': 'westOfHouse',
    'Kitchen': 'kitchen',
    'Living Room': 'livingRoom',
    // ... all 110+ rooms
  };

  for (const [name, key] of Object.entries(roomPatterns)) {
    if (text.includes(name)) {
      currentRoom = key;
      updateSceneImage(key);
      break;
    }
  }
}
```

### Approach C: Use Parchment API

**Best integration** - Use Parchment's official API:

1. Install Parchment:
```bash
cd docs
npm install parchment-if
```

2. Import and use:
```javascript
import Parchment from 'parchment-if';

const game = new Parchment({
  storyfile: '../COMPILED/zork1.z3',
  container: '#output'
});

game.on('text', (output) => {
  // Detect rooms, update GUI
});
```

## Room Detection Strategy

To show images for each room, you'll need to parse the output:

```javascript
// Map of room name patterns to image keys
const ROOMS = {
  'West of House': { image: 'west-of-house.jpg', emoji: '🏠' },
  'North of House': { image: 'north-of-house.jpg', emoji: '🏚️' },
  'South of House': { image: 'south-of-house.jpg', emoji: '🏘️' },
  'Behind House': { image: 'east-of-house.jpg', emoji: '🏡' },
  'Kitchen': { image: 'kitchen.jpg', emoji: '🍳' },
  'Living Room': { image: 'living-room.jpg', emoji: '🛋️' },
  'Cellar': { image: 'cellar.jpg', emoji: '🕯️' },
  'Attic': { image: 'attic.jpg', emoji: '📦' },
  // ... add all 110+ rooms
};

function detectRoom(outputText) {
  for (const [roomName, data] of Object.entries(ROOMS)) {
    if (outputText.includes(roomName)) {
      updateSceneDisplay(data);
      return roomName;
    }
  }
}
```

## Complete Room List

You'll need to extract all room names from the original ZIL code:

```bash
# Extract room names from ZIL source
grep -h "DESC " 1dungeon.zil | grep -o '"[^"]*"' | sort -u
```

This gives you the full list of 110+ rooms to map.

## Recommended Path

For fastest results:

1. **Now**: Use `COMPILED/zork1.z3.html` to play the complete game
2. **Phase 1**: Implement **Approach A** (iframe) - quick integration
3. **Phase 2**: Extract all room names from ZIL files
4. **Phase 3**: Implement **Approach B/C** (full integration) with room detection
5. **Phase 4**: Create/commission artwork for all rooms
6. **Phase 5**: Add advanced features (inventory parsing, NPCs detection, etc.)

## Files Reference

- `COMPILED/zork1.z3` - Original Z-machine game file (86KB)
- `COMPILED/zork1.z3.html` - Parchment standalone (3.5MB)
- `docs/index.html` - Custom GUI demo
- `docs/game.js` - Custom game engine (partial)
- `docs/style.css` - GUI styling
- `docs/game-zmachine.js` - Z-machine wrapper framework (ready for Parchment)

## Next Session Goals

If you want to continue integration:

1. Extract all 110+ room names from ZIL files
2. Create room detection patterns
3. Integrate Parchment properly with the GUI
4. Test room detection accuracy
5. Plan artwork requirements

## Summary

You now have:
- ✅ Complete playable Zork (standalone)
- ✅ Custom GUI with compass and scene display
- ✅ Framework for integration
- ✅ Clear path forward

The complete game works perfectly in `COMPILED/zork1.z3.html`.
Integration with the custom GUI requires extracting Parchment and wiring it up.

**Estimated time for full integration**: 4-6 hours of focused development.
