function indexBands(req, res) {
	res.send('index');
}

function showBands(req, res) {
	res.send('show');
}

function newBands(req, res) {
	res.send('new');
}

function createBands(req, res) {
	res.send('create');
}

function editBands(req, res) {
	res.send('edit');
}

function updateBands(req, res) {
	res.send('update');
}

function deleteBands(req, res) {
	res.send('delete');
}

module.exports = {
	index: indexBands,
	show: showBands,
	new: newBands,
	create: createBands,
	edit: editBands,
	update: updateBands,
	delete: deleteBands
}