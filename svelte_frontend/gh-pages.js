import { publish } from 'gh-pages';

publish(
	'build', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/oliver-lehner/gemeinderat-linz.git', // Update to point to your repository
		user: {
			name: 'Oliver Lehner', // update to use your name
			email: 'oliver.r.lehner@gmail.com' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
