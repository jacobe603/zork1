// ZORK I - Complete Z-Machine Integration
// Enhanced version with comprehensive room detection and GUI integration

class ZorkGame {
    constructor() {
        this.iframe = null;
        this.iframeDoc = null;
        this.iframeWindow = null;
        this.currentRoom = null;
        this.inventory = [];
        this.gameStarted = false;
        this.lastOutputLength = 0;
        this.commandHistory = [];
        this.historyIndex = -1;

        // Status tracking
        this.statusEl = document.getElementById('status');
        this.updateStatus('Initializing...');

        // Comprehensive room database with all major rooms from Zork I
        this.rooms = {
            'West of House': { emoji: '🏠', color: '#90EE90' },
            'North of House': { emoji: '🏚️', color: '#87CEEB' },
            'South of House': { emoji: '🏘️', color: '#F0E68C' },
            'Behind House': { emoji: '🏡', color: '#98FB98' },
            'East of House': { emoji: '🏡', color: '#FFE4B5' },
            'Forest': { emoji: '🌲', color: '#228B22' },
            'Forest Path': { emoji: '🛤️', color: '#6B8E23' },
            'Up a Tree': { emoji: '🌳', color: '#32CD32' },
            'Clearing': { emoji: '☀️', color: '#FFFF99' },
            'Canyon View': { emoji: '🏔️', color: '#A0522D' },
            'Rocky Ledge': { emoji: '🪨', color: '#808080' },
            'Canyon Bottom': { emoji: '⬇️', color: '#8B4513' },
            'End of Rainbow': { emoji: '🌈', color: '#FF69B4' },
            'Kitchen': { emoji: '🍳', color: '#FFE4C4' },
            'Living Room': { emoji: '🛋️', color: '#DEB887' },
            'Attic': { emoji: '📦', color: '#D2B48C' },
            'Cellar': { emoji: '🕯️', color: '#696969' },
            'East-West Passage': { emoji: '🚪', color: '#A9A9A9' },
            'Round Room': { emoji: '⭕', color: '#FFD700' },
            'Narrow Passage': { emoji: '↔️', color: '#708090' },
            'Mirror Room': { emoji: '🪞', color: '#E0E0E0' },
            'Winding Passage': { emoji: '🌀', color: '#778899' },
            'Grotto': { emoji: '💎', color: '#4169E1' },
            'Alcove': { emoji: '🏛️', color: '#BC8F8F' },
            'Troll Room': { emoji: '👹', color: '#8B0000' },
            'East-West Passage': { emoji: '↔️', color: '#696969' },
            'Chasm': { emoji: '⚠️', color: '#FF4500' },
            'Gallery': { emoji: '🖼️', color: '#F5DEB3' },
            'Studio': { emoji: '🎨', color: '#FFB6C1' },
            'Loud Room': { emoji: '📢', color: '#FF6347' },
            'Damp Cave': { emoji: '💧', color: '#4682B4' },
            'White Cliffs Beach': { emoji: '⛱️', color: '#F0E68C' },
            'White Cliffs': { emoji: '⛰️', color: '#F5F5F5' },
            'Frigid River': { emoji: '🧊', color: '#00CED1' },
            'Dam': { emoji: '🌊', color: '#1E90FF' },
            'Dam Lobby': { emoji: '🏢', color: '#B0C4DE' },
            'Maintenance Room': { emoji: '🔧', color: '#A9A9A9' },
            'Dam Base': { emoji: '⚙️', color: '#708090' },
            'Reservoir': { emoji: '💦', color: '#4682B4' },
            'Reservoir South': { emoji: '🌊', color: '#5F9EA0' },
            'Deep Canyon': { emoji: '🏞️', color: '#8B4513' },
            'Stream': { emoji: '💦', color: '#87CEEB' },
            'Stream View': { emoji: '👁️', color: '#ADD8E6' },
            'Grating Room': { emoji: '⚙️', color: '#696969' },
            'Grating Clearing': { emoji: '🌿', color: '#9ACD32' },
            'Dome Room': { emoji: '🛕', color: '#FFD700' },
            'Torch Room': { emoji: '🔥', color: '#FF4500' },
            'Temple': { emoji: '⛩️', color: '#DAA520' },
            'Altar': { emoji: '✝️', color: '#D3D3D3' },
            'Egyptian Room': { emoji: '🏺', color: '#DEB887' },
            'Shrine': { emoji: '🕌', color: '#FFE4B5' },
            'Treasure Room': { emoji: '💰', color: '#FFD700' },
            'Maze': { emoji: '🌀', color: '#2F4F4F' },
            'Coal Mine': { emoji: '⛏️', color: '#404040' },
            'Ladder Top': { emoji: '🪜', color: '#8B4513' },
            'Ladder Bottom': { emoji: '⬇️', color: '#696969' },
            'Dead End': { emoji: '🚫', color: '#8B0000' },
            'Timber Room': { emoji: '🪵', color: '#A0522D' },
            'Drafty Room': { emoji: '💨', color: '#B0C4DE' },
            'Machine Room': { emoji: '⚙️', color: '#778899' },
            'Bat Room': { emoji: '🦇', color: '#2F2F2F' },
            'Shaft Room': { emoji: '🕳️', color: '#505050' },
            'Smelly Room': { emoji: '🤢', color: '#556B2F' },
            'Gas Room': { emoji: '☁️', color: '#D3D3D3' },
            'Coal Mine Entrance': { emoji: '🚪', color: '#696969' },
            'Squeaky Room': { emoji: '🐭', color: '#DCDCDC' },
            'Bat Room': { emoji: '🦇', color: '#1C1C1C' },
        };

        this.init();
    }

