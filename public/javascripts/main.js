loaderButton = document.querySelector('#loader')
loaderButton.addEventListener('click', async e => {
	e.preventDefault();
	res = await fetch('https://www.reddit.com/r/subreddit/new.json?sort=new')
	if (res.ok) {
		data = await res.json();
		payload = []
		for (index in data.data.children) {
			payload.push({ info: data.data.children[index].data, created: data.data.children[index].data.created})
		}
		resLocal = await fetch('/', {
  		method: 'POST',
  		headers: {
    		'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		if (resLocal.ok) {
			showData()
		} else {
			alert('Ha ocurrido un error en el proceso de obtención de datos');
		}
	}
})

const showData = async () => {
	res = await fetch('/get-data');
	if (res.ok) {
		data = await res.json()
		const table = document.createElement('TABLE')
		table.width = '100%';
		table.border = "2";
		for (info in data) {
			const row = table.insertRow();
			const id = data[info]._id
			row.insertCell().innerText = id
			row.insertCell().innerText = data[info].info.title
			row.insertCell().innerText = data[info].info.author_fullname
			row.insertCell().innerText = data[info].info.thumbnail
			row.insertCell().innerText = data[info].info.selftext
			const cellButton = row.insertCell()
			const button = document.createElement('BUTTON');
			button.innerText = 'Eliminar';
			button.addEventListener('click', e => {
				e.preventDefault();
				deleteRecord(row.rowIndex, table);
			})
			cellButton.appendChild(button);
		}
		document.body.appendChild(table)
	}
}

const deleteRecord = async (index, table) => {
	resLocal = await fetch('/', {
  	method: 'DELETE',
  	headers: {
    	'Content-Type': 'application/json',
  	},
		body: JSON.stringify({id: parseInt(table.rows[index].cells[0].innerText)}),
		})
	if (resLocal.ok) {
		table.deleteRow(index)
	} else {
		alert('Ha ocurrido un error en el proceso de eliminación');
	}
}