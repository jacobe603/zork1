# How to Run the Zork Web Demo

## Quick Start

### Option 1: Open Directly in Browser
1. Navigate to the `demo` folder
2. Double-click `index.html`
3. The game will open in your default web browser
4. Start playing!

### Option 2: Use a Local Web Server (Recommended)

For better compatibility and if you plan to add images:

**Using Python (if installed):**
```bash
cd demo
python3 -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (if installed):**
```bash
cd demo
npx http-server -p 8000
```
Then open: http://localhost:8000

**Using PHP (if installed):**
```bash
cd demo
php -S localhost:8000
```
Then open: http://localhost:8000

## Playing the Game

### Basic Commands
- Type commands in the input box at the bottom
- Press Enter to submit
- Or click the compass buttons to move

### Sample Commands to Try
```
look
north
examine mailbox
open mailbox
take leaflet
read leaflet
inventory
south
help
```

### Movement
- **Compass buttons**: Click N, S, E, W, NE, NW, SE, SW
- **Type directions**: north, south, east, west (or n, s, e, w)

### Interaction
- `examine [object]` - Look at something
- `take [object]` - Pick it up
- `drop [object]` - Put it down
- `open [object]` - Open containers
- `close [object]` - Close containers
- `read [object]` - Read text on items
- `inventory` or `i` - Check your items

## Features to Explore

1. **The Mailbox** - There's a mailbox at the starting location. Try examining and opening it!

2. **Multiple Rooms** - You can explore 9 different locations around the white house

3. **Compass Navigation** - Disabled buttons show where you can't go

4. **Visual Feedback** - Green terminal-style text with modern styling

## Adding Your Own Images

See the main README.md for instructions on adding custom artwork for each room.

The game is set up to support images - you just need to:
1. Create images (800x600px recommended)
2. Place them in an `images/` folder
3. Update the CSS to load them for each room

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Troubleshooting

**Game doesn't load:**
- Make sure all three files (index.html, game.js, style.css) are in the same folder
- Try using a local web server instead of opening directly

**Commands don't work:**
- Check your browser's JavaScript console (F12) for errors
- Make sure JavaScript is enabled

**Styling looks broken:**
- Ensure style.css is in the same folder as index.html
- Clear your browser cache and reload

## Next Steps

This is a proof of concept with limited content. To expand:
- Add more rooms from the ZIL source
- Implement more complex puzzles
- Add images for each location
- Create sound effects
- Add save/load functionality

Enjoy exploring the Great Underground Empire!
