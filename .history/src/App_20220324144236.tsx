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

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('.snake-block')!;
    this.body = document.getElementsByClassName('#snake>div');

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
    this.move(this.left, this.top);
    this.head.style.left = `${val}px`;
  }

  set top(val) {
    if (this.top === val) return;
    this.move(this.left, this.top);
    this.head.style.top = `${val}px`;
  }

  grow() {
    const div = document.createElement('div');
    div.className = 'snake-block';
    this.element.appendChild(div);
    // this.body = this.element.querySelectorAll('.snake-block');
  }

  move(l: number, r: number) {
    const body = this.element.querySelectorAll('.snake-block');
    console.log(this.body)
    console.log(document.getElementsByClassName('#snake>div'))
    const len = body.length;
    if (len > 1) {
      (body[len - 1] as HTMLElement).style.left = `${l}px`;
      (body[len - 1] as HTMLElement).style.top = `${r}px`;
    }
  }

}

class Game {
  food: Food;
  info: Info;
  snake: Snake;
  direction: string = 'Right';
  isAlive: boolean = true;

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
    if (!this.isAlive) return;
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
    // console.log(1)
    if (left < 0 || left > 290 || top < 0 || top > 290) {
      this.isAlive = false;
    } else {
      if (left === this.food.left && top === this.food.top) {
        this.food.change();
        this.info.scored();
        this.snake.grow();
      }
      this.snake.left = left;
      this.snake.top = top;
      setTimeout(this.run.bind(this), 1000);
    }
  }
}

function App() {

  useEffect(() => {
    const game = new Game();
  }, [])

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
