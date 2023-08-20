const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

let toggled = false;

menuBtn.addEventListener('click', () => {
	const lines = document.querySelectorAll('.btn-line');
	
	console.log('Kalja');
	
	if(toggled){
		lines.forEach(item => item.classList.remove('toggled'));
		menu.classList.remove('open');
	}
	else{
		lines.forEach(item => item.classList.add('toggled'));
		menu.classList.add('open');
	}
	
	toggled = !toggled;
});