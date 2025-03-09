// In src/components/ManageRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('/api/connectionRequest')
      .then(response => setRequests(response.data))
      .catch(error => console.error(error));
  }, []);

  const acceptRequest = (requestId) => {
    axios.post('/api/connectionRequest/accept', { requestId })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Manage Requests</h1>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            Request from {request.patient.name} to {request.doctor.name}
            {request.status === 'pending' && <button onClick={() => acceptRequest(request._id)}>Accept</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageRequests;
