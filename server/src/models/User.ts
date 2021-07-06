import { BeforeRemove, Column, Entity, OneToMany } from 'typeorm';
import { Model } from './Model';
import { Token } from './Token';

@Entity()
export class User extends Model {
	protected fillable = ['username', 'password'];
	protected hidden = ['password'];

	@Column()
	username: string;

	@Column()
	password: string;

	@OneToMany(() => Token, (token) => token.user)
	tokens: Token[];

	@BeforeRemove()
	async removeTokens() {
		await Token.createQueryBuilder().where('userId', { userId: this.id }).delete().execute();
	}
}
