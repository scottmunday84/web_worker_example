import {useEffect, useState} from "react";

export default function WebWorkerTester() {
	// const [logs, setLogs] = useState([]);
	// let x = false;

	// useEffect(() => {
	//     if (x === true) {
	//         return;
	//     }
	//     x = true;
	//
	//     const fnc = url => {
	//         const date = (new Date()).toUTCString();
	//         setLogs(preLogs => [{date, url}, ...preLogs]);
	//     }
	//     const callSlow = url => {
	//         setTimeout(() => fnc(url), 5000);
	//     }
	//
	//     setTimeout(() => {
	//         callSlow('http://google.com');
	//     }, 5000);
	//     callSlow('http://office.com');
	//     callSlow('http://hc1.com');
	// }, []);

	const [webWorker, setWebWorker] = useState(null);
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		const worker = new Worker(new URL("./webWorker.js", import.meta.url));
		setWebWorker(worker);
		worker.onmessage = ({data: url}) => {
			const date = (new Date()).toUTCString();
			setLogs(preLogs => [{date, url}, ...preLogs]);
		}

		return () => {
			worker.terminate();
		}
	}, []);

	useEffect(() => {
		if (webWorker === null) {
			return;
		}

		setTimeout(() => {
			webWorker.postMessage({url: 'http://google.com', value: 1});
		}, 5000);
		webWorker.postMessage({url: 'http://office.com'});
		webWorker.postMessage({url: 'http://hc1.com'});
	}, [webWorker]);

	return (
		<div>{logs.map(({date, url}) => (<div>{date}: {url}</div>))}</div>
	)
}