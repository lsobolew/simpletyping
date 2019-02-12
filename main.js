var stateFrames = {
  'idle': 10,
  'jump': 8,
  'run': 8,
  'walk': 10
}
var progress = 0;
var gameString;
var stringPosition = 0;


function nextFrame(){
  var characterElement = document.querySelector('#main-character');
  var currentFrame = characterElement.dataset.frame * 1;
  var currentState = characterElement.dataset.state;
  if(currentFrame >= stateFrames[currentState]) {
    characterElement.setAttribute('data-frame', 1);
    characterElement.setAttribute('data-state', 'idle');
  } else {
    characterElement.setAttribute('data-frame', currentFrame + 1);
  }
  setTimeout(nextFrame, 1000 / 30);
}

generateWorld();
nextFrame();

document.addEventListener('keydown', function(event){
  var pressedChar = event.key;
  var worldElement = document.querySelector('#world');
  var characterElement = document.querySelector('#main-character');

  if(pressedChar !== gameString[stringPosition]) {
    return;
  }
  stringPosition++;

  if(typeof gameString[stringPosition] === 'undefined') {
    document.querySelector('.treasure-closed').addEventListener('click', function(e){
      document.querySelector('.treasure-closed').classList.add('treasure-opened');
    })
    document.addEventListener('keydown', function(e){
      if(e.code === 'Enter') {
          document.querySelector('.treasure-closed').classList.add('treasure-opened');
      }
    });
  }

  if(event.code === 'Space') {
    progress += 2;
    worldElement.style.transform = 'translateX(-' + (progress * 70) + 'px)';
    if(characterElement.dataset.state !== 'jump') {
      document.querySelector('#main-character').setAttribute('data-state', 'jump');
      document.querySelector('#main-character').setAttribute('data-frame', '1');
    }
  } else if (event.code.indexOf('Key') === 0 || event.code === 'Semicolon') {
    progress += 1;
    worldElement.style.transform = 'translateX(-' + (progress * 70) + 'px)';
    if(characterElement.dataset.state !== 'walk') {
      document.querySelector('#main-character').setAttribute('data-state', 'walk');
      document.querySelector('#main-character').setAttribute('data-frame', '1');
    }
  }
});

function generateWorld() {
  var objects = [
    'bush-1',
    'bush-2',
    'bush-3',
    'bush-4',
    'crate',
    'mushroom-1',
    'mushroom-2',
    'sign-1',
    'sign-2',
    'stone',
    'tree-1',
    'tree-2',
    'tree-3'
  ]
  var string = generateString();
  var fields = [];
  var field;
  var object;
  var fieldLetter;
  var world = document.querySelector('#world');
  var g = 0;
  var i;
  for(i = 0; i < 4; i++) {
    fields[g] = {};
    fields[g]['type'] = 'ground';
    fields[g]['letter'] = '';
    g++;
  }
  for(i = 0; i < string.length; i++) {
    if(string[i] === ' ') {
      fields[g] = {};
      fields[g]['type'] = 'ground-right';
      fields[g]['letter'] = string[i];
      g++;
      fields[g] = {};
      fields[g]['type'] = 'water';
      fields[g]['letter'] = '';
    } else {
      fields[g] = {};
      if(string[i - 1] === ' ') {
        fields[g]['type'] = 'ground-left';
      } else {
        fields[g]['type'] = 'ground';
        if(Math.floor(Math.random() * 2) === 0) {
          fields[g]['object'] = objects[Math.floor(Math.random() * objects.length)];
        }
      }
      fields[g]['letter'] = string[i];
    }
    g++;
  }
  for(i = g; i < g + 4; i++) {
    fields[i] = {};
    fields[i]['type'] = 'ground';
    fields[i]['letter'] = '';

    if(i === g) {
      fields[i]['letter'] = '⏎';
    }
    if(i === g + 1) {
      fields[i]['object'] = 'treasure-closed';
    }
  }
  for(i = 0; i < fields.length; i++) {
    field = document.createElement('div');
    field.classList.add(fields[i]['type']);

    fieldLetter = document.createElement('div');
    fieldLetter.classList.add('letter');
    fieldLetter.innerText = fields[i]['letter'];

    if(typeof fields[i]['object'] === 'string') {

      object = document.createElement('div');
      object.classList.add('object');
      object.classList.add(fields[i]['object']);
      field.appendChild(object);
    }

    field.appendChild(fieldLetter);
    world.appendChild(field);
  }

  gameString = string;
}

function generateString() {
  var wordCount = 2;
  var words = [];

  for(var i = 0; i < wordCount; i++) {
    words.push(generateWord());
  }
  //return "super zosia";
  return words.join(' ');
}

function generateWord() {
  var chars = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
  var length = Math.floor(Math.random() * 8) + 2;
  var word = '';

  for(var i = 0; i < length; i++) {
    word += chars[Math.floor(Math.random() * chars.length)];
  }

  return word;
}
