import { useEffect } from 'react'
import './App.scss';

class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
    this.change();
  }

  random(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  get left() {
    return this.element.offsetLeft;
  }

  get top() {
    return this.element.offsetTop;
  }

  change() {
    this.element.style.left = `${this.random(0, 29) * 10}px`;
    this.element.style.top = `${this.random(0, 29) * 10}px`;
  }
}

class Info {
  score = 0;
  level = 1;

  scoreElement: HTMLElement;
  levelElement: HTMLElement;

  constructor() {
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
  }

  scored() {
    this.scoreElement.innerText = `${++this.score}`
    if (this.score % 10 === 0) this.levelUp()
  }

  levelUp() {
    this.levelElement.innerText = `${++this.level}`
  }
}

class Snake {
  element: HTMLElement;
  head: HTMLElement;
  body: HTMLCollection;
  alive: boolean = true;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('.snake-block')!;
    this.body = this.element.getElementsByTagName('div');

    this.head.style.left = '0px'
    this.head.style.top = '0px'
  }

  get left() {
    return this.head.offsetLeft;
  }

  get top() {
    return this.head.offsetTop;
  }

  set left(val) {
    if (this.left === val) return;
    if (val < 0 || val > 290) {
      this.alive = false;
      return;
    }
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === val) {
      if (val > this.left) {
        console.log(1)
        console.log(val - this.left)
        console.log(val)
        //向右掉头
        val -= val - this.left
        console.log(val)
      } else {
        console.log(2)
        //向左掉头
        val += this.left - val
      }
    }
    this.move();
    this.head.style.left = `${val}px`;
  }

  set top(val) {
    if (this.top === val) return;
    if (val < 0 || val > 290) {
      this.alive = false;
      return;
    }
    this.move();
    this.head.style.top = `${val}px`;
  }

  grow() {
    const div = document.createElement('div');
    div.className = 'snake-block';
    this.element.appendChild(div);
  }

  move() {
    const len = this.body.length;
    for (let index = len - 1; index > 0; index--) {
      const left = (this.body[index - 1] as HTMLElement).offsetLeft;
      const top = (this.body[index - 1] as HTMLElement).offsetTop;
      (this.body[index] as HTMLElement).style.left = `${left}px`;
      (this.body[index] as HTMLElement).style.top = `${top}px`;
    }
  }
}

class Game {
  food: Food;
  info: Info;
  snake: Snake;
  direction: string = 'Right';

  constructor() {
    this.food = new Food();
    this.info = new Info();
    this.snake = new Snake();

    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandle.bind(this));

    this.run();
  }

  keydownHandle(event: KeyboardEvent) {
    this.direction = event.key;
  }

  run() {
    let left = this.snake.left;
    let top = this.snake.top;
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        top -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        top += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        left -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        left += 10;
        break;
    }
    if (left === this.food.left && top === this.food.top) {
      this.food.change();
      this.info.scored();
      this.snake.grow();
    }
    this.snake.left = left;
    this.snake.top = top;

    if (this.snake.alive) setTimeout(this.run.bind(this), 500);
  }
}

function App() {

  useEffect(() => {
    const game = new Game();
  }, []);

  return (
    <div className='app'>
      <div className='snake-wrapper'>
        <div className='snake-top'>
          <div className='snake-board'>
            <div id='snake'>
              <div className='snake-block'></div>
            </div>
            <div id='food'></div>
          </div>
        </div>
        <div className='snake-bottom'>
          <div className='snake-score'>SCORE:<span id='score'>0</span></div>
          <div>LEVEL:<span id='level'>1</span></div>
        </div>
      </div>
    </div>
  );
}

export default App;
