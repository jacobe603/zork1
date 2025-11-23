#!/usr/bin/env python3
"""
Zork I - AI Image Prompt Generator

This script extracts room descriptions from the Zork I ZIL source code
and generates consistent AI image prompts for creating retro D&D-style artwork.

Usage:
    python3 generate_prompts.py

Output:
    - prompts.txt: All prompts for copy-paste
    - prompts.json: Structured data for automation
    - prompts.csv: Spreadsheet format
"""

import re
import json
import csv
from pathlib import Path

# Master prompt template for consistent style
STYLE_TEMPLATE = """, retro 1980s fantasy RPG illustration, hand-painted style, reminiscent of classic Dungeons & Dragons adventure module artwork, rich colors, atmospheric lighting, fantastical and mysterious mood, vintage tabletop game aesthetic, painted by artists like Larry Elmore or Keith Parkinson, slight paper texture, adventurous composition"""

def extract_rooms_from_zil(zil_file_path):
    """Extract room names and descriptions from ZIL file."""
    rooms = []

    with open(zil_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find all ROOM definitions
    # Pattern matches: <ROOM NAME (IN ROOMS) (LDESC "...") (DESC "...") ...>
    # Using non-greedy matching and handling multi-line descriptions

    room_blocks = re.finditer(r'<ROOM\s+([A-Z\-0-9]+)(.*?)(?=<ROOM|<OBJECT|$)', content, re.DOTALL)

    for block_match in room_blocks:
        room_id = block_match.group(1)
        block_content = block_match.group(2)

        # Extract LDESC - handle multi-line quoted strings
        ldesc_match = re.search(r'\(LDESC\s+"((?:[^"\\]|\\.)*)"', block_content, re.DOTALL)
        # Extract DESC (short name)
        desc_match = re.search(r'\(DESC\s+"([^"]+)"', block_content)

        if ldesc_match and desc_match:
            long_desc = ldesc_match.group(1).replace('\n', ' ').strip()
            short_name = desc_match.group(1)

            # Clean up the description - remove extra whitespace and fix formatting
            long_desc = re.sub(r'\s+', ' ', long_desc)
            # Remove any remaining ZIL syntax artifacts
            long_desc = re.sub(r'\)\s*\(.*$', '', long_desc)
            long_desc = long_desc.strip()

            rooms.append({
                'id': room_id,
                'name': short_name,
                'description': long_desc
            })
        elif desc_match:
            # Some rooms might not have LDESC, use a generic description
            short_name = desc_match.group(1)
            rooms.append({
                'id': room_id,
                'name': short_name,
                'description': f"A mysterious location known as {short_name}"
            })

    return rooms

def generate_prompt(room):
    """Generate AI image prompt for a room."""
    # Clean and enhance the description
    desc = room['description']

    # Make it more vivid and artistic
    prompt = f"{desc}{STYLE_TEMPLATE}"

    return prompt

def generate_midjourney_prompt(room):
    """Generate Midjourney-specific prompt with parameters."""
    base_prompt = generate_prompt(room)
    return f"{base_prompt} --ar 4:3 --s 400"

def generate_dalle_prompt(room):
    """Generate DALL-E specific prompt (no special params)."""
    return generate_prompt(room)

def categorize_room(room_name, room_desc):
    """Categorize room by location type."""
    name_lower = room_name.lower()
    desc_lower = room_desc.lower()

    if any(word in name_lower for word in ['house', 'kitchen', 'living', 'attic']):
        return 'house'
    elif any(word in name_lower for word in ['forest', 'tree', 'clearing', 'path']):
        return 'forest'
    elif any(word in name_lower for word in ['dam', 'reservoir', 'stream', 'river']):
        return 'water'
    elif any(word in name_lower for word in ['temple', 'altar', 'shrine']):
        return 'temple'
    elif any(word in name_lower for word in ['maze', 'passage', 'tunnel']):
        return 'maze'
    elif any(word in desc_lower for word in ['stone', 'cave', 'chamber', 'dungeon']):
        return 'dungeon'
    else:
        return 'other'

def main():
    print("🎨 Zork I AI Image Prompt Generator")
    print("=" * 50)

    # Path to ZIL file
    zil_path = Path('../1dungeon.zil')

    if not zil_path.exists():
        print(f"❌ Error: {zil_path} not found")
        return

    print(f"📖 Reading from: {zil_path}")

    # Extract rooms
    rooms = extract_rooms_from_zil(zil_path)
    print(f"✅ Found {len(rooms)} rooms")

    # Generate prompts
    print("\n" + "=" * 50)
    print("Generating prompts...")
    print("=" * 50 + "\n")

    all_prompts = []
    categories = {}

    for room in rooms:
        category = categorize_room(room['name'], room['description'])

        if category not in categories:
            categories[category] = []

        prompt_data = {
            'id': room['id'],
            'name': room['name'],
            'category': category,
            'description': room['description'],
            'prompt_base': generate_prompt(room),
            'prompt_midjourney': generate_midjourney_prompt(room),
            'prompt_dalle': generate_dalle_prompt(room),
            'filename': room['name'].lower().replace(' ', '-').replace("'", '') + '.jpg'
        }

        all_prompts.append(prompt_data)
        categories[category].append(prompt_data)

    # Save as text file
    with open('prompts.txt', 'w', encoding='utf-8') as f:
        f.write("ZORK I - AI IMAGE GENERATION PROMPTS\n")
        f.write("=" * 70 + "\n\n")

        for category, rooms in sorted(categories.items()):
            f.write(f"\n{'=' * 70}\n")
            f.write(f"CATEGORY: {category.upper()}\n")
            f.write(f"{'=' * 70}\n\n")

            for room in rooms:
                f.write(f"Room: {room['name']}\n")
                f.write(f"Filename: {room['filename']}\n")
                f.write(f"\nMidjourney Prompt:\n{room['prompt_midjourney']}\n")
                f.write(f"\nDALL-E Prompt:\n{room['prompt_dalle']}\n")
                f.write(f"\n{'-' * 70}\n\n")

    # Save as JSON
    with open('prompts.json', 'w', encoding='utf-8') as f:
        json.dump({
            'meta': {
                'total_rooms': len(rooms),
                'categories': list(categories.keys())
            },
            'prompts': all_prompts
        }, f, indent=2, ensure_ascii=False)

    # Save as CSV
    with open('prompts.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'name', 'category', 'filename', 'description', 'prompt_midjourney', 'prompt_dalle'
        ])
        writer.writeheader()

        for prompt in all_prompts:
            writer.writerow({
                'name': prompt['name'],
                'category': prompt['category'],
                'filename': prompt['filename'],
                'description': prompt['description'],
                'prompt_midjourney': prompt['prompt_midjourney'],
                'prompt_dalle': prompt['prompt_dalle']
            })

    # Print summary
    print("\n" + "=" * 50)
    print("✅ GENERATION COMPLETE")
    print("=" * 50)
    print(f"\n📊 Statistics:")
    print(f"  Total rooms: {len(rooms)}")
    for category, rooms in sorted(categories.items()):
        print(f"  {category.capitalize()}: {len(rooms)} rooms")

    print(f"\n📁 Output files:")
    print(f"  • prompts.txt - Human-readable prompts")
    print(f"  • prompts.json - Structured data for automation")
    print(f"  • prompts.csv - Spreadsheet format")

    print(f"\n💡 Next steps:")
    print(f"  1. Review prompts.txt")
    print(f"  2. Generate images using your preferred AI service")
    print(f"  3. Save images to docs/images/rooms/")
    print(f"  4. Update play-hybrid.html with image paths")

    print(f"\n🎨 Start with these high-priority rooms:")
    priority_rooms = [p for p in all_prompts if p['name'] in [
        'West of House', 'North of House', 'Kitchen', 'Living Room',
        'Cellar', 'Troll Room', 'Treasure Room', 'Maze', 'Forest'
    ]]
    for room in priority_rooms:
        print(f"  • {room['name']}")

if __name__ == '__main__':
    main()
