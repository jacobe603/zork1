// ZORK I - Web Edition - Game Engine
// Extracted from original ZIL source code

class ZorkGame {
    constructor() {
        // Game state
        this.currentRoom = 'westOfHouse';
        this.inventory = [];
        this.moves = 0;
        this.score = 0;

        // Room database (extracted from 1dungeon.zil)
        this.rooms = {
            westOfHouse: {
                name: 'West of House',
                description: 'You are standing in an open field west of a white house, with a boarded front door.',
                exits: {
                    north: 'northOfHouse',
                    south: 'southOfHouse',
                    west: 'forest1',
                    ne: 'northOfHouse',
                    se: 'southOfHouse',
                    east: null // blocked
                },
                blockedExits: {
                    east: 'The door is boarded and you can\'t remove the boards.'
                },
                objects: ['mailbox'],
                image: 'west-of-house.jpg'
            },
            northOfHouse: {
                name: 'North of House',
                description: 'You are facing the north side of a white house. There is no door here, and all the windows are boarded up. To the north a narrow path winds through the trees.',
                exits: {
                    sw: 'westOfHouse',
                    se: 'eastOfHouse',
                    west: 'westOfHouse',
                    east: 'eastOfHouse',
                    north: 'path',
                    south: null
                },
                blockedExits: {
                    south: 'The windows are all boarded.'
                },
                objects: [],
                image: 'north-of-house.jpg'
            },
            southOfHouse: {
                name: 'South of House',
                description: 'You are facing the south side of a white house. There is no door here, and all the windows are boarded.',
                exits: {
                    west: 'westOfHouse',
                    east: 'eastOfHouse',
                    ne: 'eastOfHouse',
                    nw: 'westOfHouse',
                    south: 'forest3',
                    north: null
                },
                blockedExits: {
                    north: 'The windows are all boarded.'
                },
                objects: [],
                image: 'south-of-house.jpg'
            },
            eastOfHouse: {
                name: 'Behind House',
                description: 'You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar.',
                exits: {
                    north: 'northOfHouse',
                    south: 'southOfHouse',
                    sw: 'southOfHouse',
                    nw: 'northOfHouse',
                    east: 'clearing',
                    west: null // Can go through window later
                },
                blockedExits: {
                    west: 'The window is too small to climb through... or is it?'
                },
                objects: ['window'],
                image: 'east-of-house.jpg'
            },
            forest1: {
                name: 'Forest',
                description: 'This is a forest, with trees in all directions. To the east, there appears to be sunlight.',
                exits: {
                    north: 'gratingClearing',
                    east: 'path',
                    south: 'forest3',
                    west: null
                },
                blockedExits: {
                    west: 'You would need a machete to go further west.'
                },
                objects: [],
                image: 'forest.jpg'
            },
            path: {
                name: 'Forest Path',
                description: 'This is a path winding through a dimly lit forest. The path continues north and south.',
                exits: {
                    north: 'northOfHouse',
                    south: 'westOfHouse',
                    west: 'forest1',
                    east: 'northOfHouse'
                },
                objects: [],
                image: 'path.jpg'
            },
            clearing: {
                name: 'Clearing',
                description: 'You are in a clearing, with a forest surrounding you on all sides. A path leads south.',
                exits: {
                    south: 'eastOfHouse',
                    west: 'eastOfHouse',
                    north: 'forest1',
                    east: 'forest1'
                },
                objects: ['leaves'],
                image: 'clearing.jpg'
            },
            forest3: {
                name: 'Forest',
                description: 'This is a dimly lit forest, with large trees all around.',
                exits: {
                    north: 'southOfHouse',
                    west: 'forest1',
                    east: 'clearing',
                    south: 'forest1'
                },
                objects: [],
                image: 'forest.jpg'
            },
            gratingClearing: {
                name: 'Clearing',
                description: 'You are in a small clearing in a well marked forest path that extends to the east and west.',
                exits: {
                    south: 'forest1',
                    east: 'path',
                    west: 'path'
                },
                objects: ['grating'],
                image: 'clearing.jpg'
            }
        };

        // Object database
        this.objects = {
            mailbox: {
                name: 'small mailbox',
                description: 'The small mailbox is closed.',
                takeable: false,
                open: false,
                contains: ['leaflet']
            },
            leaflet: {
                name: 'leaflet',
                description: 'A small leaflet.',
                takeable: true,
                text: '"WELCOME TO ZORK!\n\nZORK is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortals. No computer should be without one!"'
            },
            window: {
                name: 'small window',
                description: 'The window is slightly ajar, but not enough to allow entry.',
                takeable: false
            },
            leaves: {
                name: 'pile of leaves',
                description: 'A pile of leaves.',
                takeable: false
            },
            grating: {
                name: 'grating',
                description: 'The grating is closed and locked.',
                takeable: false,
                open: false
            }
        };

        // Initialize UI
        this.initUI();
        this.look();
    }

