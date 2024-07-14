import { Hero } from './hero.js';
import { Input } from './input.js';
import { World } from './world.js';

export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;
export const HALF_TILE = TILE_SIZE / 2;
const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;

window.addEventListener('load', () => {
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = GAME_WIDTH;
	canvas.height = GAME_HEIGHT;

	class Game {
		constructor() {
			this.world = new World();
			this.hero = new Hero({
				game: this,
				sprite: {
					image: document.querySelector('.hero'),
					x: 0,
					y: 11,
					width: 64,
					height: 64,
				},
				position: { x: 1 * TILE_SIZE, y: 2 * TILE_SIZE },
				scale: 1,
			});
			this.input = new Input(this);

			this.eventUpdate = false;
			this.eventTimer = 0;
			this.eventInterval = 60;

			this.debug = false;
		}
		toggleDebug() {
			this.debug = !this.debug;
		}
		render(ctx, deltaTime) {
			this.hero.update(deltaTime);
			this.world.drawBackground(ctx);

			if (this.debug) this.world.drawGrid(ctx);
			this.hero.draw(ctx);
			this.world.drawForeground(ctx);

			if (this.debug) this.world.drawCollisionMap(ctx);

			if (this.eventTimer < this.eventInterval) {
				this.eventTimer += deltaTime;
				this.eventUpdate = false;
				return;
			}

			this.eventTimer = 0;
			this.eventUpdate = true;
		}
	}

	const game = new Game();

	let lastTime = 0;
	const animate = (timeStamp) => {
		requestAnimationFrame(animate);

		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;

		game.render(ctx, deltaTime);
	};

	requestAnimationFrame(animate);
});
