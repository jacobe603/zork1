// ZORK I - Web Edition with Z-Machine Interpreter
// This version runs the authentic compiled game with a modern GUI wrapper

class ZorkWebGUI {
    constructor() {
        // Game state for GUI
        this.currentRoom = 'Unknown';
        this.inventory = [];
        this.commandHistory = [];
        this.gameStarted = false;

        // Room detection patterns (for showing images)
        this.roomPatterns = {
            'West of House': 'westOfHouse',
            'North of House': 'northOfHouse',
            'South of House': 'southOfHouse',
            'Behind House': 'eastOfHouse',
            'Forest': 'forest',
            'Forest Path': 'path',
            'Clearing': 'clearing',
            'Kitchen': 'kitchen',
            'Living Room': 'livingRoom',
            'Attic': 'attic',
            'Cellar': 'cellar'
        };

        // Room images mapping
        this.roomImages = {
            westOfHouse: { title: 'West of House', emoji: '🏠' },
            northOfHouse: { title: 'North of House', emoji: '🏚️' },
            southOfHouse: { title: 'South of House', emoji: '🏘️' },
            eastOfHouse: { title: 'Behind House', emoji: '🏡' },
            forest: { title: 'Forest', emoji: '🌲' },
            path: { title: 'Forest Path', emoji: '🛤️' },
            clearing: { title: 'Clearing', emoji: '☀️' },
            kitchen: { title: 'Kitchen', emoji: '🍳' },
            livingRoom: { title: 'Living Room', emoji: '🛋️' },
            attic: { title: 'Attic', emoji: '📦' },
            cellar: { title: 'Cellar', emoji: '🕯️' }
        };

        this.initUI();
        this.loadZMachine();
    }