    initUI() {
        const input = document.getElementById('commandInput');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (command) {
                    this.processCommand(command);
                    input.value = '';
                }
            }
        });

        // Update compass buttons
        this.updateCompass();
    }

    processCommand(commandStr) {
        const command = commandStr.toLowerCase().trim();
        this.addOutput(`> ${commandStr}`, 'user-input');
        this.moves++;

        // Parse command
        const words = command.split(/\s+/);
        const verb = words[0];
        const noun = words.slice(1).join(' ');

        // Command routing
        if (['n', 'north'].includes(verb)) {
            this.go('north');
        } else if (['s', 'south'].includes(verb)) {
            this.go('south');
        } else if (['e', 'east'].includes(verb)) {
            this.go('east');
        } else if (['w', 'west'].includes(verb)) {
            this.go('west');
        } else if (['ne', 'northeast'].includes(verb)) {
            this.go('ne');
        } else if (['nw', 'northwest'].includes(verb)) {
            this.go('nw');
        } else if (['se', 'southeast'].includes(verb)) {
            this.go('se');
        } else if (['sw', 'southwest'].includes(verb)) {
            this.go('sw');
        } else if (['look', 'l'].includes(verb)) {
            this.look();
        } else if (['examine', 'x', 'inspect'].includes(verb)) {
            this.examine(noun);
        } else if (['take', 'get'].includes(verb)) {
            this.take(noun);
        } else if (['drop'].includes(verb)) {
            this.drop(noun);
        } else if (['inventory', 'i'].includes(verb)) {
            this.showInventory();
        } else if (['open'].includes(verb)) {
            this.open(noun);
        } else if (['close'].includes(verb)) {
            this.close(noun);
        } else if (['read'].includes(verb)) {
            this.read(noun);
        } else if (['help'].includes(verb)) {
            this.showHelp();
        } else if (['score'].includes(verb)) {
            this.showScore();
        } else {
            this.addOutput("I don't understand that command. Type 'help' for available commands.");
        }

        this.updateUI();
    }

    go(direction) {
        const room = this.rooms[this.currentRoom];
        const nextRoom = room.exits[direction];

        if (nextRoom) {
            this.currentRoom = nextRoom;
            this.look();
        } else if (room.blockedExits && room.blockedExits[direction]) {
            this.addOutput(room.blockedExits[direction]);
        } else {
            this.addOutput("You can't go that way.");
        }
    }

    look() {
        const room = this.rooms[this.currentRoom];
        this.addOutput(room.description, 'room-desc');

        // List visible objects
        if (room.objects && room.objects.length > 0) {
            const visibleObjects = room.objects.filter(obj => !this.inventory.includes(obj));
            if (visibleObjects.length > 0) {
                const objectNames = visibleObjects.map(obj => {
                    const o = this.objects[obj];
                    return `a ${o.name}`;
                }).join(', ');
                this.addOutput(`You can see ${objectNames} here.`);
            }
        }

        this.updateRoomDisplay();
    }

    examine(noun) {
        if (!noun) {
            this.addOutput("Examine what?");
            return;
        }

        // Check inventory
        const invObj = this.findObject(noun, this.inventory);
        if (invObj) {
            this.addOutput(this.objects[invObj].description);
            return;
        }

        // Check current room
        const room = this.rooms[this.currentRoom];
        const roomObj = this.findObject(noun, room.objects);
        if (roomObj) {
            this.addOutput(this.objects[roomObj].description);
            return;
        }

        this.addOutput("You don't see that here.");
    }

    take(noun) {
        if (!noun) {
            this.addOutput("Take what?");
            return;
        }

        const room = this.rooms[this.currentRoom];
        const objKey = this.findObject(noun, room.objects);

        if (objKey) {
            const obj = this.objects[objKey];
            if (obj.takeable) {
                this.inventory.push(objKey);
                room.objects = room.objects.filter(o => o !== objKey);
                this.addOutput(`Taken.`);
            } else {
                this.addOutput(`You can't take that.`);
            }
        } else {
            this.addOutput("You don't see that here.");
        }
    }

    drop(noun) {
        if (!noun) {
            this.addOutput("Drop what?");
            return;
        }

        const objKey = this.findObject(noun, this.inventory);
        if (objKey) {
            this.inventory = this.inventory.filter(o => o !== objKey);
            this.rooms[this.currentRoom].objects.push(objKey);
            this.addOutput(`Dropped.`);
        } else {
            this.addOutput("You don't have that.");
        }
    }

    open(noun) {
        if (!noun) {
            this.addOutput("Open what?");
            return;
        }

        const room = this.rooms[this.currentRoom];
        const objKey = this.findObject(noun, room.objects);

        if (objKey) {
            const obj = this.objects[objKey];
            if (obj.hasOwnProperty('open')) {
                if (obj.open) {
                    this.addOutput("It's already open.");
                } else {
                    obj.open = true;
                    this.addOutput("Opened.");
                    if (obj.contains && obj.contains.length > 0) {
                        const items = obj.contains.map(o => this.objects[o].name).join(', ');
                        this.addOutput(`The ${obj.name} contains: ${items}`);
                    }
                }
            } else {
                this.addOutput("You can't open that.");
            }
        } else {
            this.addOutput("You don't see that here.");
        }
    }

    close(noun) {
        if (!noun) {
            this.addOutput("Close what?");
            return;
        }

        const room = this.rooms[this.currentRoom];
        const objKey = this.findObject(noun, room.objects);

        if (objKey) {
            const obj = this.objects[objKey];
            if (obj.hasOwnProperty('open')) {
                if (!obj.open) {
                    this.addOutput("It's already closed.");
                } else {
                    obj.open = false;
                    this.addOutput("Closed.");
                }
            } else {
                this.addOutput("You can't close that.");
            }
        } else {
            this.addOutput("You don't see that here.");
        }
    }

    read(noun) {
        if (!noun) {
            this.addOutput("Read what?");
            return;
        }

        const objKey = this.findObject(noun, this.inventory);
        if (objKey) {
            const obj = this.objects[objKey];
            if (obj.text) {
                this.addOutput(obj.text);
            } else {
                this.addOutput("There's nothing to read on that.");
            }
        } else {
            this.addOutput("You don't have that.");
        }
    }

    showInventory() {
        if (this.inventory.length === 0) {
            this.addOutput("You are empty-handed.");
        } else {
            const items = this.inventory.map(obj => this.objects[obj].name).join(', ');
            this.addOutput(`You are carrying: ${items}`);
        }
    }

    showHelp() {
        const help = `
AVAILABLE COMMANDS:
  Movement: north, south, east, west, ne, nw, se, sw (or n, s, e, w, etc.)
  Actions: look, examine [object], take [object], drop [object]
  Interaction: open [object], close [object], read [object]
  Info: inventory (i), score, help

TIPS:
  - Type 'look' to see your surroundings
  - Use compass buttons or type directions to move
  - Examine objects to learn more about them
  - Try opening containers to find items
`;
        this.addOutput(help, 'help-text');
    }

    showScore() {
        this.addOutput(`Your score is ${this.score} (out of 350) in ${this.moves} moves.`);
    }

    findObject(noun, objectList) {
        if (!objectList) return null;
        return objectList.find(objKey => {
            const obj = this.objects[objKey];
            return obj.name.includes(noun) || objKey.includes(noun);
        });
    }

    addOutput(text, className = '') {
        const output = document.getElementById('output');
        const p = document.createElement('p');
        p.textContent = text;
        if (className) p.className = className;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    updateRoomDisplay() {
        const room = this.rooms[this.currentRoom];
        document.getElementById('roomName').textContent = room.name;
        document.getElementById('sceneTitle').textContent = room.name;

        // Update scene image (placeholder for now)
        const sceneImage = document.querySelector('.scene-image');
        sceneImage.setAttribute('data-room', this.currentRoom);
    }

    updateCompass() {
        const room = this.rooms[this.currentRoom];
        document.querySelectorAll('.compass-btn').forEach(btn => {
            const dir = btn.getAttribute('data-dir');
            btn.disabled = !room.exits[dir];
            btn.classList.toggle('disabled', !room.exits[dir]);
        });
    }

    updateUI() {
        this.updateCompass();

        // Update inventory display
        const invList = document.getElementById('inventoryList');
        invList.innerHTML = '';
        if (this.inventory.length === 0) {
            const li = document.createElement('li');
            li.className = 'empty';
            li.textContent = 'You are empty-handed.';
            invList.appendChild(li);
        } else {
            this.inventory.forEach(objKey => {
                const li = document.createElement('li');
                li.textContent = this.objects[objKey].name;
                invList.appendChild(li);
            });
        }
    }
}

// Start the game
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new ZorkGame();
});
