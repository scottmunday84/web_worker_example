onmessage = ({data: {url, value}}) => {
	if (value) {
		console.log('value: ', value);
	}

	setTimeout(() => {
		postMessage(url);
	}, 5000);
}