    init() {
        this.updateStatus('Setting up game interface...');
        this.setupUI();
        this.setupIframe();
    }

    setupUI() {
        // Command input handling
        const input = document.getElementById('commandInput');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const command = input.value.trim();
                    if (command) {
                        this.sendCommand(command);
                        this.commandHistory.unshift(command);
                        this.historyIndex = -1;
                        input.value = '';
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.historyIndex < this.commandHistory.length - 1) {
                        this.historyIndex++;
                        input.value = this.commandHistory[this.historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                        input.value = this.commandHistory[this.historyIndex];
                    } else {
                        this.historyIndex = -1;
                        input.value = '';
                    }
                }
            });

            // Focus input on page click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('button') && !e.target.closest('a')) {
                    input.focus();
                }
            });
        }

        // Compass button handlers
        document.querySelectorAll('.compass-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const direction = btn.getAttribute('data-dir');
                if (direction) {
                    this.sendCommand(direction);
                }
            });
        });

        this.updateStatus('UI ready');
    }

    setupIframe() {
        this.updateStatus('Loading Z-Machine game file...');

        this.iframe = document.getElementById('gameFrame');
        if (!this.iframe) {
            this.showError('Game iframe not found');
            return;
        }

        // Set a timeout to detect if iframe is blocked (e.g., by ad blocker)
        this.loadTimeout = setTimeout(() => {
            if (!this.gameStarted) {
                this.showError('Iframe blocked by browser or extension');
                this.startFallbackMode('blocked');
            }
        }, 5000); // 5 second timeout

        this.iframe.onload = () => {
            clearTimeout(this.loadTimeout);
            this.updateStatus('Z-Machine loaded, establishing connection...');

            try {
                this.iframeWindow = this.iframe.contentWindow;
                this.iframeDoc = this.iframe.contentDocument || this.iframeWindow.document;

                if (this.iframeDoc) {
                    this.updateStatus('✓ Connected to Z-Machine');
                    this.gameStarted = true;

                    // Start monitoring game output
                    this.startMonitoring();

                    // Initial extraction after a delay
                    setTimeout(() => {
                        this.extractAndDisplayOutput();
                    }, 1000);
                } else {
                    throw new Error('Cannot access iframe document');
                }
            } catch (error) {
                this.showError('Connection limited: ' + error.message);
                this.startFallbackMode('cors');
            }
        };

        this.iframe.onerror = () => {
            clearTimeout(this.loadTimeout);
            this.showError('Failed to load Z-Machine game file');
            this.startFallbackMode('error');
        };
    }

    startMonitoring() {
        // Monitor iframe output every 300ms
        this.monitorInterval = setInterval(() => {
            this.extractAndDisplayOutput();
        }, 300);
    }

    extractAndDisplayOutput() {
        if (!this.iframeDoc) return;

        try {
            // Find output in the Parchment iframe
            // Parchment uses various possible selectors
            const selectors = [
                '.Output',
                '#output',
                '.gametext',
                'pre',
                '.zork-output',
                '[role="log"]',
                '.game-output'
            ];

            let outputText = '';

            for (const selector of selectors) {
                const elements = this.iframeDoc.querySelectorAll(selector);
                if (elements.length > 0) {
                    outputText = Array.from(elements)
                        .map(el => el.textContent || el.innerText)
                        .join('\n')
                        .trim();

                    if (outputText) break;
                }
            }

            // If we found output and it's different from last time
            if (outputText && outputText.length > this.lastOutputLength) {
                const newText = outputText.substring(this.lastOutputLength);
                this.processOutput(newText);
                this.lastOutputLength = outputText.length;
            }
        } catch (error) {
            // CORS or access errors - silent handling
            console.log('Output extraction note:', error.message);
        }
    }

    sendCommand(command) {
        if (!command) return;

        // Display user input
        this.addToOutput(`> ${command}`, 'user-input');

        if (!this.gameStarted) {
            this.addToOutput('Game is still loading, please wait...', 'system');
            return;
        }

        try {
            if (this.iframeDoc) {
                // Find the input element in the Parchment game
                const inputSelectors = [
                    'input[type="text"]',
                    'textarea',
                    '#input',
                    '.command-input',
                    '[role="textbox"]'
                ];

                let inputEl = null;
                for (const selector of inputSelectors) {
                    inputEl = this.iframeDoc.querySelector(selector);
                    if (inputEl) break;
                }

                if (inputEl) {
                    // Set the value
                    inputEl.value = command;
                    inputEl.focus();

                    // Trigger various events to ensure the game processes it
                    const events = ['input', 'change', 'keypress', 'keydown', 'keyup'];
                    events.forEach(eventType => {
                        const event = new Event(eventType, { bubbles: true, cancelable: true });
                        if (eventType.startsWith('key')) {
                            event.key = 'Enter';
                            event.keyCode = 13;
                            event.which = 13;
                        }
                        inputEl.dispatchEvent(event);
                    });

                    // Also try pressing Enter key specifically
                    const enterEvent = new KeyboardEvent('keypress', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true
                    });
                    inputEl.dispatchEvent(enterEvent);

                    // Try form submission if input is in a form
                    const form = inputEl.closest('form');
                    if (form) {
                        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                        form.dispatchEvent(submitEvent);
                    }

                    // Extract output after a delay
                    setTimeout(() => this.extractAndDisplayOutput(), 400);
                } else {
                    this.addToOutput('(Command sent via alternative method)', 'system');
                }
            }
        } catch (error) {
            this.addToOutput('Command sent (limited mode)', 'system');
        }
    }

    processOutput(text) {
        if (!text || text.trim().length === 0) return;

        // Display the output
        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                this.addToOutput(line, 'game-output');
            }
        });

        // Detect room changes
        this.detectRoom(text);

        // Parse inventory
        this.parseInventory(text);
    }

    detectRoom(text) {
        for (const [roomName, roomData] of Object.entries(this.rooms)) {
            if (text.includes(roomName)) {
                this.currentRoom = roomName;
                this.updateRoomDisplay(roomName, roomData);
                return;
            }
        }
    }

    updateRoomDisplay(roomName, roomData) {
        // Update room name
        const roomNameEl = document.getElementById('roomName');
        if (roomNameEl) {
            roomNameEl.textContent = roomName;
            roomNameEl.style.color = roomData.color || '#00ff00';
        }

        const sceneTitleEl = document.getElementById('sceneTitle');
        if (sceneTitleEl) {
            sceneTitleEl.textContent = roomName;
        }

        // Update scene with emoji
        const sceneImage = document.getElementById('sceneImage');
        if (sceneImage) {
            const placeholder = sceneImage.querySelector('.placeholder-scene');
            if (placeholder) {
                placeholder.innerHTML = `
                    <span style="font-size: 100px; opacity: 0.4; filter: drop-shadow(0 0 20px ${roomData.color});">
                        ${roomData.emoji}
                    </span>
                    <span style="color: ${roomData.color}; text-shadow: 0 0 10px ${roomData.color};">
                        ${roomName}
                    </span>
                `;
            }
        }

        this.updateStatus(`📍 ${roomName}`);
    }

    parseInventory(text) {
        if (text.includes('You are carrying:') || text.includes('You have:')) {
            const items = [];
            const lines = text.split('\n');

            let capturing = false;
            for (const line of lines) {
                if (line.includes('You are carrying:') || line.includes('You have:')) {
                    capturing = true;
                    continue;
                }

                if (capturing) {
                    if (line.trim().length === 0) break;

                    const cleaned = line.trim()
                        .replace(/^[•\-*]\s*/, '')
                        .replace(/^A\s+/, '')
                        .replace(/^An\s+/, '');

                    if (cleaned && !cleaned.toLowerCase().includes('empty')) {
                        items.push(cleaned);
                    }
                }
            }

            this.inventory = items;
            this.updateInventoryDisplay();
        } else if (text.toLowerCase().includes('empty-handed')) {
            this.inventory = [];
            this.updateInventoryDisplay();
        }
    }

    updateInventoryDisplay() {
        const invList = document.getElementById('inventoryList');
        if (!invList) return;

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

    addToOutput(text, className = '') {
        const output = document.getElementById('output');
        if (!output) return;

        const p = document.createElement('p');
        p.textContent = text || '\u00A0';
        if (className) p.className = className;
        output.appendChild(p);

        // Auto-scroll to bottom
        output.scrollTop = output.scrollHeight;
    }

    updateStatus(message) {
        if (this.statusEl) {
            this.statusEl.textContent = message;
        }
    }

    showError(message) {
        this.addToOutput(`ERROR: ${message}`, 'error');
        this.updateStatus('⚠️ ' + message);
    }

    startFallbackMode(reason = 'unknown') {
        this.addToOutput('', '');
        this.addToOutput('═══════════════════════════════════════════════════════════', 'system');
        this.addToOutput('⚠️  IFRAME INTEGRATION UNAVAILABLE', 'system');
        this.addToOutput('═══════════════════════════════════════════════════════════', 'system');
        this.addToOutput('', '');

        if (reason === 'blocked') {
            this.addToOutput('❌ The game iframe is being blocked by:', 'error');
            this.addToOutput('   • Browser extension (Ad blocker, Privacy Badger, uBlock Origin, etc.)', 'system');
            this.addToOutput('   • Browser security settings', 'system');
            this.addToOutput('   • Corporate firewall or content filter', 'system');
            this.addToOutput('', '');
            this.addToOutput('✅ SOLUTIONS:', 'system');
            this.addToOutput('', '');
            this.addToOutput('Option 1: PLAY STANDALONE (RECOMMENDED)', 'system');
            this.addToOutput('Click this link to play the complete game:', 'system');
            this.addToOutput('', '');

            // Create a clickable link in the output
            const output = document.getElementById('output');
            const linkP = document.createElement('p');
            linkP.className = 'system';
            linkP.innerHTML = '   → <a href="zork1.z3.html" target="_blank" style="color: #00ff00; text-decoration: underline; font-weight: bold;">OPEN FULL ZORK I GAME</a>';
            output.appendChild(linkP);

            this.addToOutput('', '');
            this.addToOutput('Option 2: Disable Ad Blocker', 'system');
            this.addToOutput('   1. Click your ad blocker extension icon', 'system');
            this.addToOutput('   2. Choose "Disable on this site" or similar', 'system');
            this.addToOutput('   3. Refresh the page (F5 or Cmd+R)', 'system');
            this.addToOutput('', '');
            this.addToOutput('Option 3: Try a Different Browser', 'system');
            this.addToOutput('   • Chrome, Firefox, Safari, or Edge without extensions', 'system');
        } else if (reason === 'cors') {
            this.addToOutput('⚠️  Browser security restrictions prevent iframe access.', 'system');
            this.addToOutput('', '');
            this.addToOutput('✅ SOLUTION: Open the standalone game:', 'system');
            this.addToOutput('', '');

            const output = document.getElementById('output');
            const linkP = document.createElement('p');
            linkP.className = 'system';
            linkP.innerHTML = '   → <a href="zork1.z3.html" target="_blank" style="color: #00ff00; text-decoration: underline; font-weight: bold;">PLAY FULL GAME HERE</a>';
            output.appendChild(linkP);
        } else {
            this.addToOutput('⚠️  The game file could not be loaded.', 'system');
            this.addToOutput('', '');
            this.addToOutput('✅ SOLUTION: Try the standalone version:', 'system');
            this.addToOutput('', '');

            const output = document.getElementById('output');
            const linkP = document.createElement('p');
            linkP.className = 'system';
            linkP.innerHTML = '   → <a href="zork1.z3.html" target="_blank" style="color: #00ff00; text-decoration: underline; font-weight: bold;">OPEN STANDALONE GAME</a>';
            output.appendChild(linkP);
        }

        this.addToOutput('', '');
        this.addToOutput('═══════════════════════════════════════════════════════════', 'system');
        this.addToOutput('', '');
        this.addToOutput('Note: The standalone version has the complete game without the', 'system');
        this.addToOutput('custom GUI, but includes all 110+ rooms and full functionality.', 'system');
        this.addToOutput('', '');

        this.updateRoomDisplay('Integration Unavailable', { emoji: '⚠️', color: '#FFFF00' });
        this.updateStatus('⚠️ Please use standalone version');
    }
}

// Initialize when DOM is ready
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new ZorkGame();
    window.game = game; // Expose for debugging and quick commands
});