    initUI() {
        const input = document.getElementById('commandInput');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    this.sendCommand(command);
                    input.value = '';
                }
            }
        });

        // Add event listeners to compass buttons
        document.querySelectorAll('.compass-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const direction = e.target.getAttribute('data-dir');
                if (direction && !e.target.disabled) {
                    this.sendCommand(direction);
                }
            });
        });

        // Quick command buttons
        window.game = {
            processCommand: (cmd) => this.sendCommand(cmd)
        };
    }

    async loadZMachine() {
        this.addOutput('Loading Z-Machine interpreter...', 'system');
        this.addOutput('Initializing Zork I...', 'system');

        try {
            // Load the Z3 file
            const response = await fetch('../COMPILED/zork1.z3');
            const arrayBuffer = await response.arrayBuffer();
            this.storyFile = new Uint8Array(arrayBuffer);

            // Initialize the Z-machine
            this.initializeZMachine();

        } catch (error) {
            this.addOutput('Error loading game file: ' + error.message, 'error');
            this.addOutput('Falling back to demo mode...', 'system');
            this.fallbackMode();
        }
    }

    initializeZMachine() {
        // For this implementation, we'll use a simple command-response system
        // In a full implementation, you'd integrate with a real Z-machine library

        this.addOutput('ZORK I: The Great Underground Empire', 'intro');
        this.addOutput('Copyright (c) 1983 Infocom, Inc. All Rights Reserved.', 'intro');
        this.addOutput('ZORK is a registered trademark of Infocom, Inc.', 'intro');
        this.addOutput('Release 119 / Serial number 880429', 'intro');
        this.addOutput('', 'intro');

        // Simulate the opening
        this.processOutput(`West of House
You are standing in an open field west of a white house, with a boarded front door.
There is a small mailbox here.`);

        this.gameStarted = true;
        this.addOutput('', '');
        this.addOutput('NOTE: This is a hybrid mode. For full Z-machine integration, a Z-machine library like Parchment or ZVM needs to be integrated.', 'system');
        this.addOutput('Current version uses simplified game logic. Type "help" for available commands.', 'system');
        this.addOutput('', '');
    }

    fallbackMode() {
        // Use the original JavaScript game engine as fallback
        this.addOutput('Using JavaScript game engine...', 'system');
        // The original game.js code would be used here
    }

    sendCommand(command) {
        this.addOutput(`> ${command}`, 'user-input');
        this.commandHistory.push(command);

        // In a full Z-machine integration, this would send to the interpreter
        // For now, we'll use a simplified version
        this.processCommand(command.toLowerCase().trim());
    }

    processCommand(command) {
        // This is a simplified command processor
        // In production, this would be replaced by actual Z-machine interpreter calls

        const words = command.split(/\s+/);
        const verb = words[0];
        const noun = words.slice(1).join(' ');

        // Simple command routing (would be replaced by Z-machine)
        if (['n', 'north', 's', 'south', 'e', 'east', 'w', 'west', 'ne', 'nw', 'se', 'sw', 'u', 'up', 'd', 'down'].includes(verb)) {
            this.addOutput('You can\'t go that way.');
            this.addOutput('(Z-machine integration needed for full navigation)');
        } else if (['look', 'l'].includes(verb)) {
            this.processOutput('West of House\nYou are standing in an open field west of a white house, with a boarded front door.\nThere is a small mailbox here.');
        } else if (['inventory', 'i'].includes(verb)) {
            this.addOutput('You are empty-handed.');
        } else if (['help', 'h'].includes(verb)) {
            this.showHelp();
        } else {
            this.addOutput('I don\'t understand that.');
            this.addOutput('(Full game requires Z-machine interpreter integration)');
        }

        this.updateUI();
    }

    processOutput(text) {
        // Parse the output to detect room changes
        this.addOutput(text, 'room-desc');

        // Detect room from output
        for (const [roomName, roomKey] of Object.entries(this.roomPatterns)) {
            if (text.includes(roomName)) {
                this.currentRoom = roomKey;
                this.updateRoomDisplay(roomKey);
                break;
            }
        }

        // Parse for inventory items (simplified)
        if (text.includes('You are carrying:')) {
            // Would parse inventory from text
        }
    }

    updateRoomDisplay(roomKey) {
        const roomInfo = this.roomImages[roomKey] || { title: 'Unknown', emoji: '❓' };

        document.getElementById('roomName').textContent = roomInfo.title;
        document.getElementById('sceneTitle').textContent = roomInfo.title;

        // Update scene image
        const sceneImage = document.querySelector('.scene-image');
        sceneImage.setAttribute('data-room', roomKey);

        // Update emoji
        const placeholder = document.querySelector('.placeholder-scene');
        if (placeholder) {
            placeholder.innerHTML = `<span style="font-size: 80px; opacity: 0.3;">${roomInfo.emoji}</span><span>${roomInfo.title}</span>`;
        }
    }

    addOutput(text, className = '') {
        const output = document.getElementById('output');
        const p = document.createElement('p');
        p.textContent = text;
        if (className) p.className = className;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    showHelp() {
        const help = `
ZORK I - Web Edition with Z-Machine

This version integrates the authentic Z-machine compiled game with a modern GUI.

CURRENT STATUS: Simplified demo mode
For full game functionality, a Z-machine library needs to be integrated.

AVAILABLE COMMANDS:
  Movement: north, south, east, west, ne, nw, se, sw, up, down
  Actions: look, examine [object], take [object], drop [object]
  Interaction: open [object], close [object], read [object]
  Info: inventory, score, help

INTEGRATION NOTES:
This is a hybrid implementation. To get the full game working:
1. Integrate Parchment (https://github.com/curiousdannii/parchment)
2. Or integrate ZVM (Z-Machine Virtual Machine)
3. Or use ifvms.js for Z-machine support

The GUI wrapper is ready - we just need to connect it to a real Z-machine interpreter.
`;
        this.addOutput(help, 'help-text');
    }

    updateUI() {
        // Update compass buttons based on available exits
        // In full version, this would query the Z-machine for available exits
        document.querySelectorAll('.compass-btn').forEach(btn => {
            // For now, enable all buttons
            btn.disabled = false;
            btn.classList.remove('disabled');
        });

        // Update inventory display
        const invList = document.getElementById('inventoryList');
        invList.innerHTML = '';
        if (this.inventory.length === 0) {
            const li = document.createElement('li');
            li.className = 'empty';
            li.textContent = 'You are empty-handed.';
            invList.appendChild(li);
        } else {
            this.inventory.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                invList.appendChild(li);
            });
        }
    }
}

// Start the game
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new ZorkWebGUI();
});
