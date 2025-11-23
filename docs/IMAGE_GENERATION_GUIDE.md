# Zork I - AI Image Generation Guide

## Overview

This guide helps you generate consistent, fantastical retro D&D-style artwork for all Zork I locations using AI image generators like DALL-E, Midjourney, or Stable Diffusion.

## Aesthetic Guidelines

**Style:** Retro 1980s fantasy RPG artwork, reminiscent of classic D&D modules
- Hand-painted illustration feel (not photorealistic)
- Fantastical and atmospheric
- Rich colors with slight grain/texture
- Mysterious and adventurous mood
- Similar to classic TSR D&D adventure module covers

## Master Prompt Template

Use this template for EVERY room to ensure consistency:

```
[ROOM DESCRIPTION], retro 1980s fantasy RPG illustration, hand-painted style,
reminiscent of classic Dungeons & Dragons adventure module artwork, rich colors,
atmospheric lighting, fantastical and mysterious mood, vintage tabletop game aesthetic,
painted by artists like Larry Elmore or Keith Parkinson, slight paper texture,
adventurous composition --ar 16:9 --style raw
```

**For Midjourney, add:** `--ar 4:3 --s 400` (aspect ratio and stylize)
**For DALL-E:** Remove the `--ar` and `--s` parameters

## Room-by-Room Prompts

### Exterior - House Areas

**West of House**
```
An open field with a white colonial house in the distance, boarded front door,
small mailbox standing near a path, forest trees surrounding the clearing,
retro 1980s fantasy RPG illustration, hand-painted style, reminiscent of classic
Dungeons & Dragons adventure module artwork, rich colors, atmospheric lighting,
fantastical and mysterious mood, vintage tabletop game aesthetic, painted by
artists like Larry Elmore or Keith Parkinson, slight paper texture, adventurous
composition
```

**North of House**
```
North facade of a white colonial house with all windows boarded up, narrow path
winding through dark trees to the north, ominous atmosphere, retro 1980s fantasy
RPG illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, rich colors, atmospheric lighting, fantastical and
mysterious mood, vintage tabletop game aesthetic, painted by artists like Larry
Elmore or Keith Parkinson, slight paper texture, adventurous composition
```

**Behind House**
```
Behind a white house in a forest clearing, small window slightly ajar in corner,
path leading east into dense forest, abandoned and mysterious setting, retro 1980s
fantasy RPG illustration, hand-painted style, reminiscent of classic Dungeons &
Dragons adventure module artwork, rich colors, atmospheric lighting, fantastical
and mysterious mood, vintage tabletop game aesthetic, painted by artists like
Larry Elmore or Keith Parkinson, slight paper texture, adventurous composition
```

### Interior - House

**Kitchen**
```
Rustic kitchen interior with wooden table, chimney, window to the east,
elongated brown sack on floor, water bottle, fantasy medieval style, retro 1980s
fantasy RPG illustration, hand-painted style, reminiscent of classic Dungeons &
Dragons adventure module artwork, rich warm colors, atmospheric lighting,
fantastical and cozy mood, vintage tabletop game aesthetic, painted by artists
like Larry Elmore or Keith Parkinson, slight paper texture
```

**Living Room**
```
Elegant living room in fantasy mansion, ornate rug on floor, trophy case on wall,
sword mounted above fireplace mantle, wooden doors to different rooms, rich
furnishings, retro 1980s fantasy RPG illustration, hand-painted style, reminiscent
of classic Dungeons & Dragons adventure module artwork, warm lighting, atmospheric,
fantastical and mysterious mood, vintage tabletop game aesthetic, painted by
artists like Larry Elmore or Keith Parkinson
```

**Attic**
```
Dusty attic interior with wooden beams, cobwebs, treasure map on table, dim light
from small window, mysterious atmosphere, retro 1980s fantasy RPG illustration,
hand-painted style, reminiscent of classic Dungeons & Dragons adventure module
artwork, muted colors with shafts of light, atmospheric lighting, fantastical and
mysterious mood, vintage tabletop game aesthetic, painted by artists like Larry
Elmore or Keith Parkinson
```

### Underground - Dungeon

**Cellar**
```
Stone cellar with stairs leading up, torch-lit passages heading in all directions,
stone walls covered in moss, mysterious dungeon entrance, retro 1980s fantasy RPG
illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, torchlight and shadows, atmospheric lighting, fantastical
and mysterious mood, vintage tabletop game aesthetic, painted by artists like
Larry Elmore or Keith Parkinson
```

**Troll Room**
```
Large cavern with a wicked troll lurking in shadows, stone passages branching
off, bones scattered on ground, ominous atmosphere, retro 1980s fantasy RPG
illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, dramatic lighting with torch glow, atmospheric,
fantastical and dangerous mood, vintage tabletop game aesthetic, painted by
artists like Larry Elmore or Keith Parkinson
```

