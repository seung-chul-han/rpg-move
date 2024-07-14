import { GameObject } from './gameObject.js';
import { DOWN, LEFT, RIGHT, UP } from './input.js';
import { TILE_SIZE } from './main.js';

export class Hero extends GameObject {
	constructor({ game, sprite, position, scale }) {
		super({ game, sprite, position, scale });

		this.speed = 100;
		this.maxFrame = 8;
		this.moving = false;
	}

	update(deltaTime) {
		let nextX = this.destinationPosition.x;
		let nextY = this.destinationPosition.y;

		const scaledSpeed = this.speed * (deltaTime / 1000);
		// 거리
		const distance = this.moveTowards(this.destinationPosition, scaledSpeed);
		const arrived = distance <= scaledSpeed;

		if (arrived) {
			if (this.game.input.lastKey === UP) {
				nextY -= TILE_SIZE;
				this.sprite.y = 8;
			}
			if (this.game.input.lastKey === DOWN) {
				nextY += TILE_SIZE;
				this.sprite.y = 10;
			}
			if (this.game.input.lastKey === LEFT) {
				nextX -= TILE_SIZE;
				this.sprite.y = 9;
			}
			if (this.game.input.lastKey === RIGHT) {
				nextX += TILE_SIZE;
				this.sprite.y = 11;
			}
			const col = nextX / TILE_SIZE;
			const row = nextY / TILE_SIZE;
			if (
				this.game.world.getTile(
					this.game.world.level1.collisionLayer,
					row,
					col
				) !== 1
			) {
				this.destinationPosition.x = nextX;
				this.destinationPosition.y = nextY;
			}
		}

		this.moving = this.game.input.keys.length || !arrived ? true : false;

		if (this.game.eventUpdate && this.moving) {
			this.sprite.x = this.sprite.x < this.maxFrame ? this.sprite.x + 1 : 1;
		}
		if (!this.moving) {
			this.sprite.x = 0;
		}
	}
}
