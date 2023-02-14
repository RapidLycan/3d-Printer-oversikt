export default function formatTime(milliseconds) {
	const oneSecond = 1000;
	const oneMinute = oneSecond * 60;
	const oneHour = oneMinute * 60;
	const oneDay = oneHour * 24;

	let remainingTime = milliseconds;
	let days = Math.floor(remainingTime / oneDay);
	remainingTime = remainingTime % oneDay;
	let hours = Math.floor(remainingTime / oneHour);
	remainingTime = remainingTime % oneHour;
	let minutes = Math.floor(remainingTime / oneMinute);
	remainingTime = remainingTime % oneMinute;
	let seconds = Math.floor(remainingTime / oneSecond);

	let formattedTime = '';
	if (days > 0) {
		formattedTime += `${days} day${days > 1 ? 's' : ''} `;
	}
	if (hours > 0) {
		formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
	}
	if (minutes > 0) {
		formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
	}
	if (seconds > 0 || formattedTime === '') {
		formattedTime += `${seconds} second${seconds > 1 ? 's' : ''}`;
	}

	return formattedTime;
}