**Treasure Room**
```
Grand stone chamber filled with glittering treasures, piles of gold coins and
jewels, ornate chest, magical glow illuminating the room, retro 1980s fantasy
RPG illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, rich golden lighting, atmospheric, fantastical and
wondrous mood, vintage tabletop game aesthetic, painted by artists like Larry
Elmore or Keith Parkinson
```

### Special Locations

**Maze**
```
Twisting stone corridors in all directions, identical passages creating confusion,
torch-lit dungeon walls, disorienting perspective, retro 1980s fantasy RPG
illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, dim torchlight and shadows, atmospheric lighting,
fantastical and mysterious mood, vintage tabletop game aesthetic, painted by
artists like Larry Elmore or Keith Parkinson
```

**Round Room**
```
Perfectly circular stone chamber with multiple passages radiating outward,
ancient carved symbols on walls, mystical atmosphere, retro 1980s fantasy RPG
illustration, hand-painted style, reminiscent of classic Dungeons & Dragons
adventure module artwork, mystical lighting, atmospheric, fantastical and
mysterious mood, vintage tabletop game aesthetic, painted by artists like
Larry Elmore or Keith Parkinson
```

**Temple**
```
Ancient stone temple with high vaulted ceiling, ornate altar, religious symbols
carved in walls, mystical light filtering through, sacred atmosphere, retro 1980s
fantasy RPG illustration, hand-painted style, reminiscent of classic Dungeons &
Dragons adventure module artwork, divine lighting, atmospheric, fantastical and
holy mood, vintage tabletop game aesthetic, painted by artists like Larry Elmore
or Keith Parkinson
```

**Dam**
```
Massive concrete dam structure with control panel, rushing water visible through
windows, industrial dungeon aesthetic mixed with fantasy elements, retro 1980s
fantasy RPG illustration, hand-painted style, reminiscent of classic Dungeons &
Dragons adventure module artwork, dramatic lighting with water reflections,
atmospheric, fantastical engineering mood, vintage tabletop game aesthetic,
painted by artists like Larry Elmore or Keith Parkinson
```

## How to Use

### Option 1: DALL-E 3 (OpenAI)
1. Go to ChatGPT with DALL-E access or OpenAI API
2. Copy a prompt from above
3. Remove any `--ar` or `--s` parameters
4. Generate image
5. Download and save as `room-name.jpg`

### Option 2: Midjourney
1. Join Midjourney Discord
2. Use `/imagine` command
3. Paste full prompt with `--ar 4:3 --s 400`
4. Upscale your favorite version
5. Download and save

### Option 3: Stable Diffusion
1. Use Stable Diffusion UI (Automatic1111, ComfyUI, etc.)
2. Copy prompt (remove `--ar` and `--s`)
3. Recommended settings:
   - Sampler: DPM++ 2M Karras
   - Steps: 25-35
   - CFG Scale: 7-8
   - Size: 768x512 or 1024x768
4. Generate and save

## Batch Generation Script

Want to generate all rooms at once? Use this Python script:

```python
# See generate_prompts.py in this directory
```

## File Naming Convention

Save images with these exact names to match the JavaScript code:

- `west-of-house.jpg`
- `north-of-house.jpg`
- `kitchen.jpg`
- `living-room.jpg`
- `cellar.jpg`
- `troll-room.jpg`
- `treasure-room.jpg`
- `maze.jpg`
- `temple.jpg`
- `dam.jpg`

Place all images in: `docs/images/rooms/`

## Updating the HTML

Once you have images, update `play-hybrid.html`:

```javascript
const roomData = {
    'West of House': {
        emoji: '🏠',
        color: '#90EE90',
        image: 'images/rooms/west-of-house.jpg'  // Add this
    },
    // ... etc
};

// Update the scene display function:
function updateSceneForRoom(roomName) {
    const room = roomData[roomName];
    const sceneImage = document.getElementById('sceneImage');

    if (room && room.image) {
        // Replace emoji with actual image
        sceneImage.style.backgroundImage = `url(${room.image})`;
        sceneImage.style.backgroundSize = 'cover';
    } else {
        // Fall back to emoji
        // ... existing code
    }
}
```

## Quality Tips

1. **Consistency is key** - Always use the same base prompt template
2. **Iterate** - Generate 3-4 versions per room and pick the best
3. **Upscale** - Use 2x upscaling for better quality
4. **Color grading** - Slightly warm the colors in post for unity
5. **Test integration** - Make sure images work well at different screen sizes

## Example Workflow

1. Extract all room descriptions from ZIL files
2. Generate prompts using the template
3. Create images in batches (10-15 at a time)
4. Review and select best versions
5. Upscale and save with correct filenames
6. Add to `docs/images/rooms/` folder
7. Update JavaScript with image paths
8. Test in browser

## Cost Estimates

- **DALL-E 3:** ~$0.04 per image = ~$4.40 for 110 rooms
- **Midjourney:** $10/month subscription = unlimited
- **Stable Diffusion:** Free (local) or ~$0.01 per image on services

---

Start with the main 10-15 rooms players see most often, then expand to full coverage!
