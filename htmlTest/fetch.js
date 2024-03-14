fetch('http://localhost:3007/avatar',{
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTAzNDc5MjgsImV4cCI6MTcxMDQzMDcyOCwic3ViIjoiNDgifQ.3KUJN4hTCJZ62HbDu-NvrZEpnA7ivT6mSf52hJ7PnS4'
	}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));