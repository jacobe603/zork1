# ZORK I - Web Edition (Proof of Concept)

A modern web-based adaptation of the classic text adventure game ZORK I, featuring a graphical user interface and support for scene images.

## Features

✅ **Extracted from Original ZIL Source** - Game data ported directly from the 1983 ZIL files
✅ **Graphical User Interface** - Modern web interface with retro aesthetic
✅ **Compass Navigation** - Visual compass rose for easier movement
✅ **Scene Image Support** - Dedicated area for room illustrations
✅ **Text Parser** - Classic command-line style interaction
✅ **Inventory System** - Visual inventory display
✅ **Playable Demo** - Includes 9 interconnected rooms around the White House

## How to Play

1. **Open the game**: Simply open `index.html` in any modern web browser
2. **Navigate**: Use compass buttons or type directions (north, south, east, west, ne, nw, se, sw)
3. **Interact**: Type commands like:
   - `look` - Examine your surroundings
   - `examine [object]` - Look at something closely
   - `take [object]` - Pick up an item
   - `open [object]` - Open containers
   - `inventory` - Check what you're carrying
   - `read [object]` - Read readable items

## Included Rooms

The demo includes these areas from the original game:

- **West of House** - Starting location with the iconic white house
- **North of House** - North side with boarded windows
- **South of House** - South side of the house
- **Behind House** - East side with a small window
- **Forest** - Multiple forest locations
- **Forest Path** - Path through the trees
- **Clearing** - Open areas in the forest
- **Grating Clearing** - Location with the grating

## Adding Scene Images

To add custom artwork for each room:

1. Create images for each scene (recommended size: 800x600px or 4:3 aspect ratio)
2. Save images in a `images/` subdirectory with these filenames:
   - `west-of-house.jpg`
   - `north-of-house.jpg`
   - `south-of-house.jpg`
   - `east-of-house.jpg`
   - `forest.jpg`
   - `path.jpg`
   - `clearing.jpg`

3. Update the CSS in `style.css` to load images:

```css
.scene-image[data-room="westOfHouse"] {
    background-image: url('images/west-of-house.jpg');
    background-size: cover;
    background-position: center;
}

.scene-image[data-room="northOfHouse"] {
    background-image: url('images/north-of-house.jpg');
    background-size: cover;
    background-position: center;
}

/* Add more room backgrounds as needed */
```

4. Or modify `game.js` to dynamically load images based on the `room.image` property.

## Architecture

### Files

- **index.html** - Main HTML structure and UI layout
- **style.css** - Retro/modern hybrid styling with green terminal aesthetic
- **game.js** - Complete game engine including:
  - Room database (extracted from `1dungeon.zil`)
  - Object database
  - Text parser
  - Game state management
  - UI updates

### Game Engine

The JavaScript engine implements:

- **Room System**: Rooms with descriptions, exits, and objects
- **Parser**: Interprets natural language commands
- **Inventory**: Player can carry and use objects
- **Object Interaction**: Open, close, examine, take, drop, read
- **Navigation**: 8-direction movement with blocked exits
- **State Management**: Tracks game progress and score

## Extending the Game

To add more content:

1. **Add Rooms**: Edit the `this.rooms` object in `game.js`
2. **Add Objects**: Edit the `this.objects` object in `game.js`
3. **Add Commands**: Extend the `processCommand()` method
4. **Add Puzzles**: Create new interaction logic in command handlers
5. **Add Images**: Follow the image loading instructions above

## Technical Details

- **Pure JavaScript** - No frameworks or build tools required
- **Responsive Design** - Works on desktop and mobile
- **Modern CSS** - Grid layout, flexbox, CSS variables
- **Original Game Logic** - Ported from ZIL source code

## Comparison to Original

This proof of concept demonstrates:

✅ Room navigation matching original game
✅ Object interaction (containers, items)
✅ Text parser for commands
✅ Inventory management
✅ Visual enhancements (GUI, compass, future image support)

**Not yet implemented** (but could be added):

- Full game content (only ~9 rooms vs. 110+ in original)
- Complex puzzles and game logic
- NPC actors and combat
- Save/restore functionality
- Advanced parser features (pronouns, complex sentences)

## Next Steps

To create a complete modern Zork:

1. Extract all 110+ rooms from the ZIL files
2. Port all object interactions and puzzles
3. Create or commission artwork for all scenes
4. Add sound effects and music
5. Implement save/load system (localStorage or cloud)
6. Add accessibility features
7. Mobile optimization with touch controls

## Credits

- **Original Game**: Marc Blank, Dave Lebling, Bruce Daniels, Tim Anderson (1983)
- **Original Publisher**: Infocom, Inc.
- **Web Adaptation**: Proof of concept demonstrating ZIL-to-JavaScript port
- **License**: MIT (as per original source repository)

## License

This proof of concept is based on the MIT-licensed Zork I source code.
See LICENSE file in the root directory.
