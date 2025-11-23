# Integrating AI-Generated Images into Zork I GUI

## Quick Start

Once you've generated images using the prompts, follow these steps to integrate them into the game:

### 1. Create Images Directory

```bash
mkdir -p docs/images/rooms
```

### 2. Add Your Generated Images

Save your AI-generated images with the correct filenames:
- `west-of-house.jpg`
- `north-of-house.jpg`
- `kitchen.jpg`
- etc.

Place them in: `docs/images/rooms/`

### 3. Update play-hybrid.html

Add image paths to the roomData object:

```javascript
const roomData = {
    'West of House': {
        emoji: '🏠',
        color: '#90EE90',
        image: 'images/rooms/west-of-house.jpg'  // ← Add this
    },
    'North of House': {
        emoji: '🏚️',
        color: '#87CEEB',
        image: 'images/rooms/north-of-house.jpg'  // ← Add this
    },
    // ... add images to all rooms
};
```

### 4. Update the CSS

Add these styles to play-hybrid.html `<style>` section:

```css
.scene-display {
    background: #1a1a1a;
    border: 1px solid #00ff00;
    padding: 0;  /* Remove padding for images */
    margin-bottom: 20px;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
    position: relative;
    height: 250px;  /* Set fixed height */
}

.scene-image-bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.scene-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 15px;
}

.scene-emoji {
    font-size: 60px;
    display: block;
    margin: 50px 0 10px 0;
    opacity: 0.8;
    text-shadow: 0 0 20px rgba(0,0,0,0.8);
}

.scene-name {
    color: #00ff00;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0 0 10px #00ff00, 0 2px 4px rgba(0,0,0,0.8);
}
```

### 5. Update the HTML Structure

Change the scene display div in play-hybrid.html:

```html
<div class="scene-display">
    <div class="scene-image-bg" id="sceneImageBg">
        <span class="scene-emoji" id="sceneEmoji">🏠</span>
        <div class="scene-overlay">
            <div class="scene-name" id="sceneName">West of House</div>
        </div>
    </div>
</div>
```

### 6. Update the JavaScript Function

Replace the `updateSceneForRoom` function:

```javascript
function updateSceneForRoom(roomName) {
    const room = roomData[roomName];

    // Use room data if available, otherwise show generic
    const emoji = room ? room.emoji : '❓';
    const color = room ? room.color : '#00ff00';
    const image = room ? room.image : null;

    const emojiEl = document.getElementById('sceneEmoji');
    const nameEl = document.getElementById('sceneName');
    const infoEl = document.getElementById('roomInfo');
    const bgEl = document.getElementById('sceneImageBg');

    if (emojiEl) {
        emojiEl.textContent = emoji;
        emojiEl.style.filter = `drop-shadow(0 0 20px ${color})`;
    }

    if (nameEl) {
        nameEl.textContent = roomName;
        nameEl.style.color = color;
        nameEl.style.textShadow = `0 0 10px ${color}, 0 2px 4px rgba(0,0,0,0.8)`;
    }

    if (infoEl) {
        infoEl.textContent = roomName;
    }

    // Set background image if available
    if (bgEl) {
        if (image) {
            bgEl.style.backgroundImage = `url(${image})`;
            // Darken the background a bit so text shows better
            bgEl.style.filter = 'brightness(0.7)';
        } else {
            // No image - use solid color with emoji
            bgEl.style.backgroundImage = 'none';
            bgEl.style.backgroundColor = color + '20';  // Add transparency
            bgEl.style.filter = 'none';
        }
    }
}
```

## Progressive Enhancement Strategy

Start with the most commonly visited rooms:

### Phase 1: Core Rooms (10 images)
- West of House
- North of House
- Behind House
- Kitchen
- Living Room
- Cellar
- Forest
- Clearing
- Troll Room
- Treasure Room

### Phase 2: Important Areas (15 images)
- Dam areas
- Temple areas
- Maze entrance
- Mirror Room
- Egyptian Room
- etc.

### Phase 3: Complete Coverage (all 110+ rooms)

## Batch Processing Example

If you're using DALL-E API or similar:

```python
import openai
import json

# Load prompts
with open('prompts.json', 'r') as f:
    data = json.load(f)

# Generate images for top 10 rooms
priority_rooms = [
    'West of House', 'North of House', 'Kitchen',
    'Living Room', 'Cellar', 'Troll Room', 'Treasure Room',
    'Forest', 'Clearing', 'Dam'
]

for prompt_data in data['prompts']:
    if prompt_data['name'] in priority_rooms:
        # Generate image
        response = openai.Image.create(
            prompt=prompt_data['prompt_dalle'],
            n=1,
            size="1024x1024"
        )

        # Download and save
        image_url = response['data'][0]['url']
        # ... download and save as prompt_data['filename']
```

## Testing

After integrating images:

1. Open play-hybrid.html
2. Navigate through different rooms
3. Verify images load correctly
4. Check that text is still readable over images
5. Test on different screen sizes

## Fallback Behavior

The code gracefully falls back to emoji for rooms without images:
- If `image` property exists → show image
- If not → show emoji with colored background
- Always shows room name and emoji overlay

This means you can add images incrementally!

## Optimization Tips

1. **Resize images** to 800x600 or 1024x768 (no need for 4K)
2. **Compress** using tools like TinyPNG or ImageOptim
3. **Convert to WebP** for better compression (with JPG fallback)
4. **Lazy load** images for rooms not yet visited
5. **Cache** images in browser localStorage for faster loading

## Example: Full Integration

See the complete example in `docs/examples/play-with-images.html` (coming soon)

---

Ready to make your Zork adventure visually stunning! 🎨🏰
