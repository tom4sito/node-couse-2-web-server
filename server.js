const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentAno', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('scream', (text) => {
	return text.toUpperCase();
})

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var fullDate = new Date().toString() + req.method + req.url + '\n';
	console.log(fullDate);
	fs.appendFile('saiyanlog.txt', fullDate, (error) => {
		if(error) throw error;
		console.log('data was appended to file "saiyan.txt" ');
	})
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/

app.get('/', (req, res) => {
	res.render('home.hbs', {
		race: 'saiyan',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		about: 'dragon ball super',
		// currentYear: new Date().getFullYear()
	});
});

app.get('/projects', (req, res) => {
	res.render('project.hbs', {
		about: 'dragon ball project',
		pageTitle: 'Dragon Ball'
	})
})

app.listen(3000);